export interface Stop {
  bin_id: string;
  name: string;
  latitude: number;
  longitude: number;
  fill_level_percent: number;
  last_collected: string;
  id?: string; // For backward compatibility
  fillLevel?: number; // For backward compatibility
  lastCleaned?: string; // For backward compatibility
}

export interface Route {
  area: string;
  route_id: string;
  stops: Stop[];
}

export const vadodaraRoutesData: Route[] = [
  {
    area: "Dandia Bazar",
    route_id: "DB-001",
    stops: [
      {"bin_id":"DB-001-01","name":"Dandia Bazar Main Market","latitude":22.303420,"longitude":73.197650,"fill_level_percent":72,"last_collected":"2025-09-07T07:40:00+05:30"},
      {"bin_id":"DB-001-02","name":"Mandvi Gate East","latitude":22.303940,"longitude":73.199050,"fill_level_percent":48,"last_collected":"2025-09-07T06:10:00+05:30"},
      {"bin_id":"DB-001-03","name":"Sidi Saiyyed Mosque Road","latitude":22.304800,"longitude":73.198300,"fill_level_percent":85,"last_collected":"2025-09-07T08:05:00+05:30"},
      {"bin_id":"DB-001-04","name":"Laheripura Road Junction","latitude":22.302950,"longitude":73.197900,"fill_level_percent":33,"last_collected":"2025-09-06T19:20:00+05:30"},
      {"bin_id":"DB-001-05","name":"Market Lane 1","latitude":22.303250,"longitude":73.198000,"fill_level_percent":57,"last_collected":"2025-09-07T05:50:00+05:30"},
      {"bin_id":"DB-001-06","name":"Market Lane 2","latitude":22.304100,"longitude":73.197800,"fill_level_percent":62,"last_collected":"2025-09-07T07:05:00+05:30"},
      {"bin_id":"DB-001-07","name":"Spice Bazaar Corner","latitude":22.303600,"longitude":73.198900,"fill_level_percent":26,"last_collected":"2025-09-06T21:10:00+05:30"},
      {"bin_id":"DB-001-08","name":"Vegetable Market Stall","latitude":22.302800,"longitude":73.198250,"fill_level_percent":49,"last_collected":"2025-09-07T04:30:00+05:30"},
      {"bin_id":"DB-001-09","name":"Temple Road Dustbin","latitude":22.304300,"longitude":73.199400,"fill_level_percent":91,"last_collected":"2025-09-07T08:20:00+05:30"},
      {"bin_id":"DB-001-10","name":"Community Hall","latitude":22.302600,"longitude":73.197450,"fill_level_percent":40,"last_collected":"2025-09-06T23:50:00+05:30"},
      {"bin_id":"DB-001-11","name":"Bus Stand North","latitude":22.305000,"longitude":73.198000,"fill_level_percent":68,"last_collected":"2025-09-07T07:55:00+05:30"},
      {"bin_id":"DB-001-12","name":"Dandia Park Entrance","latitude":22.303100,"longitude":73.196900,"fill_level_percent":22,"last_collected":"2025-09-06T18:15:00+05:30"},
      {"bin_id":"DB-001-13","name":"College Lane Dustbin","latitude":22.304900,"longitude":73.197200,"fill_level_percent":55,"last_collected":"2025-09-07T03:40:00+05:30"},
      {"bin_id":"DB-001-14","name":"Sweets Shop Corner","latitude":22.303800,"longitude":73.199000,"fill_level_percent":79,"last_collected":"2025-09-07T06:50:00+05:30"},
      {"bin_id":"DB-001-15","name":"Old Library Junction","latitude":22.302900,"longitude":73.198700,"fill_level_percent":30,"last_collected":"2025-09-06T22:05:00+05:30"},
      {"bin_id":"DB-001-16","name":"Textile Market South","latitude":22.303520,"longitude":73.197300,"fill_level_percent":64,"last_collected":"2025-09-07T07:15:00+05:30"},
      {"bin_id":"DB-001-17","name":"Footpath East","latitude":22.304200,"longitude":73.198600,"fill_level_percent":12,"last_collected":"2025-09-06T20:40:00+05:30"},
      {"bin_id":"DB-001-18","name":"Vendor Alley","latitude":22.303350,"longitude":73.199300,"fill_level_percent":88,"last_collected":"2025-09-07T08:45:00+05:30"},
      {"bin_id":"DB-001-19","name":"Laundry Corner","latitude":22.302750,"longitude":73.197750,"fill_level_percent":46,"last_collected":"2025-09-07T02:25:00+05:30"},
      {"bin_id":"DB-001-20","name":"Corner Signal","latitude":22.303900,"longitude":73.198200,"fill_level_percent":53,"last_collected":"2025-09-07T05:05:00+05:30"}
    ]
  },
  {
    area: "Raopura",
    route_id: "RP-002",
    stops: [
      {"bin_id":"RP-002-01","name":"Raopura Circle","latitude":22.301553,"longitude":73.200598,"fill_level_percent":66,"last_collected":"2025-09-07T06:30:00+05:30"},
      {"bin_id":"RP-002-02","name":"Sursagar Lake Promenade","latitude":22.305950,"longitude":73.202800,"fill_level_percent":71,"last_collected":"2025-09-07T07:10:00+05:30"},
      {"bin_id":"RP-002-03","name":"Nyay Mandir Road","latitude":22.301850,"longitude":73.201900,"fill_level_percent":28,"last_collected":"2025-09-06T20:55:00+05:30"},
      {"bin_id":"RP-002-04","name":"Mandvi Gate West","latitude":22.303940,"longitude":73.199050,"fill_level_percent":82,"last_collected":"2025-09-07T08:00:00+05:30"},
      {"bin_id":"RP-002-05","name":"Heritage Walkway","latitude":22.302300,"longitude":73.203200,"fill_level_percent":39,"last_collected":"2025-09-07T01:15:00+05:30"},
      {"bin_id":"RP-002-06","name":"Court Road Junction","latitude":22.301200,"longitude":73.201000,"fill_level_percent":59,"last_collected":"2025-09-07T05:40:00+05:30"},
      {"bin_id":"RP-002-07","name":"Shopping Street 1","latitude":22.303200,"longitude":73.201800,"fill_level_percent":45,"last_collected":"2025-09-06T22:50:00+05:30"},
      {"bin_id":"RP-002-08","name":"Shopping Street 2","latitude":22.304000,"longitude":73.201300,"fill_level_percent":18,"last_collected":"2025-09-06T19:05:00+05:30"},
      {"bin_id":"RP-002-09","name":"Community Park","latitude":22.305200,"longitude":73.200900,"fill_level_percent":74,"last_collected":"2025-09-07T07:40:00+05:30"},
      {"bin_id":"RP-002-10","name":"Bus Stop Raopura","latitude":22.302700,"longitude":73.200200,"fill_level_percent":33,"last_collected":"2025-09-06T23:00:00+05:30"},
      {"bin_id":"RP-002-11","name":"Temple Lane","latitude":22.301900,"longitude":73.202400,"fill_level_percent":61,"last_collected":"2025-09-07T04:00:00+05:30"},
      {"bin_id":"RP-002-12","name":"Station Approach","latitude":22.303500,"longitude":73.202600,"fill_level_percent":50,"last_collected":"2025-09-07T03:10:00+05:30"},
      {"bin_id":"RP-002-13","name":"Library Steps","latitude":22.302100,"longitude":73.201600,"fill_level_percent":29,"last_collected":"2025-09-06T21:35:00+05:30"},
      {"bin_id":"RP-002-14","name":"Civic Center","latitude":22.304700,"longitude":73.203000,"fill_level_percent":77,"last_collected":"2025-09-07T08:10:00+05:30"},
      {"bin_id":"RP-002-15","name":"Bazar Alley East","latitude":22.301700,"longitude":73.200900,"fill_level_percent":41,"last_collected":"2025-09-07T02:55:00+05:30"},
      {"bin_id":"RP-002-16","name":"Canteen Corner","latitude":22.303000,"longitude":73.200500,"fill_level_percent":90,"last_collected":"2025-09-07T08:35:00+05:30"},
      {"bin_id":"RP-002-17","name":"Fountain Square","latitude":22.305600,"longitude":73.202200,"fill_level_percent":24,"last_collected":"2025-09-06T18:45:00+05:30"},
      {"bin_id":"RP-002-18","name":"Health Clinic","latitude":22.302450,"longitude":73.202900,"fill_level_percent":54,"last_collected":"2025-09-07T05:15:00+05:30"}
    ]
  },
  {
    area: "Karelibaug",
    route_id: "KB-003",
    stops: [
      {"bin_id":"KB-003-01","name":"Karelibaug Circle","latitude":22.320100,"longitude":73.206600,"fill_level_percent":63,"last_collected":"2025-09-07T06:55:00+05:30"},
      {"bin_id":"KB-003-02","name":"Akota Bridge Junction","latitude":22.314500,"longitude":73.200300,"fill_level_percent":47,"last_collected":"2025-09-07T04:20:00+05:30"},
      {"bin_id":"KB-003-03","name":"Water Tank Karelibaug","latitude":22.321100,"longitude":73.208200,"fill_level_percent":35,"last_collected":"2025-09-06T20:00:00+05:30"},
      {"bin_id":"KB-003-04","name":"Karelibaug Market","latitude":22.319000,"longitude":73.205000,"fill_level_percent":80,"last_collected":"2025-09-07T07:30:00+05:30"},
      {"bin_id":"KB-003-05","name":"Garden View","latitude":22.318500,"longitude":73.206200,"fill_level_percent":21,"last_collected":"2025-09-06T18:30:00+05:30"},
      {"bin_id":"KB-003-06","name":"School Road","latitude":22.317800,"longitude":73.204900,"fill_level_percent":55,"last_collected":"2025-09-07T03:50:00+05:30"},
      {"bin_id":"KB-003-07","name":"Hospital Junction","latitude":22.316900,"longitude":73.205700,"fill_level_percent":68,"last_collected":"2025-09-07T06:05:00+05:30"},
      {"bin_id":"KB-003-08","name":"Shopping Complex","latitude":22.319800,"longitude":73.207100,"fill_level_percent":42,"last_collected":"2025-09-07T02:10:00+05:30"},
      {"bin_id":"KB-003-09","name":"Sector 5 Bus Stop","latitude":22.315600,"longitude":73.203900,"fill_level_percent":76,"last_collected":"2025-09-07T07:50:00+05:30"},
      {"bin_id":"KB-003-10","name":"Residential Lane A","latitude":22.320400,"longitude":73.205800,"fill_level_percent":29,"last_collected":"2025-09-06T22:20:00+05:30"},
      {"bin_id":"KB-003-11","name":"Residential Lane B","latitude":22.319200,"longitude":73.206800,"fill_level_percent":51,"last_collected":"2025-09-07T04:45:00+05:30"},
      {"bin_id":"KB-003-12","name":"Community Center Karelibaug","latitude":22.318900,"longitude":73.204600,"fill_level_percent":14,"last_collected":"2025-09-06T19:55:00+05:30"},
      {"bin_id":"KB-003-13","name":"Post Office Corner","latitude":22.317300,"longitude":73.206400,"fill_level_percent":89,"last_collected":"2025-09-07T08:25:00+05:30"},
      {"bin_id":"KB-003-14","name":"Market Lane KB-2","latitude":22.319600,"longitude":73.205300,"fill_level_percent":60,"last_collected":"2025-09-07T05:25:00+05:30"},
      {"bin_id":"KB-003-15","name":"Temple Street Karelibaug","latitude":22.316500,"longitude":73.207000,"fill_level_percent":37,"last_collected":"2025-09-06T21:05:00+05:30"},
      {"bin_id":"KB-003-16","name":"WaterWorks Entrance","latitude":22.321400,"longitude":73.209000,"fill_level_percent":44,"last_collected":"2025-09-07T01:50:00+05:30"}
    ]
  },
  {
    area: "Pratapnagar",
    route_id: "PN-004",
    stops: [
      {"bin_id":"PN-004-01","name":"Pratapnagar Station","latitude":22.290470,"longitude":73.208329,"fill_level_percent":54,"last_collected":"2025-09-07T05:05:00+05:30"},
      {"bin_id":"PN-004-02","name":"Pratapnagar Crossing","latitude":22.292000,"longitude":73.207100,"fill_level_percent":27,"last_collected":"2025-09-06T20:45:00+05:30"},
      {"bin_id":"PN-004-03","name":"Ajwa Road Junction","latitude":22.294200,"longitude":73.210400,"fill_level_percent":83,"last_collected":"2025-09-07T07:20:00+05:30"},
      {"bin_id":"PN-004-04","name":"Pratapnagar Market","latitude":22.289500,"longitude":73.206800,"fill_level_percent":39,"last_collected":"2025-09-06T22:40:00+05:30"},
      {"bin_id":"PN-004-05","name":"Station Road North","latitude":22.291000,"longitude":73.209000,"fill_level_percent":70,"last_collected":"2025-09-07T06:10:00+05:30"},
      {"bin_id":"PN-004-06","name":"Railway Colony","latitude":22.290200,"longitude":73.207800,"fill_level_percent":18,"last_collected":"2025-09-06T18:05:00+05:30"},
      {"bin_id":"PN-004-07","name":"Community Ground","latitude":22.293100,"longitude":73.208900,"fill_level_percent":61,"last_collected":"2025-09-07T04:35:00+05:30"},
      {"bin_id":"PN-004-08","name":"Truck Stand","latitude":22.294800,"longitude":73.209800,"fill_level_percent":95,"last_collected":"2025-09-07T08:40:00+05:30"},
      {"bin_id":"PN-004-09","name":"Police Chowky","latitude":22.291500,"longitude":73.206900,"fill_level_percent":46,"last_collected":"2025-09-07T02:55:00+05:30"},
      {"bin_id":"PN-004-10","name":"Market Lane PN-1","latitude":22.290800,"longitude":73.206300,"fill_level_percent":32,"last_collected":"2025-09-06T21:15:00+05:30"},
      {"bin_id":"PN-004-11","name":"Temple in Pratapnagar","latitude":22.292400,"longitude":73.206600,"fill_level_percent":50,"last_collected":"2025-09-07T03:20:00+05:30"},
      {"bin_id":"PN-004-12","name":"Health Post","latitude":22.293600,"longitude":73.207200,"fill_level_percent":28,"last_collected":"2025-09-06T19:30:00+05:30"},
      {"bin_id":"PN-004-13","name":"School Crossing","latitude":22.291800,"longitude":73.209600,"fill_level_percent":66,"last_collected":"2025-09-07T06:40:00+05:30"},
      {"bin_id":"PN-004-14","name":"Electronics Shop Corner","latitude":22.289900,"longitude":73.207700,"fill_level_percent":41,"last_collected":"2025-09-07T01:20:00+05:30"},
      {"bin_id":"PN-004-15","name":"Service Lane","latitude":22.293900,"longitude":73.210000,"fill_level_percent":12,"last_collected":"2025-09-06T17:55:00+05:30"}
    ]
  },
  {
    area: "Alkapuri",
    route_id: "AK-005",
    stops: [
      {"bin_id":"AK-005-01","name":"Alkapuri Main Road","latitude":22.305800,"longitude":73.165900,"fill_level_percent":58,"last_collected":"2025-09-07T05:55:00+05:30"},
      {"bin_id":"AK-005-02","name":"Alkapuri Circle","latitude":22.305200,"longitude":73.168400,"fill_level_percent":22,"last_collected":"2025-09-06T18:25:00+05:30"},
      {"bin_id":"AK-005-03","name":"Station Road Alkapuri","latitude":22.307400,"longitude":73.167100,"fill_level_percent":69,"last_collected":"2025-09-07T06:45:00+05:30"},
      {"bin_id":"AK-005-04","name":"Shopping Arcade","latitude":22.306900,"longitude":73.166300,"fill_level_percent":47,"last_collected":"2025-09-07T03:35:00+05:30"},
      {"bin_id":"AK-005-05","name":"Cinema Junction","latitude":22.306200,"longitude":73.165300,"fill_level_percent":81,"last_collected":"2025-09-07T08:30:00+05:30"},
      {"bin_id":"AK-005-06","name":"Coffee Street","latitude":22.305500,"longitude":73.166800,"fill_level_percent":33,"last_collected":"2025-09-06T22:10:00+05:30"},
      {"bin_id":"AK-005-07","name":"Office Park Gate","latitude":22.307000,"longitude":73.168900,"fill_level_percent":55,"last_collected":"2025-09-07T04:50:00+05:30"},
      {"bin_id":"AK-005-08","name":"Clinic Corner","latitude":22.306600,"longitude":73.167700,"fill_level_percent":14,"last_collected":"2025-09-06T19:10:00+05:30"},
      {"bin_id":"AK-005-09","name":"Bank Junction","latitude":22.305900,"longitude":73.167400,"fill_level_percent":73,"last_collected":"2025-09-07T07:05:00+05:30"},
      {"bin_id":"AK-005-10","name":"Alkapuri Park Entrance","latitude":22.307600,"longitude":73.165800,"fill_level_percent":26,"last_collected":"2025-09-06T20:20:00+05:30"},
      {"bin_id":"AK-005-11","name":"Service Lane AK-2","latitude":22.306800,"longitude":73.166100,"fill_level_percent":50,"last_collected":"2025-09-07T02:40:00+05:30"},
      {"bin_id":"AK-005-12","name":"Bookstore Corner","latitude":22.307200,"longitude":73.166600,"fill_level_percent":61,"last_collected":"2025-09-07T05:10:00+05:30"},
      {"bin_id":"AK-005-13","name":"Hotel Entrance Alkapuri","latitude":22.305700,"longitude":73.168000,"fill_level_percent":38,"last_collected":"2025-09-06T21:45:00+05:30"},
      {"bin_id":"AK-005-14","name":"Sidewalk East","latitude":22.306400,"longitude":73.165600,"fill_level_percent":90,"last_collected":"2025-09-07T08:15:00+05:30"},
      {"bin_id":"AK-005-15","name":"Utility Shed","latitude":22.307800,"longitude":73.167900,"fill_level_percent":43,"last_collected":"2025-09-07T01:05:00+05:30"},
      {"bin_id":"AK-005-16","name":"Lane towards Canal","latitude":22.304900,"longitude":73.166900,"fill_level_percent":35,"last_collected":"2025-09-06T17:40:00+05:30"}
    ]
  },
  {
    area: "Manjalpur",
    route_id: "MJ-006",
    stops: [
      {"bin_id":"MJ-006-01","name":"Manjalpur Circle","latitude":22.276500,"longitude":73.177200,"fill_level_percent":67,"last_collected":"2025-09-07T06:20:00+05:30"},
      {"bin_id":"MJ-006-02","name":"GIDC Road","latitude":22.277900,"longitude":73.175800,"fill_level_percent":54,"last_collected":"2025-09-07T04:05:00+05:30"},
      {"bin_id":"MJ-006-03","name":"Market Road Manjalpur","latitude":22.278700,"longitude":73.178500,"fill_level_percent":20,"last_collected":"2025-09-06T18:50:00+05:30"},
      {"bin_id":"MJ-006-04","name":"Railway Underpass","latitude":22.279800,"longitude":73.176900,"fill_level_percent":88,"last_collected":"2025-09-07T08:55:00+05:30"},
      {"bin_id":"MJ-006-05","name":"Temple Junction MJ","latitude":22.277200,"longitude":73.176300,"fill_level_percent":31,"last_collected":"2025-09-06T21:00:00+05:30"},
      {"bin_id":"MJ-006-06","name":"College Sidewalk","latitude":22.276900,"longitude":73.178000,"fill_level_percent":49,"last_collected":"2025-09-07T02:30:00+05:30"},
      {"bin_id":"MJ-006-07","name":"Main Road Bus Stop","latitude":22.278200,"longitude":73.177600,"fill_level_percent":75,"last_collected":"2025-09-07T07:45:00+05:30"},
      {"bin_id":"MJ-006-08","name":"Industrial Lane","latitude":22.279300,"longitude":73.175200,"fill_level_percent":42,"last_collected":"2025-09-07T03:00:00+05:30"},
      {"bin_id":"MJ-006-09","name":"Pharmacy Corner","latitude":22.277600,"longitude":73.179100,"fill_level_percent":16,"last_collected":"2025-09-06T19:40:00+05:30"},
      {"bin_id":"MJ-006-10","name":"Playground Gate","latitude":22.276000,"longitude":73.177900,"fill_level_percent":59,"last_collected":"2025-09-07T05:20:00+05:30"},
      {"bin_id":"MJ-006-11","name":"Vegetable Market MJ","latitude":22.278900,"longitude":73.176700,"fill_level_percent":94,"last_collected":"2025-09-07T09:05:00+05:30"},
      {"bin_id":"MJ-006-12","name":"Community Library","latitude":22.276700,"longitude":73.176100,"fill_level_percent":36,"last_collected":"2025-09-06T20:10:00+05:30"},
      {"bin_id":"MJ-006-13","name":"Service Road East","latitude":22.279000,"longitude":73.178400,"fill_level_percent":44,"last_collected":"2025-09-07T01:40:00+05:30"},
      {"bin_id":"MJ-006-14","name":"Corner Tea Stall","latitude":22.277400,"longitude":73.175900,"fill_level_percent":27,"last_collected":"2025-09-06T22:30:00+05:30"},
      {"bin_id":"MJ-006-15","name":"Small Workshop Lane","latitude":22.279600,"longitude":73.177200,"fill_level_percent":62,"last_collected":"2025-09-07T06:00:00+05:30"}
    ]
  }
];

// Function to generate mock real-time data
export const generateRealTimeData = (): Route[] => {
  return vadodaraRoutesData.map(route => ({
    ...route,
    stops: route.stops.map(stop => ({
      ...stop,
      fill_level_percent: Math.floor(Math.random() * 100)
    }))
  }));
};