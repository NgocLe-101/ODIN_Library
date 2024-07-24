const myLibrary = [];

function Book(author, title, numPages) {
    this._author = author;
    this._title = title;
    this._numPages = numPages;
    this._read = false;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    renderNewBook();
}

function changeBookState(btn) {
    const card = btn.closest('.card');
    card.classList.toggle('read');
    const idx = Array.from(card.parentElement.children).indexOf(card);
    myLibrary[idx]._read = !myLibrary[idx]._read;
}

function deleteBook(btn) {
    const card = btn.closest('.card');
    const idx = Array.from(card.parentElement.children).indexOf(card);
    myLibrary.splice(idx,1);
    const cardBox = document.querySelector('.card-box');
    const thisCard = cardBox.querySelector(`.card:nth-child(${idx + 1})`);
    thisCard.classList.remove('show');
    setTimeout(() => cardBox.removeChild(thisCard), 500);
}

function createCard(book) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.classList.add('show');
    if (book._read === true) {
        card.classList.add('read');
    }
    card.innerHTML = `
        <div class="header">
            <p class="state">${book._numPages}</p>
        </div>
        <div class="center">
            <h1 class="title">${book._title}</h1>
            <h3 class="author">${book._author}</h3>
        </div>
        <div class="footer">
            <div class="btn-container">
                <button class="btn" onclick="changeBookState(this)">Change</button>
            </div>
            <div class="btn-container">
                <button class="btn" onclick="deleteBook(this)">Delete</button>
            </div>
        </div>
    `;
    return card;
}

function render() {
    const cardBox = document.querySelector('.card-box');
    cardBox.innerHTML = '';
    myLibrary.forEach(book => {
        const card = createCard(book);
        cardBox.appendChild(card);
    });
}

function renderNewBook() {
    const cardBox = document.querySelector('.card-box');
    cardBox.appendChild(createCard(myLibrary[myLibrary.length - 1]));
}

const inputField = document.querySelector('.book-input');
inputField.addEventListener('submit', (e) => {
    e.preventDefault();
    const author = inputField.querySelector('input#author').value;
    const title = inputField.querySelector('input#title').value;
    const numPages = inputField.querySelector('input#numPages').value;
    addBookToLibrary(new Book(author, title, numPages));
});

function showForm() {
    if (inputField.classList.contains('show')) {
        inputField.classList.remove('show');
        return;
    }
    inputField.classList.add('show');
}