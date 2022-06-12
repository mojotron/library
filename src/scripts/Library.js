// import bookImage from "../images/book-svgrepo-com.svg";

export default class Library {
  #parentElement = document.querySelector(".books-showcase");

  async render(books) {
    const markDown = books
      .map((book) => this.createBookMarkdown(book))
      .join("");
    console.log(markDown);
    this.#parentElement.insertAdjacentHTML("afterbegin", markDown);
  }

  createBookMarkdown(book) {
    return `
      <div class="book-object" data-book-id="${book.id}">
        <div class="book-cover">
          <img src="${bookImage}" />
        </div>
        <div class="book-info">
          <h3>${book.title}</h3>
          <span class="book-author">by ${book.author}</span>
          <p class="book-pages">Number of pages, ${book.pages}.</p>
          <div class="book-options">
          <span>Read</span>
          <i class="book-btn btn-read-book ${
            book.read ? `fas fa-check` : `fas fa-times`
          }"></i>
            <i class="book-btn btn-update-book fas fa-pen"></i>
            <i class="book-btn btn-delete-book fas fa-trash"></i>
          </div>
      </div>
    `;
  }

  // listBooks() {
  //   const booksShowcase = document.querySelector(".books-showcase");
  //   booksShowcase.innerHTML = "";
  //   for (let id in window.localStorage) {
  //     const book = this.getBook(id);
  //     if (book) {
  //       const bookEle = this.createBookHtml(id);
  //       booksShowcase.insertAdjacentElement("afterbegin", bookEle);
  //       const read = bookEle.querySelector(".btn-read-book");
  //       const update = bookEle.querySelector(".btn-update-book");
  //       const del = bookEle.querySelector(".btn-delete-book");
  //       //Add event listeners to current book dom element
  //       read.addEventListener("click", (e) => setReadEventListener(e));
  //       update.addEventListener("click", (e) => setUpdateEventListener(e));
  //       del.addEventListener("click", (e) => setDeleteEventListener(e));
  //     }
  //   }
  // }
}
