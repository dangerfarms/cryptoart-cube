/**
 * Return an array of particle configuration
 * @param squareCount
 */
export const generateSpheres = squareCounts => {
  const emitters = squareCounts.map((squareCount, i) => {
      return {
        'id': `face${i}`,
        'totalEmitTimes': null,
        'life': null,
        'cache': {
          'totalEmitTimes': 0,
          'life': 0,
        },
        'rate': {
          'particlesMin': 5,
          'particlesMax': 10,
          'perSecondMin': 0.1,
          'perSecondMax': 0.025,
        },
        'position': {
          'x': 0,
          'y': 0,
          'z': 0,
        },
        'rotation': {
          'x': 0,
          'y': 0,
          'z': 0,
        },
        'initializers': [
          {
            'id': `${i}-mass`,
            'type': 'Mass',
            'properties': {
              'min': 1,
              'max': 1,
              'isEnabled': true,
            },
          },
          {
            'id': `${i}-life`,
            'type': 'Life',
            'properties': {
              'min': 1,
              'max': 1,
              'isEnabled': true,
            },
          },
          {
            'id': `${i}-bodySprite`,
            'type': 'BodySprite',
            'properties': {
              'texture': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJkSURBVHjaxJeJbusgEEW94S1L//83X18M2MSuLd2pbqc4wZGqRLrKBsyZhQHny7Jk73xVL8xpVhWrcmiB5lX+6GJ5YgQ2owbAm8oIwH1VgKZUmGcRqKGGPgtEQQAzGR8hQ59fAmhJHSAagigJ4E7GPWRXOYC6owAd1JM6wDQPADyMWUqZRMqmAojHp1Vn6EQQEgUNMJLnUjMyJsM49wygBkAPw9dVFwXRkncCIIW3GRgoTQUZn6HxCMAFEFd8TwEQ78X4rHbILoAUmeT+RFG4UhQ6MiIAE4W/UsYFjuVjAIa2nIY4q1R0GFtQWG3E84lqw2GO2QOoCKBVu0BAPgDSU0eUDjjQenNkV/AW/pWChhpMTelo1a64AOKM30vk18GzTHXCNtI/Knz3DFBgsUqBGIjTInXRY1yA9xkVoqW5tVq3pDR9A0hfF5BSARmVnh7RMDCaIdcNgbPBkgzn1Bu+SfIEFSpSBmkxyrMicb0fAEuCZrWnN89veA/4XcakrPcjBWzkTuLjlbfTQPOlBhz+HwkqqPXmPQDdrQItxE1moGof1S74j/8txk8EHhTQrAE8qlwfqS5yukm1x/rAJ9Jiaa6nyATqD78aUVBhFo8b1V4DdTXdCW+IxA1zB4JhiOhZMEWO1HqnvdoHZ4FAMIhV9REF8FiUm0jsYPEJx/Fm/N8OhH90HI9YRHesWbXXZwAShU8qThe7H8YAuJmw5yOd989uRINKRTJAhoF8jbqrHKfeCYdIISZfSq26bk/K+yO3YvfKrVgiwQBHnwt8ynPB25+M8hceTt/ybPhnryJ78+tLgAEAuCFyiQgQB30AAAAASUVORK5CYII=',
              'isEnabled': true,
            },
          },
          {
            'id': `${i}-radius`,
            'type': 'Radius',
            'properties': {
              'width': 5,
              'height': 5,
              'isEnabled': true,
            },
          },
          {
            'id': `${i}-radialVelocity`,
            'type': 'RadialVelocity',
            'properties': {
              'radius': 40,
              'x': 0,
              'y': 0,
              'z': 1,
              'theta': 30,
              'isEnabled': false,
            },
          },
        ],
        'behaviours': [
          {
            'id': `${i}-alpha`,
            'type': 'Alpha',
            'properties': {
              'alphaA': 1,
              'alphaB': 0.1,
              'life': null,
              'easing': 'easeLinear',
            },
          },
          {
            'id': `${i}-color`,
            'type': 'Color',
            'properties': {
              'colorA': '#4F1500',
              'colorB': '#0029FF',
              'life': null,
              'easing': 'easeLinear',
            },
          },
          {
            'id': `${i}-scale`,
            'type': 'Scale',
            'properties': {
              'scaleA': 0.2,
              'scaleB': 0.5,
              'life': null,
              'easing': 'easeLinear',
            },
          },
          {
            'id': `${i}-force`,
            'type': 'Force',
            'properties': {
              'fx': 0,
              'fy': 0,
              'fz': -20,
              'life': null,
              'easing': 'easeLinear',
            },
          },
          {
            'id': `${i}-rotate`,
            'type': 'Rotate',
            'properties': {
              'x': 1,
              'y': 0,
              'z': 0,
              'life': null,
              'easing': 'easeLinear',
              'isEnabled': true,
            },
          },
          {
            'id': `${i}-randomDrift`,
            'type': 'RandomDrift',
            'properties': {
              'driftX': 1,
              'driftY': 23,
              'driftZ': 4,
              'delay': 1,
              'life': null,
              'easing': 'easeLinear',
            },
          },
          {
            'id': `${i}-spring`,
            'type': 'Spring',
            'properties': {
              'x': 1,
              'y': 5,
              'z': 0,
              'spring': 0.01,
              'friction': 1,
              'life': null,
              'easing': 'easeLinear',
            },
          },
        ],
        'emitterBehaviours': [
          {
            'id': `${i}-emitter-rotate`,
            'type': 'Rotate',
            'properties': {
              'x': 1,
              'y': 0,
              'z': 0,
              'life': null,
              'easing': 'easeLinear',
              'isEnabled': false,
            },
          },
        ]
      };
  })
  return {
    preParticles: 500,
    integrationType: 'euler',
    emitters
  };
};