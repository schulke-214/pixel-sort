const { Sorter } = require('../lib/index.js');

let sorter = new Sorter();

( async () =>  {
    console.log('*** lightsort ***')

    await sorter.load('./data/example.png');
    await sorter.lightsort({ direction: 'RTL' });
    await sorter.save('./output/lightsort.png');
} )()