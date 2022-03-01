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
}

export const getFragmentProperties = (fragmentData) => {
  const { frag1SquareCount, isCombined, frag2SquareCount, is2Combined } = fragmentData;

  let frag1, frag2;
  if (frag1SquareCount) {
    const {colors, ...properties } = isCombined ? adjustedFragmentProperties(frag1SquareCount) : defaultProps;
    frag1 = {
      faces: translateSizeToConfig(frag1SquareCount),
      properties,
      colors: colors || CUBE_CONSTANTS.Defaults.colors
    }
  } else {
    frag1 = {
      faces: translateSizeToConfig([9, 16, 25, 36, 49, 64]),
      properties: {
        ...defaultProps,
        displacementAnimationDistance: 1,
        displacementIncrementPerFrame: 0.1,
      },
      colors: ['#555', '#555', '#555', '#555', '#555', '#555']
    }
  }

  if (frag2SquareCount !== null) {
    const {colors, ...props} = is2Combined ? adjustedFragmentProperties(frag2SquareCount) : {};
    frag2 = {
      faces: createIntersectingCubeConfig(frag1.faces, frag2SquareCount),
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
      colors: colors || CUBE_CONSTANTS.Defaults.colors,
    }
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
      colors: CUBE_CONSTANTS.Defaults.colors
    }
  }

  return [frag1, frag2];
}

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