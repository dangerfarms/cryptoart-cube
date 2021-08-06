import * as THREE from 'three';
import React, { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import Effects from './Effects';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

const tempObject = new THREE.Object3D();
const tempColor = new THREE.Color();

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

const cubeFacesOrientation = [
  [0, 0, 1],
  [1, 0, 0],
  [0, 0, -1],
  [-1, 0, 0],
  [0, 1, 0],
  [0, -1, 0],
];

function Boxes(props) {
  const {
    cubeData,
    subSquaresScale = 0.8,
    mainCubeSide = 10,
    thickness = 0.01,
    explosion = 0.5,
    backGroundColor = '#f0f0f0',
  } = props;
  let numberPoints = 0;
  const clampedSubSquaresScale = clamp(subSquaresScale, 0, 1);
  const {
    camera,
    scene,
    gl: { domElement },
  } = useThree();

  const cameraRef = useRef();

  const facesActive = useMemo(
    () =>
      cubeData.faces.reduce((acc, face) => {
        return [...acc, ...face];
      }, []),
    [cubeData],
  );

  const facesActiveOriginalScale = useMemo(() => [...facesActive]);

  // gets all colors ready to be sent to GPU instances
  const colorArray = useMemo(
    () =>
      Float32Array.from(
        cubeData.faces.reduce((acc, face, index) => {
          const newColor = tempColor.set(cubeData.colors[index]).toArray();
          const _colorArray = new Array(face.length)
            .fill()
            .flatMap((_, i) => tempColor.set(cubeData.colors[index]).toArray());

          const toReturn = [...acc, ..._colorArray];

          return toReturn;
        }, []),
      ),
    [cubeData],
  );

  const meshRef = useRef();
  const prevRef = useRef();

  useEffect(() => {
    scene.background = new THREE.Color(backGroundColor);
  }, [scene, backGroundColor]);

  useEffect(() => {
    let currentFaceId = 0;

    const halfCubeSide = mainCubeSide / 2;

    const absoluteThickness = halfCubeSide * thickness;

    // goes through all the cube faces

    for (let cubeFaceIndex = 0; cubeFaceIndex < cubeFacesOrientation.length; cubeFaceIndex++) {
      const coordsToIncreaseVectors = [
        new THREE.Vector3(1, 0, 0),
        new THREE.Vector3(0, 1, 0),
        new THREE.Vector3(0, 0, 1),
      ];

      const currentFaceNumberOfSquaresPerLine = Math.sqrt(cubeData.faces[cubeFaceIndex].length);
      const currentFaceOrientationCoords = cubeFacesOrientation[cubeFaceIndex];
      const subFaceRealSideLength = mainCubeSide / currentFaceNumberOfSquaresPerLine;
      const subFaceRelativeSide = 1 / currentFaceNumberOfSquaresPerLine;
      const subFaceRelativeSideScaled = subFaceRelativeSide * clampedSubSquaresScale;

      // get the orientation vectors for moving the  pointer that will draw the subsquares on the correct position
      let nonMovingCoordVector = null;

      let rotationVector;

      let faceDisplacementSignal = 0;

      const mainCubeFaceMovingPointerDirectonVectors = coordsToIncreaseVectors;

      currentFaceOrientationCoords.forEach((coordAxisIsStatic, index) => {
        // if not equal to 0, means this will be the static axis of the pointer.
        // the other 2 remaining axis will be the ones moving
        if (coordAxisIsStatic !== 0) {
          faceDisplacementSignal = coordAxisIsStatic;
          nonMovingCoordVector = mainCubeFaceMovingPointerDirectonVectors.splice(index, 1)[0];
        }
      });

      rotationVector = nonMovingCoordVector.clone();
      rotationVector
        .set(rotationVector.y, rotationVector.x, rotationVector.z)
        .multiplyScalar(faceDisplacementSignal);
      // extracts the face rotation vector - maybe multiply by signal?

      nonMovingCoordVector.multiplyScalar(
        (halfCubeSide + absoluteThickness + explosion) * faceDisplacementSignal,
      ); // gets the displacement for the static coordinate

      const pointerStartPositionVector = mainCubeFaceMovingPointerDirectonVectors[0]
        .clone()
        .add(mainCubeFaceMovingPointerDirectonVectors[1])
        .multiplyScalar(halfCubeSide - subFaceRealSideLength / 2);

      // iterate on face subfaces
      for (let coord1 = 0; coord1 < currentFaceNumberOfSquaresPerLine; coord1++) {
        for (let coord2 = 0; coord2 < currentFaceNumberOfSquaresPerLine; coord2++) {
          tempObject.scale.set(
            facesActiveOriginalScale[currentFaceId]
              ? subFaceRelativeSideScaled * clampedSubSquaresScale
              : 0,
            facesActiveOriginalScale[currentFaceId]
              ? subFaceRelativeSideScaled * clampedSubSquaresScale
              : 0,
            facesActiveOriginalScale[currentFaceId] ? thickness : 0,
          );

          const coord1PointerVector = mainCubeFaceMovingPointerDirectonVectors[0]
            .clone()
            .multiplyScalar(coord1 * subFaceRealSideLength);

          const coord2PointerVector = mainCubeFaceMovingPointerDirectonVectors[1]
            .clone()
            .multiplyScalar(coord2 * subFaceRealSideLength);

          tempObject.position.copy(
            new THREE.Vector3()
              .add(nonMovingCoordVector)
              .add(pointerStartPositionVector)
              .sub(coord1PointerVector)
              .sub(coord2PointerVector),
          );

          const angle = Math.PI / 2;
          tempObject.rotation.x = 0;
          tempObject.rotation.y = 0;
          tempObject.rotation.z = 0;
          tempObject.rotateOnAxis(rotationVector, angle);

          tempObject.updateMatrix();

          meshRef.current.setMatrixAt(currentFaceId, tempObject.matrix);
          currentFaceId++;
        }
      }
    }
    console.log('drawn cube');
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [meshRef, thickness, subSquaresScale, mainCubeSide, explosion, cubeData]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    meshRef.current.instanceMatrix.needsUpdate = true;
  });
  console.log(cameraRef.current, camera);
  return (
    <>
      <instancedMesh
        ref={meshRef}
        args={[null, null, facesActive.length]}
        // onPointerMove={(e) => set(e.instanceId)}
        // onPointerOut={(e) => set(undefined)}
      >
        <boxGeometry args={[mainCubeSide, mainCubeSide, mainCubeSide]}>
          <instancedBufferAttribute attachObject={['attributes', 'color']} args={[colorArray, 3]} />
        </boxGeometry>
        <meshPhongMaterial vertexColors={THREE.VertexColors} />
      </instancedMesh>
      <PerspectiveCamera position={[0, 0, 25]} makeDefault ref={cameraRef}>
        <pointLight intensity={0.55} />
      </PerspectiveCamera>
      <OrbitControls camera={cameraRef.current} autoRotate />
    </>
  );
}

export const CubeRenderer = (props) => {
  return (
    <Canvas
      linear
      gl={{ antialias: false, alpha: false }}
      camera={{ position: [0, 0, 15], near: 0.1, far: 200 }}
    >
      <ambientLight />
      <Boxes {...props} />
      <Effects />
    </Canvas>
  );
};
