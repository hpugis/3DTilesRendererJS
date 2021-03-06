import { B3DMLoaderBase } from '../base/B3DMLoaderBase.js';
import { DefaultLoadingManager } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export class B3DMLoader extends B3DMLoaderBase {

	constructor( manager = DefaultLoadingManager ) {

		super();
		this.manager = manager;

	}

	parse( buffer ) {

		const b3dm = super.parse( buffer );
		const gltfBuffer = b3dm.glbBytes.slice().buffer;
		return new Promise( ( resolve, reject ) => {

			const manager = this.manager;
			const loader = manager.getHandler( 'path.gltf' ) || new GLTFLoader( manager );
			loader.parse( gltfBuffer, null, model => {

				model.batchTable = b3dm.batchTable;
				model.featureTable = b3dm.featureTable;

				model.scene.batchTable = b3dm.batchTable;
				model.scene.featureTable = b3dm.featureTable;

				resolve( model );

			}, reject );

		} );

	}

}
