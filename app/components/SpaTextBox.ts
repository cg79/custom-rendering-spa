import { IMobxModel } from '../../src/services/IMobxModel';
import { MobxService } from '../../src/services/MobxService';

import SpaLib from '../../src/SpaLib';
import { IComponentEvent } from '../../src/components/events/IComponentEvent';
import { BaseSpaComponent } from '../../src/components/BaseSpaComponent';
import { SpaComponent } from '../../src/components/SpaComponent';

export class SpaTextBox extends BaseSpaComponent {

	private _id = '';

	id(idVal) {
		this._id = idVal;
		return  this;
	}

	updateInterface() {

	}
	updateNodeValue(node: Node, val: string) {
        if(!node) {
            return;
		}
		debugger;
		var a  = this.propValues;
        node.outerHTML = val;
    }
	private propName = '';
	prop (prop) {
		this.propName = prop;
		return this;
	}
	render () {
		this.event( IComponentEvent.onchange, () => {
			this.data[this.propName] = this.getValue();
		} );
		// const mService = new MobxService();
		// const mobxModel: IMobxModel = mService.asObservable( this.mydata );

		super.render1();

	}
}
