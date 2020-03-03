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
		name: 'test 2 way binding',
		shownewtodoform: false
	};

	render () {
		debugger;
		for ( var i = 0; i < 10; i++ ) {
			this.mydata.list.push( {
				id: this.guid(),
				name: this.guid()
			} );
		}
		var y = SpaLib.component();
		y.template(
			`
			<input type="text">
			`)
			.event( IComponentEvent.mouseover, this.mydata.mover )
			.model( this.mydata )

			.render();

		var z = SpaLib.component();
		z.template(
			`
			<input type="text">
			`)
			.model( this.mydata )
			.render();

		var x = SpaLib.component();
		x.template(
			`
				<button>{id1}</button>
			`)

			.event( IComponentEvent.click, ( ev ) => {
				var v1 = y.asInt();
				var v2 = z.asInt();

				var v3 = this.mydata.btnFunc( v1, v2 );

				total.setValue( v3 );
				console.log( v3 );

				this.mydata.v3 = v3;

			} )
			.model( this.mydata )
			.render();

			var total = SpaLib.component();
			total.template(
				`
			<input type="text">
			`)
			.event( IComponentEvent.mouseover, this.mydata.mover )
			.model( this.mydata )
			.render();
		
			var twoWayBinding = SpaLib.component();
			twoWayBinding.template(
			`
			<div class="todo1">
					<input id={id} type="text" value={name}>
				</div>
			`)
			.model( this.mydata )
			.render();

		debugger;
		const repeater = new SpaRepeaterComponent<ToDoItem>( ToDoItem )
		repeater.cssFile( '../app/components/ToDoItem.css' )
			.handlers( {
				ondelete: ( v ) => {
					debugger;
					const newModel = this.mydata.list.filter( el => el.id !== v.id );
					this.mydata.list = newModel;
					// repeater.setModel(newModel)
					repeater.remove( v.id );
				}

			} )
			.setModel( this.mydata.list )

		SpaLib.component()
			.template(
				`
				<button>new todo</button>
			`)
			.event( IComponentEvent.click, () => this.mydata.shownewtodoform = true )
			.model( this.mydata )
		// .render();

		const mService = new MobxService();
		this.mydata = mService.asObservable( this.mydata );
		mService.subscribe( 'v3', ( v ) => {
			console.log( v );
			debugger;
		} )
			.subscribe( "shownewtodoform", ( newv, oldv ) => {
				debugger;
				if ( newv ) {
					var newtodof = SpaLib.component();
					newtodof.template(
						`
					<input type="text">
					<button id='savetodo'>new todo</button>
				`)
						.render();
				}
			} )

	}
}
