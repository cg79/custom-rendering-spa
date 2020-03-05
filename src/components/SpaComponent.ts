import { SpaRender } from "../rendering/SpaRender";
import { IComponentEvent } from "./events/IComponentEvent";
import { IEventType } from "./events/IEventType";
import { BaseSpaComponent } from "./BaseSpaComponent";

export class SpaComponent  extends BaseSpaComponent {

    updateInterface() {
        
    }
    updateNodeValue(node: Node, val: string) {
        if(!node) {
            return;
        }
        node.innerHTML = val;
    }
    render (): Node | null {
        return this.render1();
        // const {events, spaRenderer} = this;
        // const node =  spaRenderer.insertElement('a',this._template, this._model);
        // if(!node) {
        //     return;
        // }

        // this.node = node;
    
        // let func = null;
        // Object.keys(events).forEach(ev => {
        //     func = events[ev as IComponentEvent] as Function;
        //     spaRenderer.assignChildNodeEv(node, ev, func);
        // });
    }

}