const myLibrary = [];
const tbody = document.querySelector("tbody");

// Book constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    if (this.read === "yes") {
      return `${title} by ${author}, ${pages} pages, already read.`;
    }
    return `${title} by ${author}, ${pages} pages, not read yet.`;
  };
}

// Basic function to add new books to library
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(`${title}`, `${author}`, `${pages}`, `${read}`);
  return myLibrary.push(newBook);
}

// button
const newBookBtn = document.getElementById("newBookBtn");

newBookBtn.addEventListener("click", () => {
  const userTitle = prompt("Book title");
  const userAuthor = prompt("Book author");
  const userPages = prompt("How many pages");
  const userRead = prompt("Already read? Yes/No");

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
  tr.appendChild(newRead);
  newRead.textContent = userRead;
  return console.log(myLibrary);
});

// Example books
addBookToLibrary("The Hobbit", "Tolkien", 295, "yes");
addBookToLibrary("Angelic Aura", "Jesus", 15, "no");
addBookToLibrary("Dark Solitude", "Satan", 666, "no");
addBookToLibrary("The Bible", "God", 999, "yes");
console.table(myLibrary);

// Loop library and print books to table
for (let i = 0; i < myLibrary.length; i++) {
  const tr = document.createElement("tr");
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
  tr.appendChild(newRead);
  newRead.textContent = myLibrary[i].read;
}
