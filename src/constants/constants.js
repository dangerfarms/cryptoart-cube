const Mouse = {};

const Defaults = {
  faces: [
    [0, 1, 1, 1, 0, 1, 1, 0, 0],
    [1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0],
    [1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1],
    [
      1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0,
      1, 0, 0, 1, 1,
    ],
    [
      1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1,
      0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1,
    ],
    [
      1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1,
      1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1,
      1, 0,
    ],
  ],
  colors: ['#ff003c', '#ff7b00', '#ffcd00', '#5ED723', '#1E63FF', '#ba0dbe'],
  freeze: false,
  disableZoom: false,
  subSquaresScale: 0.9,
  mainCubeSide: 10,
  thickness: 0.01,
  explosion: 0.1,
  subSquareOpacity: 0.9,
  cylinderThickness: 0.1,
  cylinderOpacity: 0.8,
  lightningRays: false,
  toggleMergedCube: false,
  previewCube: false,
  previewCubeWireframe: false,
  previewCubeUniqueColor: true,
  previewCubeBloomAnimation: false,
};

export const CUBE_CONSTANTS = {
  Mouse,
  Defaults,
};
