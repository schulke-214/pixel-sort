import { Sorter } from '../lib';

let sorter = new Sorter();

sorter.load('./example.png').then( img => {
    sorter.dirtySort(img, { dirty: true, threshold: 0.231 }).then( sorted => {
        return sorted.save('path xy');
    });
});