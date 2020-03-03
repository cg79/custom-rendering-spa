import { SpaRender } from "../rendering/SpaRender";
import { IComponentEvent } from "./events/IComponentEvent";
import { IEventType } from "./events/IEventType";
import { BaseSpaComponent } from "./BaseSpaComponent";

export abstract class BaseSpaComposedComponent extends BaseSpaComponent {
    abstract triggerRender (): Node | null;

    model ( state: any ) {
        this._model = state;
        return this;
    }
}
