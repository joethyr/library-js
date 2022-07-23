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

function myAlert(message, alert) {
  let wrapper = document.createElement('div');
  wrapper.classList.add('alert', `${alert}`);
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
    myAlert("Please fill out all form fields.", "alert-danger");
    return false;
  }
  myAlert('The Book has now been posted!', "alert-success");
  createBook(titleBook, authorBook, pagesBook, readBook);
});


function createBook(title, author, pages, read) {
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  addBookToLibrary(myLibrary[myLibrary.length-1]);

  document.querySelectorAll('.readBtn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      toggleReadBtn(e.target);
    });
  });
}


function deleteBook(e) {
  if (e.classList.contains('delete')) {
    myLibrary.splice([e.parentElement.parentElement.getAttribute('array-position')], 1);
    e.parentElement.parentElement.remove();
  }
}

function addBookToLibrary(book) {
  const list = document.querySelector('.table-body');
  const row = document.createElement('tr');
  row.setAttribute("array-position", `${myLibrary.length-1}`);
  for (let key in book) {
    let tableCell = document.createElement('td');
    if (key === "read") {
      const readBtn = document.createElement('button');
      if (book[key] == true) {
        readBtn.classList.add('readBtn', 'btn', 'btn-success');
        readBtn.textContent = "Read";
        tableCell.appendChild(readBtn);
      } else {
        readBtn.classList.add('readBtn', 'btn', 'btn-warning');
        readBtn.textContent = "Unread";
        tableCell.appendChild(readBtn);
      }
    } else {
      tableCell.textContent = book[key];
    }
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


function toggleReadBtn(e) {
  // remove button class and update with different class
  let bookKey =  e.parentElement.parentElement.getAttribute('array-position');
  // let bookReadValue = myLibrary[e.parentElement.parentElement.getAttribute('array-position')]['read'];
  if (myLibrary[bookKey]['read'] == true) {
    myLibrary[bookKey]['read'] = false;
    e.classList.remove('btn-success');
    e.classList.add('btn-warning');
    e.textContent = "Unread";
  } else {
    myLibrary[bookKey]['read'] = true;
    e.classList.remove('btn-warning');
    e.classList.add('btn-success');
    e.textContent = "Read";
  }
}
