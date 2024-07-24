const myLibrary = [];

function Book(author, title, numPages) {
    this._author = author;
    this._title = title;
    this._numPages = numPages;
    this._read = false;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

