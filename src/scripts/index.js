"use strict";
import "../styles/reset.css";
import "../styles/main.css";
import {
  addBookToServer,
  getBooksFromServer,
  deleteBookFromServer,
  updateBookFromServer,
  createNewUser,
  logInUser,
  logOutUser,
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
const userElement = document.querySelector(".user");
const userEmailElement = userElement.querySelector(".user__email");
const logOutBtn = userElement.querySelector("#log-out-btn");
addBookBtn.addEventListener("click", controlAddNewBook);

const controlLogOutUser = async () => {
  console.log("yo");
  await logOutUser();
  userElement.classList.add("hidden");
  userEmailElement.textContent = "";
  Library.clear();
  init();
};

logOutBtn.addEventListener("click", controlLogOutUser);

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

const init = async () => {
  Form.addAuthForm();
  Form.addAuthHandler(async (user) => {
    try {
      let userEmail;
      if (user.action === "signup") userEmail = await createNewUser(user);
      if (user.action === "login") userEmail = await logInUser(user);
      await handleRenderBooks();
      Form.removeForm();
      userElement.classList.remove("hidden");
      userEmailElement.textContent = userEmail;
    } catch (error) {
      console.log(error.message);
      Form.addError(error.message);
    }
  });
};
init();
