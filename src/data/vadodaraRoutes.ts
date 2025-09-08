export interface Stop {
  name: string;
  latitude: number;
  longitude: number;
  fillLevel?: number;
  lastCleaned?: string;
  id: string;
}

export interface Route {
  area: string;
  stops: Stop[];
}

export const vadodaraRoutesData: Route[] = [
  {
    area: "Dandia Bazar",
    stops: [
      { 
        id: "DB001",
        name: "Dandia Bazar Main Market", 
        latitude: 22.303420, 
        longitude: 73.197650,
        fillLevel: Math.floor(Math.random() * 100),
        lastCleaned: "2025-09-08T08:30:00Z"
      },
      { 
        id: "DB002",
        name: "Mandvi Gate", 
        latitude: 22.303940, 
        longitude: 73.199050,
        fillLevel: Math.floor(Math.random() * 100),
        lastCleaned: "2025-09-08T09:15:00Z"
      },
      { 
        id: "DB003",
        name: "Sidi Saiyyed Mosque Road", 
        latitude: 22.304800, 
        longitude: 73.198300,
        fillLevel: Math.floor(Math.random() * 100),
        lastCleaned: "2025-09-08T07:45:00Z"
      },
      { 
        id: "DB004",
        name: "Laheripura Road", 
        latitude: 22.302950, 
        longitude: 73.197900,
        fillLevel: Math.floor(Math.random() * 100),
        lastCleaned: "2025-09-08T10:00:00Z"
      }
    ]
  },
  {
    area: "Raopura",
    stops: [
      { 
        id: "RP001",
        name: "Raopura Circle", 
        latitude: 22.301553, 
        longitude: 73.200598,
        fillLevel: Math.floor(Math.random() * 100),
        lastCleaned: "2025-09-08T08:00:00Z"
      },
      { 
        id: "RP002",
        name: "Sursagar Lake", 
        latitude: 22.305950, 
        longitude: 73.202800,
        fillLevel: Math.floor(Math.random() * 100),
        lastCleaned: "2025-09-08T09:30:00Z"
      },
      { 
        id: "RP003",
        name: "Nyay Mandir", 
        latitude: 22.301850, 
        longitude: 73.201900,
        fillLevel: Math.floor(Math.random() * 100),
        lastCleaned: "2025-09-08T07:15:00Z"
      },
      { 
        id: "RP004",
        name: "Mandvi Gate", 
        latitude: 22.303940, 
        longitude: 73.199050,
        fillLevel: Math.floor(Math.random() * 100),
        lastCleaned: "2025-09-08T10:45:00Z"
      }
    ]
  },
  {
    area: "Karelibaug",
    stops: [
      { 
        id: "KB001",
        name: "Karelibaug Circle", 
        latitude: 22.320100, 
        longitude: 73.206600,
        fillLevel: Math.floor(Math.random() * 100),
        lastCleaned: "2025-09-08T08:45:00Z"
      },
      { 
        id: "KB002",
        name: "Akota Bridge Junction", 
        latitude: 22.314500, 
        longitude: 73.200300,
        fillLevel: Math.floor(Math.random() * 100),
        lastCleaned: "2025-09-08T09:00:00Z"
      },
      { 
        id: "KB003",
        name: "Water Tank Karelibaug", 
        latitude: 22.321100, 
        longitude: 73.208200,
        fillLevel: Math.floor(Math.random() * 100),
        lastCleaned: "2025-09-08T07:30:00Z"
      },
      { 
        id: "KB004",
        name: "Karelibaug Market", 
        latitude: 22.319000, 
        longitude: 73.205000,
        fillLevel: Math.floor(Math.random() * 100),
        lastCleaned: "2025-09-08T10:15:00Z"
      }
    ]
  },
  {
    area: "Pratapnagar",
    stops: [
      { 
        id: "PN001",
        name: "Pratapnagar Station", 
        latitude: 22.290470, 
        longitude: 73.208329,
        fillLevel: Math.floor(Math.random() * 100),
        lastCleaned: "2025-09-08T08:15:00Z"
      },
      { 
        id: "PN002",
        name: "Pratapnagar Crossing", 
        latitude: 22.292000, 
        longitude: 73.207100,
        fillLevel: Math.floor(Math.random() * 100),
        lastCleaned: "2025-09-08T09:45:00Z"
      },
      { 
        id: "PN003",
        name: "Ajwa Road Junction", 
        latitude: 22.294200, 
        longitude: 73.210400,
        fillLevel: Math.floor(Math.random() * 100),
        lastCleaned: "2025-09-08T07:00:00Z"
      },
      { 
        id: "PN004",
        name: "Pratapnagar Market", 
        latitude: 22.289500, 
        longitude: 73.206800,
        fillLevel: Math.floor(Math.random() * 100),
        lastCleaned: "2025-09-08T10:30:00Z"
      }
    ]
  }
];

// Function to generate mock real-time data
export const generateRealTimeData = (): Route[] => {
  return vadodaraRoutesData.map(route => ({
    ...route,
    stops: route.stops.map(stop => ({
      ...stop,
      fillLevel: Math.floor(Math.random() * 100)
    }))
  }));
};