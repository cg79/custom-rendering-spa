import { MobxService } from './../services/MobxService';
import { SpaRender } from "../rendering/SpaRender";
import { IComponentEvent } from "./events/IComponentEvent";
import { IEventType } from "./events/IEventType";
import { observe } from 'rxjs-observe';

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

    name(val: string) {
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

    event ( eventName: IComponentEvent, func: Function ) {
        this.events[ eventName ] = func;
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
        const { _mobx, mobxSubsribers } = this;
        if ( !_mobx ) {
            return;
        }

        mobxSubsribers.forEach( el => {
            const { property, valueChangedEvent } = el;

            const obsProp = this._observables[ property ];
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

    setState ( propName: string, value: any ) {
        this._model[ propName ] = value;
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
        const { events, spaRenderer } = this;
        let func = null;
        Object.keys( events ).forEach( ev => {
            func = events[ ev as IComponentEvent ] as Function;
            spaRenderer.assignChildNodeEv( node, ev, func );
        } );

    }

    protected render1 (): Node | null {
        const { spaRenderer } = this;
        let node = null;
        if ( this._parentNode ) {
            node = spaRenderer.addChild( this._parentNode, this._template, this._model )
        } else {
            node = spaRenderer.insertElement( 'a', this._template, this._model )
        }

        if ( !node ) {
            return null;
        }

        this.node = node;

        this.insertCssFile();

        this.assignEvents( node );

        this.applySubscribers();

        return node;
    }

    getEventValue ( ev: Event ): string | null {
        return ev.target ? ev.target.value : null;
    }

    getEventValueAsNumber ( ev: Event ): Number | null {
        return ev.target ? ev.target.value : null;
    }

    getEventValueAsDate ( ev: Event ): Date | null {
        return ev.target ? ev.target.valueAsDate : null;
    }

}
