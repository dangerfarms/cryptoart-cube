import React, { useState } from 'react';
import { button, LevaPanel, useControls, useCreateStore } from 'leva';
import { CubeRenderer } from './CubeRenderer';
import { generateCubes } from '../../utils/cubeGeneration';
import { CubeMainStudio } from './CubeMainStudio';
import cryptoCubeMachine from '../../machines/cryptoCube/cryptoCubeMachine';
import { useActor } from '@xstate/react';

const colors = ['#ff003c', '#ff7b00', '#ffcd00', '#5ED723', '#1E63FF', '#ba0dbe'];
const initialCubeConfig = {
  colors,
  ...generateCubes(),
};

function CubeMain(props) {
  const {
    cubeData,
    cubeSecondary,
    cubeProperties = [null, null, null, null, null, null, null],
    freeze = false,
    disableZoom = false,
  } = props;

  const previewCube = !!cubeSecondary;

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
      previewCube,
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
        value: cubeProperties[3] || 0.9,
        min: 0,
        max: 1,
      },
      mainCubeSide: cubeProperties[0] || 10,
      thickness: {
        value: cubeProperties[1] || 0.01,
        min: -1,
        max: 1,
      },
      explosion: {
        value: cubeProperties[2] || 0.1,
        min: 0,
        max: 10,
      },
      subSquareOpacity: {
        value: cubeProperties[4] || 0.9,
        min: 0,
        max: 1,
      },
      cylinderThickness: {
        value: cubeProperties[5] || 0.1,
        min: 0,
        max: 1,
      },
      cylinderOpacity: {
        value: cubeProperties[5] || 0.8,
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
        cryptoCubeMachine.actionCreators.takeScreenShot();
      }),
      merge: button(() => {
        cryptoCubeMachine.actionCreators.mergeCubes();
      }),
    }),
    { store },
  );
  // console.log('data', data, set);
  console.log(_cubeData, cubeData, data);
  return (
    <>
      {process.env.REACT_APP_DEBUG_CUBE && !data.hideControls && (
        <LevaPanel key="panel" store={store} titleBar={true} />
      )}
      <CubeRenderer key={'renderer'} cubeData={_cubeData || cubeData} {...data} />
      <CubeMainStudio set={set} data={data} />
    </>
  );
}

const { mergeCubes, takeScreenShot } = cryptoCubeMachine.actionCreators;

export { CubeMain, CubeRenderer, mergeCubes, takeScreenShot };
