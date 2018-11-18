import Jimp from 'jimp';
import path, { ParsedPath } from 'path';
import { to } from 'await-to-js';


/*
    !!! TODO !!!
    Add decorators to fire the callback and do other usefull stuff
    only one sort algorithm at the time - prevent calling 2 at the same time
    Improve API of this package
    Release beta on NPM


    10 zeilen ( y )

    let arr = []
    
    for( let y = 0; y < this.image.bitmap.height; y++ )
        arr.push( pixel )


    [   ZEILEN
        [   PIXEL
            [],
            []
        ]
    ],
    [   ZEILEN
        [   PIXEL
            [],
            []
        ],
    ],
    [   ZEILEN
        [   PIXEL
            [],
            []
        ]
    ]
*/

interface Options {
    direction: string;
    threshold: number;
    ceiling: number;
    vertical: boolean;
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

                    i += 4;
                }
            }
        }
    }

    // @INSTANCEMETHOD SAVE:Promise<void>
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

    // @INSTACEMETHOD REPLACEBUFFER:Promise<void>
    // THIS METHOD REPLACES THE BUFFER BITMAP WITH MANIPULATED PIXELS
    private async replaceBuffer():Promise<void> {
        // INITIALIZE FLAT ARRAY
        let bitmap:number[] = [];

        // FLATTEN PIXEL ARRAY TO FLAT ARRAY
        for( let y = 0; y < this.image.bitmap.height; y++ ) {
            for( let x = 0; x < this.image.bitmap.width; x++ ) {
                bitmap.push(...this.pixels[y][x])
            }
        }

        this.image.bitmap.data = Buffer.from( bitmap );
    }

    private async validateOptions( options:Options ):Promise<void> {

        // OPTIONS.DIRECTION VALIDATION
        if( options.direction ) {
            // DEFAULT ERROR IF WRONG TYPE
            if( typeof options.direction !== 'string' )
                throw new Error('OptionError: direction must be a string.')

            switch( options.direction ) {
                case 'TTB': break;
                case 'BTT': break;
                case 'LTR': break;
                case 'RTL': break;
                default: throw new Error('OptionError: unknown direction.')
            }
        }

        // OPTIONS.THRESHOLD VALIDATION
        if( options.threshold ) {
            // DEFAULT ERROR IF WRONG TYPE
            if( typeof options.threshold !== 'number' )
                throw new Error('OptionError: threshold must be a number.')
        }

        // OPTIONS.CEILING VALIDATION
        if( options.ceiling ) {
            // DEFAULT ERROR IF WRONG TYPE
            if( typeof options.ceiling !== 'number' )
                throw new Error('OptionError: ceiling must be a number.')
        }

        // OPTIONS.VERTICAL VALIDATION
        if( options.vertical ) {
            // DEFAULT ERROR IF WRONG TYPE
            if( typeof options.vertical !== 'boolean' )
                throw new Error('OptionError: vertical must be a boolean.')
        }
    }

    // @INTANCEMETHOD BSORT:Promise<void>
    // THIS SORT ALGORITHM SORTS THE IMAGE BY BRIGHTNESS FOR EACH ROW OR FOR EACH COLLUMN
    public async lightsort( options:Options ):Promise<void> {
        this.validateOptions( options );

        const compareBrightness = ( a:number[], b:number[] ):number => {
            // REMOVE ALPHA VALUES FROM PIXELS
            let brightnessA = a.reduce(( p:number, q:number ) => p+q, 0);
            let brightnessB = b.reduce(( p:number, q:number ) => p+q, 0);

            switch( true ) {
                case options.direction === 'TTB' || options.direction ===  'LTR':
                    if (brightnessA > brightnessB)
                        return -1;
                    else if (brightnessA < brightnessB)
                        return 1;  
                    else
                        return 0;

                case options.direction === 'BTT' || options.direction ===  'RTL':
                    if (brightnessA < brightnessB)
                        return -1;
                    else if (brightnessA > brightnessB)
                        return 1;  
                    else
                        return 0;

                default:
                    return 0;
            }
        }

        if( !options.direction ) 
            options.direction = 'TTB';

        switch( true ) {
            case options.direction === 'TTB' || options.direction ===  'BTT':
                for( let x = 0; x < this.image.bitmap.width; x++ ) {
                    let collumn:number[][] = [];

                    // PUSH PIXELS INTO COL ARRA>
                    for( let y = 0; y < this.image.bitmap.height; y++ )
                        collumn.push( this.pixels[y][x] );

                    // SORT COLLUMN WITH BRIGHTNESS
                    collumn.sort(compareBrightness);

                    // MAP COLLUMN BACK TO THIS.PIXELS
                    for( let y = 0; y < this.image.bitmap.height; y++ )
                        this.pixels[y][x] = collumn[y];
                }


                break; 
            case options.direction === 'LTR' || options.direction ===  'RTL':
                // MANIPULATE PIXEL ARRAY FOR EACH ROW 
                for( let y = 0; y < this.image.bitmap.height; y++ )
                    this.pixels[y].sort(compareBrightness);

                break;
        }

 
    }

    public async colorsort( options:Options ):Promise<void> {

    }
}

export { Sorter };