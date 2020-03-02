import { HomeComponent } from "../../components/Home";
import SpaLib from "../../../src/SpaLib";

class HomeModule {

    constructor() {
        const homeComponent = new HomeComponent();
        SpaLib.addComponent('home', homeComponent);
    }
}

export default new HomeModule();