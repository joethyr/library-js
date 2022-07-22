// fixes autofocus on Modal
const myModal = document.getElementById('myModal');
const myInput = document.getElementById('titleBook');

myModal.addEventListener('shown.bs.modal', () => {
  myInput.focus();
});

const submitBookBtn = document.getElementById('submitBookBtn');
const newBookBtn = document.getElementById('newBookBtn');


// add books to library
const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.read = read;
}

function myAlert(message) {
  let wrapper = document.createElement('div');
  wrapper.classList.add('alert', 'alert-danger');
  wrapper.setAttribute("role", "alert");
  wrapper.textContent = message;
  const modalForm = document.getElementById('modal-form');
  const parent = modalForm.parentNode;
  parent.insertBefore(wrapper, modalForm);
}

function mySuccessAlert(message) {
  let wrapper = document.createElement('div');
  wrapper.classList.add('alert', 'alert-success');
  wrapper.setAttribute("role", "alert");
  wrapper.textContent = message;
  const modalForm = document.getElementById('modal-form');
  const parent = modalForm.parentNode;
  parent.insertBefore(wrapper, modalForm);
}

// removes any additional alert containers
newBookBtn.addEventListener('click', () => {
  document.querySelectorAll('.alert').forEach((elem) => elem.parentNode.removeChild(elem));
});

submitBookBtn.addEventListener("click", () => {
  if (document.contains(document.querySelector('.alert'))) {
    document.querySelector('.alert').remove();
  }
  let titleBook = document.getElementById('titleBook').value;
  const authorBook = document.getElementById('authorBook').value;
  const pagesBook = document.getElementById('pagesBook').value;
  const readBook = document.getElementById('readBook').checked;
  if (titleBook === "" || authorBook === "" || pagesBook === "") {
    myAlert("Please fill out all form fields.");
    return false;
  }
  mySuccessAlert('The Book has now been posted!');
  createBook(titleBook, authorBook, pagesBook, readBook);
});


function createBook(title, author, pages, read) {
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  addBookToLibrary(myLibrary[myLibrary.length-1]);
}


function deleteBook(e) {
  if (e.classList.contains('delete')) {
    e.parentElement.parentElement.remove();
  }
}

function addBookToLibrary(book) {
  const list = document.querySelector('.table-body');
  const row = document.createElement('tr');
  let counter = 0;
  for (let key in book) {
    let tableCell = document.createElement('td');
    if (key === "read") {
      const readBtn = document.createElement('button');
      if (book[key] == true) {
        readBtn.textContent = "Read";
        tableCell.appendChild(readBtn);
      } else {
        readBtn.textContent = "Unread";
        tableCell.appendChild(readBtn);
      }
    } else {
      tableCell.textContent = book[key];
    }
    tableCell.classList.add(`bookValue-${counter}`);
    counter++;
    row.appendChild(tableCell);
  }
  // APPEND DELETE BUTTON HERE
  const tableCell = document.createElement('td');
  const deleteIcon = document.createElement('i');
  deleteIcon.classList.add('fa-solid', 'fa-trash', 'delete');
  tableCell.appendChild(deleteIcon);

  row.appendChild(tableCell);
  list.appendChild(row);
  document.getElementById("modal-form").reset();
}

// remove book from list
document.querySelector('.table-body').addEventListener('click', (e => {
  deleteBook(e.target);
}));

