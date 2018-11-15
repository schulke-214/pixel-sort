/// <reference types="node" />
import { ParsedPath } from 'path';
interface Options {
    direction: string;
    invert: boolean;
    threshold: number;
    row: boolean;
    collumn: boolean;
}
declare class Sorter {
    private image;
    private pixels;
    readonly caller?: ParsedPath;
    protected constructor();
    load(imgPath: string, callback?: Function): Promise<void>;
    save(imgPath: string, callback?: Function): Promise<void>;
    private replaceBuffer;
    private flatPixels;
    lightsort(options: Options): Promise<void>;
    colorsort(options: Options): Promise<void>;
}
export { Sorter };
