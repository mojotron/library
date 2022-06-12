"use strict";
import "../styles/reset.css";
import "../styles/main.css";

import { addBookToServer, getBooksFromServer } from "./firebase";

import Library from "./Library";
const lib = new Library();

async function init() {
  const books = await getBooksFromServer();
  console.log(books);
  lib.render(books);
}

init();

//DOM Selectors
const addBookBtn = document.querySelector(".btn-add-book");
const bookForm = document.querySelector(".add-book-form");
const cancelFormBtn = document.querySelector(".btn-cancel-form");
const formSubmitBtn = bookForm.querySelector(".btn-submit-form");

console.log(bookForm);

// call form on click
addBookBtn.addEventListener("click", () => {
  bookForm.classList.remove("hidden");
});
// close book on x
cancelFormBtn.addEventListener("click", () => {
  bookForm.classList.add("hidden");
});
// get data to form and save it to server
formSubmitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const bookObj = {
    title: bookForm.title.value,
    author: bookForm.author.value,
    pages: bookForm.pages.value,
    read: bookForm.read.checked,
  };
  bookForm.reset();
  bookForm.classList.add("hidden");
  addBookToServer(bookObj);
});
