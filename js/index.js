const myLibrary = [];

class Book {
    constructor(title, author, pageNum, haveRead) {
        this.title = title;
        this.author = author;
        this.pageNum = pageNum;
        this.haveRead = haveRead;
    }
}

function addToLibrary(e) {
    e.preventDefault(); // to prevent submitting form

    const title = e.target.form[0].value;
    const author = e.target.form[1].value;
    const pageNum = parseInt(e.target.form[2].value);
    const haveRead = e.target.form[3].checked;
    // Check input
    if(title === "" || author === "" || Number.isNaN(pageNum)) {
        console.log("Empty or page is not a number");
        return;
    }
    // Check if title already in library - https://stackoverflow.com/questions/22844560/check-if-object-value-exists-within-a-javascript-array-of-objects-and-if-not-add
    if(myLibrary.some(el => el.title === title)) {
        console.log("Aleady in library");
        error.classList.add('active');
        return;
    }

    // Add book to library
    const book = new Book(title, author, pageNum, haveRead);
    myLibrary.push(book);
    // Clear form
    clearForm();
    // Hide modal
    modal.classList.toggle('active');

    // Update cards
    updateBookCards();
}

function removeFromLibrary(e) {
    const parent = e.target.parentElement;
    const title = e.target.parentElement.children[0].textContent;

    // Search for the book
    const book = searchInLibrary(title);
    var index = myLibrary.indexOf(book);
    if(index !== -1) {
        myLibrary.splice(index, 1);
    }

    parent.remove();
}

function clearForm() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => input.value = "");
    const checkMark = document.querySelector('#have-read');
    checkMark.checked = false;
    error.classList.remove('active');
}

function updateBookCards() {
    // Remove cards
    const cards = document.querySelectorAll('.book-card');
    cards.forEach(card => card.remove());
    // Add cards
    const booksContainer = document.querySelector('.books-container');
    for(let i = 0; i < myLibrary.length; i++) {
        const card = document.createElement('div');
        card.setAttribute('class', 'book-card');
        
        const titleP  = document.createElement('p');
        titleP.textContent = myLibrary[i].title;
        const authorP = document.createElement('p');
        authorP.textContent = myLibrary[i].author;
        const pageNumP = document.createElement('p');
        pageNumP.textContent = myLibrary[i].pageNum;
        const readBtn = document.createElement('btn');
        readBtn.classList.add('btn');
        readBtn.classList.add('read-btn')
        if(myLibrary[i].haveRead) {
            readBtn.classList.add('btn-green');
            readBtn.textContent = "Read";
        } else {
            readBtn.classList.add('btn-red');
            readBtn.textContent = "Not read";
        }
        const deleteBtn = document.createElement('btn');
        deleteBtn.textContent = "Remove";
        deleteBtn.classList.add('btn');
        deleteBtn.classList.add('btn-remove');

        card.appendChild(titleP);
        card.appendChild(authorP);
        card.appendChild(pageNumP);
        card.appendChild(readBtn);
        card.appendChild(deleteBtn);

        readBtn.addEventListener('click', toggleReadStatus);
        deleteBtn.addEventListener('click', removeFromLibrary);

        booksContainer.appendChild(card);
    }
}

function toggleReadStatus(e) {
    const title = e.target.parentElement.children[0].textContent;
    // Search for the book
    const book = searchInLibrary(title);
    // Update the book's status
    book.haveRead = !book.haveRead;
    
    // Update the button
    e.target.classList.toggle('btn-red');
    e.target.classList.toggle('btn-green');

    if(e.target.textContent === "Not read") {
        e.target.textContent = "Read";
    } else {
        e.target.textContent = "Not read";
    }
}

function searchInLibrary(title) {
    for(let i = 0; i < myLibrary.length; i++) {
        if(title === myLibrary[i].title) {
            return myLibrary[i];
        }
    }
}

// Buttons

const submitBtn = document.querySelector('#submit');
submitBtn.addEventListener('click', addToLibrary);

// Form modal logic

const modal = document.querySelector('.modal');
const addBookBtn = document.querySelector('.btn-add');
const error = document.querySelector('.error');

addBookBtn.addEventListener('click', () => {
    modal.classList.add('active');
});

window.addEventListener('click', e => {
    if(e.target === modal) {
        modal.classList.remove('active');
        clearForm();
        error.classList.remove('active');
    }
});