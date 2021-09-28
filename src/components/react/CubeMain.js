import React, { useState } from 'react';
import { button, LevaPanel, useControls, useCreateStore } from 'leva';
import { CubeRenderer } from './CubeRenderer';
import { createIntersectingCubeConfig } from '../../utils/cubeGeneration';
import { CubeMainStudio } from './CubeMainStudio';
import cryptoCubeMachine from '../../machines/cryptoCube/cryptoCubeMachine';
import { useActor } from '@xstate/react';
import { actions } from 'xstate';

const colors = ['#ff003c', '#ff7b00', '#ffcd00', '#5ED723', '#1E63FF', '#ba0dbe'];

/**
 * Convert an array containing the number of squares per face into a random configuration.
 * @param cube
 */
function translateSizeToConfig(cube) {
  const maxSquaresPerFace = [9, 16, 25, 36, 49, 64];
  return cube.map((square, i) => {
    const squares = [
      ...new Array(square).fill(1),
      ...new Array(maxSquaresPerFace[i] - square).fill(0),
    ];
    return [...squares].sort(() => 0.5 - Math.random());
  });
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const generateRandomFaces = () => {
  const cube = [
    getRandomInt(10),
    getRandomInt(17),
    getRandomInt(26),
    getRandomInt(37),
    getRandomInt(50),
    getRandomInt(65),
  ];
  return translateSizeToConfig(cube);
};

const generateCubes = () => {
  const cube1 = generateRandomFaces();
  const maxSquaresPerFace = [9, 16, 25, 36, 49, 64];
  const cube2Squares = cube1.map((face, i) =>
    getRandomInt(maxSquaresPerFace[i] + 1 - face.reduce((a, b) => a + b, 0)),
  );

  const cube2Config = createIntersectingCubeConfig(cube1, cube2Squares);

  const cube3config = cube1.map((face, faceId) =>
    face.map((value, subFaceId) => {
      return value || cube2Config[faceId][subFaceId];
    }),
  );

  return {
    faces: cube1,
    facesSecond: cube2Config,
    facesNew: cube3config,
  };
};

const initialCubeConfig = {
  colors,
  ...generateCubes(),
};

function CubeMain(props) {
  const { cubeData, freeze = false, disableZoom = false } = props;
  const [_cubeData, setCubeData] = useState(initialCubeConfig);

  const [state, send] = useActor(cryptoCubeMachine.service);
  const store = useCreateStore();
  const [data, set] = useControls(
    () => ({
      lightningRays: true,
      positionCube1: { x: -10, y: -10, z: -10 },
      positionCube2: { x: 10, y: 10, z: 10 },
      displacementAnimationDistance: {
        value: 1,
        min: 0,
        max: 10,
      },
      displacementIncrementPerFrame: {
        value: 0.01,
        min: 0,
        max: 1,
      },
      toggleTwoCubes: false,
      previewCube: true,
      previewCubeWireframe: false,
      previewCubeUniqueColor: true,
      previewCubeBloomAnimation: false,
      previewCubeAnimationSpeed: {
        value: 10,
        min: 0,
        max: 20,
      },
      previewCubeOpacity: {
        value: 0.9,
        min: 0,
        max: 1,
      },
      hideControls: false,
      freeze,
      disableZoom,
      backGroundColor: '#202426',
      subSquaresScale: {
        value: 0.9,
        min: 0,
        max: 1,
      },
      mainCubeSide: 10,
      thickness: {
        value: 0.01,
        min: -1,
        max: 1,
      },
      explosion: {
        value: 0.1,
        min: 0,
        max: 10,
      },
      subSquareOpacity: {
        value: 0.9,
        min: 0,
        max: 1,
      },
      cylinderThickness: {
        value: 0.1,
        min: 0,
        max: 1,
      },
      cylinderOpacity: {
        value: 0.8,
        min: 0,
        max: 1,
      },
      color0: {
        value: colors[0],
        onChange: (color) => {
          colors[0] = color;
          setCubeData({
            colors,
            faces: _cubeData.faces,
            facesNew: _cubeData.facesNew,
            facesSecond: _cubeData.facesSecond,
          });
        },
      },
      color1: {
        value: colors[1],
        onChange: (color) => {
          colors[1] = color;
          setCubeData({
            colors,
            faces: _cubeData.faces,
            facesNew: _cubeData.facesNew,
            facesSecond: _cubeData.facesSecond,
          });
        },
      },
      color2: {
        value: colors[2],
        onChange: (color) => {
          colors[2] = color;
          setCubeData({
            colors,
            faces: _cubeData.faces,
            facesNew: _cubeData.facesNew,
            facesSecond: _cubeData.facesSecond,
          });
        },
      },
      color3: {
        value: colors[3],
        onChange: (color) => {
          colors[3] = color;
          setCubeData({
            colors,
            faces: _cubeData.faces,
            facesNew: _cubeData.facesNew,
            facesSecond: _cubeData.facesSecond,
          });
        },
      },
      color4: {
        value: colors[4],
        onChange: (color) => {
          colors[4] = color;
          setCubeData({
            colors,
            faces: _cubeData.faces,
            facesNew: _cubeData.facesNew,
            facesSecond: _cubeData.facesSecond,
          });
        },
      },
      color5: {
        value: colors[5],
        onChange: (color) => {
          colors[5] = color;
          setCubeData({
            colors,
            faces: _cubeData.faces,
            facesNew: _cubeData.facesNew,
            facesSecond: _cubeData.facesSecond,
          });
        },
      },
      regenerate: button(() => {
        setCubeData({
          colors,

          ...generateCubes(),
        });
      }),
      takeScreenShot: button(() => {
          cryptoCubeMachine.actionCreators.takeScreenShot()

      }),
      merge: button(() => {
        cryptoCubeMachine.actionCreators.mergeCubes();
      }),
    }),
    { store },
  );
  // console.log('data', data, set);
  return (
    <>
      {process.env.REACT_APP_DEBUG_CUBE && !data.hideControls && (
        <LevaPanel key="panel" store={store} titleBar={true} />
      )}
      <CubeRenderer
        key={'renderer'}
        cubeData={_cubeData || cubeData}
        {...data}
      />
      <CubeMainStudio set={set} data={data} />
    </>
  );
}

const { mergeCubes, takeScreenShot } = cryptoCubeMachine.actionCreators

export { CubeMain, CubeRenderer, mergeCubes, takeScreenShot };
