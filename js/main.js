"use strict";
function Library() {
  this.bookId = 0;
  this.bookcase = {};
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
    read.addEventListener("click", (e) => {
      library.bookcase[getBookObjectId(e)].toggleRead();
      this.listBooks();
    });
    update.addEventListener("click", () => alert("U"));
    del.addEventListener("click", (e) => {
      delete library.bookcase[getBookObjectId(e)];
      this.listBooks();
    });
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
const inputFields = document.querySelectorAll(".book-data");

function getBookObjectId(event) {
  return event.target.parentElement.parentElement.parentElement.dataset.bookId;
}

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
  const bookId = library.getBookId();
  library.addBook(newBook);
  resetAndHideForm(inputFields);
}

inputForm.addEventListener("submit", (e) => createAndDisplayBook(e));
addBookBtn.addEventListener("click", toggleDisplayForm);
cancelForm.addEventListener("click", () => resetAndHideForm(inputFields));

//////////////////////////////////////////////
//Template data
library.addBook(new Book("Ender's Game", "Orson Scott Card", 324, true));
library.addBook(
  new Book("The Dark Tower: The Gunslinger", "Stephen King", 300, true)
);
library.addBook(new Book("The Hobbit", "J. R. R. Tolkien", 310, true));
