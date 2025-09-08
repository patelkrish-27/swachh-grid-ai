import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Stop } from "@/data/vadodaraRoutes";
import { formatDistanceToNow } from "date-fns";

interface GoogleMapProps {
  stops: Stop[];
  selectedArea: string;
  onOptimizeRoute: (optimizedStops: Stop[]) => void;
}

const GOOGLE_MAPS_API_KEY = "AIzaSyD2lLpyO2yskFaVFQGVKYHVn6zBviozPZw";
const VADODARA_CENTER = { lat: 22.3072, lng: 73.1812 };

const GoogleMap = ({ stops, selectedArea, onOptimizeRoute }: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(null);

  // Initialize Google Maps
  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: GOOGLE_MAPS_API_KEY,
        version: "weekly",
        libraries: ["places"]
      });

      try {
        await loader.load();
        
        if (mapRef.current) {
          const mapInstance = new google.maps.Map(mapRef.current, {
            center: VADODARA_CENTER,
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [
              {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
              }
            ]
          });

          const directionsRendererInstance = new google.maps.DirectionsRenderer({
            draggable: false,
            suppressMarkers: true
          });
          directionsRendererInstance.setMap(mapInstance);

          const infoWindowInstance = new google.maps.InfoWindow();

          setMap(mapInstance);
          setDirectionsRenderer(directionsRendererInstance);
          setInfoWindow(infoWindowInstance);
        }
      } catch (error) {
        console.error("Error loading Google Maps:", error);
      }
    };

    initMap();
  }, []);

  // Update markers when stops change
  useEffect(() => {
    if (!map || !infoWindow) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    setMarkers([]);

    // Create new markers
    const newMarkers: google.maps.Marker[] = [];

    stops.forEach((stop) => {
      const fillLevel = stop.fillLevel || 0;
      const markerColor = fillLevel >= 80 ? '#ff4d4d' : fillLevel >= 50 ? '#ffcc00' : '#4caf50';
      
      const marker = new google.maps.Marker({
        position: { lat: stop.latitude, lng: stop.longitude },
        map: map,
        title: stop.name,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 12,
          fillColor: markerColor,
          fillOpacity: 0.8,
          strokeColor: '#ffffff',
          strokeWeight: 2
        }
      });

      // Add click listener for info window
      marker.addListener('click', () => {
        const lastCleanedText = stop.lastCleaned 
          ? formatDistanceToNow(new Date(stop.lastCleaned), { addSuffix: true })
          : 'Unknown';

        const content = `
          <div style="padding: 10px; min-width: 200px;">
            <h3 style="margin: 0 0 8px 0; color: #333; font-weight: 600;">${stop.name}</h3>
            <div style="margin: 4px 0;">
              <strong>Fill Level:</strong> 
              <span style="color: ${markerColor}; font-weight: 600;">${fillLevel}%</span>
            </div>
            <div style="margin: 4px 0;">
              <strong>Last Cleaned:</strong> ${lastCleanedText}
            </div>
            <div style="margin: 4px 0;">
              <strong>Bin ID:</strong> ${stop.id}
            </div>
          </div>
        `;

        infoWindow.setContent(content);
        infoWindow.open(map, marker);
      });

      newMarkers.push(marker);
    });

    setMarkers(newMarkers);
  }, [map, stops, infoWindow]);

  // AI-powered route optimization
  const optimizeRoute = async () => {
    if (!map || !directionsRenderer) return;

    // Filter stops with fill level >= 50%
    const eligibleStops = stops.filter(stop => (stop.fillLevel || 0) >= 50);
    
    if (eligibleStops.length < 2) {
      alert("Not enough bins with fill level ≥ 50% to optimize route");
      return;
    }

    // Sort by fill level (highest first) for prioritization
    const prioritizedStops = [...eligibleStops].sort((a, b) => (b.fillLevel || 0) - (a.fillLevel || 0));

    // Create waypoints for Directions API
    const origin = prioritizedStops[0];
    const destination = prioritizedStops[prioritizedStops.length - 1];
    const waypoints = prioritizedStops.slice(1, -1).map(stop => ({
      location: { lat: stop.latitude, lng: stop.longitude },
      stopover: true
    }));

    const directionsService = new google.maps.DirectionsService();

    try {
      const result = await directionsService.route({
        origin: { lat: origin.latitude, lng: origin.longitude },
        destination: { lat: destination.latitude, lng: destination.longitude },
        waypoints: waypoints,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING
      });

      directionsRenderer.setDirections(result);
      onOptimizeRoute(prioritizedStops);
    } catch (error) {
      console.error("Error optimizing route:", error);
      alert("Error optimizing route. Please try again.");
    }
  };

  // Auto-optimize when stops change and there are eligible stops
  useEffect(() => {
    if (stops.length > 0) {
      const timer = setTimeout(() => {
        optimizeRoute();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [stops]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full rounded-lg" />
      
      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <button
          onClick={optimizeRoute}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg shadow-lg hover:bg-primary/90 transition-colors text-sm font-medium"
        >
          Optimize Route
        </button>
        <div className="bg-card/90 backdrop-blur-sm rounded-lg p-3 shadow-lg text-xs">
          <div className="font-medium mb-2">Fill Level Legend</div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-alert"></div>
              <span>Critical (≥80%)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-warning"></div>
              <span>Warning (50-79%)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-success"></div>
              <span>Normal (&lt;50%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Area Info */}
      <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
        <div className="text-sm font-medium">{selectedArea}</div>
        <div className="text-xs text-muted-foreground">
          {stops.length} bins • {stops.filter(s => (s.fillLevel || 0) >= 50).length} need collection
        </div>
      </div>
    </div>
  );
};

export default GoogleMap;