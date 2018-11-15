const { Sorter } = require('../lib/index.js');

let sorter = new Sorter();

( async () =>  {
    await sorter.load('./data/example-2.jpg');
    await sorter.colorsort({});
    await sorter.save('./output/colorsort.png');
} )()