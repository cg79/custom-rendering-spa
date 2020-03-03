import { ToDoItem } from './ToDoItem';
import { MobxService } from '../../src/services/MobxService';
import { SpaComponent } from '../../src/components/SpaComponent';

import SpaLib from '../../src/SpaLib';
import { IComponentEvent } from '../../src/components/events/IComponentEvent';
import { SpaRepeaterComponent } from '../../src/components/SpaRepeaterComponent';
import { BaseSpaComponent } from '../../src/components/BaseSpaComponent';

export class HomeComponent extends BaseSpaComponent {

	mydata = {
		id: 'xxx',
		id1: 'yyy',
		btnFunc: ( v1, v2 ) => {
			console.log( v1, v2 );

			return v1 + v2;
		},
		v3: 0,
		mover: ( val, v2 ) => {
			debugger;
			console.log( val );
		},
		list: [ { id: '1a', name: 'john' }, { id: '2a', name: 'ionela' } ],
		text: "hello dinamic button",
		name: 'test binding',
		shownewtodoform: false
	};

	render () {

		var binding = SpaLib.component();
			binding
			.name('mobx test')
			.template(
				`
				<div class="todo1">
						<input id="{id}" type="text" value="{name}">
					</div>
				`)
			.event(IComponentEvent.onchange, (ev) => {
				debugger;
			})
			.event(IComponentEvent.onkeyup, (ev) => {
				debugger;
				const val = this.getEventValue(ev);
				binding.setState('name', val + ' hello');
			})
			.subscribe('name', (newValue) => {
				debugger;
			})
			.model( this.mydata )
			.render();

	}
}
