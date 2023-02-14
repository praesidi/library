const addBookBtn = document.getElementById('add-book-btn');
const deleteAllBtn = document.getElementById('delete-all-btn');
const booksCounter = document.getElementById('total-books-counter');
const readBooksCounter = document.getElementById('read-books-counter');
const notReadBooksCounter = document.getElementById('not-read-books-counter');
const pagesCounter = document.getElementById('total-pages-counter');
const form = document.getElementById('add-book-form');
const modal = document.getElementById('modal');
const modalCloseBtn = document.getElementById('modal-close-btn');
const booksContainer = document.getElementById('books-container');

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
  this.id = Date.now();
}

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

function deleteBookCard(event) {
  const bookId = event.target.parentNode.parentNode.getAttribute('data-id');
  const bookCard = event.target.parentNode.parentNode;
  const bookIndex = myLibrary.findIndex((book) => book.id === Number(bookId));
  bookCard.remove();
  myLibrary.splice(bookIndex, 1);
  updateSidebarCounter();
}

function changeBookStatus(event) {
  const bookId = Number(
    event.target.parentNode.parentNode.parentNode.getAttribute('data-id')
  );
  const bookIndex = myLibrary.findIndex((book) => book.id === bookId);
  const checkboxStatus = event.target.checked;
  myLibrary[bookIndex].isRead = checkboxStatus;
  updateSidebarCounter();
}

Book.prototype.createBookCard = function () {
  const cardStart = String.raw`
    <div class="item" data-id="${this.id}">
    <div class="item-delete-btn">
      <button id="delete-book-btn" onclick="deleteBookCard(event)">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
    <div class="item-description">
      <p class="item-title">${this.title}</p>
      <p class="item-author">${this.author}</p>
      <p class="item-pages">Pages: <span>${this.pages}</span></p>
    </div>
    <div class="item-status">
      <label>
        <input type="checkbox" name="book status"`;

  let cardMid = ``;
  if (this.isRead) {
    cardMid = ` checked`;
  }

  const cardEnd = String.raw` onchange="changeBookStatus(event)" />
        <span>Read</span>
      </label>
    </div>
  </div>`;

  return cardStart + cardMid + cardEnd;
};

function populateLibrary() {
  booksContainer.textContent = '';
  myLibrary.forEach((book) => {
    booksContainer.innerHTML += book.createBookCard();
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

function resetForm() {
  form.reset();
}

function clearFormInputs() {
  form.reset();
  return false;
}

function clearLibrary() {
  myLibrary = [];
  booksContainer.textContent = '';
  updateSidebarCounter();
}

function handleForm(event) {
  event.preventDefault();
  addBookToLibrary();
  populateLibrary();
  clearFormInputs();
}

form.addEventListener('submit', handleForm);

deleteAllBtn.addEventListener('click', clearLibrary);

// modal box
addBookBtn.addEventListener('click', function () {
  modal.style.display = 'flex';
});

modalCloseBtn.addEventListener('click', function () {
  modal.style.display = 'none';
  resetForm();
});

window.addEventListener('click', function (e) {
  if (e.target === modal) {
    modal.style.display = 'none';
    resetForm();
  }
});
