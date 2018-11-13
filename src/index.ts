import Jimp from 'jimp';
import path, { ParsedPath } from 'path';
import { to } from 'await-to-js';

class Sorter {
    private image:any;
    private pixels: number[][][];

    readonly caller:ParsedPath|undefined;

    protected constructor() {
        this.pixels = [];

        if( module.parent )
            this.caller = path.parse( module.parent.filename );
    }

    // @INSTANCEMETHOD LOAD<PROMISE>
    // THIS METHOD LOADS A IMAGE INTO THIS CLASS
    // THE ONLY ARGUMENT IS THE PATH WHERE THE IMAGE WHICH SHOULD BE LOADED IS LOCATED
    public async load( imgPath: string ):Promise<void> {
        // INITIALIZE VARIABLES
        let err:Error;
        let img:any;

        // IN THE CASE THIS CLASS GOT IMPORTET SET THE PATH RELATIVE TO THE DIRECTORY OF THE IMPORT DIR
        // IF JIMP.READ DOESNT FIND A MATCHING IMAGE THE ERROR VARIABLE WILL BE SET 
        if( this.caller )
            [ err, img ] = await to( Jimp.read( path.join( this.caller.dir, imgPath) ) );
        else
            [ err, img ] = await to( Jimp.read( imgPath ) );

        // THROW A CUSTOM ERROR IF NO IMAGE COULD BE LOADED
        if( err ) 
            throw new Error('Image not found.');
        
        // PROCESS THE LOADED IMAGE
        else  {
            // SET THE CLASS VARIABLE TO THE IMAGE
            this.image = img;

            // SPLIT THE BUFFER INTO PIXELS AND SAVE THEM IN THE THIS.PIXELS
            let i:number = 0;
            for( let y = 0; y < this.image.bitmap.height; y++ ) {
                this.pixels[y] = [];
                for( let x = 0; x < this.image.bitmap.width; x++ ) {
                    this.pixels[y][x] = [
                        this.image.bitmap.data[i],
                        this.image.bitmap.data[i + 1],
                        this.image.bitmap.data[i + 2],
                        this.image.bitmap.data[i + 3]
                    ]

                    i += 4
                }
            }
        }
    }

    public async save( imgPath: string ):Promise<void> {
        let err:Error;
        this.replaceBuffer()
        if( this.caller )
            [ err ] = await to( this.image.writeAsync(path.join( this.caller.dir, imgPath)) );
        else
            [ err ] = await to( this.image.writeAsync() );

        if( err ) throw err;
    }

    // SORT ALGORITHM
    public async quicksort():Promise<void> {
        // MANIPULATE PIXEL ARRAY
        for( let y = 0; y < this.image.bitmap.height; y++ ) {
            for( let x = 0; x < this.image.bitmap.width; x++ ) {

            }
        }
    }

    // REPLACES BUFFER BITMAP WITH MANIPULATED PIXELS
    private async replaceBuffer():Promise<void> {
        // FLATTEN PIXEL ARRAY SO A BITMAP CAN BE CREATED FROM IT
        let bitmap:number[] = [];

        for( let y = 0; y < this.image.bitmap.height; y++ ) {
            for( let x = 0; x < this.image.bitmap.width; x++ ) {
                bitmap.push(...this.pixels[y][x])
            }
        }

        this.image.bitmap.data = Buffer.from(bitmap)
    }
}

export { Sorter };