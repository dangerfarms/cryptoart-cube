/**
 * @author mrdoob / http://mrdoob.com/
 */
import * as THREE from 'three';

export function parseMTL(object) {
  var output = '';
  var materials = {};

  var mtlFileName = 'objmaterial';
  output += 'mtllib ' + mtlFileName + '.mtl\n';

  var mtlOutput = '';

  for (var key in materials) {
    var mat = materials[key];

    if (mat.name !== '') mtlOutput += 'newmtl ' + mat.name + '\n';
    else mtlOutput += 'newmtl material' + mat.id + '\n';

    mtlOutput += 'Ns 10.0000\n';
    mtlOutput += 'Ni 1.5000\n';
    mtlOutput += 'd 1.0000\n';
    mtlOutput += 'Tr 0.0000\n';
    mtlOutput += 'Tf 1.0000 1.0000 1.0000\n';
    mtlOutput += 'illum 2\n';
    mtlOutput += 'Ka ' + mat.color.r + ' ' + mat.color.g + ' ' + mat.color.b + ' ' + '\n';
    mtlOutput += 'Kd ' + mat.color.r + ' ' + mat.color.g + ' ' + mat.color.b + ' ' + '\n';
    mtlOutput += 'Ks 0.0000 0.0000 0.0000\n';
    mtlOutput += 'Ke 0.0000 0.0000 0.0000\n';

    if (mat.map && mat.map instanceof THREE.Texture) {
      var file = mat.map.image.currentSrc.slice(
        mat.map.image.currentSrc.slice.lastIndexOf('/'),
        mat.map.image.currentSrc.length - 1,
      );

      mtlOutput += 'map_Ka ' + file + '\n';
      mtlOutput += 'map_Kd ' + file + '\n';
    }
  }

  return mtlOutput;
}
