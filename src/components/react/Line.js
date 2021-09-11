import React, { useMemo, useRef } from 'react';
import { extend, useFrame } from '@react-three/fiber';
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline';
import * as THREE from 'three';
import { noise } from '../../utils/Noise';

extend({ MeshLine, MeshLineMaterial });

console.log(noise);

// const colors = ['#A2CCB6', '#FCEEB5', '#EE786E'];
// const numLines = 20;
// let velocities = {};
// const getY = (x, idx, width, height) => {
//   let yVal = 0;
//   const yPoints = Object.keys(velocities);
//   yPoints.forEach((yp) => {
//     const xPoints = _.keys(velocities[yp]);
//     xPoints.forEach((xp) => {
//       yVal += getValAtPoint(velocities[yp][xp].getValue(), x, idx, xp, yp, width, height);
//     });
//   });
//   return yVal;
// };
let jIncrement = 0;
let jIncrement2 = 0;
let jIncrement3 = 0;

export function LineMesh({
  width,
  color,
  position,
  point1,
  point2,
  noPoints = 30,
  incrementedRate = 0.03,
  displacement = 1,
  offsetStart = 0,
  dashArray = 0.3,
  dashRatio = 0.8,
  lineSpeed = 0.004,
}) {
  // const points = useMemo(() => {
  //   const points = [];
  //   for (let j = 0; j < Math.PI; j += (2 * Math.PI) / 100) {
  //     points.push(Math.cos(j), Math.sin(j), 0);
  //   }
  //   console.log(points);
  //   return points;
  // }, []);

  const points = useMemo(() => {
    const points = [];
    for (let j = 0; j < noPoints; j++) {
      const x = noise(j, 0, 0) * 100;
      const y = noise(0, j, 0) * 100;
      const z = noise(0, 0, j) * 100;
      points.push(x, y, z);
    }
    // console.log(points);
    return points;
  }, [noPoints]);

  useFrame(() => {
    const points = [];
    const point1Vector = new THREE.Vector3(...point1);
    const point2Vector = new THREE.Vector3(...point2);
    point2Vector.sub(point1Vector);
    point2Vector.divideScalar(noPoints);

    for (let j = 0; j < noPoints; j++) {
      const incrementedj = j + jIncrement;
      const incrementedj2 = j + jIncrement2;
      const incrementedj3 = j + jIncrement3;
      const x = noise(incrementedj, 0, 0) * displacement;
      const y = noise(incrementedj2, incrementedj, 0) * displacement;
      const z = noise(incrementedj3, incrementedj2, incrementedj) * displacement;
      points.push(
        point1Vector.x + point2Vector.x * j + x,
        point1Vector.y + point2Vector.y * j + y,
        point1Vector.z + point2Vector.z * j + z,
      );
    }
    mlGeom.current.setPoints(points);
    jIncrement += incrementedRate;
    jIncrement2 += 0.01;
    jIncrement3 += 0.08;
    const colorIncrement = jIncrement * 0.1;
    // const r = (noise(colorIncrement, 0, 0) + 1) / 2;
    // const g = (noise(colorIncrement, colorIncrement, 0) + 1) / 2;
    const b = (noise(colorIncrement, colorIncrement, colorIncrement) + 1) / 2;
    // console.log(r);

    mlGeom.current.needsUpdate = true;
    mlMaterial.current.uniforms.dashOffset.value += lineSpeed;
    mlMaterial.current.color.set(new THREE.Color(1, 1, b));
  });

  const mlGeom = useRef();
  const mlMaterial = useRef();

  // const { size } = useThree();
  // const getCurve = useCallback(() => {
  //   const path = new THREE.Path();
  //   path.moveTo(-size.width / 2, 0);
  //   path.lineTo(size.width / 2, 0);
  //   return path
  //     .getSpacedPoints(50)
  //     .map(
  //       (p) =>
  //         new THREE.Vector3(Math.round(p.x), Math.round(getY(p.x, 2, size.width, size.height)), 0),
  //     );
  // }, [size.height, size.width]);
  //
  // useFrame(() => {
  //   // if (!mlGeom.current || !mlGeom.current.setVertices) {
  //   //   console.log(mlGeom, mlGeom.current.setVertices, mlGeom.current.setPoints);
  //   //   return;
  //   // }
  //   // mlGeom.current.setVertices(getCurve());
  //   mlGeom.current.points = getCurve();
  // });
  return (
    <mesh raycast={MeshLineRaycast}>
      <meshLine
        attach="geometry"
        points={points}
        ref={mlGeom}
        // widthCallback={(pointWidth) => pointWidth * Math.random()}
      />
      <meshLineMaterial
        attach="material"
        ref={mlMaterial}
        transparent
        opacity={1}
        depthTest={false}
        lineWidth={width}
        color={new THREE.Color(0xff0000)}
        dashArray={dashArray}
        dashRatio={dashRatio}
        dashOffset={offsetStart}
      />
    </mesh>
  );
}
