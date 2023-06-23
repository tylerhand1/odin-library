const myLibrary = [];

function Book(title, author, pageNum, haveRead) {
    this.title = title
    this.author = author
    this.pageNum = pageNum
    this.haveRead = haveRead
}

function addToLibrary() {
    
}

function removeFromLibrary() {
    
}

// Form modal logic

const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.close');
const addBookBtn = document.querySelector('.btn-add');

addBookBtn.addEventListener('click', () => {
    modal.classList.add('active');
});

closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
})

window.addEventListener('click', e => {
    if(e.target === modal) {
        modal.classList.remove('active');
    }
});