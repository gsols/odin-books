const addBookButton = document.getElementById("add-book");
const deleteButtons = document.getElementsByClassName("delete-book");
const addBookDialog = document.getElementById("add-book-dialog");
const cancelButton = document.getElementById("cancel");
const form = document.getElementById("add-book-form");
const bookList = document.getElementById("book-list");

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");

const titleError = document.querySelector("#title + span.error");
const authorError = document.querySelector("#author + span.error");
const pagesError = document.querySelector("#pages + span.error");


class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    deleteBook(id) {
        const bookIndex = this.books.findIndex(book => book.id === id);
        if (bookIndex !== -1) {
            this.books.splice(bookIndex, 1);
            this.displayBooks();
        }
    }

    toggleReadStatus(id) {
        const book = this.books.find(book => book.id === id);
        if (book) {
            book.read = !book.read;
            this.displayBooks();
        }
    }

    displayBooks() {
        const bookList = document.getElementById("book-list");
        bookList.innerHTML = "";
        this.books.forEach(book => {
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
}

class Book {
    constructor(title, author, pages) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = false;
    }
}

const myLibrary = new Library();

myLibrary.addBook(new Book("The Great Gatsby", "F. Scott Fitzgerald", 180));
myLibrary.addBook(new Book("To Kill a Mockingbird", "Harper Lee", 281));
myLibrary.addBook(new Book("1984", "George Orwell", 328));
myLibrary.addBook(new Book("Pride and Prejudice", "Jane Austen", 432));


addBookButton.addEventListener("click", () => {
    addBookDialog.showModal();
});

cancelButton.addEventListener("click", () => {
    titleError.className = "error";
    authorError.className = "error";
    pagesError.className = "error";
    
    addBookDialog.close();
});


form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!titleInput.validity.valid || !authorInput.validity.valid || !pagesInput.validity.valid) {
        event.preventDefault();
        showError();
    }
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    myLibrary.addBook(new Book(title, author, pages));
    myLibrary.displayBooks();

    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";

    addBookDialog.close();
});

bookList.addEventListener("click", (event) => {
    const bookCard = event.target.closest(".book-card");
    if (event.target.classList.contains("delete-book")) {
        myLibrary.deleteBook(bookCard.dataset.id);
    }

    if (event.target.classList.contains("read-toggle")) {
        myLibrary.toggleReadStatus(bookCard.dataset.id);
    }
});


titleInput.addEventListener("input", (event) => {
    if (titleInput.validity.valid) {
        titleError.textContent = "";
        titleError.className = "error";
    } else {
        showError();
    }
});

authorInput.addEventListener("input", (event) => {
    if (authorInput.validity.valid) {
        authorError.textContent = "";
        authorError.className = "error";
    } else {
        showError();
    }
});

pagesInput.addEventListener("input", (event) => {
    if (pagesInput.validity.valid) {
        pagesError.textContent = "";
        pagesError.className = "error";
    } else {
        showError();
    }
});


function showError(){
    if (titleInput.validity.valueMissing) {
        titleError.textContent = "Please enter the book title.";
        titleError.className = "error active";
    } else {
        titleError.textContent = "";
    }

    if (authorInput.validity.valueMissing) {
        authorError.textContent = "Please enter the author's name.";
        authorError.className = "error active";

    } else {
        authorError.textContent = "";
    }

    if (pagesInput.validity.valueMissing) {
        pagesError.textContent = "Please enter the number of pages.";
        pagesError.className = "error active";
    } else if (pagesInput.validity.rangeUnderflow) {
        pagesError.textContent = "Number of pages must be at least 1.";
        pagesError.className = "error active";
    } else {
        pagesError.textContent = "";
    }

}

myLibrary.displayBooks();
