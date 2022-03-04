import { adjustedFragmentProperties, translateSizeToConfig } from './cubeGeneration';
import { CUBE_CONSTANTS } from '../../constants/constants';
import { createIntersectingCubeConfig } from '../../utils';

const subSquaresScale = CUBE_CONSTANTS.Defaults.subSquaresScale;
const mainCubeSide = CUBE_CONSTANTS.Defaults.mainCubeSide;
const thickness = CUBE_CONSTANTS.Defaults.thickness;
const explosion = CUBE_CONSTANTS.Defaults.explosion;
const subSquareOpacity = CUBE_CONSTANTS.Defaults.subSquareOpacity;
const cylinderThickness = CUBE_CONSTANTS.Defaults.cylinderThickness;
const cylinderOpacity = CUBE_CONSTANTS.Defaults.cylinderOpacity;
const displacementAnimationDistance = 0;
const displacementIncrementPerFrame = 0;

const defaultProps = {
  subSquaresScale,
  mainCubeSide,
  thickness,
  explosion,
  subSquareOpacity,
  cylinderThickness,
  cylinderOpacity,
  displacementAnimationDistance,
  displacementIncrementPerFrame,
};


export const didFaceOverlap =  (frag1, frag2) => {
  const tileLimits = [9, 16, 25, 36, 49, 64];
  if (frag1 && frag2)
    return [0,1,2,3,4,5].map(i => (frag1[i] + frag2[i] > tileLimits[i]) ? true : false)
  return [false, false, false, false, false, false]
};

export const getCombineDifference = (frag1, frag2) => {
  const combined = mergeCube(frag1, frag2);
  const difference = combined.squareCount.map((combinedFaceCount, i) => combinedFaceCount - frag1[i]);
  return difference
}

/**
 * Return a merged cube with information on whether an overlap occurred for each face.
 */
export const mergeCube = (frag1, frag2) => {
  const squareCount = [];
  const didFaceOverlap = [];
  const tileLimits = [9, 16, 25, 36, 49, 64];
  for (let i = 0; i < 6; i++) {
    squareCount[i] = frag1[i] + frag2[i];
    didFaceOverlap[i] = false;
    if (squareCount[i] > tileLimits[i]) {
      squareCount[i] = 2 * tileLimits[i] - squareCount[i];
      didFaceOverlap[i] = true;
    }
  }
  return {
    squareCount,
    didFaceOverlap,
  };
};

export const getFragmentProperties = (fragmentData) => {
  const { frag1SquareCount, isCombined, frag2SquareCount, is2Combined } = fragmentData;

  let frag1, frag2;
  if (frag1SquareCount) {
    const { colors, ...properties } = isCombined ? adjustedFragmentProperties(frag1SquareCount) : defaultProps;
    frag1 = {
      faces: translateSizeToConfig(frag1SquareCount),
      properties,
      colors: colors || CUBE_CONSTANTS.Defaults.colors,
    };
  } else {
    frag1 = {
      faces: translateSizeToConfig([9, 16, 25, 36, 49, 64]),
      properties: {
        ...defaultProps,
        displacementAnimationDistance: 1,
        displacementIncrementPerFrame: 0.1,
      },
      colors: ['#555', '#555', '#555', '#555', '#555', '#555'],
    };
  }

  if (frag2SquareCount !== null) {
    const { colors, ...props } = is2Combined ? adjustedFragmentProperties(frag2SquareCount) : {};
    const combineDifference = getCombineDifference(frag1SquareCount, frag2SquareCount);

    const updatedColors = (colors || CUBE_CONSTANTS.Defaults.colors)
      .map((color, i) => combineDifference[i] < 0 ? '#222' : color);

    frag2 = {
      faces: createIntersectingCubeConfig(frag1.faces, frag2SquareCount, combineDifference),
      properties: {
        mainCubeSideSecond: props.mainCubeSide,
        thicknessSecond: props.thickness,
        explosionSecond: props.explosion,
        subSquaresScaleSecond: props.subSquaresScale,
        subSquareOpacitySecond: props.subSquareOpacity,
        cylinderThicknessSecond: props.cylinderThickness,
        cylinderOpacitySecond: props.cylinderOpacity,
        displacementAnimationDistanceSecond: props.displacementAnimationDistance,
        displacementIncrementPerFrameSecond: props.displacementIncrementPerFrame,
      },
      colors: updatedColors,
    };
  } else {
    frag2 = {
      faces: null,
      properties: {
        mainCubeSideSecond: mainCubeSide,
        thicknessSecond: thickness,
        explosionSecond: explosion,
        subSquaresScaleSecond: subSquaresScale,
        subSquareOpacitySecond: subSquareOpacity,
        cylinderThicknessSecond: cylinderThickness,
        cylinderOpacitySecond: cylinderOpacity,
        displacementAnimationDistanceSecond: displacementAnimationDistance,
        displacementIncrementPerFrameSecond: displacementIncrementPerFrame,

      },
      colors: CUBE_CONSTANTS.Defaults.colors,
    };
  }

  return [frag1, frag2];
};

export const hasFullFace = squareCount => {
  if (squareCount === null)
    return false;
  const hasFace = (
    squareCount[0] === 9 ||
    squareCount[1] === 16 ||
    squareCount[2] === 25 ||
    squareCount[3] === 36 ||
    squareCount[4] === 49 ||
    squareCount[5] === 64
  );
  return hasFace;
};