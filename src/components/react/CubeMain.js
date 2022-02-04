import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { button, LevaPanel, useControls, useCreateStore } from 'leva';
import { CubeRenderer } from './CubeRenderer';
import { adjustedFragmentProperties, generateCubes, translateSizeToConfig } from '../../utils/cubeGeneration';
import { CubeMainStudio } from './CubeMainStudio';
import cryptoCubeMachine from '../../machines/cryptoCube/cryptoCubeMachine';
import { CUBE_CONSTANTS } from '../../constants/constants';

const initialCubeConfig = {
  colors: CUBE_CONSTANTS.Defaults.colors,
  ...generateCubes(),
};

CubeMain.propTypes = {
  colors: PropTypes.array,
  // TODO: New
  frag1Config: PropTypes.arrayOf(PropTypes.number),
  isCombined: PropTypes.bool,
  frag2Config: PropTypes.arrayOf(PropTypes.number),
  is2Combined: PropTypes.bool,
  // TODO: remove if square count works
  // faces: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  // facesSecond: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  facesMergedCube: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  facesPreview: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  freeze: PropTypes.bool,
  disableZoom: PropTypes.bool,
  hideBackground: PropTypes.bool,
};

const subSquaresScale = CUBE_CONSTANTS.Defaults.subSquaresScale;
const mainCubeSide = CUBE_CONSTANTS.Defaults.mainCubeSide;
const thickness = CUBE_CONSTANTS.Defaults.thickness;
const explosion = CUBE_CONSTANTS.Defaults.explosion;
const subSquareOpacity = CUBE_CONSTANTS.Defaults.subSquareOpacity;
const cylinderThickness = CUBE_CONSTANTS.Defaults.cylinderThickness;
const cylinderOpacity = CUBE_CONSTANTS.Defaults.cylinderOpacity;

function CubeMain(props) {
  const {
    // TODO: new value that holds square count
    frag1Config = null,
    frag2Config = null,
    isCombined = false,
    is2Combined = false,
    // TODO: Remove if not needed
    // faces = CUBE_CONSTANTS.Defaults.faces,
    // facesSecond,
    facesMergedCube,
    facesPreview,
    previewCube = CUBE_CONSTANTS.Defaults.previewCube,
    freeze = CUBE_CONSTANTS.Defaults.freeze,
    hideBackground = true,
    disableZoom = CUBE_CONSTANTS.Defaults.disableZoom,

    displacementAnimationDistance = 0,
    lightningRays = CUBE_CONSTANTS.Defaults.lightningRays,
    orbitControls = CUBE_CONSTANTS.Defaults.orbitControls,
  } = props;

  // TODO: NEW CODE – lift up?
  let frag1faces, frag1properties, colors;
  if (frag1Config === null) {
    frag1faces = translateSizeToConfig([9, 16, 25, 36, 49, 64]);
    frag1properties = {
      displacementAnimationDistance: 1,
      displacementIncrementPerFrame: 0.1,
    };
    colors = ['#555', '#555', '#555', '#555', '#555', '#555'];
  } else {
    frag1faces = translateSizeToConfig(frag1Config);
    frag1properties = isCombined ? adjustedFragmentProperties(frag1Config) : {};
    colors = frag1properties.colors || CUBE_CONSTANTS.Defaults.colors;
  }

  let facesSecond = null,
    frag2properties,
    frag2colors;
  if (frag2Config !== null) {
    facesSecond = translateSizeToConfig(frag2Config);
    frag2properties = is2Combined ? adjustedFragmentProperties(frag2Config) : {};
    frag2colors = frag2properties.colors || CUBE_CONSTANTS.Defaults.colors;
  } else {
    frag2properties = frag1properties;
    frag2colors = colors;
  }
  // TODO: END NEW CODE

  // const [_cubeData, setCubeData] = useState(initialCubeConfig);
  const [_cubeData, setCubeData] = useState({
    colors,
    frag2colors,
    faces: frag1faces,
    previewCube,
    facesMergedCube,
    facesPreview,
    facesSecond,
  });

  useEffect(() => {
    setCubeData({
      colors,
      frag2colors,
      faces: frag1faces,
      facesSecond,
      facesMergedCube,
      facesPreview,
      previewCube,
    });
  }, [facesMergedCube, facesPreview, previewCube]);

  // const [state, send] = useActor(cryptoCubeMachine.service);
  const store = useCreateStore();
  const [data, set] = useControls(
    () => ({
      lightningRays: lightningRays,
      positionCamera: { x: 0, y: 0, z: 25 },
      positionCube1: { x: 0, y: 0, z: 0 },
      positionCube2: { x: 20, y: 20, z: 20 },
      displacementAnimationDistance: {
        value: frag1properties.displacementAnimationDistance || displacementAnimationDistance,
        min: 0,
        max: 10,
      },
      displacementIncrementPerFrame: {
        value: frag1properties.displacementIncrementPerFrame || 0,
        min: 0,
        max: 1,
      },
      hideBackground,
      toggleMergedCube: CUBE_CONSTANTS.Defaults.toggleMergedCube,
      previewCube: previewCube,
      previewCubeWireframe: CUBE_CONSTANTS.Defaults.previewCubeWireframe,
      previewCubeUniqueColor: CUBE_CONSTANTS.Defaults.previewCubeUniqueColor,
      previewCubeBloomAnimation: CUBE_CONSTANTS.Defaults.previewCubeBloomAnimation,
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
      hideControls: true,
      freeze,
      disableZoom,
      backGroundColor: '#202426',
      subSquaresScale: {
        value: subSquaresScale,
        min: 0,
        max: 1,
      },
      mainCubeSide: frag1properties.mainCubeSide || mainCubeSide,
      thickness: {
        value: frag1properties.thickness || thickness,
        min: -1,
        max: 1,
      },
      explosion: {
        value: frag1properties.explosion || explosion,
        min: -10,
        max: 10,
      },
      subSquareOpacity: {
        value: frag1properties.subSquareOpacity || subSquareOpacity,
        min: 0,
        max: 1,
      },
      cylinderThickness: {
        value: frag1properties.cylinderThickness || cylinderThickness,
        min: 0,
        max: 1,
      },
      cylinderOpacity: {
        value: frag1properties.cylinderOpacity || cylinderOpacity,
        min: 0,
        max: 1,
      },
      subSquaresScaleSecond: {
        value: frag2properties.subSquaresScale || subSquaresScale,
        min: 0,
        max: 1,
      },
      mainCubeSideSecond: frag2properties.mainCubeSide || mainCubeSide,
      thicknessSecond: {
        value: frag2properties.thickness || thickness,
        min: -1,
        max: 1,
      },
      explosionSecond: {
        value: frag2properties.explosion || explosion,
        min: -10,
        max: 10,
      },
      subSquareOpacitySecond: {
        value: frag2properties.subSquareOpacity || subSquareOpacity,
        min: 0,
        max: 1,
      },
      cylinderThicknessSecond: {
        value: frag2properties.cylinderThickness || cylinderThickness,
        min: 0,
        max: 1,
      },
      cylinderOpacitySecond: {
        value: frag2properties.cylinderOpacity || cylinderOpacity,
        min: 0,
        max: 1,
      },
      orbitControls: orbitControls,
      color0: {
        value: colors[0],
        onChange: (color) => {
          colors[0] = color;
          setCubeData({
            colors,
            frag2colors,
            faces: _cubeData.faces,
            facesMergedCube: _cubeData.facesMergedCube,
            facesSecond: _cubeData.facesSecond,
            facesPreview: _cubeData.facesPreview,
          });
        },
      },
      color1: {
        value: colors[1],
        onChange: (color) => {
          colors[1] = color;
          setCubeData({
            colors,
            frag2colors,
            faces: _cubeData.faces,
            facesMergedCube: _cubeData.facesMergedCube,
            facesSecond: _cubeData.facesSecond,
            facesPreview: _cubeData.facesPreview,
          });
        },
      },
      color2: {
        value: colors[2],
        onChange: (color) => {
          colors[2] = color;
          setCubeData({
            colors,
            frag2colors,
            faces: _cubeData.faces,
            facesMergedCube: _cubeData.facesMergedCube,
            facesSecond: _cubeData.facesSecond,
            facesPreview: _cubeData.facesPreview,
          });
        },
      },
      color3: {
        value: colors[3],
        onChange: (color) => {
          colors[3] = color;
          setCubeData({
            colors,
            frag2colors,
            faces: _cubeData.faces,
            facesMergedCube: _cubeData.facesMergedCube,
            facesSecond: _cubeData.facesSecond,
            facesPreview: _cubeData.facesPreview,
          });
        },
      },
      color4: {
        value: colors[4],
        onChange: (color) => {
          colors[4] = color;
          setCubeData({
            colors, frag2colors,
            faces: _cubeData.faces,
            facesMergedCube: _cubeData.facesMergedCube,
            facesSecond: _cubeData.facesSecond,
            facesPreview: _cubeData.facesPreview,
          });
        },
      },
      color5: {
        value: colors[5],
        onChange: (color) => {
          colors[5] = color;
          setCubeData({
            colors,
            frag2colors,
            faces: _cubeData.faces,
            facesMergedCube: _cubeData.facesMergedCube,
            facesSecond: _cubeData.facesSecond,
            facesPreview: _cubeData.facesPreview,
          });
        },
      },
      colorSecond0: {
        value: frag2colors[0],
        onChange: (color) => {
          frag2colors[0] = color;
          setCubeData({
            colors,
            frag2colors,
            faces: _cubeData.faces,
            facesMergedCube: _cubeData.facesMergedCube,
            facesSecond: _cubeData.facesSecond,
            facesPreview: _cubeData.facesPreview,
          });
        },
      },
      colorSecond1: {
        value: frag2colors[1],
        onChange: (color) => {
          frag2colors[1] = color;
          setCubeData({
            colors,
            frag2colors,
            faces: _cubeData.faces,
            facesMergedCube: _cubeData.facesMergedCube,
            facesSecond: _cubeData.facesSecond,
            facesPreview: _cubeData.facesPreview,
          });
        },
      },
      colorSecond2: {
        value: frag2colors[2],
        onChange: (color) => {
          frag2colors[2] = color;
          setCubeData({
            colors,
            frag2colors,
            faces: _cubeData.faces,
            facesMergedCube: _cubeData.facesMergedCube,
            facesSecond: _cubeData.facesSecond,
            facesPreview: _cubeData.facesPreview,
          });
        },
      },
      colorSecond3: {
        value: frag2colors[3],
        onChange: (color) => {
          frag2colors[3] = color;
          setCubeData({
            colors,
            frag2colors,
            faces: _cubeData.faces,
            facesMergedCube: _cubeData.facesMergedCube,
            facesSecond: _cubeData.facesSecond,
            facesPreview: _cubeData.facesPreview,
          });
        },
      },
      colorSecond4: {
        value: frag2colors[4],
        onChange: (color) => {
          frag2colors[4] = color;
          setCubeData({
            colors,
            frag2colors,
            faces: _cubeData.faces,
            facesMergedCube: _cubeData.facesMergedCube,
            facesSecond: _cubeData.facesSecond,
            facesPreview: _cubeData.facesPreview,
          });
        },
      },
      colorSecond5: {
        value: frag2colors[5],
        onChange: (color) => {
          frag2colors[5] = color;
          setCubeData({
            colors,
            frag2colors,
            faces: _cubeData.faces,
            facesMergedCube: _cubeData.facesMergedCube,
            facesSecond: _cubeData.facesSecond,
            facesPreview: _cubeData.facesPreview,
          });
        },
      },
      regenerate: button(() => {
        setCubeData({
          colors,
          frag2colors,
          ...generateCubes(),
        });
      }),
      regenerateFilled: button(() => {
        setCubeData({
          colors,
          frag2colors,
          ...generateCubes(true),
        });
      }),
      takeScreenShot: button(() => {
        cryptoCubeMachine.actionCreators.takeScreenShot();
      }),
      saveGLTF: button(() => {
        cryptoCubeMachine.actionCreators.saveGLTF();
      }),
      mergeCubesIntro: button(() => {
        cryptoCubeMachine.actionCreators.mergeCubesIntro(() => {
          alert('completed intro');
        });
      }),
      mergeCubesConclusion: button(() => {
        cryptoCubeMachine.actionCreators.mergeCubesConclusion(() => {
          alert('completed conclusion');
        });
      }),
    }),
    { store },
  );
  // console.log('data', data, set);
  // console.log('data', _cubeData, data);

  // _cubeData has a generated data
  // cubeData is the data from html - Variable cube : true ?
  // data has all props except cubeConfig


  const [showPanel, setShowPanel] = useState(process.env.REACT_APP_DEBUG_CUBE)
  document.addEventListener('keyup', e => {
    if (e.repeat) { return }
    if (e.key === 'x') {
      cryptoCubeMachine.actionCreators.saveGLTF();
      e.preventDefault();
    }
    if (process.env.REACT_APP_DEBUG_CUBE) {
      if (e.key === 'h') {
        setShowPanel(!showPanel);
      }
    }
  });

  return (
    <>
      {showPanel && <LevaPanel key="panel" store={store} titleBar={true}/>}
      <CubeRenderer key={'renderer'} cubeData={_cubeData || props} {...data} />
      <CubeMainStudio set={set} data={data}/>
    </>
  );
}

const { mergeCubesIntro, mergeCubesConclusion, takeScreenShot } = cryptoCubeMachine.actionCreators;

export { CubeMain, CubeRenderer, mergeCubesIntro, mergeCubesConclusion, takeScreenShot };
