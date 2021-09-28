import { assign, createMachine, interpret } from 'xstate';

import { inspect } from '@xstate/inspect';
// import { apiService } from '../../services/apiService';
// import { NUDGE_CONSTANTS } from '../../constants/constants';
import { actionTypes } from './actionTypes';
import { initialState } from './initialState';
import { generateActionCreators } from './actionCreators';
import { cubeStudioService } from '../../services/cubeStudioService';

const devMode = process.env.NODE_ENV === 'development';
if (devMode) {
  inspect({
    // options
    // url: 'https://statecharts.io/inspect', // (default)
    // iframe: studio ? () => document.querySelector('iframe[data-xstate]') : false, // open in new window
    iframe: false, // open in new window
  });
}

const cryptoCubeMachine = createMachine({
  id: 'cube-machine',
  initial: 'idle',
  context: initialState,
  key: 'root',
  states: {
    idle: {
      on: {
        [actionTypes.MERGE_CUBES]: {
          target: 'mergingCubes',
        },
      },
    },

    mergingCubes: {
      invoke: {
        id: 'merging',
        src: () => cubeStudioService.playScene(),
        onDone: {
          target: 'idle',
        },
        onError: {
          target: 'failure',
        },
      },
    },
    success: {},
    failure: {
      on: {
        RETRY: { target: 'mergingCubes' },
      },
    },

    // mergingCubes: {
    //   on: {
    //     [actionTypes.MERGE_COMPLETE]: {
    //       target: 'idle',
    //     },
    //   },
    //
    // },
  },
});

const machine = {
  service: interpret(cryptoCubeMachine, {
    devTools: devMode,
  }),
};

machine.service.onTransition((state) => {
  machine.state = state;
  if (state.context.debug && state.changed) {
    console.log('Cryptomachine transition', state.value, state._event.name, state, machine.service);
  }
});

const TOUCH_MOUSE_MAP = {
  touchstart: 'mousedown',
  touchmove: 'mousemove',
  touchend: 'mouseup',
};

machine.actionTypes = actionTypes;

machine.actionCreators = generateActionCreators(machine);

machine.service.start();

window.cryptoCubeMachine = machine;
export default machine;
