const { Sorter } = require('../lib/index.js');

let sorter = new Sorter();

( async () =>  {
    console.log('*** lightsort ***')

    await sorter.load('./data/example-2.jpg');
    await sorter.lightsort({ direction: 'LTR' });
    await sorter.lightsort({ direction: 'BTT' });
    await sorter.save('./output/lightsort.png');
} )()