const myModal = document.getElementById('myModal')
const myInput = document.getElementById('titleBook')

myModal.addEventListener('shown.bs.modal', () => {
  myInput.focus()
})

// add books to library
let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

// display books in table
console.log(addBookToLibrary('jojo', 'bobo', 123, yes));
