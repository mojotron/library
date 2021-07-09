"use strict";
//DOM Selectors
const addBookBtn = document.querySelector(".btn-add-book");
const inputForm = document.querySelector(".add-book-form");

const callDisplayForm = () => inputForm.classList.remove("hidden");
addBookBtn.addEventListener("click", callDisplayForm);
function addNewBook() {
  //Display form
  //User inputs data
  //On form submit take data
  //Create book object
  //Add book to library
  //Update library display
}
const library = [];
function Book(title, author, pages, read = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.renderBookHtml = function () {
  const bookDiv = document.createElement("div");
  bookDiv.innerHTML = `
    <div class="book-object">
      <h2>${this.title}</h2>
      <p>${this.author}</p>
    </div>
  `;
  return bookDiv;
};

// const hobbit = new Book("The Hobbit", "J. R. R. Tolkien");
// const mainWrapper = document.querySelector(".main-wrapper");
// mainWrapper.insertAdjacentElement("beforeend", hobbit.renderBookHtml());
const request = new XMLHttpRequest();
request.open(
  "GET",
  `https://openlibrary.org/books/OL7353617M/Fantastic_Mr._Fox`
);
