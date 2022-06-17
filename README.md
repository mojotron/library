# Library App

This project is part of [The Odin Project](https://www.theodinproject.com)
curriculum. Goal of the project is to learn basic object orientated programing
concepts in JS. Key concepts to learn are object constructors, object prototype,
and prototypal inheritance.
This app is a virtual library for user to keep track of the books or reading hit
list. User can add new book to library, update existing books or delete them.
It is a basic CRUD application.

View live preview of book [Library](https://mojotron.github.io/library/index.html) project via GitHub pages!

### What have I learned?

- Working with HTML form - getting data from user to create new object (in this case new Book())
- How Fontawesome uses ::before ::after pseudo classes.
- Object constructor - create object instance with properties.
- Object Prototype - add methods and functionalities to object instances.
- Prototypal inheritance - how object inherits methods in prototype chain.
- OOP file organization - group code in object/class.
- rest/spread operators and destructuring assignment.
- How to create dynamic html element with JS using innerHTML method and template literal
  string. How to delete or replace existing element with new element (parentNode.changeElement(new; old)).
- How to add event listeners to dynamically created html elements.
- KISS principle - I wanted too much from the start and soon I was too deep and didn't see head nor tail of the project. After realising this, I remembered KISS principle (Keep It Stupidly Simple) and started to implement simpler logic. After code is working, I can start adding more complicated features.
  parentNode.changeElement(new; old)
- CRUD application (Create, Read, Update, and Delete) - in this case book
  objects in the library.
- Storage API - use of localStorage for saving user data

## Part 2 ES6 Classes

Next step in curriculum is to refactor current code, from ES5 constructor functions to ES6 Classes. You can check up refactored code in [js/class_script.js](https://github.com/mojotron/library/blob/main/js/class_script.js) file.

### What have I learned?

- class keyword - special function, template for object creation
- class constructor function - special method for creating and initializing instance of the class.
- setter method with set - binds property to a function to be called when there is an attempt to set that property
- getter method with get - binds property to a function that will be called when that property is looked up
- public instance field declaration

## Part 3 BaaS Firebase

Refactor app to use Firebase cloud storage instead of local storage. Goal of this
part is to learn how to add backend to the frontend projects.

Bonus: UI redesign.

### What have I learned?

- creating, updating, deleting, and reading using Firebase
- adding simple authentication and user management
- firebase security rules syntax
