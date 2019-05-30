/*---------- 2019.05.29 ----------------------*/ // Decorator Pattern

// Pros: simple, user controls all instance properties
// Cons: Same as functional instantiation
//       plus property collision - accidently overriding previous properties
//       (this can be avoided by using _.defaults)
// (A Decorator-Shared pattern - not shown here - could mitigate bloat)

// A simple decorator function which does not create the object but adds to it
var carMaker = function(obj) {
  obj.drive = function() {
    console.log("Driving " + obj.name);
  };

  // Using Object.assign:
  // return Object.assign(obj, {
  //   drive: function() {
  //     console.log('Driving ' + obj.name)
  //   }
  // })
};

// This object is 'decorated' with car methods
var bmw = carMaker({ name: "BMW" }); // Functional Pattern // Pros: simple, relies on basic closure // Cons: all methods are instantiated anew for every instance, i.e. bloat

/*--------------------------------*/ // The most basic type of class, aka. the module pattern
var carMaker = function(name) {
  var car = {}; // Classes are also known as object constructors
  car.name = name + "something";
  obj.drive = function() {
    console.log("Driving " + obj.name);
  };
};

// The new instance is created by the constructor
var bmw = carMaker("BMW"); // Functional-Shared Pattern // Pros: less memory usage than Functional // Cons: If a method is changed in `methods`, old instance aren't updated

/*--------------------------------*/ // Constructors extend the created object
var carMaker = function(name) {
  // Object.assign will copy the methods by reference
  var car = Object.assign({}, carMaker.methods);
  car.name = name;
};

// Object to contain all the methods required by car instances
carMaker.methods = {};

// Note the keyword 'this'
// When used during method.invocation, it referes to the specific instance
carMaker.methods.drive = function() {
  console.log("Driving " + this.name);
};

// The new instance is created by the constructor
var bmw = carMaker("BMW"); // Prototypal Pattern // Pros: uses prototype chain instead of reference, // prototype lookup is dynamic so updates in prototype reflect in all instances

/*--------------------------------*/ // Cons: excess code, not as declarative/descriptive

// Constructors *links* the created object
var carMaker = function(name) {
  // Object.create will create a new object which is linked to carMaker.methods
  // The link allows the new object to access carMaker.methods' properties
  //   whenever it doesn't have the requested property
  var car = Object.create(carMaker.methods);
  car.name = name;
};

// Any object can server as a prototype to another object
// .methods doesn't need to be attached to the contructor except for convenience
carMaker.methods = {};

// Note the keyword 'this'
// When used during method.invocation, it referes to the specific instance
carMaker.methods.drive = function() {
  console.log("Driving " + this.name);
};

// The new instance is created by the constructor
var bmw = carMaker("BMW"); // Pseudoclassical Pattern // Pros: declarative code, dynamic property lookup // Cons: enforces a class hierarchy which can be too rigid for large projects

/*--------------------------------*/ // (this applies to inheritance-based code in general)

// Constructor is .called/.applied by `new` to update the new instance
// Note the idiomatic capitalized naming convention
var Car = function(name) {
  // The constructor no longer creates the new object but augments it
  this.name = name;
};

// Instead of creating an object which will serve as the prototype
// use the built-in Constructor.prototype object
Car.prototype.drive = function() {
  console.log("Driving " + this.name);
};

// The new keyword does much of the same work as the Prototypal pattern
//   - Create a new object using a process similar to
//     `Object.create( Constructor.prototype )`
//   - .call() the constructor in the context of the new object
//   - Set `Constructor.prototype.constructor = constructor` for instanceof
var bmw = new Car("BMW"); // Pseudoclassical Pattern (ES6) // Purely syntactic sugar to make the pseudoclasssical style less "pseudo" // `class` declares the prototype object

/*--------------------------------*/ // and can be paired with `extends` for inheritance
class Car {
  // Same effect as constructors defined earlier but now explicitly named
  // The definition is optional; `class` will create a default definition:
  // constructor(...args) { super(...args) }
  constructor(name) {
    this.name = name;
  }

  // Methods are defined alongside constructor
  // within the body of the class,
  // using "function-shorthand" syntax
  drive() {
    console.log("Driving " + this.name);
  }
}

// Instantiation is still performed with the `new` keyword
var bmw = new Car("BMW");
