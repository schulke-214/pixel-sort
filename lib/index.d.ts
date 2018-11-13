/// <reference types="node" />
import { ParsedPath } from 'path';
interface Options {
    direction: string;
    invert: boolean;
    threshold: number;
}
declare class Sorter {
    private image;
    private pixels;
    readonly caller?: ParsedPath;
    protected constructor();
    load(imgPath: string, callback?: Function): Promise<void>;
    save(imgPath: string, callback?: Function): Promise<void>;
    private replaceBuffer;
    bsort(options: Options): Promise<void>;
}
export { Sorter };
