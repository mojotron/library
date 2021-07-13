"use strict";
let updateBookById; //used to store id of book user want to update
function Library() {
  this.bookId = 0; //used to target specific book in dom and library
  this.bookcase = {}; //save books in format id:{new Book()}
}
Library.prototype.incrementBooId = function () {
  this.bookId++;
};

Library.prototype.getBookId = function () {
  return this.bookId;
};

Library.prototype.addBook = function (book) {
  this.bookcase[this.getBookId()] = book;
  this.incrementBooId();
  this.listBooks();
};

Library.prototype.deleteBook = function (id) {
  delete this.bookcase[id];
};
Library.prototype.listBooks = function () {
  const booksShowcase = document.querySelector(".books-showcase");
  booksShowcase.innerHTML = "";
  for (let book in this.bookcase) {
    let bookEle = this.bookcase[book].renderBookHtml(book);
    booksShowcase.appendChild(bookEle);
    const read = bookEle.querySelector(".btn-read-book");
    const update = bookEle.querySelector(".btn-update-book");
    const del = bookEle.querySelector(".btn-delete-book");
    //Add event listeners to current book dom element
    read.addEventListener("click", (e) => setReadEventListener(e));
    update.addEventListener("click", (e) => setUpdateEventListener(e));
    del.addEventListener("click", (e) => setDeleteEventListener(e));
  }
};
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  const temp = this.read;
  this.read = !temp;
};

Book.prototype.renderBookHtml = function (id) {
  const bookHTML = document.createElement("div");
  bookHTML.innerHTML = `
  <div class="book-object" data-book-id="${id}">
    <div class="book-cover"><i class="fas fa-book-open"></i></div>
    <div class="book-info">
      <h3>${this.title}</h3>
      <span class="book-author">by ${this.author}</span>
      <p class="book-pages">Number of pages, ${this.pages}.</p>
      <div class="book-options">
      <span>Read</span>
      <i class="book-btn btn-read-book ${
        this.read ? `fas fa-check` : `fas fa-times`
      }"></i>
        <i class="book-btn btn-update-book fas fa-pen"></i>
        <i class="book-btn btn-delete-book fas fa-trash"></i>
      </div>
  </div>
  `;
  return bookHTML;
};
//Library Object for user books
const library = new Library();
//DOM Selectors
const addBookBtn = document.querySelector(".btn-add-book");
const cancelForm = document.querySelector(".btn-cancel-form");
const inputForm = document.querySelector(".add-book-form");
const inputTitle = document.querySelector("#book-title");
const inputAuthor = document.querySelector("#book-author");
const inputPages = document.querySelector("#book-pages");
const inputRead = document.querySelector("#book-read");
const inputSubmit = document.querySelector("[type='submit']");
const inputFields = document.querySelectorAll("input");
//Helper functions
function getBookObjectId(event) {
  return event.target.parentElement.parentElement.parentElement.dataset.bookId;
}
//Book object read/update/delete event handler functions
function setReadEventListener(e) {
  library.bookcase[getBookObjectId(e)].toggleRead();
  library.listBooks();
}

function setUpdateEventListener(e) {
  const currentBookId = getBookObjectId(e);
  updateBookById = currentBookId;
  //Get data from current book
  const { title, author, pages, read } = library.bookcase[currentBookId];
  //Fill current book data to input values
  inputTitle.value = title;
  inputAuthor.value = author;
  inputPages.value = pages;
  inputRead.checked = read;
  inputSubmit.value = "Update Book";
  //Display form with current book data
  toggleDisplayForm(); //Wait user for submit or cancel form;
}

function setDeleteEventListener(e) {
  delete library.bookcase[getBookObjectId(e)];
  library.listBooks();
}

const toggleDisplayForm = () => inputForm.classList.toggle("hidden");
//Get data from form submit in array, then use spread operator to create new Book
function getBookInputData(inputFields) {
  return Array.from(inputFields).map((field) => {
    return field.type === "checkbox" ? field.checked : field.value;
  });
}
//Set form input values to default state
function resetFormInputFields(inputFields) {
  inputFields.forEach((field) => {
    if (field.type === "checkbox") field.checked = false;
    else if (field.type === "submit") field.value = "Create Book";
    else field.value = "";
  });
}
//After getting data from form, clear form and hide it from view
function resetAndHideForm(inputFields) {
  resetFormInputFields(inputFields);
  toggleDisplayForm();
}
//Form submit event handler, from create book btn and update book btn
function createAndDisplayBook(event) {
  event.preventDefault();
  const newBook = new Book(...getBookInputData(inputFields));
  if (inputSubmit.value === "Update Book") {
    library.bookcase[updateBookById] = newBook; //global flag is used for reference
    library.listBooks();
  } else if (inputSubmit.value === "Create Book") {
    library.addBook(newBook);
  }
  resetAndHideForm(inputFields);
}
//Event handlers
inputForm.addEventListener("submit", (e) => createAndDisplayBook(e));
addBookBtn.addEventListener("click", toggleDisplayForm);
cancelForm.addEventListener("click", () => resetAndHideForm(inputFields));
//Template data
library.addBook(new Book("Ender's Game", "Orson Scott Card", 324, true));
library.addBook(
  new Book("The Dark Tower: The Gunslinger", "Stephen King", 300, true)
);
library.addBook(new Book("The Hobbit", "J. R. R. Tolkien", 310, true));
library.addBook(
  new Book("Harry Potter and the Goblet of Fire", "	J. K. Rowling", 636, true)
);
