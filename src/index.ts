import Jimp from 'jimp';
import path, { ParsedPath } from 'path';
import { to } from 'await-to-js';

class Sorter {
    public image:any;
    readonly caller:ParsedPath|undefined;

    protected constructor() {
        if( module.parent )
            this.caller = path.parse( module.parent.filename );
    }

    public async load( imgPath: string ):Promise<void> {
        let err:Error;
        let img:any;

        // IF THE MODULE GOT IMPORTED
        if( this.caller )
            [ err, img ] = await to( Jimp.read( path.join( this.caller.dir, imgPath) ) );
        else
            [ err, img ] = await to( Jimp.read( imgPath ) );


        if( err ) 
            throw new Error('Image not found.');
        else 
            this.image = img;
    }

    public async save( imgPath: string ):Promise<void> {
        let err:Error;

        if( this.caller )
            [ err ] = await to( this.image.writeAsync(path.join( this.caller.dir, imgPath)) );
        else
            [ err ] = await to( this.image.writeAsync() );

        if( err ) throw err;
    }

    public async quicksort():Promise<void> {
        const data = this.image.bitmap.data;
        let pixels:number[][] = [];

        for( let i = 0; i < data.length; i += 4 ) {
            pixels.push([
                <number> data[i],
                <number> data[i + 1],
                <number> data[i + 2],
                <number> 100 //data[i + 3]
            ])
        }

        // pixels.reduce( (prev, curr) => { prev.concat(curr) });
        // this.image.bitmap.data = pixels.flat();

        console.log( pixels[pixels.length -1] )
    }
}

export { Sorter };