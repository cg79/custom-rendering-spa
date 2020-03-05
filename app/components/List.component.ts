import { SpaRepeaterComponent } from './../../src/components/SpaRepeaterComponent';
import { MobxService } from '../../src/services/MobxService';
import { SpaComponent } from '../../src/components/SpaComponent';

import SpaLib from '../../src/SpaLib';
import { IComponentEvent } from '../../src/components/events/IComponentEvent';
import { IMobxModel } from '../../src/services/IMobxModel';
import { ToDoItem } from './ToDoItem';
import { SpaTextBox } from './SpaTextBox';

export class ListComponent extends SpaComponent {

	data = {
		id: 'xxx',
		id1: 'yyy',
		btnFunc: ( v1, v2 ) => {
			console.log( v1, v2 );

			return v1 + v2;
		},
		v1: '',
		v2: '',
		v3: '',
		mover: ( val, v2 ) => {
			console.log( val );
		},
		list: [ { id: '1a', name: 'john' }, { id: '2a', name: 'ionela' } ],
		text: "hello dinamic button",
		v3class: '',

	};

	render () {

		var y = new SpaTextBox( this )
			.id( 't1' )
			.prop( 'v1' )
			.template(
				`
			<input type="text" value="{v1}">
			`)
			.model( this.data )
			// .event( IComponentEvent.onmouseover, this.data.mover )
			.render();

		var binding = new SpaComponent( this );
		binding
			.name( 'mobx test' )
			.model( this.data )
			.template(
				`
						<button id="changev1">change v1</button>
					
				`)

			.event( IComponentEvent.onclick, ( newValue ) => {
				const { data } = this;
				data.v1 = this.guid();

			}, 'changev1' )
			.render();

		var z = new SpaTextBox( this )
			.id( 't2' )
			.prop( 'v2' )
			.template(
				`
			<input type="text" value="{v2}">
			`)
			.model( this.data )
			.render();

		var x = new SpaComponent( this );
		x.template(
			`
				<button>{id1}</button>
			`)
			.model( this.data )
			.event( IComponentEvent.onclick, ( ev ) => {
				this.data.v3 = this.data.v1 + this.data.v2;
				this.data.v3class = this.guid();

			} )
			.render();

		var total = new SpaTextBox( this );
		total.template(
			`
			<input type="text" value="{v3}" class="{v3class}">
			`)
			.model( this.data )

			// .event( IComponentEvent.onmouseover, this.data.mover )
			.render();

		const repeater = new SpaRepeaterComponent<ToDoItem>( ToDoItem )
		repeater
			.name( 'repeater' )
			.cssFile( '../app/components/ToDoItem.css' )
			
			.model(this.data.list)
			// .setModel( this.data.list )
			.render();
	}
}
