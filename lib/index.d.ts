/// <reference types="node" />
import { ParsedPath } from 'path';
interface Options {
    direction: string;
    threshold: number;
    ceiling: number;
    vertical: boolean;
}
declare class Sorter {
    private image;
    private pixels;
    readonly caller?: ParsedPath;
    protected constructor();
    load(imgPath: string, callback?: Function): Promise<void>;
    save(imgPath: string, callback?: Function): Promise<void>;
    private replaceBuffer;
    private validateOptions;
    lightsort(options: Options): Promise<void>;
    colorsort(options: Options): Promise<void>;
}
export { Sorter };
