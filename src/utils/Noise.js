import { makeNoise3D } from 'open-simplex-noise';

export const noise = makeNoise3D(Date.now()); // Using current date as seed
