// fixes autofocus on Modal
const myModal = document.getElementById('myModal');
const myInput = document.getElementById('titleBook');

myModal.addEventListener('shown.bs.modal', () => {
  myInput.focus();
});

// add books to library
const myLibrary = [];

// saves user form inputs
function saveBook() {
  const titleBook = document.getElementById('titleBook').value;
  const authorBook = document.getElementById('authorBook').value;
  const pagesBook = document.getElementById('pagesBook').value;
  // const readBook = document.getElementById('readBook');
  addBookToLibrary(titleBook, authorBook, pagesBook);
}

function addBookToLibrary(title, author, pages) {
  let newBook = new Book(title, author, pages);
  myLibrary.push(newBook);
}

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  // this.read = read;
}

