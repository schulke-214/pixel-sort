const { Sorter } = require('../lib/index.js');

let sorter = new Sorter();

( async () =>  {
    await sorter.load('./data/example.png');
    await sorter.lightsort({});
    await sorter.save('./output/lightsort.png');
} )()