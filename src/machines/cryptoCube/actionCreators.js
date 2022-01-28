export const generateActionCreators = (machine) => {
  return {
    mergeCubesIntro: (callback) => {
      machine.service.send(machine.actionTypes.MERGE_CUBES_INTRO, { callback });
    },

    mergeCubesConclusion: (callback) => {
      machine.service.send(machine.actionTypes.MERGE_CUBES_CONCLUSION, { callback });
    },

    mergeComplete: () => {
      machine.service.send(machine.actionTypes.MERGE_CUBES);
    },
    registerGL: (domElement) => {
      machine.service.send(machine.actionTypes.REGISTER_GL, {
        domElement,
      });
    },
    takeScreenShot: () => {
      machine.service.send(machine.actionTypes.SAVE_THUMB);
    },
    storeGLTF: (gltf) => {
      machine.service.send(machine.actionTypes.STORE_GLTF, {
        gltf,
      });
    },
    saveGLTF: () => {
      machine.service.send(machine.actionTypes.SAVE_GLTF);
    },
    //
    // setTriggeredUnrwap: () => {
    //   machine.service.send(machine.actionTypes.UNWRAP_TAP);
    // },
    //
    // deliveryCompleted: () => {
    //   machine.service.send(machine.actionTypes.DROP_WRAP);
    // },
    //
    // setUnrwapFinished: () => {
    //   machine.service.send(machine.actionTypes.FINISH_UNWRAP);
    // },
    // // setInactive: (event) => {
    // //   machine.service.send("SET_INACTIVE");
    // // },
    // hideInstructions: () => {
    //   machine.service.send(machine.actionTypes.CLOSE_INSTRUCTIONS);
    // },
    //
    // fetchDataForStandaloneExperience: (dbId, experienceId) => {
    //   machine.service.send(machine.actionTypes.GET_EXPERIENCE_AND_DB_FOR_STANDALONE_EXPERIENCE, {
    //     dbId,
    //     experienceId,
    //   });
    // },
  };
};
