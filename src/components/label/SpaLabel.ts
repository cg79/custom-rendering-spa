import { SpaComponent } from '../SpaComponent';
export class SpaLabel extends SpaComponent{
    template = `<label>asd</label>`

    model: any;
    constructor(model: any) {
        super();
        this.model = model;
    }
}
