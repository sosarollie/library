const container = document.querySelector(".container"); //grid container.
const submit = document.querySelector(".submit");
const inProgressRadio = document.getElementById("in_progress"); 
const fileInput = document.getElementById('cover');

let selectedImg;

let myLibrary = [];

function Book(title, author, pages, read, cover) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.cover = cover;
}

fileInput.onchange = () => {
  selectedImg = fileInput.files[0];
  console.log(selectedImg);
}

function addBookToLibrary() {
  const title = document.getElementById('title_input').value;
  const author = document.getElementById('author_input').value;
  const pages = document.getElementById('pages_input').value;
  const read = document.querySelector('input[name="read"]:checked').value;

  const newBook = new Book(title, author, pages, read, selectedImg);

  myLibrary.push(newBook);
  showBook(newBook);
}

function showBook(book) {
    let cardContainer = document.createElement("figure");
    let image = document.createElement("img");
    let figcaption = document.createElement("figcaption");
    let ul = document.createElement("ul");

    image.setAttribute("src", URL.createObjectURL(book.cover));

    for(const key in book) {
      let card = document.createElement("li");
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
          card.innerHTML = book.read + "(" + book.pages + ")";
          card.classList.add("status_display");
          break;
      }
      ul.appendChild(card);
    }

    figcaption.appendChild(ul);
    cardContainer.appendChild(image);
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

submit.addEventListener('click', function(event){
  event.preventDefault();
  closeForm();
  addBookToLibrary();
})


window.onload = (event) =>{
  const figures = document.querySelectorAll("figure");
  figures.forEach(figure=> {
    myLibrary.push(figure);
  });
};
