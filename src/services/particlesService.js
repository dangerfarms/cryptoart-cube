import * as THREE from 'three';
import ParticleSystem, {
  Alpha,
  Body,
  Color,
  CrossZone,
  Emitter,
  Force,
  Life,
  Mass,
  RadialVelocity,
  Radius,
  Rate,
  Scale,
  ScreenZone,
  Span,Gravity,
  SpriteRenderer,
  Rotate,
  Position,
  Vector3D,
} from 'three-nebula';

const createMesh = () => {
  const geometry = new THREE.SphereGeometry(1, 8, 8);
    const material= new THREE.MeshBasicMaterial({
        color: '#ff0000',
      blending: THREE.AdditiveBlending,
        fog: true
        // ,transparent:true,opacity:0.1
      }
    );
  return new THREE.Mesh(geometry, material);
}

const createSprite = () => {
  const map = new THREE.TextureLoader().load('./img/dot.png');
  const material = new THREE.SpriteMaterial({
    map: map,
    color: 0xff0000,
    blending: THREE.AdditiveBlending,
    fog: true,
    transparent:true
  });
  return new THREE.Sprite(material);
};

export const createEmitter = ({ colorA, colorB, camera, renderer }) => {
  const emitter = new Emitter();

  console.log(camera,renderer)
  return emitter
    .setRate(new Rate(new Span(5, 10), new Span(0.1, 0.025)))
    .addInitializers([
      new Mass(1),
      new Radius(1),
      new Life(2, 4),
      new Body(createMesh()),
      // new Position(new BoxZone(100)),
      //new RadialVelocity(1, new Vector3D(.1, 1, 0.1), 1),
    ])
    .addBehaviours([
      // new Rotate('random', 'random'),
      new Rotate('random', 'random'),
        new Alpha(1, 0),
        new Color(colorA, colorB),
      new Scale(1, 0.1),
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

let tha =0;
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
  ROTATION_ELIPSES :(a, time, radius = 1)=>{
    a.position.x = radius * Math.cos(time);
    a.position.y = -radius * Math.sin(time);
  },
  ROTATION_ELIPSES_2 :(a, time, radius = 1)=>{
    a.position.x = radius * Math.cos(time + Math.PI / 2);
    a.position.y = radius * Math.sin(time + Math.PI / 2);
  }

}