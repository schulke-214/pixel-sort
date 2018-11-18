const { Sorter } = require('../lib/index.js');

let sorter = new Sorter();

( async () =>  {
    await sorter.load('./data/example.jpg');
    await sorter.lightsort({ direction: 'LTR' }, () => console.log("callback"));
    await sorter.lightsort({ direction: 'BTT' });
    await sorter.save('./output/lightsort.png');
} )()