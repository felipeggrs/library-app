const myLibrary = [];
const body = document.querySelector("body");
const tbody = document.querySelector("tbody");

// Book constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleReadStatus = function () {
  this.read = this.read === "yes" ? "no" : "yes";
};

// add new books to library array 'myLibrary'
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(`${title}`, `${author}`, `${pages}`, `${read}`);
  return myLibrary.push(newBook);
}

// add button to show form for the user to input the book information
const newBookBtn = document.getElementById("newBookBtn");
function createForm() {
  const btnFormContainer = document.createElement("div");
  btnFormContainer.setAttribute("id", "btnFormContainer");

  const btnForm = document.createElement("form");
  btnForm.setAttribute("method", "post");
  btnForm.setAttribute("action", "https://www.google.com");

  // book title input field
  const titleInputLabel = document.createElement("label");
  titleInputLabel.setAttribute("for", "titleInput");
  titleInputLabel.textContent = "Title: ";

  const titleInput = document.createElement("input");
  titleInput.setAttribute("id", "titleInput");
  titleInput.setAttribute("type", "text");
  titleInput.setAttribute("name", "titleInput");
  titleInput.setAttribute("placeholder", "Book Title");

  // author input field
  const authorInputLabel = document.createElement("label");
  authorInputLabel.setAttribute("for", "authorInput");
  authorInputLabel.textContent = "Author: ";

  const authorInput = document.createElement("input");
  authorInput.setAttribute("type", "text");
  authorInput.setAttribute("name", "authorInput");
  authorInput.setAttribute("placeholder", "Book Author");

  // n of pages input field
  const pagesInputLabel = document.createElement("label");
  pagesInputLabel.setAttribute("for", "pagesInput");
  pagesInputLabel.textContent = "Pages: ";

  const pagesInput = document.createElement("input");
  pagesInput.setAttribute("type", "text");
  pagesInput.setAttribute("name", "pagesInput");
  pagesInput.setAttribute("placeholder", "Number of pages");

  // read? yes/no input field
  const readInputLabel = document.createElement("label");
  readInputLabel.setAttribute("for", "readInput");
  readInputLabel.textContent = "Read: ";

  const readInput = document.createElement("input");
  readInput.setAttribute("type", "text");
  readInput.setAttribute("name", "readInput");
  readInput.setAttribute("placeholder", "Read? yes/no");

  // print form to page
  body.appendChild(btnFormContainer);
  btnFormContainer.appendChild(btnForm);
  btnForm.appendChild(titleInputLabel);
  btnForm.appendChild(titleInput);
  btnForm.appendChild(authorInputLabel);
  btnForm.appendChild(authorInput);
  btnForm.appendChild(pagesInputLabel);
  btnForm.appendChild(pagesInput);
  btnForm.appendChild(readInputLabel);
  btnForm.appendChild(readInput);

  // add book button
  const addBookBtn = document.createElement("button");
  addBookBtn.textContent = "Add Book";
  body.appendChild(addBookBtn);

  addBookBtn.addEventListener("click", () => {
    const userTitle = titleInput.value;
    const userAuthor = authorInput.value;
    const userPages = pagesInput.value;
    const userRead = readInput.value;

    addBookToLibrary(userTitle, userAuthor, userPages, userRead);

    const tr = document.createElement("tr");
    tbody.appendChild(tr);

    // Display title
    const newTitle = document.createElement("td");
    tr.appendChild(newTitle);
    newTitle.textContent = userTitle;

    // Display Author
    const newAuthor = document.createElement("td");
    tr.appendChild(newAuthor);
    newAuthor.textContent = userAuthor;

    // Display number of pages
    const newPages = document.createElement("td");
    tr.appendChild(newPages);
    newPages.textContent = userPages;

    // Display Read? Yes/No
    const newRead = document.createElement("td");
    const lastChild =
      +tbody.lastElementChild.previousElementSibling.getAttribute(
        "data-number"
      ) + 1;
    newRead.setAttribute("data-number", lastChild);
    tr.appendChild(newRead);
    newRead.textContent = userRead;

    // remove button works since the data-number value from the tr (table row element) and the data number of the remove button are the same value upon its creation
    const newRemove = document.createElement("button");
    newRemove.setAttribute("data-number", lastChild);
    tr.setAttribute("data-number", lastChild);
    tr.appendChild(newRemove);
    newRemove.textContent = "X";
    newRemove.addEventListener("click", removeBook);

    // toggle button
    const newToggle = document.createElement("button");
    const lastChildToggle =
      +tbody.lastElementChild.previousElementSibling.getAttribute(
        "data-number"
      ) + 1;
    newToggle.setAttribute("data-number", lastChildToggle);
    tr.appendChild(newToggle);
    newToggle.textContent = "T";

    newToggle.addEventListener("click", (e) => {
      const tdToToggle = tbody.querySelector(
        `td[data-number="${e.target.dataset.number}"]`
      );
      myLibrary[e.target.dataset.number].toggleReadStatus();
      tdToToggle.textContent = myLibrary[e.target.dataset.number].read;
    });

    // reset input values after adding to library
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    readInput.value = "";
  });

  // allows only 1 form
  newBookBtn.removeEventListener("click", createForm);
}

newBookBtn.addEventListener("click", createForm);

// remove book from library by clicking X button
const removeBook = (e) => {
  // select the event target specific dataset number and remove the TR with the same dataset number as the e.target
  const dataNumberValue = e.target.dataset.number;
  const trToRemove = tbody.querySelector(
    `tr[data-number="${dataNumberValue}"]`
  );
  tbody.removeChild(trToRemove);
};

// set data attribute to specific table cell containing read value
function toggleRead(e) {
  const tdToToggle = tbody.querySelector(
    `td[data-number="${e.target.dataset.number}"]`
  );
  myLibrary[e.target.dataset.number].toggleReadStatus();
  tdToToggle.textContent = myLibrary[e.target.dataset.number].read;
}

// Example books
addBookToLibrary("The Hobbit", "Tolkien", 295, "yes");

// Loop library and print example books to table
for (let i = 0; i < myLibrary.length; i++) {
  const tr = document.createElement("tr");
  tr.setAttribute("data-number", `${i}`);
  tbody.appendChild(tr);

  // Print titles
  const newTitle = document.createElement("td");
  tr.appendChild(newTitle);
  newTitle.textContent = myLibrary[i].title;

  // Print Authors
  const newAuthor = document.createElement("td");
  tr.appendChild(newAuthor);
  newAuthor.textContent = myLibrary[i].author;

  // Print number of pages
  const newPages = document.createElement("td");
  tr.appendChild(newPages);
  newPages.textContent = myLibrary[i].pages;

  // Print Read? Yes/No
  const newRead = document.createElement("td");
  newRead.setAttribute("data-number", `${i}`);
  tr.appendChild(newRead);
  newRead.textContent = myLibrary[i].read;

  // remove button
  const newRemove = document.createElement("button");
  newRemove.setAttribute("data-number", `${i}`);
  tr.appendChild(newRemove);
  newRemove.textContent = "X";
  newRemove.addEventListener("click", removeBook);

  // toggle button
  const newToggle = document.createElement("button");
  newToggle.setAttribute("data-number", `${i}`);
  tr.appendChild(newToggle);
  newToggle.textContent = "T";
  newToggle.addEventListener("click", toggleRead);
}
