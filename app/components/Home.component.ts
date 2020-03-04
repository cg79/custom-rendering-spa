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
		shownewtodoform: false,
		inputclass: ''
	};

	render () {
		const mService = new MobxService();
		const mobxModel: IMobxModel = mService.asObservable( this.mydata );
		debugger;

		var binding = SpaLib.component();
		binding
			.name( 'mobx test' )
			.template(
				`
				<div class="todo1">
						<input id="{id}" class="{inputclass}" type="text" value="{name}">
						<input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
						<label for="vehicle1"> I have a bike</label><br>
					</div>
				`)
			.event( IComponentEvent.onchange, ( newValue ) => {
				debugger;
				// const val = this.getEventValue(ev);
				binding.setState( 'name', newValue );
			}, 'myInput' )
			.event( IComponentEvent.onchange, ( newValue ) => {
				debugger;
				// const val = this.getEventValue(ev);
				if(newValue) {
					binding.setState( '', 'hidden' );
				} else {
					binding.setState( 'inputclass', 'test' );
				}
				
			}, 'vehicle1' )
			.subscribe( 'name', ( newValue ) => {
				debugger;
			} )
			.containerTemplate(
				`
					<div class="parent">
					</div>
            `)
			.mobxModel( mobxModel )
			.addComponent( ( comp ) => {
				comp.name( 'new 1' )
					.mobxModel( mobxModel )
					.subscribe( 'name', ( newValue ) => {
						debugger;
						comp.componentReceiveProps( { name: newValue } );
					} )
					.template( `
					<label>{name}</label>
				`)
			} )
			.render();

	}
}
