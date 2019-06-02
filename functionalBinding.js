/*---------- 2019.05.31 ----------------------*/

// set properties on global object
var name = "Window";
var age = "1";

// create an example context object
var alice = {
  name: "Alice",
  age: "2"
};

// define a free function in the global scope
function speak(greeting, prop) {
  greeting = greeting || "Hi";
  prop = prop || "name";
  console.log(greeting + "! My " + prop + " is " + this[prop]);
}

// Note, during invocation in JS strict mode:
// this is undefined, not window
// speak() // TypeError, cannot look up prop of undefined!

// free function invocation (ffi)
// this refers to global/window object
speak(); // Hi! My name is Window

// object decoration
alice.speak = speak;
// method invocation
// this refers to the object "to the left of the dot"
alice.speak(); // Hi! My name is Alice

// explicit this-binding, with variation in interface
// call accepts arbitrary arguments
speak.call(alice, "Hello", "age"); // Hello! My age is 2
// apply accepts an array of arbitrary arguments
speak.apply(alice, ["Hello", "age"]); // Hello! My age is 2

// An approximation of setTimeout:
setTimeout = function(func, wait) {
  // magically waits for `wait` time
  func(); // free function invocation
};
// setTimeout calls the callback using ffi
// (see above)
setTimeout(alice.speak, 2000); // Hi! My name is Window, after 2 sec

// another example of callbacks called with ffi:
$("#submit").on("click", function() {
  // <- ffi callback
  alice.speak(); // <- method invocation!
});

// wrapping the method invocation in a function
// forces setTimeout to call the callback using ffi
// but the callback, in turn, will trigger method invocation
setTimeout(function() {
  speak.call(alice);
}, 2000); // Hi! My name is Alice, after 2 sec

// What if we had a function which permanently connects
// a given method to a given context object?

// example usage of bind to match the functionality above
setTimeout(bind(alice.speak, alice), 2000);

// bind returns a bound function
var boundSpeak = bind(alice.speak, alice, "Hey");

// which can be invoked later or used as a callback
setTimeout(function() {
  boundSpeak("age");
}, 2000); // Hey! My age is 2

// implementation of bind:
// accepts function, context and arbitrary arguments
function bind(func, context) {
  // capture extra arguments
  var args = [].slice.call(arguments, 2);
  // return "decorated" function
  return function() {
    // capture arguments to returned function
    var args2 = [].slice.call(arguments);
    // invoke the original func, in the correct context
    // with all the arguments
    func.apply(context, args.concat(args2));
  };
}

// That's great but binding is already built into JS!
// It's a method of ALL functions

// example usage of built-in .bind method,
// available on all functions
var boundSpeak = alice.speak.bind(alice, "Yo");
setTimeout(function() {
  boundSpeak("age");
}, 2000); // Yo! My age is 2

// implementation of .bind method:
Function.prototype.bind = function(context) {
  var that = this; // <- dynamic value of `this` is captured
  var args = [].slice.call(arguments, 1);
  return function() {
    var args2 = [].slice.call(arguments);
    // previously captured value of `this` is called
    that.apply(context, args.concat(args2));
  };
};

// You can find a full polyfill and more info here:
// https://mdn.io/bind
