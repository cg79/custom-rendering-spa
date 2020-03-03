import { SpaRender } from "../rendering/SpaRender";
import { IComponentEvent } from "./events/IComponentEvent";
import { IEventType } from "./events/IEventType";
import { BaseSpaComponent } from "./BaseSpaComponent";
import { SpaComponent } from "./SpaComponent";

// class TestTwo<T extends TestBase> {
//     constructor(private testType: new () => T) {
//     }

//     getNew() : T {
//         return new this.testType();
//     }
// }

export class SpaRepeaterComponent<T extends BaseSpaComponent> extends BaseSpaComponent {

    aaa = [];
    constructor ( private testType: new () => T ) {
        super();
    }

    getNew() : T {
        return new this.testType();
    }

    setModel( list: Array<any> ) {
        if ( !list ) {
            return;
        }
        let comp = null;
        list.forEach( el => {
            comp = this.getNew();
            comp.handlers(this._handlers).cssFile(this._cssFile)
            .model(el);
            // comp.render();
            // this.aaa.push( comp );
        } );
    }
}