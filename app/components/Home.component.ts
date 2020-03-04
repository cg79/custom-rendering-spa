import { IMobxModel } from './../../src/services/IMobxModel';
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
		const mService = new MobxService();
		const mobxModel: IMobxModel = mService.asObservable( this.mydata );
		debugger;

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
				const val = this.getEventValue(ev);
				binding.setState('name', val + ' hello');
			})
			.subscribe('name', (newValue) => {
				debugger;
			})
			.containerTemplate(
				`
					<div class="parent">
					</div>
            `)
			.mobxModel( mobxModel )
			.addComponent((comp) => {
				comp.name('new 1')
				.mobxModel(mobxModel)
				.subscribe('name', (newValue) => {
					debugger;
					comp.componentReceiveProps({name: newValue});
				})
				.template(`
					<label>{name}</label>
				`)
			})
			.render();

	}
}
