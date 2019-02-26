const {
    Sorter
} = require('../lib/index.js');

let sorter = new Sorter();

void async function () {
    await sorter.load('./data/example.jpg');

    await sorter.lightsort({
        direction: 'LTR'
    }, () => console.log("sorted"));

    // await sorter.lightsort({
    //     direction: 'BTT'
    // });

    await sorter.save('./output/lightsort.png');
}()

// sorter.load('./data/example.jpg', err => {
//     if (err) throw err;

//     sorter.lightsort({
//         direction: 'LTR'
//     }, err => {
//         if (err) throw err;

//         sorter.save('./output/lightsort.png', err => {
//             if (err) throw err;
//         });
//     });
// });