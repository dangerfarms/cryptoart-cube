import { assign, createMachine, interpret } from 'xstate';

import { inspect } from '@xstate/inspect';
// import { apiService } from '../../services/apiService';
// import { NUDGE_CONSTANTS } from '../../constants/constants';
import { actionTypes } from './actionTypes';
import { initialState } from './initialState';
import { generateActionCreators } from './actionCreators';
import { cubeStudioService } from '../../services/cubeStudioService';

const devMode = process.env.NODE_ENV === 'development';
const statePreview = process.env.REACT_APP_STATE_PREVIEW === 'true';
if (devMode && statePreview) {
  inspect({
    // options
    // url: 'https://statecharts.io/inspect', // (default)
    // iframe: studio ? () => document.querySelector('iframe[data-xstate]') : false, // open in new window
    iframe: false, // open in new window
  });
}

const cryptoCubeMachine = createMachine(
  {
    id: 'cube-machine',
    initial: 'idle',
    context: initialState,
    key: 'root',
    states: {
      idle: {
        on: {
          [actionTypes.MERGE_CUBES]: {
            target: 'mergingCubes',
            actions: assign({ mergeCallback: (context, event) => event.callback }),
          },
          [actionTypes.SAVE_THUMB]: {
            actions: ['takeScreenshot', 'saveThumbnail'],
          },
          [actionTypes.REGISTER_GL]: {
            actions: ['registerDomElement'],
          },
        },
      },

      mergingCubes: {
        invoke: {
          id: 'merging',
          src: () => cubeStudioService.playScene(),
          onDone: {
            target: 'idle',
            actions: (context, event) => {
              context.mergeCallback && context.mergeCallback();
            },
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
    },
  },
  {
    actions: {
      registerDomElement: assign((context, event) => {
        console.log('registerGL', context, event);
        return {
          domElement: event.domElement,
        };
      }),
      takeScreenshot: assign((context, event) => {
        console.log('takeScreenshot', context, event);
        const strMime = 'image/png';
        const domElement = document.getElementById(context.domElement);
        // domElement.getContext('webgl', { preserveDrawingBuffer: true });
        // gl.render(scene, camera);
        // const domElement=context.domElement;
        const thumbnail = domElement.toDataURL(strMime);
        console.log(thumbnail);
        return {
          thumbnail,
        };
      }),
      saveThumbnail: (context, event) => {
        console.log('saveThumbnail', context, event);

        function downloadImage(data, filename = 'cube.png') {
          var a = document.createElement('a');
          a.href = data;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }

        downloadImage(context.thumbnail);
      },
    },
  },
);

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
