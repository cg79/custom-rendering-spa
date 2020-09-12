

var opush = Array.prototype.push;

Array.prototype.push = function() {
    debugger;
    console.log(this);
    opush.apply(this, arguments);
}

var a = [];
a.push(3);


if (!Object.prototype.watch) {
 Object.defineProperty(
   Object.prototype,
   "watch", {
     enumerable: false,
     configurable: true,
     writable: false,
     value: function (prop, handler) {
       var old = this[prop];
       var cur = old;
       var getter = function () {
          return cur;
       };
       var setter = function (val) {
        old = cur;
        cur =
          handler.call(this,prop,old,val);
        return cur;
       };
 
       // can't watch constants
       if (delete this[prop]) {
        Object.defineProperty(this,prop,{
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });
       }
    }
 });
}

var obj = {
    namedd: '1',
    fields: {}
};

// observe = (obj, prop) => {
//     Object.defineProperty(obj, prop, {
//         get : () => { return obj[prop];},
//         set: (val) => {  debugger;obj[prop] = val;}
//     })
// }


observe = function(obj, prop){
    Object.defineProperty(obj, prop, {
        get : function() { return this.fields[prop];},
        set: function(val) {  debugger;this.fields[prop] = val;}
    })
}

// Object.defineProperty(obj, "name", {
//     get : function(){ return this._name;},
//     set: function(val){  this._name = val;}
// });

 
// obj.name;
//undefined

observe(obj, 'name1'); 

obj.name1 = "name";
obj.name2 = "name2";

// Object.watch(obj, 'name2');
obj.watch('name2', (v) => {
    console.log(v);
    debugger;
});
obj.name2 = "name2__";

debugger;








