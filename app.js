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
  console.log(myLibrary);
}

function showBook() {
  for (let i = 0; i < myLibrary.length; i++){
    let cardContainer = document.createElement("figure");
    let card = document.createElement("figcaption");
    
    cardContainer.innerHTML = "<img src='./images/meditations.jpg'>";
    card.innerHTML = myLibrary[i].title + " by " + myLibrary[i].author + ", " + myLibrary[i].publisher;
    
    cardContainer.appendChild(card);
    container.appendChild(cardContainer);
  }
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
