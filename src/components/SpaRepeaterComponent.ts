import { SpaRender } from "../rendering/SpaRender";
import { IComponentEvent } from "./events/IComponentEvent";
import { IEventType } from "./events/IEventType";
import { BaseSpaComponent } from "./BaseSpaComponent";
import { SpaComponent } from "./SpaComponent";
import { BaseSpaComposedComponent } from "./BaseSpaComposedComponent";

export class SpaRepeaterComponent<T extends BaseSpaComposedComponent> extends BaseSpaComposedComponent {
    triggerRender (): Node {
        throw new Error( "Method not implemented." );
    }
    render (): void {
        const list = this._mobxModel.object;
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
        
        comp = this.getNew(this);
        
        const node = comp.handlers(this._handlers)
        .cssFile(this._cssFile)
        .parentNode(containerItemNode)
        .model(el)
        .triggerRender();

        this.nodes[el.id] = node;
    } );
    
    var binding = new SpaComponent(this);
    binding
        .name( 'mobx test' )
        .model( this.data )
        .template(
            `
                    <button id="btnShowModel">show model to console</button>
                
            `)
    
        .event( IComponentEvent.onclick, ( newValue ) => {
            console.log(this._mobxModel.object);
    
        }, 'btnShowModel' )
        .render();
    }
    updateInterface (): void {
        throw new Error( "Method not implemented." );
    }
    updateNodeValue ( node: Node, val: string ): void {
        throw new Error( "Method not implemented." );
    }
    // render (): void {
    //     throw new Error( "Method not implemented." );
    // }

    private nodes = {};
    constructor ( private testType: new (parent: BaseSpaComponent | null ) => T ) {
        super();
    }

    getNew(parent: BaseSpaComponent | null) : T {
        return new this.testType(parent);
    }

    // private _parentNode: Node | null = null;
    setModel( list: Array<any> ) {
        if ( !list ) {
            return;
        }
        debugger;

        // this._mobxModel = this.asObservable( list );
    
        // this._model = this._mobxModel.object;
    
            // if(this._calee) {
            //     this._calee.data = this._mobxModel.object;
            // } else {
            //     debugger;
            // }

        return this;
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