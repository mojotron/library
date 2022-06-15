"use strict";
import "../styles/reset.css";
import "../styles/main.css";
import {
  addBookToServer,
  getBooksFromServer,
  deleteBookFromServer,
  updateBookFromServer,
  createNewUser,
} from "./firebase";
import Library from "./Library";
import Form from "./Form";

const controlAddNewBook = async () => {
  Form.addForm();
  Form.addBookHandler(async (obj) => {
    await addBookToServer(obj);
    await handleRenderBooks();
  });
};

const addBookBtn = document.querySelector(".btn-add-book");
addBookBtn.addEventListener("click", controlAddNewBook);

const controlClickHandler = async (bookControlObj) => {
  if (bookControlObj.action === "delete") {
    await deleteBookFromServer(bookControlObj.id);
    await handleRenderBooks();
  }
  if (bookControlObj.action === "update") {
    Form.addForm(bookControlObj);
    Form.addBookHandler(async (obj) => {
      await updateBookFromServer(bookControlObj.id, obj);
      await handleRenderBooks();
    });
  }
};

const handleRenderBooks = async () => {
  const books = await getBooksFromServer();
  Library.render(books, controlClickHandler);
};

export const handleDeleteBook = (id) => {
  console.log(id);
};

async function init() {
  Form.addAuthForm();
  Form.addAuthHandler((user) => {
    createNewUser(user);
  });
}
init();
