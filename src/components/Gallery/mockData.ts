import type { ArtworkItem } from './types';

const baseItems: ArtworkItem[] = [
  {
    id: 1,
    title: 'Powder Horn',
    artist: 'American',
    date: '1794',
    imageUrl:
      'https://images.metmuseum.org/CRDImages/aa/mobile-large/37.131.29_001Sept2014.jpg',
  },
  {
    id: 2,
    title: 'Double moon flask',
    artist: 'Minton(s)',
    date: 'December 1873',
    imageUrl:
      'https://images.metmuseum.org/CRDImages/es/mobile-large/DP-16489-060.jpg',
  },
  {
    id: 3,
    title: 'Astrolabe made for Cardinal Bessarion (1403–1472)',
    artist: 'Regiomontanus',
    date: '1462',
    imageUrl:
      'https://images.metmuseum.org/CRDImages/cl/mobile-large/MEDCLOIS-1159-s1.jpg',
  },
  {
    id: 4,
    title: 'Wall Vase',
    artist: 'China',
    date: '18th century',
    imageUrl:
      'https://images.metmuseum.org/CRDImages/as/mobile-large/29_110_39.jpg',
  },
  {
    id: 5,
    title: 'Powder Horn',
    artist: 'American',
    date: '1794',
    imageUrl:
      'https://images.metmuseum.org/CRDImages/ci/mobile-large/1993.157.2_F.jpg',
  },
  {
    id: 6,
    title: 'Double moon flask',
    artist: 'Minton(s)',
    date: 'December 1873',
    imageUrl:
      'https://images.metmuseum.org/CRDImages/an/mobile-large/ss1985_192_4.jpg',
  },
  {
    id: 7,
    title: 'Astrolabe made for Cardinal Bessarion (1403–1472)',
    artist: 'Regiomontanus',
    date: '1462',
    imageUrl:
      'https://images.metmuseum.org/CRDImages/dp/mobile-large/DPB878859.jpg',
  },
  {
    id: 8,
    title: 'Wall Vase',
    artist: 'China',
    date: '18th century',
    imageUrl:
      'https://images.metmuseum.org/CRDImages/an/mobile-large/ME1983_535_15.jpg',
  },
];

export const mockItems: ArtworkItem[] = Array.from({ length: 50 }, (_, i) => {
  const base = baseItems[i % baseItems.length];
  const copyIndex = Math.floor(i / baseItems.length) + 1;
  return {
    ...base,
    id: i + 1,
    title: `${base.title}${copyIndex > 1 ? ` #${copyIndex}` : ''}`,
  };
});