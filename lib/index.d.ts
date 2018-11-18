/// <reference types="node" />
import { ParsedPath } from 'path';
interface Options {
    direction: string;
    threshold: number;
    ceiling: number;
}
declare class Sorter {
    private image;
    private pixels;
    readonly caller?: ParsedPath;
    constructor();
    load(imgPath: string, callback?: Function): Promise<void>;
    save(imgPath: string, callback?: Function): Promise<void>;
    private replaceBuffer;
    private validateOptions;
    lightsort(options: Options, callback?: Function): Promise<void>;
    colorsort(options: Options, callback?: Function): Promise<void>;
}
export { Sorter };
