const { Sorter } = require('../lib/index.js');

let sorter = new Sorter();

( async () =>  {
    await sorter.load('example.jpg');
    await sorter.quicksort();
    console.log( process.memoryUsage().rss / 1048576 );
    await sorter.save('sorted.png');
} )()

// sorter.load('./example.png').then( img => {
//     sorter.dirtySort(img, { dirty: true, threshold: 0.231 }).then( sorted => {
//         return sorted.save('path xy');
//     });
// });