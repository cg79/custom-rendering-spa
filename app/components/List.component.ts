import { SpaRepeaterComponent } from './../../src/components/SpaRepeaterComponent';
import { MobxService } from '../../src/services/MobxService';
import { SpaComponent } from '../../src/components/SpaComponent';

import SpaLib from '../../src/SpaLib';
import { IComponentEvent } from '../../src/components/events/IComponentEvent';
import { IMobxModel } from '../../src/services/IMobxModel';
import { ToDoItem } from './ToDoItem';

export class ListComponent extends SpaComponent {

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
		text: "hello dinamic button"
	};

	render () {

		const mService = new MobxService();
		const mobxModel: IMobxModel = mService.asObservable( this.mydata );

		var y = SpaLib.component()
			.template(
				`
			<input type="text">
			`)
			.mobxModel( mobxModel )
			.event( IComponentEvent.onmouseover, this.mydata.mover )
			.render();

		var z = SpaLib.component()
			.template(
				`
			<input type="text">
			`)
			.mobxModel( mobxModel )
			.render();

		var x = SpaLib.component()
			.template(
				`
				<button>{id1}</button>
			`)
			.mobxModel( mobxModel )
			.event( IComponentEvent.onclick, ( ev ) => {
				var v1 = this.getValue(y);
				var v2 = this.getValue(z);

				var v3 = v1 + v2;

				// total.setValue( v3 );
				console.log( v3 );

				total.setState( 'v3', v3 );

				// this.mydata.object.v3 = v3;

				// total.componentReceiveProps({});
				total.setValue(v3);

			} )
			.render();

		var total = SpaLib.component();
			total.template(
				`
			<input type="text" value="{v3}">
			`)
			.mobxModel( mobxModel )
			.event( IComponentEvent.onmouseover, this.mydata.mover )
			.render();

			// debugger;
			const repeater = new SpaRepeaterComponent<ToDoItem>( ToDoItem )
			repeater
			.name('repeater')
			.cssFile( '../app/components/ToDoItem.css' )
				.handlers( {
					ondelete: ( v ) => {
						debugger;
						const newModel = this.mydata.list.filter( el => el.id !== v.id );
						this.mydata.list = newModel;
						// repeater.setModel(newModel)
						repeater.remove( v.id );
					}
	
				} )
				.setModel(this.mydata.list)
				// .mobxModel( mobxModel )
				.render();
	}
}
