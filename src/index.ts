import Jimp from 'jimp';
import path, { ParsedPath } from 'path';
import { to } from 'await-to-js';


/*
    !!! TODO !!!
    Add decorators to fire the callback and do other usefull stuff
*/

interface Options {
    direction: string;
    invert: boolean;
    threshold: number;
}

class Sorter {
    private image:any;
    private pixels: number[][][];
    readonly caller?: ParsedPath;

    protected constructor() {
        this.pixels = [];

        if( module.parent )
            this.caller = path.parse( module.parent.filename );
    }

    // @INSTANCEMETHOD LOAD<PROMISE>
    // THIS METHOD LOADS A IMAGE INTO THIS CLASS WITH A GIVEN PATH
    public async load( imgPath: string, callback?: Function ):Promise<void> {
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

    // @INSTANCEMETHOD SAVE<PROMISE>
    // THIS METHOD SAVES THE PIXEL MANIPULATED WITH THIS CLASS TO A GIVEN OUTPUT PATH
    public async save( imgPath: string, callback?: Function ):Promise<void> {
        // VARIABLE DECLARATION
        let err:Error;
        
        // REPLACE THE BUFFER IN THE IMAGE BITMAP WITH THE MANIPULATED VERSION
        this.replaceBuffer()

        // IF THIS CLASS WAS IMPORTED USE THE PATH OF THE CALLER AND SAVE IT RELATIVE TO THAT 
        if( this.caller )
            [ err ] = await to( this.image.writeAsync(path.join( this.caller.dir, imgPath)) );
        else
            [ err ] = await to( this.image.writeAsync() );

        // IF A ERROR OCCURED WHILE SAVING THROW IT
        if( err ) throw err;
    }

    // @INSTACEMETHOD REPLACEBUFFER: Promise<void>
    // THIS METHOD REPLACES THE BUFFER BITMAP WITH MANIPULATED PIXELS
    private async replaceBuffer():Promise<void> {
        // INITIALIZE FLAT ARRAY
        let bitmap:number[] = [];

        // FLATTEN PIXEL ARRAY SO A BITMAP CAN BE CREATED FROM IT
        for( let y = 0; y < this.image.bitmap.height; y++ ) {
            for( let x = 0; x < this.image.bitmap.width; x++ ) {
                bitmap.push(...this.pixels[y][x])
            }
        }

        // CREATE A NEW BUFFER WITH THE BITMAP DATA
        this.image.bitmap.data = Buffer.from(bitmap)
    }

    // SORT ALGORITHM
    public async bsort( options:Options ):Promise<void> {
        // MANIPULATE PIXEL ARRAY
        for( let y = 0; y < this.image.bitmap.height; y++ ) {
            this.pixels[y].sort( ( a, b ) => {
                let brightnessA = a.reduce(( p,q ) => p+q, 0);
                let brightnessB = b.reduce(( p,q ) => p+q, 0);

                if( !options ) {
                    if (brightnessA > brightnessB)
                        return -1;
  
                    else if (brightnessA < brightnessB)
                        return 1;  

                    else
                        return 0;
                }

                else {
                    if (brightnessA < brightnessB)
                    return -1;

                    else if (brightnessA > brightnessB)
                        return 1;  

                    else
                        return 0;
                }
            })
        }
    }
}

export { Sorter };