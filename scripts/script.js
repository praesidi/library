const addBookBtn = document.getElementById('add-book-btn');
const deleteBookBtn = document.getElementById('delete-book-btn');
const deleteAllBtn = document.getElementById('delete-all-btn');
const bookStatusCheckbox = document.getElementById('book-status-checkbox');
const modal = document.getElementById('modal');
const modalCloseBtn = document.getElementById('modal-close-btn');

// const formInputs = [];

// let myLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function addBookToLibrary() {
  // do stuff here
}

addBookBtn.addEventListener('click', function () {
  modal.style.display = 'flex';
});

modalCloseBtn.addEventListener('click', function () {
  modal.style.display = 'none';
});

window.addEventListener('click', function (e) {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});
