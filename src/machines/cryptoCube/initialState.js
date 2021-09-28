const devMode = process.env.NODE_ENV === 'development';
export const initialState = {
  intro: false,
  arDisabled: devMode,
  // debug: devMode,
  debug: false,
  assets: null,
  experience: {
    showInstructionsOnScene: true,
    initialInstructions: false,
    experienceData: null,
    dbId: null,
    experienceId: null,
    deliveryPoint: 'manual',
    // customModelURL: 'https://assets.nudge.solidsolutions.pt/custom/coffeecup_voucher.glb',
    // color_code: '#00b2af',
  },
  centerPoint: {
    x: 0,
    y: 0,
    z: 0,
  },
};
