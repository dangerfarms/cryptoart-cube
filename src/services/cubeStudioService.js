import { getProject, types } from '@theatre/core';
import mergeAnimation from '../constants/animations/merge13102021.json';

if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_STUDIO === 'true') {
  import('@theatre/studio').then(({ default: studio }) => {
    studio.initialize();
    studio.ui.hide();
  });
}

console.log(mergeAnimation, process.env.NODE_ENV);
const project = getProject('CryptoCube', { state: mergeAnimation });
const sheet = project.sheet('Scene', 'default');

const obj = sheet.object('testObject', {
  cylinderOpacity: types.number(0.8, {
    nudgeMultiplier: 0.1,
    range: [0, 1],
  }),
  orbitControls: types.number(1, {
    nudgeMultiplier: 1,
    range: [0, 1],
  }),
  positionCamera: { x: 0, y: 0, z: 25 },
  positionCube1: { x: -10, y: -10, z: -10 },
  positionCube2: { x: 10, y: 10, z: 10 },
  displacementAnimationDistance: types.number(1, {
    range: [0, 10],
  }),
  displacementIncrementPerFrame: types.number(0.01, {
    range: [0, 1],
  }),
  // testValues: [0, 1, 1],
});

const subscribeToChangesAndReturnUnsubscriber = (set) => {
  return obj.onValuesChange((newValues) => {
    // console.log('newValues', newValues);
    // console.log(sheet.sequence.position);
    set(newValues);
  });
};

const playScene = (callback) => {
  return sheet.sequence.play();
};

// const data = useControls(
//   {
//     lightningRays: true,
//     positionCube1: [-10, -10, -10],
//     positionCube2: [10, 10, 10],
//     displacementAnimationDistance: {
//       value: 1,
//       min: 0,
//       max: 10,
//     },
//     displacementIncrementPerFrame: {
//       value: 0.01,
//       min: 0,
//       max: 1,
//     },
//     toggleTwoCubes: false,
//     previewCube: true,
//     previewCubeWireframe: false,
//     previewCubeUniqueColor: true,
//     previewCubeBloomAnimation: false,
//     previewCubeAnimationSpeed: {
//       value: 10,
//       min: 0,
//       max: 20,
//     },
//     previewCubeOpacity: {
//       value: 0.9,
//       min: 0,
//       max: 1,
//     },
//     hideControls: false,
//     freeze,
//     disableZoom,
//     backGroundColor: '#202426',
//     subSquaresScale: {
//       value: 0.9,
//       min: 0,
//       max: 1,
//     },
//     mainCubeSide: 10,
//     thickness: {
//       value: 0.01,
//       min: -1,
//       max: 1,
//     },
//     explosion: {
//       value: 0.1,
//       min: 0,
//       max: 10,
//     },
//     subSquareOpacity: {
//       value: 0.9,
//       min: 0,
//       max: 1,
//     },
//     cylinderThickness: {
//       value: 0.1,
//       min: 0,
//       max: 1,
//     },
//     cylinderOpacity: {
//       value: 0.8,
//       min: 0,
//       max: 1,
//     },
//     color0: {
//       value: colors[0],
//       onChange: (color) => {
//         colors[0] = color;
//         setCubeData({
//           colors,
//           faces: _cubeData.faces,
//           facesNew: _cubeData.facesNew,
//           facesSecond: _cubeData.facesSecond,
//         });
//       },
//     },
//     color1: {
//       value: colors[1],
//       onChange: (color) => {
//         colors[1] = color;
//         setCubeData({
//           colors,
//           faces: _cubeData.faces,
//           facesNew: _cubeData.facesNew,
//           facesSecond: _cubeData.facesSecond,
//         });
//       },
//     },
//     color2: {
//       value: colors[2],
//       onChange: (color) => {
//         colors[2] = color;
//         setCubeData({
//           colors,
//           faces: _cubeData.faces,
//           facesNew: _cubeData.facesNew,
//           facesSecond: _cubeData.facesSecond,
//         });
//       },
//     },
//     color3: {
//       value: colors[3],
//       onChange: (color) => {
//         colors[3] = color;
//         setCubeData({
//           colors,
//           faces: _cubeData.faces,
//           facesNew: _cubeData.facesNew,
//           facesSecond: _cubeData.facesSecond,
//         });
//       },
//     },
//     color4: {
//       value: colors[4],
//       onChange: (color) => {
//         colors[4] = color;
//         setCubeData({
//           colors,
//           faces: _cubeData.faces,
//           facesNew: _cubeData.facesNew,
//           facesSecond: _cubeData.facesSecond,
//         });
//       },
//     },
//     color5: {
//       value: colors[5],
//       onChange: (color) => {
//         colors[5] = color;
//         setCubeData({
//           colors,
//           faces: _cubeData.faces,
//           facesNew: _cubeData.facesNew,
//           facesSecond: _cubeData.facesSecond,
//         });
//       },
//     },
//     regenerate: button(() => {
//       setCubeData({
//         colors,
//
//         ...generateCubes(),
//       });
//     }),
//     takeScreenShot: button(() => {
//       if (screenShotFunction) {
//         console.log(screenShotFunction());
//       }
//     }),
//   },
//   { store },
// );

export const cubeStudioService = {
  subscribeToChangesAndReturnUnsubscriber,
  playScene,
};
