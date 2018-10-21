/// <reference types="node" />
import { ParsedPath } from 'path';
declare class Sorter {
    image: any;
    readonly caller: ParsedPath | undefined;
    protected constructor();
    load(imgPath: string): Promise<void>;
    save(imgPath: string): Promise<void>;
    quicksort(): Promise<void>;
}
export { Sorter };
