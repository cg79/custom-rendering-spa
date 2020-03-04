import { MobxService } from '../../src/services/MobxService';
import { SpaComponent } from '../../src/components/SpaComponent';

import SpaLib from '../../src/SpaLib';
import { BaseSpaComposedComponent } from '../../src/components/BaseSpaComposedComponent';
import { IComponentEvent } from '../../src/components/events/IComponentEvent';

export class ToDoItem extends BaseSpaComposedComponent {
	render (): void {
		// const node = this.spaRenderer.insertHtml('a', this._html);

		debugger;
	}

	private _html = '';

	triggerRender (): Node| null {

		debugger;

		var y = SpaLib.component();
		
		const h1Node = y.template(
			`
			
				<div class="todo">
					<input id="{id}" type="text" value="{name}">
				</div>
			`)

			.cssFile( this._cssFile )
			.parentNode(this._parentNode)
			.model( this._model )
			.render();

		var x = SpaLib.component();
		
		const h2Node = x.template(
			`
				<button>{id}</button>
				</div>
			`)

			.handlers( this._handlers )
			.parentNode(this._parentNode)
			.event( IComponentEvent.onclick, ( ev ) => {
				debugger;
				var v1 = y.asInt();
				console.log( v1 );
				this._handlers[ 'ondelete' ]( this._model );
			} )
			.model( this._model )
			.render();
			this._parentNode.appendChild( h1Node );
			this._parentNode.appendChild( h2Node );

			return this._parentNode;
	
	}

}
