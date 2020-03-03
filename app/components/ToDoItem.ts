import { MobxService } from '../../src/services/MobxService';
import { SpaComponent } from '../../src/components/SpaComponent';

import SpaLib from '../../src/SpaLib';
import { BaseSpaComponent } from '../../src/components/BaseSpaComponent';
import { IComponentEvent } from '../../src/components/events/IComponentEvent';

export class ToDoItem extends BaseSpaComponent {

	constructor () {
		super();
	}

	render () {
		var y = SpaLib.component();

		y.template(
			`
				<div class="todo">
					<input id={id} type="text" value={name}>
				</div>
			`)
			.model( this._model )
			.cssFile(this._cssFile)
			.render();

		var x = SpaLib.component();
		x.template(
			`
				<button>{id}</button>
			`)
			.model( this._model )
			.handlers( this._handlers )
			.event( IComponentEvent.click, ( ev ) => {
				debugger;
				var v1 = y.asInt();
				console.log( v1 );
				this._handlers[ 'ondelete' ]( this._model );
			} )
			.render();

	}

}
