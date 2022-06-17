class Form {
  #parentElement = document.querySelector(".main-wrapper");

  addError(error) {
    this.#parentElement.querySelector(".error").textContent = error;
  }

  removeError() {
    this.#parentElement.querySelector(".error").textContent = "";
  }

  addForm(data = null) {
    if (this.#parentElement.querySelector(".add-book-form")) return;
    this.#parentElement.append(this.#generateForm(data));
  }

  addAuthForm() {
    if (this.#parentElement.querySelector(".add-book-form")) return;
    this.#parentElement.append(this.#generateAuthForm());
  }

  removeForm() {
    const formElement = document.querySelector(".add-book-form");
    this.#parentElement.removeChild(formElement);
  }

  #generateAuthForm() {
    const formElement = document.createElement("form");
    formElement.className = "add-book-form";
    formElement.innerHTML = `
        <label for="book-title">Email</label>
        <input
          id="user-email"
          class="book-data"
          type="email"
          required
          name="email"
        />
        <label for="book-author">Password</label>
        <input
          id="user-password"
          class="book-data"
          type="password"
          required
          name="password"
        />
        <p class="error"></p>
        <button 
          id="user-sign-up-btn" 
          class="btn-submit-form" 
          type="submit" 
          data-action="signup">
          Sign up
        </button>
        <button 
          id="user-log-in-btn" 
          class="btn-submit-form" 
          type="submit" 
          data-action="login">
          Log in
        </button>
      </form>`;

    return formElement;
  }

  #generateForm(data) {
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
        pages: +formElement.pages.value,
        read: formElement.read.checked,
      };
      handler(bookObj);
      this.removeForm();
    });
  }

  addAuthHandler(handler) {
    const formElement = this.#parentElement.querySelector(".add-book-form");
    const btns = formElement.querySelectorAll(".btn-submit-form");
    btns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const action = e.target.dataset.action;
        const userObj = {
          email: formElement.email.value,
          password: formElement.password.value,
        };
        handler({ action, ...userObj });
      });
    });
  }
}

export default new Form();
