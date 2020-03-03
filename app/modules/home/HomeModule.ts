import { HomeComponent } from "../../components/Home.component";
import SpaLib from "../../../src/SpaLib";

class HomeModule {

    constructor() {
        const homeComponent = new HomeComponent();
        SpaLib.addComponent('home', homeComponent);

        // const repeater
    }
}

export default new HomeModule();