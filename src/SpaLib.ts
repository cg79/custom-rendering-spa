import { SpaComponent } from './components/SpaComponent';
import { SpaPage } from './page/SpaPage';
import { SpaView } from './view/SpaView';
import { SpaRender } from './rendering/SpaRender';

class SpaLib {

  // page: SpaPage;
  spaRenderer: SpaRender;
  constructor () {
    window['spalib'] = this;
    // this.page = new SpaPage();
    this.spaRenderer = new SpaRender();

  }

  includeView (){
    return new SpaView({});
  }
  
  component(): SpaComponent {
    return new SpaComponent();
  }

  components: any = {};
  addComponent(name: string, component: SpaComponent) {
    this.components[name] = component;
  }
}

export default new SpaLib();
