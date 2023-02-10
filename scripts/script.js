// sidebar buttons
const addBookBtn = document.getElementById('add-book-btn');
const deleteAllBtn = document.getElementById('delete-all-btn');
// sidebar stats
const booksCounter = document.getElementById('total-books-counter');
const readBooksCounter = document.getElementById('read-books-counter');
const notReadBooksCounter = document.getElementById('not-read-books-counter');
const pagesCounter = document.getElementById('total-pages-counter');
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
  this.id = myLibrary.length; // set id
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

// fix bug when after deleting first obj and adding new one added object changes its vales
function deleteBookCard(event) {
  const bookId = event.target.parentNode.parentNode.getAttribute('data-id');
  const bookCard = event.target.parentNode.parentNode;
  const bookIndex = myLibrary.findIndex((book) => book.id === bookId);
  // console.log(bookId, bookIndex);
  console.log(`hi, I am an item #${bookId}, index${bookIndex}`);
  bookCard.remove();
  myLibrary.splice(bookIndex, 1);
  updateSidebarCounter();
}

function changeBookStatus(event) {
  const bookId =
    event.target.parentNode.parentNode.parentNode.getAttribute('data-id');
  const bookIndex = myLibrary.findIndex((book) => book.id === bookId);
  const checkboxStatus = event.target.checked;
  console.log(myLibrary.findIndex((book) => book.id === bookId));
  console.log(bookId, bookIndex, myLibrary[bookIndex]);
  myLibrary[bookIndex].isRead = checkboxStatus;
  console.log(`book #${bookId} is read ${myLibrary[bookIndex].isRead}`);
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
    booksContainer.innerHTML += book.createBookCard(); // issue here
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
