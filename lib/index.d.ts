/// <reference types="node" />
import { ParsedPath } from 'path';
declare class Sorter {
    private image;
    private pixels;
    readonly caller: ParsedPath | undefined;
    protected constructor();
    load(imgPath: string): Promise<void>;
    save(imgPath: string): Promise<void>;
    quicksort(): Promise<void>;
    private replaceBuffer;
}
export { Sorter };
