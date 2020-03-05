import { IMobxModel } from './../../src/services/IMobxModel';
import { MobxService } from '../../src/services/MobxService';

import SpaLib from '../../src/SpaLib';
import { IComponentEvent } from '../../src/components/events/IComponentEvent';
import { BaseSpaComponent } from '../../src/components/BaseSpaComponent';
import { SpaComponent } from '../../src/components/SpaComponent';

export class HomeComponent extends BaseSpaComponent {

	data = {
		id: 'inputId',
		id1: 'yyy',
		btnFunc: ( v1, v2 ) => {
			console.log( v1, v2 );

			return v1 + v2;
		},
		v3: 0,
		mover: ( val, v2 ) => {
			console.log( val );
		},
		list: [ { id: '1a', name: 'john' }, { id: '2a', name: 'ionela' } ],
		text: "hello dinamic button",
		name: 'test binding',
		shownewtodoform: false,
		showInput: true,
		inputclass: 'default',
	};

	render () {
		// const mService = new MobxService();
		// const mobxModel: IMobxModel = mService.asObservable( this.mydata );

		debugger;
		var binding = new SpaComponent(this);
		binding
			.name( 'mobx test' )
			.model( this.data )
			.template(
				`
				<div>
					<div class="todo1">
						<input id="{id}" class="{inputclass}" type="text" value="{name}">
						<button id="btnShowHide">show hide</button>
						<label for="vehicle1"> Show Hide text box</label><br>
					</div>
					<div>
						<label>{name}</label>
					</div>
					<div>
						<button id="showmodel">show model</button>
					</div>
				</div>
				`)
			.cssFile( '../app/components/HomeComponent.css' )
			.event( IComponentEvent.onchange, ( newValue ) => {
				this.data.name = newValue;

			}, '{id}' )
			.event( IComponentEvent.onclick, ( newValue ) => {

				const {data} = this;

				data.showInput = !data.showInput;
				const {showInput} = data;

				if ( showInput ) {
					data.inputclass = 'default';
				} else {
					data.inputclass = 'hidden';
				}

			}, 'btnShowHide' )
			.event( IComponentEvent.onclick, ( newValue ) => {

				const {data} = this;

				console.log(data);

			}, 'showmodel' )
			.subscribe( 'name', ( newValue ) => {
				console.log(' name changed ', name);
			} )
			.containerTemplate(
				`
					<div class="parent">
					</div>
            `)
			// .mobxModel( mobxModel )
			// .addComponent( ( comp ) => {
			// 	comp.name( 'new 1' )
			// 		.mobxModel( mobxModel )
			// 		.subscribe( 'name', ( newValue ) => {
			// 			comp.componentReceiveProps( { name: newValue } );
			// 		} )
			// 		.template( `
			// 		<label>{name}</label>
			// 	`)
			// } )
			.render();

	}
}
