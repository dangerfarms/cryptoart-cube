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
export const createIntersectingCubeConfig = (cube1Config, cube2Squares, combineDifference = [0, 0, 0, 0, 0, 0]) => {
  const maxSquaresPerFace = [9, 16, 25, 36, 49, 64];
  const emptyCube = maxSquaresPerFace.map((square, i) => new Array(square).fill(0));

  const freeSquareFaceIndices = cube1Config.map((faceConfig, i) =>
    faceConfig
      .map((e, j) => (e === 0 ? j : ''))
      .filter(String)
      .slice(0, combineDifference[i]),
  );

  const takenIndices = cube1Config.map((faceConfig, i) =>
    faceConfig
      .map((e, j) => (e === 1 ? j : ''))
      .filter(String)
      .slice(0, Math.abs(combineDifference[i])),
  );

  const cube2Config = emptyCube.map((face, i) => {
    if (combineDifference[i] > 0)
      return face.map((square, j) => (freeSquareFaceIndices[i].includes(j) ? 1 : 0));
    if (combineDifference[i] === 0)
      return emptyCube[i]
    return face.map((square, j) => (takenIndices[i].includes(j) ? 1 : 0))
  });

  return cube2Config;
};
