import { SpaRepeaterComponent } from './../../src/components/SpaRepeaterComponent';
import { MobxService } from '../../src/services/MobxService';
import { SpaComponent } from '../../src/components/SpaComponent';

import SpaLib from '../../src/SpaLib';
import { IComponentEvent } from '../../src/components/events/IComponentEvent';

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

		var y = SpaLib.component()
			.template(
				`
			<input type="text">
			`)
			.model( this.mydata )
			.event( IComponentEvent.mouseover, this.mydata.mover )
			.render();

		var z = SpaLib.component()
			.template(
				`
			<input type="text">
			`)
			.model( this.mydata )
			.render();

		var x = SpaLib.component()
			.template(
				`
				<button>{id1}</button>
			`)
			.model( this.mydata )
			.event( IComponentEvent.click, ( ev ) => {
				var v1 = y.asInt();
				var v2 = z.asInt();

				var v3 = this.mydata.btnFunc( v1, v2 );

				total.setValue( v3 );
				console.log( v3 );

				this.mydata.v3 = v3;

			} )
			.render();

		var total = SpaLib.component()
			.template(
				`
			<input type="text">
			`)
			.model( this.mydata )
			.event( IComponentEvent.mouseover, this.mydata.mover )
			.render();

		// var repeater = new SpaRepeaterComponent<>	
		debugger;

		const mService = new MobxService();
		this.mydata = mService.asObservable( this.mydata );
		mService.subscribe( 'v3', ( v ) => {
			console.log( v );
			debugger;
		} )

	}
}
