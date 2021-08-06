import React, { useState } from 'react';
import { button, LevaPanel, useControls, useCreateStore } from 'leva';
import { CubeRenderer } from './CubeRenderer';

const mockCubeData = {
  colors: ['#ff003c', '#ff7b00', '#ffcd00', '#5ed723', '#1e63ff', '#ff003c'],
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
};

const generateRandomFaces = () => {
  const faces = [];
  for (let i = 3; i <= 8; i++) {
    const newArray = [];
    for (let j = 0; j < i * i; j++) {
      newArray.push(Math.random() > 0.5 ? 1 : 0);
    }
    faces.push(newArray);
  }
  return faces;
};

const colors = ['#ff003c', '#ff7b00', '#ffcd00', '#5ED723', '#1E63FF', '#FF003c'];

export function CubeMain(props) {
  const { cubeData } = props;
  const [_cubeData, setCubeData] = useState(mockCubeData);
  const store = useCreateStore();
  const data = useControls(
    {
      backGroundColor: '#202426',
      subSquaresScale: {
        value: 0.8,
        min: 0,
        max: 1,
      },
      mainCubeSide: 10,
      thickness: {
        value: 0.02,
        min: 0.001,
        max: 1,
      },
      explosion: {
        value: 0.1,
        min: 0,
        max: 10,
      },
      color0: {
        value: colors[0],
        onChange: (color) => {
          colors[0] = color;
          setCubeData({ colors, faces: _cubeData.faces });
        },
      },
      color1: {
        value: colors[1],
        onChange: (color) => {
          colors[1] = color;
          setCubeData({ colors, faces: _cubeData.faces });
        },
      },
      color2: {
        value: colors[2],
        onChange: (color) => {
          colors[2] = color;
          setCubeData({ colors, faces: _cubeData.faces });
        },
      },
      color3: {
        value: colors[3],
        onChange: (color) => {
          colors[3] = color;
          setCubeData({ colors, faces: _cubeData.faces });
        },
      },
      color4: {
        value: colors[4],
        onChange: (color) => {
          colors[4] = color;
          setCubeData({ colors, faces: _cubeData.faces });
        },
      },
      color5: {
        value: colors[5],
        onChange: (color) => {
          colors[5] = color;
          setCubeData({ colors, faces: _cubeData.faces });
        },
      },
      regenerate: button(() => {
        setCubeData({
          colors,
          faces: generateRandomFaces(),
        });
      }),
    },
    { store },
  );
  return (
    <>
      {process.env.REACT_APP_DEBUG_CUBE && <LevaPanel store={store} titleBar={true} />}
      <CubeRenderer cubeData={_cubeData || cubeData} {...data} />
    </>
  );
}
