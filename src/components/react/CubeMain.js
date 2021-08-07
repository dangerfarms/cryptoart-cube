import React, { useState } from 'react';
import { button, LevaPanel, useControls, useCreateStore } from 'leva';
import { CubeRenderer } from './CubeRenderer';

const colors = ['#ff003c', '#ff7b00', '#ffcd00', '#5ED723', '#1E63FF', '#ba0dbe'];

/**
 * Convert an array containing the number of squares per face into a random configuration.
 * @param cube
 */
function translateSizeToConfig(cube) {
  const maxSquaresPerFace = [9, 16, 25, 36, 49, 64]
  return cube.map((square, i) => {
    const squares = [
      ...new Array(square).fill(1),
      ...new Array(maxSquaresPerFace[i]-square).fill(0),
    ]
    return [...squares].sort(() => 0.5 - Math.random());
  })
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
  ]
  return translateSizeToConfig(cube);
};


export function CubeMain(props) {
  const { cubeData } = props;
  const [_cubeData, setCubeData] = useState({
    colors,
    faces: generateRandomFaces(),
  });
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
