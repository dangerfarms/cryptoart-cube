import React from 'react';
// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
// import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
// import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass';
// import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
// import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing';

import { useFrame } from '@react-three/fiber';
// extend({ EffectComposer, ShaderPass, RenderPass, SSAOPass, UnrealBloomPass });

export default function Effects(props) {
  // const composer = useRef();
  // const { scene, gl, size, camera } = useThree();
  // useEffect(() => void composer.current.setSize(size.width, size.height), [size]);
  const [opacity, setOpacity] = React.useState(0.31);
  useFrame(({ clock }) => {
    // composer.current.render();
    if (props.previewCubeBloomAnimation) {
      setOpacity(Math.sin(clock.elapsedTime * props.previewCubeAnimationSpeed) - 0.3);
    }
  }, 2);
  return (
    <EffectComposer multisampling={0} disableNormalPass={true}>
      {/*<DepthOfField focusDistance={0} focalLength={0.05} bokehScale={2} height={480} />*/}
      <Bloom luminanceThreshold={0.3} luminanceSmoothing={0.2} height={300} opacity={opacity} />
      {/*<Noise opacity={0.025} />*/}
      <Vignette eskil={false} offset={0.1} darkness={0.5} />
    </EffectComposer>
  );
}
