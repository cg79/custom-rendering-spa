import { SpaRender } from "../rendering/SpaRender";
import { IComponentEvent } from "./events/IComponentEvent";
import { IEventType } from "./events/IEventType";
import { BaseSpaComponent } from "./BaseSpaComponent";
import { SpaComponent } from "./SpaComponent";
import { BaseSpaComposedComponent } from "./BaseSpaComposedComponent";

export class SpaRepeaterComponent<T extends BaseSpaComposedComponent> extends BaseSpaComponent {
    render (): void {
        throw new Error( "Method not implemented." );
    }

    private nodes = {};
    constructor ( private testType: new () => T ) {
        super();
    }

    getNew() : T {
        return new this.testType();
    }

    private _parentNode: Node | null = null;
    setModel( list: Array<any> ) {
        if ( !list ) {
            return;
        }
        this._parentNode = this.spaRenderer.insertHtml('a', 
			`
			<div class="todoContainer">
			</div>
			`);
    
        let comp = null;
        list.forEach( el => {

            const containerItemNode = this.spaRenderer.addHmlChild(this._parentNode, 
			`
			<div class="todorow" id="todolist">
			</div>
            `);
            
            comp = this.getNew();
            
            const node = comp.handlers(this._handlers).cssFile(this._cssFile)
            .parentNode(containerItemNode)
            .model(el)
            .triggerRender();

            this.nodes[el.id] = node;
        } );
    }

    _parentTemplate = '';
    parentTemplate(template: string) {
        this._parentTemplate= template
        return this;
    }
    remove(key: string) {
        const node: Node = this.nodes[key] as Node;
        if(!node) {
            return;
        }
        if(!this._parentNode) {
            return;
        }

        this._parentNode.removeChild(node);
    }
}