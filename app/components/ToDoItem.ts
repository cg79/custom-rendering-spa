import { MobxService } from '../../src/services/MobxService';
import { SpaComponent } from '../../src/components/SpaComponent';

import SpaLib from '../../src/SpaLib';
import { BaseSpaComposedComponent } from '../../src/components/BaseSpaComposedComponent';
import { IComponentEvent } from '../../src/components/events/IComponentEvent';

export class ToDoItem extends BaseSpaComposedComponent {
	updateInterface (): void {
		// throw new Error( "Method not implemented." );
	}
	updateNodeValue ( node: Node, val: string ): void {
		// throw new Error( "Method not implemented." );
	}
	render (): void {
		// const node = this.spaRenderer.insertHtml('a', this._html);

	}

	private _html = '';

	triggerRender (): Node| null {

		debugger;
		var y = new SpaComponent(this);
		
		const h1Node = y.template(
			`
			
				<div class="todo">
					<input id="{id}" type="text" value="{name}">
					<button id="changev1">change v1</button>
				</div>
			`)

			.cssFile( this._cssFile )
			.parentNode(this._parentNode)
			// .model( this._model )
			.observedModel(this._mobxModel)
			.event( IComponentEvent.onclick, ( newValue ) => {
				debugger;
				// const { data } = this;
				this._model.name = this.guid();

			}, 'changev1' )
			.render();

		var x = new SpaComponent(this);
		
		const h2Node = x.template(
			`
				<button>{id}</button>
				</div>
			`)

			.handlers( this._handlers )
			.parentNode(this._parentNode)
			.event( IComponentEvent.onclick, ( ev ) => {
				var v1 = y.asInt();
				console.log( v1 );
				this._handlers[ 'ondelete' ]( this._model );
			} )
			.observedModel( this._mobxModel )
			.render();
			this._parentNode.appendChild( h1Node );
			this._parentNode.appendChild( h2Node );

			return this._parentNode;
	
	}

}
