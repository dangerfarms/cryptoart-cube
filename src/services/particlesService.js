import * as THREE from 'three';
import {
  Alpha,
  Body,
  Color,
  CrossZone,
  Emitter,
  Life,
  Mass,
  RadialVelocity,
  Radius,
  RandomDrift,
  Rate,
  Rotate,
  Scale,
  ScreenZone,
  Span,
  Vector3D,
} from 'three-nebula';

const createSprite = () => {
  const map = new THREE.TextureLoader().load('./img/dot.png');
  const material = new THREE.SpriteMaterial({
    map: map,
    color: 0xff0000,
    blending: THREE.AdditiveBlending,
    // fog: true,
    renderOrder: 10,
    // depthWrite: false,
    depthTest: false,
    side: THREE.DoubleSide,
    // colorWrite:false,
    transparent: true,
    // opacity:0.5
  });
  const sprite = new THREE.Sprite(material);
  sprite.renderOrder = 10;
  return sprite;
};

const createMesh = () => {
  const geometry = new THREE.SphereGeometry(1, 8, 8);
  const material = new THREE.MeshBasicMaterial({
      color: '#ff0000',
      blending: THREE.AdditiveBlending,
      // fog: true,
      transparent: true,

      // ,transparent:true,opacity:0.1
    },
  );
  return new THREE.Mesh(geometry, material);
};

export const createEmitter = ({ colorA, colorB, camera, renderer, radius = 5 }) => {
  const emitter = new Emitter();

  return emitter
    .setRate(new Rate(new Span(5, 10), new Span(0.1, 0.025)))
    .addInitializers([
      new Mass(10),
      new Radius(radius),
      new Life(2),
      new Body(createMesh()),
      // new Position(new BoxZone(100)),
      //new RadialVelocity(1, new Vector3D(.1, 1, 0.1), 1),
    ])
    .addBehaviours([
      // new Rotate('random', 'random'),
      new Rotate('random', 'random'),
      new RandomDrift(.1, .1, .1),
      new Alpha(1, 0.1),
      new Color(colorA, colorB),
      new Scale(.2, .5),
      // new Gravity(3),
    ])
    // .setRate(new Rate(new Span(1, 1), new Span(0.01, 0.02)))
    // .setInitializers([
    //   new Mass(3,10),
    //   new Life(2),
    //   new Body(createMesh()),
    //   new Radius(4,4),
    //   new RadialVelocity(1, new Vector3D(0, 5, 0), 1),
    // ])
    // .setBehaviours([
    //   new Alpha(1, 0),
    //   new Color(colorA, colorB),
    //   new Scale(1, 0.1),
    //   // new Gravity(.1),
    //    new CrossZone(new ScreenZone(camera, renderer), 'dead'),
    //    new Force(0, 0, -0.01),
    // ])
    .emit();
};


export const createEmitter2 = ({ colorA, colorB, camera, renderer }) => {
  const emitter = new Emitter();

  // console.log(camera,renderer)
  return emitter
    .setRate(new Rate(new Span(5, 10), new Span(0.1, 0.025)))
    .addInitializers([
      new Mass(1),
      new Radius(5),
      new Life(1),
      new Body(createSprite()),
      // new Position(new BoxZone(100)),
      //new RadialVelocity(1, new Vector3D(.1, 1, 0.1), 1),
    ])
    .addBehaviours([
      // new Rotate('random', 'random'),
      new Rotate('random', 'random'),
      new RandomDrift(.2, .2, .2),
      new Alpha(1, 0.1),
      new Color(colorA, colorB),
      new Scale(.2, 1),
      // new Gravity(3),
    ])
    // .setRate(new Rate(new Span(1, 1), new Span(0.01, 0.02)))
    // .setInitializers([
    //   // new Mass(3,10),
    //   new Life(2),
    //   new Body(createMesh()),
    //   // new Radius(4,4),
    //   new RadialVelocity(1, new Vector3D(0, 5, 0), 1),
    // ])
    // .setBehaviours([
    //   new Alpha(1, 0),
    //   new Color(colorA, colorB),
    //   // new Scale(1, 0.1),
    //   // new Gravity(.1),
    //   // new CrossZone(new ScreenZone(camera, renderer), 'dead'),
    //   // new Force(0, 0, -0.01),
    // ])
    .emit();
};


export const createEmitter3 = ({ colorA, colorB, camera, renderer }) => {
  const emitter = new Emitter();

  // console.log(camera,renderer)
  return emitter
    .setRate(new Rate(new Span(5, 7), new Span(0.01, 0.02)))
    .setInitializers([
      new Mass(1),
      new Life(2),
      new Body(createSprite()),
      new Radius(2),
      new RadialVelocity(200, new Vector3D(0, 0, -1), 0),
    ])
    .setBehaviours([
      new Alpha(1, 0),
      new Color(colorA, colorB),
      new Scale(1, 0.5),
      new CrossZone(new ScreenZone(camera, renderer), 'dead'),
      // new Force(0, 0, -20),
    ])

    .emit();
};


export const createSphere = ({
  colorA,
  colorB,
  camera,
  renderer,
  radius = 5,
  alpha = 1,
}) => {
  const emitter = new Emitter();

  return emitter
    .setRate(new Rate(new Span(5, 10), new Span(0.1, 0.025)))
    .addInitializers([
      new Mass(1),
      new Radius(radius),
      new Life(1),
      new Body(createSprite()),
      // new Position(new BoxZone(100)),
      new RadialVelocity(1, new Vector3D(.1, 1, 0.1), 1),
    ])
    .addBehaviours([
      new Rotate('random', 'random'),
      new RandomDrift(.2, .2, .2),
      new Alpha(alpha, 0.1),
      new Color(colorA, colorB),
      new Scale(radius/100, 1),
      // new Gravity(3),
    ])
    .emit();
};


let tha = 0;
export const animateEmitters = (a, b, thaT = 0, radius = 1) => {
  // tha = thaT || tha + 0.13;

  // a.position.x = radius * Math.cos(tha);
  // a.position.y = -radius * Math.sin(tha);

  // b.position.x = radius * Math.cos(tha + Math.PI / 2);
  // b.position.y = radius * Math.sin(tha + Math.PI / 2);
  // console.log(a.position, b.position,tha,radius);

  //requestAnimationFrame(() => animateEmitters(a, b, tha, radius));
};

export const animationFunctions = {
  ROTATION_ELIPSES: (a, time, radius = 1) => {
    a.position.x = radius * Math.cos(time);
    a.position.y = -radius * Math.sin(time);
  },
  ROTATION_ELIPSES_2: (a, time, radius = 1) => {
    a.position.x = radius * Math.cos(time + Math.PI / 2);
    a.position.y = radius * Math.sin(time + Math.PI / 2);
  },

};