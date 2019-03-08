# pixel-sort

[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=popout)](http://opensource.org/licenses/MIT)
[![Dependency Status](https://img.shields.io/david/schulke-214/pixel-sort.svg?style=popout)](https://david-dm.org/schulke-214/pixel-sort)
[![npm](https://img.shields.io/npm/v/pixel-sort.svg?style=popout)](https://www.npmjs.com/package/pixel-sort/)

[pixel-sort](https://www.npmjs.com/package/pixel-sort/) is a library for creating pixel art with node.js.

## Table of contents

-   [Installation](#installation)
-   [Examples](#examples)
-   [API Documentation](#api-documentation)
-   [License](#license)

## Installation

```bash
yarn add pixel-sort
```

## Examples

#### Input

<img src="./test/data/example.jpg" width="250px">

```js
const { Sorter } = require('pixel-sort');
const sorter = new Sorter();

(async () => {
	// load an image
	await sorter.load('./input.png');

	// apply some filters
	await sorter.lightsort({
		direction: 'LTR'
	});

	// save the image
	await sorter.save('./output.png');
})();
```

#### Output

<img src="./test/output/lightsort.png" width="250px">

<!--
## API Documentation

`pixel-sort` has only one named export, the `Sorter` class. Its responsible for loading all the pixels of a image, sort them and finally save the resulting image. This example shows how simple the usage of the module can be. You can break this down into 3 simple steps: load, manipulate and save.


##### Constructor

##### Load

##### Save

##### Lightsort

##### Colorsort

-->

## License

pixel-sort is licensed under the [MIT License](https://github.com/schulke-214/pixel-sort/blob/master/LICENSE).

[back to top](#pixel-sort)

---

<a href="https://www.browserstack.com/"> <img src="https://p14.zdusercontent.com/attachment/1015988/oJOmCRW36ce5eAuyVAKeXS3ty?token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..NFnqUPin_vf7Rek9Klci9Q.cG9copj1gfdFmnfv9fckcx2x9IOt-AtdIrSwDarKjfxyaDgGfbTOqsabXkfeOEiObLQYbWEz5O8NqJoE-yjgh9MkMwlcFH5-sVPI1YbeN1o-kSI0Xs1hGpeFyLhdouK0e2GEmC8bLg27E-gyXgjtHSjfN4x1Re3Q9vS2Q2O4W4nsHoKxGsgR9U_tpu7UnZjWHHChgEO-uHftXxFHKZ4cKGG0IxPgO0LTIU1AiFokHzvdKJGIYWMzo47njt5aAhg6DpnmaZX4DfCZZmOY4MOaUKdIfpfpTsr8hhi4dRP7d1c.V8EIS0_txg5TdfDTGg-pSw" height="100px" /> </a>

Thanks to [BrowserStack](https://www.browserstack.com/) for supporting the development of this project with awesome testing tools to make this project hopefully run in browser environments soon aswell!
