import { SpaRender } from "../rendering/SpaRender";

// import { SpaLabel } from './components/SpaLabel';
export class SpaPage
{
    renderer: SpaRender;
    divId = 'spa-app';
    constructor() {
        // this.divId = divId || 'spa-app';
        this.renderer = new SpaRender();
    }
    render() {
        return "j"
    }
}