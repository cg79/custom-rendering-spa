import { ListComponent } from './../../components/List.component';
import { HomeComponent } from "../../components/Home.component";
import SpaLib from "../../../src/SpaLib";

class HomeModule {

    constructor() {
        const homeComponent = new HomeComponent();
        SpaLib.addComponent('home', homeComponent);

        const listComp = new ListComponent();
        SpaLib.addComponent('list', listComp);

        // const repeater
    }
}

export default new HomeModule();