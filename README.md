# pixel-sort
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=popout)](http://opensource.org/licenses/MIT)
[![Dependency Status](https://img.shields.io/david/schulke-214/pixel-sort.svg?style=popout)](https://david-dm.org/schulke-214/pixel-sort)
[![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/pixel-sort.svg?style=popout)](https://bundlephobia.com/result?p=pixel-sort)
[![npm](https://img.shields.io/npm/v/pixel-sort.svg?style=popout)](https://www.npmjs.com/package/pixel-sort/)

[pixel-sort](https://www.npmjs.com/package/pixel-sort/) is a library for creating pixel art with node.js. 

Offering you so much flexibility with a damn easy API.

## Examples
These are a few images sorted with [pixel-sort](https://www.npmjs.com/package/pixel-sort/).

## Table of contents

- [Installation](#promises-asyncawait)
- [API Documentation](#promises-asyncawait)

pixel-sort also offers (stuff)


## Installation

## API Documentation
pixel-sort has only one named export, the ```Sorter``` class. Its responsible for loading all the pixels of a image, sort them and finally save the resulting image.
This example shows how simple the usage of the class can be. It really breaks down into these 3 simple steps: load, manipulate and save.
```js
const { Sorter } = require('pixel-sort');
const sorter = new Sorter();

sorter.load('./raw.png')
    .then( _ => sorter.lightsort({ direction: 'LTR' }) )
    .then( _ => sorter.save('./sorted.png'));
```


##### Loading and Saving Images
##### Algorithms

<!-- ##### Promises & Callbacks -->

## License
pixel-sort is licensed under the [MIT License](https://github.com/schulke-214/pixel-sort/blob/master/LICENSE).

[back to top](#table-of-contents)