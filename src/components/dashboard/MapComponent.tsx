import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { vadodaraRoutesData, Stop } from "@/data/vadodaraRoutes";
import { formatDistanceToNow } from "date-fns";

const GOOGLE_MAPS_API_KEY = "AIzaSyD2lLpyO2yskFaVFQGVKYHVn6zBviozPZw";
const VADODARA_CENTER = { lat: 22.3072, lng: 73.1812 };

const MapComponent = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(null);

  // Get all stops from all routes
  const allStops = vadodaraRoutesData.flatMap(route => route.stops);

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
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [
              {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
              }
            ]
          });

          const infoWindowInstance = new google.maps.InfoWindow();

          setMap(mapInstance);
          setInfoWindow(infoWindowInstance);
        }
      } catch (error) {
        console.error("Error loading Google Maps:", error);
      }
    };

    initMap();
  }, []);

  // Update markers when map is ready
  useEffect(() => {
    if (!map || !infoWindow) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    setMarkers([]);

    // Create new markers
    const newMarkers: google.maps.Marker[] = [];

    allStops.forEach((stop) => {
      const fillLevel = stop.fill_level_percent || 0;
      const markerColor = fillLevel >= 80 ? '#ff4d4d' : fillLevel >= 50 ? '#ffcc00' : '#4caf50';
      
      const marker = new google.maps.Marker({
        position: { lat: stop.latitude, lng: stop.longitude },
        map: map,
        title: stop.name,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: markerColor,
          fillOpacity: 0.8,
          strokeColor: '#ffffff',
          strokeWeight: 2
        }
      });

      // Add click listener for info window
      marker.addListener('click', () => {
        const lastCollectedText = stop.last_collected
          ? formatDistanceToNow(new Date(stop.last_collected), { addSuffix: true })
          : 'Unknown';

        const content = `
          <div style="padding: 10px; min-width: 200px;">
            <h3 style="margin: 0 0 8px 0; color: #333; font-weight: 600;">${stop.name}</h3>
            <div style="margin: 4px 0;">
              <strong>Fill Level:</strong> 
              <span style="color: ${markerColor}; font-weight: 600;">${fillLevel}%</span>
            </div>
            <div style="margin: 4px 0;">
              <strong>Last Collected:</strong> ${lastCollectedText}
            </div>
            <div style="margin: 4px 0;">
              <strong>Bin ID:</strong> ${stop.bin_id}
            </div>
          </div>
        `;

        infoWindow.setContent(content);
        infoWindow.open(map, marker);
      });

      newMarkers.push(marker);
    });

    setMarkers(newMarkers);
  }, [map, infoWindow]);

  return (
    <div className="relative w-full h-[400px]">
      <div ref={mapRef} className="w-full h-full rounded-lg" />
      
      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 shadow-lg text-xs">
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

      {/* Stats Info */}
      <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
        <div className="text-sm font-medium">Live Bin Status</div>
        <div className="text-xs text-muted-foreground">
          {allStops.length} bins • {allStops.filter(s => s.fill_level_percent >= 50).length} need collection
        </div>
      </div>
    </div>
  );
};

export default MapComponent;