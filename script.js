const addBookButton = document.getElementById("add-book");
const deleteButtons = document.getElementsByClassName("delete-book");
const addBookDialog = document.getElementById("add-book-dialog");
const cancelButton = document.getElementById("cancel");
const form = document.getElementById("add-book-form");
const bookList = document.getElementById("book-list");

const myLibrary = [];

function Book(title, author, pages) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false;
}

addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281);
addBookToLibrary("1984", "George Orwell", 328);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 432);


addBookButton.addEventListener("click", () => {
    addBookDialog.showModal();
});

cancelButton.addEventListener("click", () => {
    addBookDialog.close();
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    addBookToLibrary(title, author, pages);
    displayBooks();
    addBookDialog.close();
});

bookList.addEventListener("click", (event) => {
    const bookCard = event.target.closest(".book-card");
    if (event.target.classList.contains("delete-book")) {
        deleteBook(bookCard.dataset.id);
    }

    if (event.target.classList.contains("read-toggle")) {
        toggleReadStatus(bookCard.dataset.id);
    }
});

function deleteBook(id) {
    const bookIndex = myLibrary.findIndex(book => book.id === id);
    if (bookIndex !== -1) {
        myLibrary.splice(bookIndex, 1);
        displayBooks();
    }
}

function toggleReadStatus(id) {
    const book = myLibrary.find(book => book.id === id);
    if (book) {
        book.read = !book.read;
        displayBooks();
    }
}

function addBookToLibrary(title, author, pages) {
    const newBook = new Book(title, author, pages);
    myLibrary.push(newBook);
}


function displayBooks() {
    const bookList = document.getElementById("book-list");
    bookList.innerHTML = "";
    myLibrary.forEach(book => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <div class="book-card" data-id="${book.id}">
                <div class="top">
                    <div class="book-info">
                        <h3>${book.title}</h3>
                        <p>Author: ${book.author}</p>
                        <p>Pages: ${book.pages}</p>
                        <p class="book-id">ID: ${book.id}</p>
                    </div>
                    <div class="book-img">
                        <img>
                    </div>
                </div>
                
                <div class="bot">
                    <button class="read-toggle">${book.read ? "Unread" : "Read"}</button>
                    <button class="delete-book">Delete</button>
                </div>
            </div>
        </li>`;
        bookList.appendChild(listItem);
    });
}

displayBooks();
