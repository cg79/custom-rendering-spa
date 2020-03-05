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
		v3class: ''
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
				// var v1 = this.getValue(y);
				// var v2 = this.getValue(z);

				// var v3 = v1 + v2;

				// console.log( v3 );

				// total.setState( 'v3', v3 );

				// total.setValue(v3);

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
			.handlers( {
				ondelete: ( v ) => {
					const newModel = this.data.list.filter( el => el.id !== v.id );
					this.data.list = newModel;
					repeater.remove( v.id );
				}

			} )
			.setModel( this.data.list )
			.render();
	}
}
