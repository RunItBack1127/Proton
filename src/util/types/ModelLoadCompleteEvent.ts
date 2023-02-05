import { Object3D } from "three";

export class ModelLoadCompleteEvent extends Event {
    
    model: Object3D;

    constructor(model: Object3D) {
        super('PROTON_ModelLoadComplete');
        this.model = model;
    }
}