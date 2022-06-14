class Form {
  #parentElement = document.querySelector(".main-wrapper");

  addForm(data = null) {
    if (this.#parentElement.querySelector(".add-book-form")) return;
    this.#parentElement.append(this.#generateForm(data));
  }

  removeForm() {
    const formElement = document.querySelector(".add-book-form");
    this.#parentElement.removeChild(formElement);
  }

  #generateForm(data) {
    console.log("generating form");
    const formElement = document.createElement("form");
    formElement.className = "add-book-form";
    formElement.innerHTML = `
        <button type="reset" class="btn btn-cancel-form"></button>

        <label for="book-title">Title</label>
        <input
          id="book-title"
          class="book-data"
          type="text"
          required
          name="title"
          ${data ? `value="${data.title}"` : ""}
        />
        <label for="book-author">Author</label>
        <input
          id="book-author"
          class="book-data"
          type="text"
          required
          name="author"
          ${data ? `value="${data.author}"` : ""}
        />
        <label for="book-pages">Number of pages</label>
        <input
          id="book-pages"
          class="book-data"
          type="number"
          required
          name="pages"
          ${data ? `value="${data.pages}"` : ""}
        />
        <label for="book-read">Read</label>
        <input id="book-read" class="book-data" type="checkbox" name="read" ${
          data ? `${data.read ? "checked" : ""}` : ""
        }/>

        <button class="btn-submit-form" type="submit">${
          data ? "Update" : "Create"
        } Book</button>
      </form>`;

    formElement
      .querySelector(".btn-cancel-form")
      .addEventListener("click", this.removeForm.bind(this));

    return formElement;
  }

  addBookHandler(handler) {
    const formElement = this.#parentElement.querySelector(".add-book-form");
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      const bookObj = {
        title: formElement.title.value,
        author: formElement.author.value,
        pages: formElement.pages.value,
        read: formElement.read.checked,
      };
      handler(bookObj);
      this.removeForm();
    });
  }
}

export default new Form();
