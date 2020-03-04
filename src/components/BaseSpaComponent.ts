import { SpaComponent } from './SpaComponent';
import { MobxService } from './../services/MobxService';
import { SpaRender } from "../rendering/SpaRender";
import { IComponentEvent } from "./events/IComponentEvent";
import { IEventType, IEventInfo } from "./events/IEventType";
import { observe } from 'rxjs-observe';
import { IMobxModel } from '../services/IMobxModel';

export abstract class BaseSpaComponent {
    protected spaRenderer: SpaRender;

    protected _model: any;

    protected _template = '';

    protected node: Node | null = null;

    protected events: IEventType = {

    };

    protected _cssFile = ''

    protected _parentId = '';

    protected _handlers = {};

    protected _parentNode: Node | null = null;
    constructor () {
        this.spaRenderer = new SpaRender();
    }

    protected guid = () => {
        const S4 = function () {
            return ( ( ( 1 + Math.random() ) * 0x10000 ) | 0 ).toString( 16 ).substring( 1 );
        }

        return ( S4() + S4() + "-" + S4() + "-4" + S4().substr( 0, 3 ) + "-" + S4() + "-" + S4() + S4() + S4() ).toLowerCase();
    }

    protected _name = '';

    name ( val: string ) {
        this._name = val;
        return this;
    }
    parentId ( parentIdValue: string ) {
        this._parentId = parentIdValue;
        return this;
    }

    parentNode ( node: Node | null ) {
        this._parentNode = node;
        return this;
    }
    cssFile ( cssFilePath: string ) {
        this._cssFile = cssFilePath;
        return this;
    }

    event ( eventName: IComponentEvent, func: Function, id = '' ) {
        let ev = this.events[ eventName ];
        if ( !ev ) {
            this.events[ eventName ] = [];
            ev = this.events[ eventName ];
        }
        ev?.push( { func, id } );
        return this;
    }

    handlers ( val = {} ) {
        this._handlers = val;
        return this;
    }

    private _mobx: MobxService | null = null;
    model ( state: any ) {
        this._mobx = new MobxService();

        state = this.asObservable( state );
        // this.render();
        this._model = state;
        return this;
    }

    get modelValue() {
        return this.getModel();
    }
    protected _mobxModel: IMobxModel | null = null;
    mobxModel ( state: IMobxModel ) {
        this._mobxModel = state;
        return this;
    }

    addChildComponent ( comp: BaseSpaComponent ) {
        const aaa = () => {
            debugger;
        }

        return this;
    }

    private components: Array<BaseSpaComponent> = [];
    addComponent<T> ( fn: ( x: BaseSpaComponent ) => T, thisArg?: any ): BaseSpaComponent {
        debugger;
        const inst: BaseSpaComponent = new SpaComponent();
        fn( inst );
        this.components.push( inst );
        return this;
    }

    _proxy: any;
    _observables: any;
    asObservable ( obj: any ) {
        const { observables, proxy } = observe( obj );

        this._proxy = proxy;
        this._observables = observables;

        return proxy;
    }

    private mobxSubsribers: Array<any> = [];
    subscribe ( property: string, valueChangedEvent: Function ) {

        const v: any = {
            property,
            valueChangedEvent,
        };
        this.mobxSubsribers.push( v );

        return this;
    }

    private applySubscribers () {
        if ( this.stopTrigger ) {
            return;
        }
        const { mobxSubsribers, _mobxModel } = this;

        if ( !_mobxModel ) {
            return;
        }

        mobxSubsribers.forEach( el => {
            const { property, valueChangedEvent } = el;

            const obsProp = _mobxModel.observables[ property ];
            if ( obsProp ) {
                obsProp.subscribe( ( value: any ) => {
                    // this.object[prop] = value;
                    debugger;
                    console.log( value );
                    valueChangedEvent( value );

                } )
            }

        }
            // _mobx.subscribe( el.property, el.valueChangedEvent ) 

        );

        // 
    }

    template ( template: string ) {
        this._template = template;
        return this;
    }

    setValue ( val: any ): void {
        if ( !this.node ) {
            return;
        }
        this.node[ 'value' ] = val;
    }
    getValue (): string | null {
        if ( !this.node ) {
            return null;
        }
        return this.node[ 'value' ];
    }

    asInt () {
        const v = this.getValue();
        return v ? parseInt( v ) : 0;
    }

    private stopTrigger = false;
    setState ( propName: string, value: any ) {
        const m = this._mobxModel;
        if ( !m ) {
            return;
        }
        this.stopTrigger = true;
        m.object[ propName ] = value;
        this.stopTrigger = false;
    }

    abstract render (): void;

    private insertCssFile () {
        if ( !this._cssFile ) {
            return;
        }
        debugger;
        var head = document.getElementsByTagName( 'head' )[ 0 ];

        var style = document.createElement( 'link' );
        style.href = this._cssFile;
        style.type = 'text/css';
        style.rel = 'stylesheet';
        head.append( style );

    }
    getHtml (): string {
        this.insertCssFile();
        return this.spaRenderer.getHtml( this._template, this._model );
    }

    protected assignEvents ( node: Node ) {
        const { events } = this;
        let eventInfo: Array<IEventInfo> | null = null;
        Object.keys( events ).forEach( ( key: string ) => {
            eventInfo = events[ key as IComponentEvent ] as Array<IEventInfo>;
            if ( eventInfo ) {
                this.assignChildNodeEv( node, key, eventInfo );
            }

            //spaRenderer.assignChildNodeEv( node, ev, func );
        } );

    }

    private assignChildNodeEv = ( childNode: Node, evName: string, evInfoArray: Array<IEventInfo> ) => {
        let evInfo: IEventInfo | null = null;

        for ( let i = 0; i < evInfoArray.length; i++ ) {
            evInfo = evInfoArray[ i ];
            let htmlElement = childNode;
            const { func, id } = evInfo;
            const exec = ( el: Event, func: Function ) => {
                const newValue = this.getEventValue( el );
                func( newValue );
                // this.refresh();
            };

            debugger;
            if ( id ) {
                const idValue = this.spaRenderer.textToHtmlText(id, this.getModel());
                const idNOde = this.findElementById( htmlElement, idValue );
                if ( idNOde ) {
                    htmlElement = idNOde;
                }
            }
            // htmlElement = document.getElementById( id );
            // if ( !htmlElement ) {
            //     throw new Error( `no html element for ${ id }` );
            // }
            htmlElement.addEventListener( evName, ( element ) => {
                debugger;
                exec( element, func );
            } );

            htmlElement[ evName ] = ( el ) => {
                debugger;
                exec( el, func );
            };
        }

        return this;
    }

    private findElementById ( parent: Node, id: string ): Node | null {
        if ( !parent ) {
            return null;
        }
        if ( parent.id === id ) {
            return parent;
        }

        const { childNodes } = parent;
        if ( !childNodes ) {
            return null;
        }
        let i = 0;
        let result: Node | null = null;
        while ( i < childNodes.length && !result ) {
            if ( childNodes[ i ].id === id ) {
                result = childNodes[ i ];
            }
            i++;
        }
        i = 0;
        if(!result) {
            while ( i < childNodes.length && !result ) {
                result = this.findElementById(childNodes[i], id)
                i++;
            }   
        }
        return result;
    }

    protected getModel () {
        return this._model || ( this._mobxModel && this._mobxModel.object );
    }

    componentReceiveProps ( newProps: any ) {
        if ( !newProps ) {
            return;
        }
        this.stopTrigger = true;
        this.refresh();
        this.stopTrigger = false;
    }

    private refresh () {
        const {node, components} = this;
        const model = this.getModel();
        const h = this.spaRenderer.getHtml( this._template, model );
        node.innerHTML = h;
        this.assignEvents( node );
        this.insertCssFile();

        if ( components && components.length ) {
            
            components.forEach( comp => {
                // comp.parentNode( parentNode );
                comp.render1();
            } )
        }

    }
    private renderLogic (): Node | null {
        const { spaRenderer, components } = this;
        let node = null;
        const model = this.getModel();
        if ( this._parentNode ) {
            node = spaRenderer.addChild( this._parentNode, this._template, model );
        } else {
            node = spaRenderer.insertElement( 'a', this._template, model );
        }

        if ( !node ) {
            return null;
        }

        this.node = node;

        this.insertCssFile();

        this.assignEvents( node );
        
        return node;
    }
    protected render1 (): Node | null {
        const { spaRenderer, components } = this;
        const node = this.renderLogic();
        this.applySubscribers();

        if ( components && components.length ) {
            const parentNode = this.spaRenderer.addHmlChild( node,
                `
			<div>
			</div>
            `);

            components.forEach( comp => {
                comp.parentNode( parentNode );
                comp.render1();
            } )
        }

        return node;
    }

    protected _containerTemplate: string = '';
    containerTemplate ( template: string ) {
        this._containerTemplate = template;
        return this;
    }
    getEventValue ( ev: Event ): string | null {
        const { target } = ev;
        if ( !target ) {
            return null;
        }
        switch ( target.type ) {
            case 'checkbox': {
                return target.checked;
            }
            default: {
                return target.value;
            }
        }
    }

    getEventValueAsNumber ( ev: Event ): Number | null {
        return ev.target ? ev.target.value : null;
    }

    getEventValueAsDate ( ev: Event ): Date | null {
        return ev.target ? ev.target.valueAsDate : null;
    }

}
