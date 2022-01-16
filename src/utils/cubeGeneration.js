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

export const generateCubes = () => {
  const cube1 = generateRandomFaces();
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

/*
this function returns a thickness value closer to the default (0.01) as the face is more full
the more the face is full the more the thickness will be reduced to the default value
  */
function calculateThickness(squares){
  var fullFace=25 //as we are using face 3 to define the thickness
  var value
  var interval=1 //set the range to -0.5 to 0.5
  var k = interval/fullFace
  if(squares==fullFace){
    value = 0.01
    console.log("The thickness value is:" + value)
    return value
  }
  else if(squares%2==0){
    value = (((fullFace-squares)+1)/2)*k
    console.log("The thickness value is:" + value)
    return value
  }
  else{
    value =(-(fullFace-squares)/2)*k
    console.log("The thickness value is:" + value)
    return value
  }
}
/*returns a mainCubeSideValue between range as specified*/
function calculateMainCubeSide(squares){
  //return squares*(14/9)-10 //da -10 a +4
  if (squares==9){
    return 10
  }
  else{
    return squares*(10/9)-11 //da -11 a -1
  }
}


function calculateDisplacement(squares1,squares2,squares3,squares4,squares5,squares6){
  var mainCube = calculateMainCubeSide(squares1)
  var expl = 5-squares4*(5/36)
  if(mainCube<0){
    if(-(mainCube)<expl){
      return (6-(squares1/9+squares2/16+squares3/25+squares4/36+squares5/49+squares6/64))/2
    }
  }
  else{
    return 0
  }
}

export const adjustedFragmentProperties = squareCount => {
  // const properties = fragment.properties || []
  // const [cubeSide, thickness, explosion, squareScale, squareOpacity, cylinderThickness, cylinderOpacity] = properties;

  // const props = [
  //   ((cubeSide * 2.0) - 100)/10,
  //   ((thickness * 2.0) - 100)/100,
  //   (explosion * 1.0) / 10,
  //   (squareScale * 1.0) / 100,
  //   (squareOpacity * 1.0) / 100,
  //   (cylinderThickness * 1.0) / 100,
  //   (cylinderOpacity * 1.0) / 100,
  // ];

  /*
  the idea is to have a fragment that looks more like the default fragment view the more it is full
  some of the properties are influenced by the value of each face

  mainCubeSide Face1 - Red
  thickness Face 3 - Yellow
  explosion Face 4 - Green
  subSquaresScale Face 2 - Orange
  subSquareOpacity Face 5 - Blue
  cylinderOpacity - Face 6 - Magenta
  displacementAnimationDistance - Fullness

  Considering we change mainCubeSide also the camera should change accordingly in order to not show a fragment too big or to small in the viewport

  Low Squares fragments looks really good with this setup

  displacement when explosion going out could solve the problem of the one going out
  when mainCubeSide is negative and explosion < of -(mainCubeSide) is ok (looks like going inwards)

  maybe displacement only if overlapping

  fragment.combined true or false

  */
  const props = {
    mainCubeSide: calculateMainCubeSide(squareCount[0]), /* depending on face1 square count, range -11 to 1 */
    thickness: calculateThickness(squareCount[2]),// depending on face3 from -1 to 0
    explosion: 5-squareCount[3]*(5/36), /*depending on face 4 from 5 to 0*/
    subSquaresScale: 0.7 + squareCount[1]*(0.3/16),/*depending on face 2 from 0.7-1*/
    subSquareOpacity: 0.3 + squareCount[4]*((0.9-0.3)/49),//.9, depending on face 5 from 0.3 to 0.9
    cylinderThickness: .03,
    cylinderOpacity: squareCount[5]/64,//.2 depending on face 6 from 0 to 1
    displacementAnimationDistance: 0,//calculateDisplacement(fragment.colorConf[0],fragment.colorConf[1],fragment.colorConf[2],fragment.colorConf[3],fragment.colorConf[4],fragment.colorConf[5])
  }
  console.log(props);
  return props;
}

// converts fragment to Fragment, ie add squareConf and visualProps

export const Fragment = (fragment, exemptSquares = null) => {
  if (exemptSquares) {
    console.log({exemptSquares}) // debug
  }
  if (fragment === null) {
    return null
  }

  const squareConfiguration = exemptSquares
    ? createIntersectingCubeConfig(exemptSquares, fragment.squareCount)
    : translateSizeToConfig(fragment.squareCount)

  return {
    ...fragment,
    id: fragment.id.toString(), // this same-name-prop conversions are bad
    series: fragment.series.toString(),
    squareConfiguration,
    visualProps: adjustedFragmentProperties(fragment)
    // this was properties, but we already have another properties
  }
}
