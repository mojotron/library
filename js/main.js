"use strict";
const library = [];
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.renderBookHtml = function () {
  const bookHTML = document.createElement("div");
  bookHTML.innerHTML = `
  <div class="book-object">
    <div class="book-cover">
      <i class="fas fa-book-open"></i>
    </div>
    <div class="book-info">
      <h3>${this.title}</h3>
      <span class="book-author">by ${this.author}</span>
      <p class="book-pages">Number of pages, ${this.pages}.</p>
      <div class="book-options">
        <p>Read</p>
        <span class="book-btn btn-read-checkbox">${
          this.read
            ? `<i class="fas fa-check"></i>`
            : `<i class="fas fa-times"></i>`
        }</span>
        <span class="book-btn btn-update-book"><i class="fas fa-pen"></i></span>
        <span class="book-btn btn-delete-book"><i class="fas fa-trash"></i></span>
      </div>
  </div>
  `;
  return bookHTML;
};
//DOM Selectors
const booksShowcase = document.querySelector(".books-showcase");
const addBookBtn = document.querySelector(".btn-add-book");
const inputForm = document.querySelector(".add-book-form");
const inputFields = document.querySelectorAll(".book-data");

inputForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const bookInfo = Array.from(inputFields).map((ele) => {
    return ele.type === "checkbox" ? ele.checked : ele.value;
  });
  const newBook = new Book(...bookInfo);
  library.push(newBook);
  booksShowcase.appendChild(newBook.renderBookHtml());

  library.forEach((book) => book.renderBookHtml());
  //Reset to original state
  inputFields.forEach(function (ele) {
    ele.type === "checkbox" ? (ele.checked = false) : (ele.value = "");
  });
  inputForm.classList.add("hidden");
});

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

// const hobbit = new Book("The Hobbit", "J. R. R. Tolkien");
// const mainWrapper = document.querySelector(".main-wrapper");
// mainWrapper.insertAdjacentElement("beforeend", hobbit.renderBookHtml());
