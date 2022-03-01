import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { button, LevaPanel, useControls, useCreateStore } from 'leva';
import { CubeRenderer } from './CubeRenderer';
import { generateCubes } from './cubeGeneration';
import { CubeMainStudio } from './CubeMainStudio';
import cryptoCubeMachine from '../../machines/cryptoCube/cryptoCubeMachine';
import { CUBE_CONSTANTS } from '../../constants/constants';
import { getFragmentProperties, hasFullFace } from './utils';

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
  facesMergedCube: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
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
    // TODO: Remove
    facesMergedCube,
    // TODO: end
    previewCube = CUBE_CONSTANTS.Defaults.previewCube,
    freeze = CUBE_CONSTANTS.Defaults.freeze,
    hideBackground = true,
    disableZoom = CUBE_CONSTANTS.Defaults.disableZoom,
    displacementAnimationDistance = 0,
    lightningRays = CUBE_CONSTANTS.Defaults.lightningRays,
    orbitControls = CUBE_CONSTANTS.Defaults.orbitControls,
  } = props;

  const [_fragmentData, setFragmentData] = useState({
    frag1SquareCount: frag1Config,
    isCombined,
    frag2SquareCount: frag2Config,
    is2Combined,
  });

  const [_cubeData, setCubeData] = useState({
    faces: null,
    frag1properties: null,
    colors: null,
    facesSecond: null,
    frag2properties: null,
    frag2colors: null,
    previewCube: null,
    facesMergedCube: null,
    facesPreview: null,
  });

  // const [state, send] = useActor(cryptoCubeMachine.service);
  const store = useCreateStore();
  const cubeState = {
    lightningRays: lightningRays,
    insideSphere: hasFullFace(frag1Config),
    insideSphere2: false,
    insideSphere3: false,
    positionCamera: { x: 0, y: 0, z: 25 },
    positionCube1: { x: 0, y: 0, z: 0 },
    positionCube2: { x: 20, y: 20, z: 20 },
    displacementAnimationDistance: {
      value: _cubeData?.frag1properties?.displacementAnimationDistance || displacementAnimationDistance,
      min: 0,
      max: 10,
    },
    displacementIncrementPerFrame: {
      value: _cubeData?.frag1properties?.displacementIncrementPerFrame || 0,
      min: 0,
      max: 1,
    },
    displacementAnimationDistanceSecond: {
      value: _cubeData?.frag2properties?.displacementAnimationDistanceSecond || displacementAnimationDistance,
      min: 0,
      max: 10,
    },
    displacementIncrementPerFrameSecond: {
      value: _cubeData?.frag2properties?.displacementIncrementPerFrameSecond || 0,
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
      value: _cubeData?.frag1properties?.subSquaresScale || subSquaresScale,
      min: 0,
      max: 1,
    },
    mainCubeSide: _cubeData?.frag1properties?.mainCubeSide || mainCubeSide,
    thickness: {
      value: _cubeData?.frag1properties?.thickness || thickness,
      min: -1,
      max: 1,
    },
    explosion: {
      value: _cubeData?.frag1properties?.explosion || explosion,
      min: -10,
      max: 10,
    },
    subSquareOpacity: {
      value: _cubeData?.frag1properties?.subSquareOpacity || subSquareOpacity,
      min: 0,
      max: 1,
    },
    cylinderThickness: {
      value: _cubeData?.frag1properties?.cylinderThickness || cylinderThickness,
      min: 0,
      max: 1,
    },
    cylinderOpacity: {
      value: _cubeData?.frag1properties?.cylinderOpacity || cylinderOpacity,
      min: 0,
      max: 1,
    },
    subSquaresScaleSecond: {
      value: _cubeData?.frag2properties?.subSquaresScaleSecond || subSquaresScale,
      min: 0,
      max: 1,
    },
    mainCubeSideSecond: _cubeData?.frag2properties?.mainCubeSideSecond || mainCubeSide,
    thicknessSecond: {
      value: _cubeData?.frag2properties?.thicknessSecond || thickness,
      min: -1,
      max: 1,
    },
    explosionSecond: {
      value: _cubeData?.frag2properties?.explosionSecond || explosion,
      min: -10,
      max: 10,
    },
    subSquareOpacitySecond: {
      value: _cubeData?.frag2properties?.subSquareOpacitySecond || subSquareOpacity,
      min: 0,
      max: 1,
    },
    cylinderThicknessSecond: {
      value: _cubeData?.frag2properties?.cylinderThicknessSecond || cylinderThickness,
      min: 0,
      max: 1,
    },
    cylinderOpacitySecond: {
      value: _cubeData?.frag2properties?.cylinderOpacitySecond || cylinderOpacity,
      min: 0,
      max: 1,
    },
    orbitControls: orbitControls,
    // color0: {
    //   value: colors[0],
    //   onChange: (color) => {
    //     colors[0] = color;
    //     setCubeData({
    //       colors,
    //       frag2colors,
    //       faces: _cubeData.faces,
    //       facesMergedCube: _cubeData.facesMergedCube,
    //       facesSecond: _cubeData.facesSecond,
    //       facesPreview: _cubeData.facesPreview,
    //     });
    //   },
    // },
    // color1: {
    //   value: colors[1],
    //   onChange: (color) => {
    //     colors[1] = color;
    //     setCubeData({
    //       colors,
    //       frag2colors,
    //       faces: _cubeData.faces,
    //       facesMergedCube: _cubeData.facesMergedCube,
    //       facesSecond: _cubeData.facesSecond,
    //       facesPreview: _cubeData.facesPreview,
    //     });
    //   },
    // },
    // color2: {
    //   value: colors[2],
    //   onChange: (color) => {
    //     colors[2] = color;
    //     setCubeData({
    //       colors,
    //       frag2colors,
    //       faces: _cubeData.faces,
    //       facesMergedCube: _cubeData.facesMergedCube,
    //       facesSecond: _cubeData.facesSecond,
    //       facesPreview: _cubeData.facesPreview,
    //     });
    //   },
    // },
    // color3: {
    //   value: colors[3],
    //   onChange: (color) => {
    //     colors[3] = color;
    //     setCubeData({
    //       colors,
    //       frag2colors,
    //       faces: _cubeData.faces,
    //       facesMergedCube: _cubeData.facesMergedCube,
    //       facesSecond: _cubeData.facesSecond,
    //       facesPreview: _cubeData.facesPreview,
    //     });
    //   },
    // },
    // color4: {
    //   value: colors[4],
    //   onChange: (color) => {
    //     colors[4] = color;
    //     setCubeData({
    //       colors, frag2colors,
    //       faces: _cubeData.faces,
    //       facesMergedCube: _cubeData.facesMergedCube,
    //       facesSecond: _cubeData.facesSecond,
    //       facesPreview: _cubeData.facesPreview,
    //     });
    //   },
    // },
    // color5: {
    //   value: colors[5],
    //   onChange: (color) => {
    //     colors[5] = color;
    //     setCubeData({
    //       colors,
    //       frag2colors,
    //       faces: _cubeData.faces,
    //       facesMergedCube: _cubeData.facesMergedCube,
    //       facesSecond: _cubeData.facesSecond,
    //       facesPreview: _cubeData.facesPreview,
    //     });
    //   },
    // },
    // colorSecond0: {
    //   value: frag2colors[0],
    //   onChange: (color) => {
    //     frag2colors[0] = color;
    //     setCubeData({
    //       colors,
    //       frag2colors,
    //       faces: _cubeData.faces,
    //       facesMergedCube: _cubeData.facesMergedCube,
    //       facesSecond: _cubeData.facesSecond,
    //       facesPreview: _cubeData.facesPreview,
    //     });
    //   },
    // },
    // colorSecond1: {
    //   value: frag2colors[1],
    //   onChange: (color) => {
    //     frag2colors[1] = color;
    //     setCubeData({
    //       colors,
    //       frag2colors,
    //       faces: _cubeData.faces,
    //       facesMergedCube: _cubeData.facesMergedCube,
    //       facesSecond: _cubeData.facesSecond,
    //       facesPreview: _cubeData.facesPreview,
    //     });
    //   },
    // },
    // colorSecond2: {
    //   value: frag2colors[2],
    //   onChange: (color) => {
    //     frag2colors[2] = color;
    //     setCubeData({
    //       colors,
    //       frag2colors,
    //       faces: _cubeData.faces,
    //       facesMergedCube: _cubeData.facesMergedCube,
    //       facesSecond: _cubeData.facesSecond,
    //       facesPreview: _cubeData.facesPreview,
    //     });
    //   },
    // },
    // colorSecond3: {
    //   value: frag2colors[3],
    //   onChange: (color) => {
    //     frag2colors[3] = color;
    //     setCubeData({
    //       colors,
    //       frag2colors,
    //       faces: _cubeData.faces,
    //       facesMergedCube: _cubeData.facesMergedCube,
    //       facesSecond: _cubeData.facesSecond,
    //       facesPreview: _cubeData.facesPreview,
    //     });
    //   },
    // },
    // colorSecond4: {
    //   value: frag2colors[4],
    //   onChange: (color) => {
    //     frag2colors[4] = color;
    //     setCubeData({
    //       colors,
    //       frag2colors,
    //       faces: _cubeData.faces,
    //       facesMergedCube: _cubeData.facesMergedCube,
    //       facesSecond: _cubeData.facesSecond,
    //       facesPreview: _cubeData.facesPreview,
    //     });
    //   },
    // },
    // colorSecond5: {
    //   value: frag2colors[5],
    //   onChange: (color) => {
    //     frag2colors[5] = color;
    //     setCubeData({
    //       colors,
    //       frag2colors,
    //       faces: _cubeData.faces,
    //       facesMergedCube: _cubeData.facesMergedCube,
    //       facesSecond: _cubeData.facesSecond,
    //       facesPreview: _cubeData.facesPreview,
    //     });
    //   },
    // },
    // regenerate: button(() => {
    //   setCubeData({
    //     colors,
    //     frag2colors,
    //     ...generateCubes(),
    //   });
    // }),
    // regenerateFilled: button(() => {
    //   setCubeData({
    //     colors,
    //     frag2colors,
    //     ...generateCubes(true),
    //   });
    // }),
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
      // TODO
      // cryptoCubeMachine.actionCreators.mergeCubesConclusion(() => {
      //   alert('completed conclusion');
      //   setCubeData({
      //     colors,
      //     frag2colors: null,
      //     faces: translateSizeToConfig(combinedConfig),
      //     facesSecond: null,
      //     facesMergedCube: null,
      //     facesPreview: null,
      //     previewCube,
      //   });
      // });
    }),
  }
  let [data, set] = useControls(
    () => (cubeState),
    { store }
  );

  useEffect(() => {
    const [frag1, frag2] = getFragmentProperties(_fragmentData);

    setCubeData({
      faces: frag1.faces,
      frag1properties: frag1.properties,
      colors: frag1.colors,
      facesSecond: !previewCube ? frag2.faces : null,
      frag2properties: frag2.properties,
      frag2colors: frag2.colors,
      previewCube,
      facesPreview: previewCube ? frag2.faces : null,
      facesMergedCube,
      ...frag1.properties,
      ...(!previewCube ? frag2.properties : {}),
    });
    set({...frag1.properties});
    set({...frag2.properties});
  }, [_fragmentData]);


  // console.log('data', data, set);
  // console.log('data', _cubeData, data);

  // _cubeData has a generated data
  // cubeData is the data from html - Variable cube : true ?
  // data has all props except cubeConfig


  const [showPanel, setShowPanel] = useState(process.env.REACT_APP_DEBUG_CUBE);
  document.addEventListener('keyup', e => {
    if (e.repeat) {
      return;
    }
    if (e.key === 'x') {
      cryptoCubeMachine.actionCreators.saveGLTF();
      e.preventDefault();
    }
    if (e.key === 'a') {
      cryptoCubeMachine.actionCreators.mergeCubesIntro();
      e.preventDefault();
    }
    if (e.key === 'b') {
      cryptoCubeMachine.actionCreators.mergeCubesConclusion(() => {
        // cryptoCubeMachine.actionCreators.mergeComplete();
        // TODO
        // const newFaces = frag1faces.map((face, faceId) =>
        //   face.map((value, subFaceId) => {
        //     return value || facesSecond[faceId][subFaceId];
        //   }),
        // );

        // TODO: combine fragment when overlap

        const mergedSquareCount = (_fragmentData.frag1SquareCount && _fragmentData.frag2SquareCount) ?
          _fragmentData.frag1SquareCount.map((a, i) => a + _fragmentData.frag2SquareCount[i]) :
          null;
        setFragmentData({
          frag1SquareCount: mergedSquareCount,
          isCombined: true,
          frag2SquareCount: null,
          is2Combined: false,
        });
      });
      e.preventDefault();
    }
    if (e.key === 'c') {
      cryptoCubeMachine.actionCreators.mergeComplete();
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
      <CubeRenderer key={'renderer'} cubeData={_cubeData} {...data} />
      <CubeMainStudio set={set} data={data}/>
    </>
  );
}

const { mergeCubesIntro, mergeCubesConclusion, takeScreenShot } = cryptoCubeMachine.actionCreators;

export { CubeMain, CubeRenderer, mergeCubesIntro, mergeCubesConclusion, takeScreenShot };
