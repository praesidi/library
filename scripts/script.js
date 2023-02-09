// sidebar buttons
const addBookBtn = document.getElementById('add-book-btn');
const deleteAllBtn = document.getElementById('delete-all-btn');
// sidebar stats
const booksCounter = document.getElementById('total-books-counter');
const readBooksCounter = document.getElementById('read-books-counter');
const notReadBooksCounter = document.getElementById('not-read-books-counter');
const pagesCounter = document.getElementById('total-pages-counter');
// const deleteBookBtn = document.getElementById('delete-book-btn');
const bookStatusCheckbox = document.getElementById('item-status-checkbox');
// modal
const form = document.getElementById('add-book-form');
const modal = document.getElementById('modal');
const modalCloseBtn = document.getElementById('modal-close-btn');
// book's container
const booksContainer = document.getElementById('books-container');
// book card
const bookTitleInput = document.getElementById('book-title');
const bookAuthorInput = document.getElementById('book-author');
const bookPagesInput = document.getElementById('book-pages');
const bookStatusInput = document.getElementById('book-status');

let myLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.pushToLibrary = function () {
    myLibrary.push(this);
  };
  this.pushToLibrary();
}

Book.prototype.createBookCard = function () {
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
  cardTitle.textContent = this.title;

  const cardAuthor = document.createElement('p');
  cardAuthor.classList.add('item-author');
  descriptionContainer.appendChild(cardAuthor);
  cardAuthor.textContent = this.author;

  const cardPages = document.createElement('p');
  cardPages.classList.add('item-pages');
  descriptionContainer.appendChild(cardPages);
  cardPages.textContent = this.pages;

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
  if (this.isRead) {
    cardStatusText.textContent = ' Read';
    cardStatusCheckbox.checked = true;
  } else {
    cardStatusText.textContent = ' Not Read';
    cardStatusCheckbox.checked = false;
  }
  // add data attribute to handle id
  card.setAttribute('data-id', myLibrary.length - 1);
};

Book.prototype.deleteBookCard = function () {};

Book.prototype.changeBookStatus = function () {
  // if (this.isRead)
};

function updateSidebarCounter() {
  // total books
  booksCounter.textContent = `${myLibrary.length}`;

  // read books
  let readNum = 0;
  myLibrary.forEach((book) => {
    if (book.isRead) {
      readNum++;
    }
  });
  readBooksCounter.textContent = `${readNum}`;

  // not read books
  const notReadNum = myLibrary.length - readNum;
  notReadBooksCounter.textContent = `${notReadNum}`;

  // total pages number
  let pagesNum = 0;
  myLibrary.forEach((book) => {
    pagesNum += Number(book.pages);
  });
  pagesCounter.textContent = `${pagesNum}`;
}

function populateLibrary() {
  booksContainer.textContent = '';
  myLibrary.forEach((book) => {
    book.createBookCard();
  });
  updateSidebarCounter();
}

function addBookToLibrary() {
  const book = new Book(
    bookTitleInput.value,
    bookAuthorInput.value,
    bookPagesInput.value,
    bookStatusInput.checked
  );
}

function clearForm() {
  form.reset();
}

function clearLibrary() {
  myLibrary = [];
  booksContainer.textContent = '';
  updateSidebarCounter();
}

// submit button in the form
function handleForm(event) {
  event.preventDefault();
  addBookToLibrary();
  populateLibrary();
}

form.addEventListener('submit', handleForm);

deleteAllBtn.addEventListener('click', clearLibrary);

bookStatusCheckbox.addEventListener('change', this.changeBookStatus);

// modal box
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
