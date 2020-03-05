import { IMobxModel } from './../services/IMobxModel';
import { SpaComponent } from './SpaComponent';
import { SpaRender } from "../rendering/SpaRender";
import { IComponentEvent } from "./events/IComponentEvent";
import { IEventType, IEventInfo } from "./events/IEventType";
import { observe } from 'rxjs-observe';
import { IMobxModel } from '../services/IMobxModel';

// 
export abstract class BaseSpaComponent {

    data: any = null;
    protected spaRenderer: SpaRender;

    protected _template = '';

    protected node: Node | null = null;

    protected events: IEventType = {

    };

    protected _cssFile = ''

    protected _parentId = '';

    protected _handlers = {};

    protected _parentNode: Node | null = null;

    private _calee: BaseSpaComponent;
    constructor (callee: BaseSpaComponent = null) {
        this._calee = callee;
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

    protected _model: any;
    model ( state: any ) {
        this._mobxModel = this.asObservable( state );

        this._model = state;

        if(this._calee) {
            this._calee.data = this._mobxModel.object;
        } else {
            debugger;
        }

        return this;
    }

    get modelValue () {
        return this.getModel();
    }
    protected _mobxModel: IMobxModel | null = null;
    // mobxModel ( state: IMobxModel ) {
    //     this._mobxModel = state;
    //     return this;
    // }

    private components: Array<BaseSpaComponent> = [];
    addComponent<T> ( fn: ( x: BaseSpaComponent ) => T, thisArg?: any ): BaseSpaComponent {
        const inst: BaseSpaComponent = new SpaComponent();
        fn( inst );
        this.components.push( inst );
        return this;
    }

    asObservable ( obj: any ): IMobxModel {
        const { observables, proxy } = observe( obj );
        return {
            object: proxy,
            observables: observables,
        }
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
    getValue ( node = this.node ): string | null {
        if ( !node ) {
            return null;
        }
        return node[ 'value' ];
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

    abstract updateInterface(): void;
    abstract updateNodeValue (node: Node, val: string): void;

    private insertCssFile () {
        if ( !this._cssFile ) {
            return;
        }
        var head = document.getElementsByTagName( 'head' )[ 0 ];

        var style = document.createElement( 'link' );
        style.href = this._cssFile;
        style.type = 'text/css';
        style.rel = 'stylesheet';
        head.append( style );

    }

    private whatchedProperties: Array<string> | null = null;

    protected propValues = {};

    private parseTemplate(template: string) {
        const result = {
            
        };
        const props = template.match( /(\w+=\".*?\")/gi );

        const unlinkedBindings = template.match( /(>\s{0,}\{)(.*?)(\}\s{0,}<)/gi );
        if(unlinkedBindings) {
           const unlinkArray = unlinkedBindings[0].trim().replace('<', '').replace('>', '');
            result[unlinkArray] = null;
        }
        if(!props && !unlinkedBindings) {
            return null;
        }
        let pValue = [];
        let bindValue = '';
        props && props.forEach(prop => {
            pValue = prop.trim().split('=');
            bindValue = pValue[1];
            
            if(bindValue.indexOf('{') > -1) {
                bindValue = bindValue.replace(/"/g, '');
                result[bindValue]  = pValue[0];
            }
            
        });

        return result;
    }

    private templateToHtmlText = ( template, data ) => {
        // const props = template.match( /(\{)(.*?)(\})/gi );
        const props = this.parseTemplate(template);
        if(!props) {
            return template;
        }
        let wasEmpty = false;
        if(!this.whatchedProperties) {
            this.whatchedProperties = [];
            wasEmpty = true;
        }
        var pName = '';
        let propValue = '';

        Object.keys(props).forEach( p => {
            pName = p.replace( '{', '' ).replace( '}', '' );

            propValue = data[ pName ];
            
            template = template.replace( p,  propValue);

            this.whatchedProperties.push(pName);
        } )

        const {_mobxModel: mobxModel} = this;

        if(wasEmpty && mobxModel) {
            let prop = '';
            for(var i=0;i<this.whatchedProperties.length;i++) {
                    
                    prop = this.whatchedProperties[i];
                    const htmlProp = props[`{${prop}}`];
                    this.subscribePropValueChanged(mobxModel, prop, htmlProp);
                    // const obsProp = mobxModel.observables[ prop ];
                    // if ( obsProp ) {
                    //     obsProp.subscribe( ( value: any ) => {
                    //         if(!this.rendered) {
                    //             return;
                    //         }
                    //         console.log( value );

                    //         this.refresh();
        
                    //     } )
                    // }
        
            }
        }
        return template;
    }

    private subscribePropValueChanged(mobxModel: IMobxModel, prop: string, htmlProp: string) {
        const obsProp = mobxModel.observables[ prop ];
        if ( obsProp ) {
            obsProp.subscribe( ( value: any ) => {
                if(!this.rendered) {
                    return;
                }
                console.log( prop, htmlProp,  value );
                this.propValues[htmlProp] = value;

                this.refresh();

            } )
        }
    }

    private addChild = ( node: Node, template: string, data:any ): Node | null => {
        this.data = data;
        const htmlText = this.templateToHtmlText(template, data);
        
         node.insertAdjacentHTML( 'beforeend', htmlText );

         const lastChild = node.lastChild;
         if(!lastChild) {
             return null;
         }
        return lastChild.previousSibling;
    }

    private insertElement = ( parentId: string, template: string, data:any ): Node | null => {
        this.data = data;
        const htmlText = this.templateToHtmlText(template, data);
        
        const parent = document.getElementById( parentId );
        if(!parent) {
            console.warn('no parent for ', parentId);
            return null;
        }
         parent.insertAdjacentHTML( 'beforeend', htmlText );

         const lastChild = parent.lastChild;
         if(!lastChild) {
             return null;
         }
        return lastChild.previousSibling;
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
            };

            if ( id ) {
                const idValue = this.spaRenderer.textToHtmlText( id, this.getModel() );
                const idNOde = this.findElementById( htmlElement, idValue );
                if ( idNOde ) {
                    htmlElement = idNOde;
                }
            }
            
            htmlElement.addEventListener( evName, ( element ) => {
                exec( element, func );
            } );

            htmlElement[ evName ] = ( el ) => {
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
        if ( !result ) {
            while ( i < childNodes.length && !result ) {
                result = this.findElementById( childNodes[ i ], id )
                i++;
            }
        }
        return result;
    }

    protected getModel () {
        return ( this._mobxModel && this._mobxModel.object ) || this._model;
    }

    private refresh () {
        const { node, components } = this;
        const model = this.getModel();
        // const h = this.templateToHtmlText(this._template, model);
        const h = this.spaRenderer.getHtml( this._template, model );
       
        this.updateNodeValue(node, h);
        // node.innerHTML = h;
        this.assignEvents( node );
        // this.insertCssFile();

        if ( components && components.length ) {

            components.forEach( comp => {
                // comp.parentNode( parentNode );
                comp.render1();
            } )
        }

    }
    private renderLogic (): Node | null {
        const { components } = this;
        let node = null;
        const model = this.getModel();
        if ( this._parentNode ) {
            node = this.addChild( this._parentNode, this._template, model );
        } else {
            node = this.insertElement( 'a', this._template, model );
        }

        if ( !node ) {
            return null;
        }

        this.node = node;

        this.insertCssFile();

        this.assignEvents( node );

        return node;
    }

    rendered = false;
    protected render1 (): Node | null {
        const { components } = this;
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

        this.rendered = true;
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
