import { CustomLoader } from '../../loaders/CustomLoader';
import { OBJLoader } from '../../loaders/OBJLoader';
import { GLTFLoader } from '../../loaders/GLTFLoader';
import { STLLoader } from '../../loaders/STLLoader';
import { PLYLoader } from '../../loaders/PLYLoader';

type Loader = typeof OBJLoader | typeof GLTFLoader | typeof STLLoader | typeof PLYLoader;

const EXTENSIONS_TO_LOADERS = new Map<String, Loader>();
EXTENSIONS_TO_LOADERS.set('obj', OBJLoader);
EXTENSIONS_TO_LOADERS.set('gltf', GLTFLoader);
EXTENSIONS_TO_LOADERS.set('glb', GLTFLoader);
EXTENSIONS_TO_LOADERS.set('stl', STLLoader);
EXTENSIONS_TO_LOADERS.set('ply', PLYLoader);

function getFileExtension( filename: String ) {
    return filename.slice(filename.lastIndexOf('.') + 1, filename.length);
}

function getAssociatedLoader( filename: string ): CustomLoader {
    const extension = getFileExtension( filename );
    const loader = EXTENSIONS_TO_LOADERS.get(extension);

    if( loader === undefined ) {
        // TODO Replace with semantic error
        throw new Error();
    }
    return new loader();
}

export { getAssociatedLoader };