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
        let img: any;
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
            [ err ] = await to( Jimp.read( imgPath ) );

        if( err ) throw err;
}

    public async quicksort():Promise<void> {
        // do logic
    }
}

export { Sorter };