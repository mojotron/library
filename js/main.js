"use strict";
function Library() {
  this.length = 0;
  this.bookcase = {};
}
Library.prototype.incrementLength = function () {
  this.length++;
};

Library.prototype.getLength = function () {
  return this.length;
};

Library.prototype.addBook = function (book) {
  //Create and display Dom element
  const bookDOMElement = book.renderBookHtml(this.length);
  booksShowcase.appendChild(bookDOMElement);
  //Save book to library
  this.bookcase[this.getLength()] = book;
  this.incrementLength();
  //Attach event handlers to DOM book object
  const read = bookDOMElement.querySelector(".btn-read-book");
  const update = bookDOMElement.querySelector(".btn-update-book");
  const del = bookDOMElement.querySelector(".btn-delete-book");
  read.addEventListener("click", () => alert("R"));
  update.addEventListener("click", () => alert("U"));
  del.addEventListener("click", () => alert("D"));
};
Library.prototype.deleteBook = function (id) {
  delete this.bookcase[id];
};
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
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
        <div class="book-btn btn-read-book">
          <p>Read</p>
          <span>${
            this.read
              ? `<i class="fas fa-check"></i>`
              : `<i class="fas fa-times"></i>`
          }</span>
        </div>
        
        <span class="book-btn btn-update-book"><i class="fas fa-pen"></i></span>
        <span class="book-btn btn-delete-book"><i class="fas fa-trash"></i></span>
      </div>
  </div>
  `;
  return bookHTML;
};
//Library Object for user books
const library = new Library();
//DOM Selectors
const booksShowcase = document.querySelector(".books-showcase");
const addBookBtn = document.querySelector(".btn-add-book");
const cancelForm = document.querySelector(".btn-cancel-form");
const inputForm = document.querySelector(".add-book-form");
const inputFields = document.querySelectorAll(".book-data");

const toggleDisplayForm = () => inputForm.classList.toggle("hidden");

function getBookInputData(inputFields) {
  return Array.from(inputFields).map((field) => {
    return field.type === "checkbox" ? field.checked : field.value;
  });
}

function resetFormInputFields(inputFields) {
  inputFields.forEach((field) => {
    field.type === "checkbox" ? (field.checked = false) : (field.value = "");
  });
}

function resetAndHideForm(inputFields) {
  resetFormInputFields(inputFields);
  toggleDisplayForm();
}

function createAndDisplayBook(event) {
  event.preventDefault();
  const newBook = new Book(...getBookInputData(inputFields));
  const bookId = library.getLength();
  library.addBook(newBook);
  resetAndHideForm(inputFields);
}

inputForm.addEventListener("submit", (e) => createAndDisplayBook(e));
addBookBtn.addEventListener("click", toggleDisplayForm);
cancelForm.addEventListener("click", () => resetAndHideForm(inputFields));

//////////////////////////////////////////////
//Template data
const endersGame = new Book("Ender's Game", "Orson Scott Card", 324, true);
const gunslinger = new Book(
  "The Dark Tower: The Gunslinger",
  "Stephen King",
  300,
  true
);
const hobbit = new Book("The Hobbit", "J. R. R. Tolkien", 310, true);
library.addBook(endersGame);
library.addBook(gunslinger);
library.addBook(hobbit);
