

var obj = {
    name: '1'
};

Object.defineProperty(obj, "name", {
    get : function(){ return this._name;},
    set: function(val){  debugger;this._name = val;}
});
 
obj.name;
//undefined
 
obj.name = "name";




return;

function extend(sup, base) {
  var descriptor = Object.getOwnPropertyDescriptor(
    base.prototype, 'constructor'
  );
  base.prototype = Object.create(sup.prototype);
  var handler = {
    get: function(obj, prop) {
        return prop in obj ?
        obj[prop] : 37;
        
    },
    set: function(obj, prop, value) {
        obj[prop] = value;

        // Indicate success
        return true;
        
    },
    construct: function(target, args) {
      var obj = Object.create(base.prototype);
      this.apply(target, obj, args);
      return obj;
    },
    apply: function(target, that, args) {
      sup.apply(that, args);
      base.apply(that, args);
    }
  };
  var proxy = new Proxy(base, handler);
  descriptor.value = proxy;
  Object.defineProperty(base.prototype, 'constructor', descriptor);
  return proxy;
}

debugger;
var Person = function(name) {
  this.name = name;
};

var Boy = extend(Person, function(name, age) {
  this.age = age;
});

Boy.prototype.gender = 'M';
Boy.plm = 9;


var Peter = new Boy('Peter', 13);

Peter.name = 'asdasd';
Peter.nam1 = 'asdasd';

Peter.gender = 'SS';


console.log(Peter.gender);  // "M"
console.log(Peter.name);    // "Peter"
console.log(Peter.age);     // 13