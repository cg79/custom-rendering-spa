
import { observe } from 'rxjs-observe';

export class MobxService {
  _proxy;
  _observables;

  object;
  state;
  component;

  constructor (component, objName) {
    this.component = component;

    this.object = component[objName];
    const { observables, proxy } = observe(this.object);

    this._proxy = proxy;
    this._observables = observables;

    component[objName] = proxy;
    return this;
  }

  subscribe(listOfProperties, onAfterRendered) {
    
    const props = listOfProperties.replace(/ +/, '').split(',');
    props.forEach(prop => {
      const obsProp = this._observables[prop];
      if (obsProp) {
        this.seeChanges(prop, obsProp, onAfterRendered);
      }
    })

    return this;
  }

  seeChanges(prop, obsProp, onAfterRendered) {
    this.object[prop] = obsProp;
    obsProp.subscribe((value) => {
      this.object[prop] = value;
      console.log(value);

      this.component && this.component.setState(
        { 
          a: new Date() 
        },onAfterRendered
        );
    });
  }

}