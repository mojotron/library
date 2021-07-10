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
    <div class="book-cover"><i class="fas fa-book-open"></i></div>
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
  library.push(newBook);
  //Add new book to the page
  booksShowcase.appendChild(newBook.renderBookHtml());
  //Reset input fields and hide form
  resetAndHideForm(inputFields);
}

inputForm.addEventListener("submit", (e) => createAndDisplayBook(e));
addBookBtn.addEventListener("click", toggleDisplayForm);
cancelForm.addEventListener("click", () => resetAndHideForm(inputFields));
