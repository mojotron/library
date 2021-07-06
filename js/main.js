"use strict";
//Crud application
//Crate book, read book(display), update book, delete book.
//Search for book with api
//Get book data from api and with that data creat book object

function Book(title, author) {
  this.title = title;
  this.author = author;
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

const hobbit = new Book("The Hobbit", "J. R. R. Tolkien");
const mainWrapper = document.querySelector(".main-wrapper");
mainWrapper.insertAdjacentElement("beforeend", hobbit.renderBookHtml());
