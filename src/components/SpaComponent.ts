import { SpaRender } from "../rendering/SpaRender";
import { IComponentEvent } from "./events/IComponentEvent";
import { IEventType } from "./events/IEventType";
import { BaseSpaComponent } from "./BaseSpaComponent";

export class SpaComponent  extends BaseSpaComponent {
    node : Node | null = null;

    _template = 
    `
        <label>
        tttttttttttttttttttttttt
        </label>
    `;

    private events: IEventType = {
        
    };
    _model: any;
    constructor() {
        super();
    }

    model(model: any) {
        this._model = model;
        return this;
    }

    template(template: string) {
        this._template = template;
        return this;
    }

    event(eventName: IComponentEvent, func : Function) {
        this.events[eventName] = func;
        return this;
    }

    render() {
        debugger;
        const {events, spaRenderer} = this;
        const node =  spaRenderer.insertElement('a',this._template, this._model);
        if(!node) {
            return;
        }

        this.node = node;
    
        let func = null;
        Object.keys(events).forEach(ev => {
            debugger;
            func = events[ev as IComponentEvent] as Function;
            spaRenderer.assignChildNodeEv(node, ev, func);
        });

        return this;
    }

    setValue(val: any): void {
        if(!this.node) {
            return;
        }
        this.node['value'] = val;
    }
    getValue() : string | null {
        if(!this.node) {
            return null;
        }
        return this.node['value'];
    }

    asInt() {
        const v = this.getValue();
        return v ? parseInt(v) : 0;
    }

}