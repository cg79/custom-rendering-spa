import { SpaRender } from "../rendering/SpaRender";
import { IComponentEvent } from "./events/IComponentEvent";
import { IEventType } from "./events/IEventType";

export abstract class BaseSpaComponent {
    protected spaRenderer: SpaRender;

    protected _model: any;

    protected _template = '';

    protected node: Node | null = null;

    protected events: IEventType = {

    };

    protected _cssFile = ''

    protected _handlers = {};
    constructor () {
        this.spaRenderer = new SpaRender();
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

    model ( state: any ) {
        this._model = state;
        this.render();
        return this;
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

    protected render1 () {
        const { events, spaRenderer } = this;
        const node = spaRenderer.insertElement( 'a', this._template, this._model );
        if ( !node ) {
            return;
        }

        this.node = node;

        this.insertCssFile();

        let func = null;
        Object.keys( events ).forEach( ev => {
            func = events[ ev as IComponentEvent ] as Function;
            spaRenderer.assignChildNodeEv( node, ev, func );
        } );

        return this;
    }

}
