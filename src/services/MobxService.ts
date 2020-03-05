
import { observe } from 'rxjs-observe';
import { IMobxModel } from './IMobxModel';

export class MobxService {
  _proxy;
  _observables;

  object;
  state;
  component;

  asObservable(obj): IMobxModel {
    const { observables, proxy } = observe( obj );

    this._proxy = proxy;
    this._observables = observables;

    this.object = proxy;
    
    return {
      object: proxy,
      observables: observables,
    }
  }
  
  subscribe ( property: string, valueChangedEvent: Function ) {

    // const props = listOfProperties.replace( / +/, '' ).split( ',' );
    // props.forEach( (prop: string) => {
      const obsProp = this._observables[ property ];
      if ( obsProp ) {
        obsProp.subscribe( ( value: any ) => {
          // this.object[prop] = value;
          console.log( value );
          valueChangedEvent(value);
    
        })
      }
    // } )

    return this;
  }

}