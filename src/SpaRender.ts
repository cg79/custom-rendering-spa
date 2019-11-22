
class SpaRender {

    data = null;

    textToHtmlText = ( text, data ) => {
        const props = text.match( /(\{)(.*?)(\})/gi );
        var pName = '';
        props.forEach( p => {
            pName = p.replace( '{', '' ).replace( '}', '' );
            text = text.replace( p, data[ pName ] )
        } )

        return text;
    }

    insertElement = ( parentId, text, data ) => {
        this.data = data;
        const htmlText = this.textToHtmlText( text, data );

        document.getElementById( parentId ).insertAdjacentHTML( 'beforeend', htmlText );
        return this;
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
