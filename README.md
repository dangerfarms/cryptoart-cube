#Cube module
Dynamic cube ready for being imported into a project

## Install
Before the first run execute

`yarn install`

---


## Cube
### Running the cube for local development

Just run:

`yarn start`

After that the experience should be available on [https://localhost:3000](https://localhost:3000)

**For now** mock data can be changed or added on file `public\cube.html`.


### Building the cube

Just run:

`yarn build`

A js file containing the cube library will be generated on `\cryptoart_cube_build\cube.bundle.js`.

######Usage

The library can be imported in html `<script>` tag 
```html
<script src="/public/js/cube.bundle.js"></script>
```
or using ES6 `import`.
```javascript
import * as DANGER_CUBE from './libs/cube.bundle.js'
```

The `DANGER_CUBE` variable should be available on global space if imported using script tag or as a local variable if using ES6 import.

The cube viewer can be maped to any html `div`

**Methods**

```javascript
loadCubeIntoDomElement( mockCubeData,  domElement )
```
Will initialize the cube on a specific DOM Element.

Arguments:
- mockCubeData : mockData information (colors and faces)
- domElement : reference to the dom element on where it is intended to appear


**Example**
The following example will load the Cube module on the DOM element with id `root`
```javascript
  window.onload = function() {

    const domElement = document.getElementById("root");
    DANGER_CUBE.loadCubeIntoDomElement(
      mockCubeData,
      domElement,
    );
  };
```


