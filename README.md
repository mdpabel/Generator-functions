# Iterator

## Return function inside a function

```js
function createNewFunction() {
  function add2(num) {
    return num + 2;
  }
  return add2;
}
const newFunction = createNewFunction();
const result = newFunction(3);
```

I create a function called createNewFunction. I then create a placeholder newFunction that was gonna be whatever came out the bottom of running createNewFunction. Well, what came out the bottom was an entire function definition add2 returned out. I now use the new global label newFunction for that functionality add2, forming those add2 to run it, pass in 3, add2 to it, get out 5 and throw it in the global constant result.

## We want to create a function that holds both our array, the position we are currently at in our ‘stream’ of elements and has the ability to return the next element

```js
function createFunction(array) {
  let i = 0;
  function inner() {
    const element = array[i];
    i++;
    return element;
  }
  return inner;
}
const returnNextElement = createFunction([4, 5, 6]);
const element1 = returnNextElement(); // 4
const element2 = returnNextElement(); // 5
```

The value of 'i' is kept track by the closure created by the inner function. A closure is a function that remembers values in the environment in which it was created. In this case, the inner function has access to the variable 'i' even after the createFunction() has returned and the inner function has been assigned to the 'returnNextElement' variable. Each time the 'returnNextElement' function is called, it accesses and increments the value of 'i', allowing it to keep track of its state between invocations.

- When the function inner is defined, it gets a bond to the
  surrounding Local Memory in which it has been defined
- When we return out inner, that surrounding live data is
  returned out too - attached on the ‘back’ of the function
  definition itself (which we now give a new global label
  returnNextElement)
- When we call returnNextElement and don’t find
  array or i in the immediate execution context, we look
  into the function definition’s ‘backpack’ of persistent live
  data
- The ‘backpack’ is officially known as the C.O.V.E. or
  ‘closure’

##### returnNextElement has everything we need all bundled up in it

- Our underlying array itself
- The position we are currently at in our ‘stream’ of
  elements
- The ability to return the next element

This relies completely on the special property of
functions in javascript that when they are born inside
other functions and returned - they get a backpack
(closure)

Here returnNextElement is the iterator

###### So iterators turn our data into ‘streams’ of actual values we can access one after another.

##### C.O.V.E. => closed over variable environment

##### persistent lexical scope reference data. It refers to the practice of preserving the values of variables in a closure, even after the outer function has returned and is no longer in scope. The inner function retains access to the variables in its lexical scope, even if they are no longer accessible from the outside. This is due to the closure created by the inner function, which keeps a reference to the variables in the outer function's scope.

### Lexical scope

Lexical scope refers to the way in which variables and functions are bound to specific regions of code, and how those bindings determine the visibility and accessibility of those variables and functions within the code.

```js
function outer() {
  let outerVariable = "I'm in the outer scope";
  function inner() {
    let innerVariable = "I'm in the inner scope";
    console.log(outerVariable); // Output: "I'm in the outer scope"
  }
  inner();
}
outer();
```

In this example, the inner function has access to variables declared in its own scope (innerVariable) as well as any variables in its parent scope, which is the outer function's scope (outerVariable). This is an example of lexical scoping, where the scope of a variable is determined by its position in the code, not by its execution.

A closure is a function that has access to its outer function's scope even after the outer function has returned. This is because the closure has a reference to the lexical scope of the outer function, hence it is called a lexical scope closure.

### Iterable Object

```js
function Words(string) {
  this.str = string;
}

Words.prototype[Symbol.iterator] = function () {
  // YOUR CODE HERE
  const splitStr = this.str.split(' ');
  let i = 0;
  let isDone = false;
  return {
    next: function () {
      if (i == splitStr.length) {
        isDone = true;
      }
      const value = splitStr[i];
      i += 1;
      return { value, done: isDone };
    },
  };
};

// Uncomment the lines below to test your work
const helloWorld = new Words('Hello World');

for (let word of helloWorld) {
  console.log(word);
} // -> should log 'Hello' and 'World'
```

## Symbol.iterator

The Symbol.iterator static data property represents the well-known symbol specifying the method that returns the iterator for an object. If this property is set on an object, it is an iterable and can be used in a for...of loop and various other syntaxes.

# Generator

Generator function\* return a generator object with the property of next

### yield

The yield operator is used to pause and resume a generator function.
