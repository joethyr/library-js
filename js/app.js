// fixes autofocus on Modal
const myModal = document.getElementById('myModal');
const myInput = document.getElementById('titleBook');

myModal.addEventListener('shown.bs.modal', () => {
  myInput.focus();
});

// add books to library
const myLibrary = [];

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  // this.read = read;
}

// saves user form inputs
function getUserInput() {
  const titleBook = document.getElementById('titleBook').value;
  const authorBook = document.getElementById('authorBook').value;
  const pagesBook = document.getElementById('pagesBook').value;
  // const readBook = document.getElementById('readBook');
  createBook(titleBook, authorBook, pagesBook);
}

function createBook(title, author, pages) {
  let newBook = new Book(title, author, pages);
  myLibrary.push(newBook);
  addBookToLibrary(newBook);
}


function addBookToLibrary(book) {
  const list = document.querySelector('.table-body');
  const row = document.createElement('tr');
  for (let key in book) {
    const tableCell = document.createElement('td');
    tableCell.textContent = book[key];
    row.appendChild(tableCell);
  }
  list.appendChild(row);
}
