import { SpaRender } from "../rendering/SpaRender";
import { IComponentEvent } from "./events/IComponentEvent";
import { IEventType } from "./events/IEventType";

export class BaseSpaComponent {
    spaRenderer: SpaRender;
    constructor() {
        this.spaRenderer = new SpaRender();
    }

}