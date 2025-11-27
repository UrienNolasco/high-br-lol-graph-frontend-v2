import { Champion } from '@/types';

export const CHAMPIONS: Champion[] = [
  { id: '1', name: 'Aatrox', role: 'Top', tier: 'S', winRate: 51.2, pickRate: 12.5, banRate: 15.4, matches: 4500, image: 'https://picsum.photos/seed/aatrox/200/200' },
  { id: '2', name: 'Ahri', role: 'Mid', tier: 'A', winRate: 49.8, pickRate: 8.2, banRate: 5.1, matches: 3200, image: 'https://picsum.photos/seed/ahri/200/200' },
  { id: '3', name: 'Lee Sin', role: 'Jungle', tier: 'S+', winRate: 48.5, pickRate: 22.1, banRate: 18.0, matches: 8000, image: 'https://picsum.photos/seed/leesin/200/200' },
  { id: '4', name: 'Thresh', role: 'Support', tier: 'A', winRate: 50.4, pickRate: 10.5, banRate: 2.1, matches: 3800, image: 'https://picsum.photos/seed/thresh/200/200' },
  { id: '5', name: 'Kai\'Sa', role: 'Bot', tier: 'S', winRate: 52.1, pickRate: 25.4, banRate: 12.0, matches: 9100, image: 'https://picsum.photos/seed/kaisa/200/200' },
  { id: '6', name: 'Darius', role: 'Top', tier: 'A', winRate: 50.8, pickRate: 7.5, banRate: 25.0, matches: 2900, image: 'https://picsum.photos/seed/darius/200/200' },
  { id: '7', name: 'Orianna', role: 'Mid', tier: 'S', winRate: 52.4, pickRate: 9.1, banRate: 4.5, matches: 3400, image: 'https://picsum.photos/seed/orianna/200/200' },
  { id: '8', name: 'Jinx', role: 'Bot', tier: 'B', winRate: 49.2, pickRate: 14.5, banRate: 1.2, matches: 5000, image: 'https://picsum.photos/seed/jinx/200/200' },
  { id: '9', name: 'Nautilus', role: 'Support', tier: 'S', winRate: 51.5, pickRate: 11.2, banRate: 8.5, matches: 4100, image: 'https://picsum.photos/seed/nautilus/200/200' },
  { id: '10', name: 'Viego', role: 'Jungle', tier: 'A', winRate: 49.9, pickRate: 11.8, banRate: 6.7, matches: 4200, image: 'https://picsum.photos/seed/viego/200/200' },
  { id: '11', name: 'Camille', role: 'Top', tier: 'S+', winRate: 53.2, pickRate: 6.8, banRate: 11.2, matches: 2100, image: 'https://picsum.photos/seed/camille/200/200' },
  { id: '12', name: 'Sylas', role: 'Mid', tier: 'A', winRate: 50.1, pickRate: 10.2, banRate: 14.2, matches: 3600, image: 'https://picsum.photos/seed/sylas/200/200' },
];

export const CHART_DATA_1 = [
  { name: '15.18', value: 48 },
  { name: '15.19', value: 50 },
  { name: '15.20', value: 54.2 },
];

export const CHART_DATA_2 = [
  { name: 'Aatrox', value: 65, fill: '#ef4444' },
  { name: 'Renekton', value: 35, fill: '#3b82f6' },
];

export const CHART_DATA_BAN = [
  { name: 'Zed', value: 45 },
  { name: 'Yasuo', value: 38 },
  { name: 'Yone', value: 32 },
  { name: 'Blitz', value: 28 },
];

