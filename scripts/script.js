const addBookBtn = document.getElementById('add-book-btn');
const deleteBookBtn = document.getElementById('delete-book-btn');
const deleteAllBtn = document.getElementById('delete-all-btn');
const bookStatusCheckbox = document.getElementById('item-status-checkbox');
const modal = document.getElementById('modal');
const modalCloseBtn = document.getElementById('modal-close-btn');
const bookTitleInput = document.getElementById('book-title');
const bookAuthorInput = document.getElementById('book-author');
const bookPagesInput = document.getElementById('book-pages');
const bookStatusInput = document.getElementById('book-status');
const formSubmitBtn = document.getElementById('form-submit-btn');
const booksContainer = document.getElementById('books-container');
const form = document.getElementById('add-book-form');

// const formInputs = [];

// let myLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function createBookCard() {
  // create a card
  const card = document.createElement('div');
  card.classList.add('item');
  booksContainer.appendChild(card);

  // add delete button
  const deleteBtnContainer = document.createElement('div');
  deleteBtnContainer.classList.add('item-delete-btn');
  card.appendChild(deleteBtnContainer);

  const deleteBtn = document.createElement('button');
  deleteBtn.id = 'delete-book-btn';
  deleteBtnContainer.appendChild(deleteBtn);

  const deleteBtnIcon = document.createElement('i');
  deleteBtnIcon.classList.add('fa-solid', 'fa-xmark');
  deleteBtn.appendChild(deleteBtnIcon);

  // add description
  const descriptionContainer = document.createElement('div');
  descriptionContainer.classList.add('item-description');
  card.appendChild(descriptionContainer);

  const cardTitle = document.createElement('p');
  cardTitle.classList.add('item-title');
  descriptionContainer.appendChild(cardTitle);

  const cardAuthor = document.createElement('p');
  cardAuthor.classList.add('item-author');
  descriptionContainer.appendChild(cardAuthor);

  const cardPages = document.createElement('p');
  cardPages.classList.add('item-pages');
  descriptionContainer.appendChild(cardPages);

  const cardPagesSpan = document.createElement('span');
  cardPages.appendChild(cardPagesSpan);

  // add checkbox for status
  const cardStatusContainer = document.createElement('div');
  cardStatusContainer.classList.add('item-status');
  card.appendChild(cardStatusContainer);

  const cardStatusLabel = document.createElement('label');
  cardStatusContainer.appendChild(cardStatusLabel);

  const cardStatusCheckbox = document.createElement('input');
  cardStatusCheckbox.id = 'item-status-checkbox';
  cardStatusCheckbox.type = 'checkbox';
  cardStatusLabel.appendChild(cardStatusCheckbox);

  const cardStatusText = document.createElement('span');
  cardStatusLabel.appendChild(cardStatusText);
  cardStatusText.textContent = ' Read';
}

function addBookToLibrary() {
  const title = bookTitleInput.value;
  const author = bookAuthorInput.value;
  const pages = bookPagesInput.value;
  const isRead = bookStatusInput.checked;

  const book = Book(title, author, pages, isRead);
  console.log(book);
}

function clearForm() {
  form.reset();
}

function handleForm(event) {
  event.preventDefault();
  addBookToLibrary();
}

form.addEventListener('submit', handleForm);

addBookBtn.addEventListener('click', function () {
  modal.style.display = 'flex';
});

modalCloseBtn.addEventListener('click', function () {
  modal.style.display = 'none';
  clearForm();
});

window.addEventListener('click', function (e) {
  if (e.target === modal) {
    modal.style.display = 'none';
    clearForm();
  }
});
