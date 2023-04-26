const container = document.querySelector(".container"); //grid container.
const submit = document.querySelector(".submit");

let myLibrary = [];

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
}

function addBookToLibrary() {
  const title = document.getElementById('title_input').value;
  const author = document.getElementById('author_input').value;
  const pages = document.getElementById('pages_input').value;
  const read = document.querySelector('input[name="read"]:checked').value;
  const cover = document.getElementById('cover').value;

  const newBook = new Book(title, author, pages);

  myLibrary.push(newBook);
  showBook(newBook);
  console.log(myLibrary);
}

function showBook(book) {
    let cardContainer = document.createElement("figure");
    let figcaption = document.createElement("figcaption");
    let ul = document.createElement("ul");

    cardContainer.innerHTML = "<img src='./images/meditations.jpg'>";

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
          card.innerHTML = book.pages;
          card.classList.add("status_display");
          break;
      }
      ul.appendChild(card);
    }
    figcaption.appendChild(ul);
    cardContainer.appendChild(figcaption);
    container.appendChild(cardContainer);
}

function openform() {
  const popUp = document.querySelector('.popUp');
  popUp.classList.add('active');
}

function closeform() {
  const popUp = document.querySelector('.popUp');
  popUp.classList.remove('active');
}

submit.addEventListener('click', function(event){
  event.preventDefault();
  closeform();
  addBookToLibrary();
})

window.onload = (event) =>{
  const figures = document.querySelectorAll("figure");
  figures.forEach(figure=> {
    myLibrary.push(figure);
  });
};
