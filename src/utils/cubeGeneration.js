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
function translateSizeToConfig(cube) {
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

const generateRandomFaces = () => {
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

export const generateCubes = () => {
  const cube1 = generateRandomFaces();
  const maxSquaresPerFace = [9, 16, 25, 36, 49, 64];
  const cube2Squares = cube1.map((face, i) =>
    getRandomInt(maxSquaresPerFace[i] + 1 - face.reduce((a, b) => a + b, 0)),
  );

  const cube2Config = createIntersectingCubeConfig(cube1, cube2Squares);

  const cube3config = cube1.map((face, faceId) =>
    face.map((value, subFaceId) => {
      return value || cube2Config[faceId][subFaceId];
    }),
  );

  return {
    faces: cube1,
    facesSecond: cube2Config,
    facesNew: cube3config,
  };
};
