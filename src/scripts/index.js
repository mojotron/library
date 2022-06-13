"use strict";
import "../styles/reset.css";
import "../styles/main.css";
import {
  addBookToServer,
  getBooksFromServer,
  deleteBookFromServer,
} from "./firebase";
import Library from "./Library";

//DOM Selectors
const addBookBtn = document.querySelector(".btn-add-book");
const bookForm = document.querySelector(".add-book-form");
const cancelFormBtn = document.querySelector(".btn-cancel-form");
const formSubmitBtn = bookForm.querySelector(".btn-submit-form");

const controlClickHandler = async (bookControlObj) => {
  if (bookControlObj.action === "delete") {
    await deleteBookFromServer(bookControlObj.id);
  }
  handleRenderBooks();
};

const handleRenderBooks = async () => {
  const books = await getBooksFromServer();
  Library.render(books, controlClickHandler);
};
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

export const handleDeleteBook = (id) => {
  console.log(id);
};

async function init() {
  handleRenderBooks();
}
init();
