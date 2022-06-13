import bookIcon from "../images/book-svgrepo-com.svg";
import checkerIcon from "../images/heavy-check-mark-svgrepo-com.svg";
import updateIcon from "../images/edit-svgrepo-com.svg";
import trashIcon from "../images/trash-svgrepo-com.svg";
import crossIcon from "../images/x-close-delete-svgrepo-com.svg";

class Library {
  #parentElement = document.querySelector(".books-showcase");

  async render(books, btnHandler) {
    this.#parentElement.innerHTML = "";
    books.forEach((book) => {
      this.#parentElement.insertAdjacentElement(
        "afterbegin",
        this.createBookMarkdown(book, btnHandler)
      );
    });
  }

  createBookMarkdown(book, btnHandler) {
    const bookElement = document.createElement("div");
    bookElement.className = "book-object";
    bookElement.dataset.bookId = book.id;
    bookElement.innerHTML = `
        <div class="book-cover">
          <img class="book-cover-image" src="${bookIcon}" />
        </div>
        <div class="book-info">
          <h3>${book.title}</h3>
          <span class="book-author">by ${book.author}</span>
          <p class="book-pages">pages, ${book.pages}</p>
          <div class="book-options">
            <div class="book-read">
              <p>Read</p>
              <span>
            
              <img src="${
                book.read ? checkerIcon : crossIcon
              }" alt="checker icon" /> 
            </span>
            </div>
          
          <button class="book-btn btn-update-book" data-control="update">
            <img class="icon-btn" src="${updateIcon}" alt="update icon" />
          </button>
          <button class="book-btn btn-delete-book" data-control="delete">
            <img class="icon-btn" src="${trashIcon}" alt="delete icon" />
          </button>
        </div>
      </div>
    `;

    bookElement.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-control]");
      if (!btn) return;
      btnHandler({ ...book, action: btn.dataset.control });
    });

    return bookElement;
  }
}

export default new Library();
