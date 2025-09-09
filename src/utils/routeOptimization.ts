import { Stop } from "@/data/vadodaraRoutes";

// Haversine formula for calculating distance between two points
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// Calculate total route distance
export const calculateRouteDistance = (route: Stop[]): number => {
  let totalDistance = 0;
  for (let i = 0; i < route.length - 1; i++) {
    totalDistance += calculateDistance(
      route[i].latitude, route[i].longitude,
      route[i + 1].latitude, route[i + 1].longitude
    );
  }
  return totalDistance;
};

// Nearest Neighbor Algorithm
export const nearestNeighborOptimization = (stops: Stop[], startStop?: Stop): Stop[] => {
  if (stops.length <= 2) return stops;
  
  const unvisited = [...stops];
  const route: Stop[] = [];
  
  // Start from specified start stop or first stop
  let current = startStop || unvisited[0];
  route.push(current);
  unvisited.splice(unvisited.indexOf(current), 1);
  
  while (unvisited.length > 0) {
    let nearest = unvisited[0];
    let minDistance = calculateDistance(
      current.latitude, current.longitude,
      nearest.latitude, nearest.longitude
    );
    
    for (let i = 1; i < unvisited.length; i++) {
      const distance = calculateDistance(
        current.latitude, current.longitude,
        unvisited[i].latitude, unvisited[i].longitude
      );
      if (distance < minDistance) {
        minDistance = distance;
        nearest = unvisited[i];
      }
    }
    
    route.push(nearest);
    unvisited.splice(unvisited.indexOf(nearest), 1);
    current = nearest;
  }
  
  return route;
};

// 2-Opt Algorithm for route improvement
export const twoOptImprovement = (route: Stop[]): Stop[] => {
  if (route.length <= 3) return route;
  
  let improved = true;
  let bestRoute = [...route];
  let bestDistance = calculateRouteDistance(bestRoute);
  
  while (improved) {
    improved = false;
    
    for (let i = 1; i < route.length - 2; i++) {
      for (let j = i + 1; j < route.length - 1; j++) {
        // Create new route by reversing the segment between i and j
        const newRoute = [
          ...bestRoute.slice(0, i),
          ...bestRoute.slice(i, j + 1).reverse(),
          ...bestRoute.slice(j + 1)
        ];
        
        const newDistance = calculateRouteDistance(newRoute);
        
        if (newDistance < bestDistance) {
          bestRoute = newRoute;
          bestDistance = newDistance;
          improved = true;
        }
      }
    }
  }
  
  return bestRoute;
};

// Simple Genetic Algorithm
export const geneticAlgorithmOptimization = (stops: Stop[], startStop?: Stop, endStop?: Stop): Stop[] => {
  if (stops.length <= 3) return stops;
  
  const populationSize = 50;
  const generations = 100;
  const mutationRate = 0.02;
  
  // Create initial population
  let population: Stop[][] = [];
  for (let i = 0; i < populationSize; i++) {
    let individual = [...stops];
    
    // Keep start and end stops fixed if specified
    if (startStop && endStop) {
      individual = individual.filter(s => s !== startStop && s !== endStop);
      // Shuffle middle stops
      for (let j = individual.length - 1; j > 0; j--) {
        const k = Math.floor(Math.random() * (j + 1));
        [individual[j], individual[k]] = [individual[k], individual[j]];
      }
      individual = [startStop, ...individual, endStop];
    } else {
      // Shuffle all stops
      for (let j = individual.length - 1; j > 0; j--) {
        const k = Math.floor(Math.random() * (j + 1));
        [individual[j], individual[k]] = [individual[k], individual[j]];
      }
    }
    
    population.push(individual);
  }
  
  // Evolution loop
  for (let gen = 0; gen < generations; gen++) {
    // Calculate fitness (1 / distance)
    const fitness = population.map(individual => 1 / (calculateRouteDistance(individual) + 1));
    
    // Selection and crossover
    const newPopulation: Stop[][] = [];
    
    for (let i = 0; i < populationSize; i++) {
      // Tournament selection
      const parent1 = tournamentSelection(population, fitness);
      const parent2 = tournamentSelection(population, fitness);
      
      // Order crossover
      let child = orderCrossover(parent1, parent2, startStop, endStop);
      
      // Mutation
      if (Math.random() < mutationRate) {
        child = mutate(child, startStop, endStop);
      }
      
      newPopulation.push(child);
    }
    
    population = newPopulation;
  }
  
  // Return best individual
  const distances = population.map(individual => calculateRouteDistance(individual));
  const bestIndex = distances.indexOf(Math.min(...distances));
  return population[bestIndex];
};

// Tournament selection for genetic algorithm
const tournamentSelection = (population: Stop[][], fitness: number[]): Stop[] => {
  const tournamentSize = 3;
  let best = Math.floor(Math.random() * population.length);
  
  for (let i = 1; i < tournamentSize; i++) {
    const competitor = Math.floor(Math.random() * population.length);
    if (fitness[competitor] > fitness[best]) {
      best = competitor;
    }
  }
  
  return population[best];
};

// Order crossover for genetic algorithm
const orderCrossover = (parent1: Stop[], parent2: Stop[], startStop?: Stop, endStop?: Stop): Stop[] => {
  const size = parent1.length;
  const start = Math.floor(Math.random() * size);
  const end = Math.floor(Math.random() * size);
  const [crossStart, crossEnd] = start < end ? [start, end] : [end, start];
  
  const child: (Stop | null)[] = new Array(size).fill(null);
  
  // Copy segment from parent1
  for (let i = crossStart; i <= crossEnd; i++) {
    child[i] = parent1[i];
  }
  
  // Fill remaining positions from parent2
  let currentPos = 0;
  for (let i = 0; i < size; i++) {
    if (!child.includes(parent2[i])) {
      while (child[currentPos] !== null) {
        currentPos++;
      }
      child[currentPos] = parent2[i];
    }
  }
  
  return child as Stop[];
};

// Mutation for genetic algorithm
const mutate = (individual: Stop[], startStop?: Stop, endStop?: Stop): Stop[] => {
  const mutated = [...individual];
  
  // Determine mutable range (exclude start and end if fixed)
  let start = 0;
  let end = mutated.length - 1;
  
  if (startStop && mutated[0] === startStop) start = 1;
  if (endStop && mutated[mutated.length - 1] === endStop) end = mutated.length - 2;
  
  if (end > start) {
    const i = start + Math.floor(Math.random() * (end - start + 1));
    const j = start + Math.floor(Math.random() * (end - start + 1));
    [mutated[i], mutated[j]] = [mutated[j], mutated[i]];
  }
  
  return mutated;
};

// Simulated Annealing Algorithm
export const simulatedAnnealingOptimization = (stops: Stop[], startStop?: Stop, endStop?: Stop): Stop[] => {
  if (stops.length <= 3) return stops;
  
  let current = [...stops];
  let best = [...current];
  let currentDistance = calculateRouteDistance(current);
  let bestDistance = currentDistance;
  
  const initialTemperature = 100;
  const coolingRate = 0.995;
  const minTemperature = 0.1;
  let temperature = initialTemperature;
  
  while (temperature > minTemperature) {
    // Generate neighbor by swapping two random stops
    const neighbor = [...current];
    
    // Determine swap range (exclude start and end if fixed)
    let start = 0;
    let end = neighbor.length - 1;
    
    if (startStop && neighbor[0] === startStop) start = 1;
    if (endStop && neighbor[neighbor.length - 1] === endStop) end = neighbor.length - 2;
    
    if (end > start) {
      const i = start + Math.floor(Math.random() * (end - start + 1));
      const j = start + Math.floor(Math.random() * (end - start + 1));
      [neighbor[i], neighbor[j]] = [neighbor[j], neighbor[i]];
    }
    
    const neighborDistance = calculateRouteDistance(neighbor);
    const deltaDistance = neighborDistance - currentDistance;
    
    // Accept or reject the neighbor
    if (deltaDistance < 0 || Math.random() < Math.exp(-deltaDistance / temperature)) {
      current = neighbor;
      currentDistance = neighborDistance;
      
      if (currentDistance < bestDistance) {
        best = [...current];
        bestDistance = currentDistance;
      }
    }
    
    temperature *= coolingRate;
  }
  
  return best;
};

// Main optimization function that routes to specific algorithms
export const optimizeRoute = (
  stops: Stop[], 
  method: 'google' | 'nearest_neighbor' | 'genetic' | 'simulated_annealing',
  startStop?: Stop,
  endStop?: Stop
): Stop[] => {
  switch (method) {
    case 'nearest_neighbor':
      return twoOptImprovement(nearestNeighborOptimization(stops, startStop));
    case 'genetic':
      return geneticAlgorithmOptimization(stops, startStop, endStop);
    case 'simulated_annealing':
      return simulatedAnnealingOptimization(stops, startStop, endStop);
    default:
      // For Google optimization, return stops as-is (will be handled by Google Directions API)
      return stops;
  }
};
