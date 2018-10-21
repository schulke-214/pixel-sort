import Jimp from 'jimp';
import path, { ParsedPath } from 'path';

class Sorter {
    image:any;

    protected constructor() {
        console.log("Hi")
    }

    public async load( imgPath: string ):Promise<void> {
        // IF THE MODULE GOT IMPORTED
        if( module.parent ) {
            let pathObj:ParsedPath = path.parse( module.parent.filename );
            console.log( pathObj.dir );
            // this.image = await Jimp.read( path.join(pathObj.dir, imgPath) );
        }

        // else {
        //     this.image = await Jimp.read( imgPath );
        // }
            
    }

    public async safe( imgPath: string ):Promise<boolean> {

        return true;
    }

    public static async quickSort():Promise<void> {
        // do logic
    }
}

export { Sorter };