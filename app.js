const container = document.querySelector(".container"); //grid container.
const submit = document.querySelector(".submit");
const inProgressRadio = document.getElementById("in_progress"); 

let myLibrary = [];

function Book(title, author, pages, read, cover) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.cover = cover;
}

function addBookToLibrary() {
  const title = document.getElementById('title_input').value;
  const author = document.getElementById('author_input').value;
  const pages = document.getElementById('pages_input').value;
  const read = document.querySelector('input[name="read"]:checked').value;
  const cover = document.getElementById('cover').value;

  const newBook = new Book(title, author, pages, read, cover);

  myLibrary.push(newBook);
  showBook(newBook);
  console.log(myLibrary);
}

function showBook(book) {
    let cardContainer = document.createElement("figure");
    let figcaption = document.createElement("figcaption");
    let ul = document.createElement("ul");

    cardContainer.innerHTML = book.cover;

    for(const key in book) {
      let card = document.createElement("li");
      console.log(key);
      switch(key) {
        case "title":
          card.innerHTML = book.title;
          card.classList.add("title");
          break;
        case "author":
          card.innerHTML = book.author;
          card.classList.add("author");
          break;
        case "pages":
          card.innerHTML = book.read + book.pages;
          card.classList.add("status_display");
          break;
      }
      ul.appendChild(card);
    }
    figcaption.appendChild(ul);
    cardContainer.appendChild(figcaption);
    container.appendChild(cardContainer);
}

function openForm() {
  const popUp = document.querySelector('.popUp');
  popUp.classList.add('active');
}

function closeForm() {
  const popUp = document.querySelector('.popUp');
  popUp.classList.remove('active');
}

function openNumberPages() {
  const newInput = document.createElement('input');
  newInput.type = 'number';
  const newLabel = document.createElement('label');
  const progressLabel = document.getElementById('in_progress_label');

  newLabel.innerHTML = " | I'm at page: ";

  progressLabel.insertAdjacentElement('afterend', newLabel);
  newLabel.insertAdjacentElement('afterend', newInput);
}

submit.addEventListener('click', function(event){
  event.preventDefault();
  closeForm();
  addBookToLibrary();
})

inProgressRadio.addEventListener('click', function(event){
  openNumberPages();
})

window.onload = (event) =>{
  const figures = document.querySelectorAll("figure");
  figures.forEach(figure=> {
    myLibrary.push(figure);
  });
};
