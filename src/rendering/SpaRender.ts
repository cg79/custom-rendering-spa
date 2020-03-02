
export class SpaRender {

    data = null;

    textToHtmlText = ( text, data ) => {
        const props = text.match( /(\{)(.*?)(\})/gi );
        if(!props) {
            return text;
        }
        var pName = '';
        props.forEach( p => {
            pName = p.replace( '{', '' ).replace( '}', '' );
            text = text.replace( p, data[ pName ] )
        } )

        return text;
    }

    insertElement = ( parentId: string, template: string, data:any ): Node | null => {
        this.data = data;
        const htmlText = this.textToHtmlText( template, data );
        
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
    removeElement ( id ) {
        const htmlElement = document.getElementById( id );
        if ( !htmlElement ) {
            throw new Error( `no html element for ${ id }` );
        }
        return htmlElement.parentNode.removeChild( htmlElement );
    }

    assignEv = ( id, evName, func ) => {
        let htmlElement = null;
        const exec = ( el ) => func( el, id );
        htmlElement = document.getElementById( id );
        if ( !htmlElement ) {
            throw new Error( `no html element for ${ id }` );
        }
        htmlElement.addEventListener( evName, ( element ) => {
            exec( element );
        } )
        return this;
    }

    assignChildNodeEv = ( childNode:Node, evName: string, func: Function ) => {
        let htmlElement = null;
        const exec = ( el ) => { debugger; func( el ) };
        // htmlElement = document.getElementById( id );
        // if ( !htmlElement ) {
        //     throw new Error( `no html element for ${ id }` );
        // }
        childNode.addEventListener( evName, ( element ) => {
            debugger;
            exec( element );
        } );

        childNode[evName] = (el) => {
            debugger;
            exec(el);
        };
        return this;
    }
    mapClass = ( id, orig, propName ) => {
        let htmlElement = null;
        htmlElement = document.getElementById( id );
        if ( !htmlElement ) {
            throw new Error( `no html element for ${ id }` );
        }

        htmlElement.setAttribute( "class", `${ orig } ${ this.data[ propName ] }` );

        return this;
    }

}
