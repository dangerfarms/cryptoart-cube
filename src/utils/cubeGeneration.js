/**
 * Return a cube configuration for a second cube, where no 'on' square would clash with a square
 * from cube 1.
 *
 * - Figure out the squares that are open to be filled
 * - cycle through each face, filling them in as the indice comes along
 *
 * @param cube1Config [[0,0,0,1,0,0,1,0],[0,1..]....]
 * @param cube2Squares [2,0,15,2,5,30]
 */
export const createIntersectingCubeConfig = (cube1Config, cube2Squares) => {
  const maxSquaresPerFace = [9, 16, 25, 36, 49, 64];
  const emptyCube = maxSquaresPerFace.map((square, i) => new Array(square).fill(0));

  const freeSquareFaceIndices = cube1Config.map((faceConfig, i) =>
    faceConfig
      .map((e, j) => (e === 0 ? j : ''))
      .filter(String)
      .slice(0, cube2Squares[i]),
  );

  const cube2Config = emptyCube.map((face, i) =>
    face.map((square, j) => (freeSquareFaceIndices[i].includes(j) ? 1 : 0)),
  );

  // console.log(cube1Config);
  // console.log(freeSquareFaceIndices);
  // console.log(cube2Config);

  return cube2Config;
};

/**
 * Convert an array containing the number of squares per face into a random configuration.
 * @param cube
 */
export function translateSizeToConfig(cube) {
  const maxSquaresPerFace = [9, 16, 25, 36, 49, 64];
  return cube.map((square, i) => {
    const squares = [
      ...new Array(square).fill(1),
      ...new Array(maxSquaresPerFace[i] - square).fill(0),
    ];
    return [...squares].sort(() => 0.5 - Math.random());
  });
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export const generateRandomFaces = () => {
  const cube = [
    getRandomInt(10),
    getRandomInt(17),
    getRandomInt(26),
    getRandomInt(37),
    getRandomInt(50),
    getRandomInt(65),
  ];
  return translateSizeToConfig(cube);
};

export const generateRandomFacesFilled = () => {
  const cube = [
    Math.random() > 0.5 ? 9 : getRandomInt(10),
    Math.random() > 0.5 ? 16 : getRandomInt(17),
    Math.random() > 0.5 ? 25 : getRandomInt(26),
    Math.random() > 0.5 ? 36 : getRandomInt(37),
    Math.random() > 0.5 ? 49 : getRandomInt(50),
    Math.random() > 0.5 ? 64 : getRandomInt(65),
  ];
  return translateSizeToConfig(cube);
};

export const generateCubes = (filled = false) => {
  const cube1 = filled ? generateRandomFacesFilled() : generateRandomFaces();
  const maxSquaresPerFace = [9, 16, 25, 36, 49, 64];
  const cube2Squares = cube1.map((face, i) =>
    getRandomInt(maxSquaresPerFace[i] + 1 - face.reduce((a, b) => a + b, 0)),
  );

  const cube2Config = createIntersectingCubeConfig(cube1, cube2Squares);

  const cube3Config = cube1.map((face, faceId) =>
    face.map((value, subFaceId) => {
      return value || cube2Config[faceId][subFaceId];
    }),
  );

  return {
    faces: cube1,
    facesSecond: cube2Config,
    facesMergedCube: cube3Config,
    facesPreview: cube2Config,
  };
};

const defaultColor = ['#ff003c', '#ff7b00', '#ffcd00', '#ffcd00', '#1e63ff', '#ba0dbe'];
const primeColor = [
  '#00000',
  '#00001',
  '#ffffff',
  '#ffffff',
  '#00004',
  '#ffffff',
  '#00006',
  '#ffffff',
  '#00008',
  '#00009',
  '#00010',
  '#ffffff',
  '#00012',
  '#ffffff',
  '#00014',
  '#00015',
  '#00016',
  '#ffffff',
  '#00018',
  '#ffffff',
  '#00020',
  '#00021',
  '#00022',
  '#ffffff',
  '#00024',
  '#00025',
  '#00026',
  '#00027',
  '#00028',
  '#ffffff',
  '#00030',
  '#ffffff',
  '#00032',
  '#00033',
  '#00034',
  '#00035',
  '#00036',
  '#ffffff',
  '#00038',
  '#00039',
  '#00040',
  '#ffffff',
  '#00042',
  '#ffffff',
  '#00044',
  '#00045',
  '#00046',
  '#ffffff',
  '#00048',
  '#00049',
  '#00050',
  '#00051',
  '#00052',
  '#ffffff',
  '#00054',
  '#00055',
  '#00056',
  '#00057',
  '#00058',
  '#ffffff',
  '#00060',
  '#ffffff',
  '#00062',
  '#00063',
  '#00064',
];

function returnColor(sqr1, sqr2, sqr3, sqr4, sqr5, sqr6) {
  for (var i = 2; i < sqr1; i++) if (sqr1 % i === 0) return defaultColor;
  for (var i = 2; i < sqr2; i++) if (sqr2 % i === 0) return defaultColor;
  for (var i = 2; i < sqr3; i++)
    if (sqr3 % i === 0)
      return [primeColor[sqr1], primeColor[sqr2], '#ff003c', '#ffcd00', '#1e63ff', '#ba0dbe'];
  for (var i = 2; i < sqr4; i++)
    if (sqr4 % i === 0)
      return [
        primeColor[sqr1],
        primeColor[sqr2],
        primeColor[sqr3],
        '#ffcd00',
        '#1e63ff',
        '#ba0dbe',
      ];
  for (var i = 2; i < sqr5; i++)
    if (sqr5 % i === 0)
      return [
        primeColor[sqr1],
        primeColor[sqr2],
        primeColor[sqr3],
        primeColor[sqr4],
        '#1e63ff',
        '#ba0dbe',
      ];
  for (var i = 2; i < sqr6; i++)
    if (sqr6 % i === 0)
      return [
        primeColor[sqr1],
        primeColor[sqr2],
        primeColor[sqr3],
        primeColor[sqr4],
        primeColor[sqr5],
        '#ba0dbe',
      ];
  return [
    primeColor[sqr1],
    primeColor[sqr2],
    primeColor[sqr3],
    primeColor[sqr4],
    primeColor[sqr5],
    primeColor[sqr6],
  ];
}
function calculateThickness(squares) {
  var fullFace = 25;
  var value;
  var interval = 1;
  var k = interval / fullFace;
  if (squares == fullFace) {
    value = 0.01;
    // console.log('The thickness value is:' + value);
    return value;
  } else if (squares % 2 == 0) {
    value = ((fullFace - squares + 1) / 2) * k;
    // console.log('The thickness value is:' + value);
    return value;
  } else {
    value = (-(fullFace - squares) / 2) * k;
    // console.log('The thickness value is:' + value);
    return value;
  }
}

//2, 3, 5, 7, 11, 13 / 6 out of 16
function calculateDisplacementDistance(squares) {
  for (var i = 2; i < squares; i++) if (squares % i === 0) return false;
  return 10 - 10 * (squares / 16);
}
//2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61 / 18 out of 64
function enableDisplacementMovement(squares) {
  for (let i = 2; i < squares; i++) if (squares % i === 0) return false;
  return 0.001;
}

export const adjustedFragmentProperties = (squareCount) => {
  /*
  face1: subSquareOpacity 0.5-0.9
  face2: displacementAnimationDistance (-10)-0 only prime numbers
  face3: thickness (-0.5)-0.5
  face4: explosion (-5)-0
  face5: subSquaresScale 0.7-1
  face6: cylinderOpacity 0-1
  fullness:
  */
  const props = {
    mainCubeSide: 10,
    thickness: calculateThickness(squareCount[2]),
    explosion: -(5 - squareCount[3] * (5 / 36)),
    subSquaresScale: 0.7 + squareCount[4] * (0.3 / 49),
    subSquareOpacity: 0.5 + squareCount[0] * ((0.9 - 0.5) / 9),
    cylinderThickness: 0.1,
    cylinderOpacity: squareCount[5] / 64,
    displacementAnimationDistance: calculateDisplacementDistance(squareCount[1]),
    displacementIncrementPerFrame: enableDisplacementMovement(squareCount[5]),
    colors: returnColor(
      squareCount[0],
      squareCount[1],
      squareCount[2],
      squareCount[3],
      squareCount[4],
      squareCount[5],
    ),
  };
  // console.log(props);
  return props;
};

// converts fragment to Fragment, ie add squareConf and visualProps

export const Fragment = (fragment, exemptSquares = null) => {
  if (exemptSquares) {
    // console.log({ exemptSquares }); // debug
  }
  if (fragment === null) {
    return null;
  }

  const squareConfiguration = exemptSquares
    ? createIntersectingCubeConfig(exemptSquares, fragment.squareCount)
    : translateSizeToConfig(fragment.squareCount);

  return {
    ...fragment,
    id: fragment.id.toString(), // this same-name-prop conversions are bad
    series: fragment.series.toString(),
    squareConfiguration,
    visualProps: adjustedFragmentProperties(fragment),
    // this was properties, but we already have another properties
  };
};
