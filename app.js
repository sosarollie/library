const container = document.querySelector(".container"); //grid container.
let myLibrary = [];

function Book(title, author, publisher) {
  this.title = title;
  this.author = author;
  this.publisher = publisher;
}

function addBookToLibrary() {
  let title = "Meditations";
  let author = "Marcus Aurelius";
  let publisher = "Penguin";

  const newBook = new Book(title, author, publisher);

  myLibrary.push(newBook);
}

function showBooks() {
  for (let i = 0; i < myLibrary.length; i++){
    let cardContainer = document.createElement("figure");
    let card = document.createElement("figcaption");
    
    cardContainer.innerHTML = "<img src='./images/meditations.jpg'>";
    card.innerHTML = myLibrary[i].title + " by " + myLibrary[i].author + ", " + myLibrary[i].publisher;
    
    cardContainer.appendChild(card);
    container.appendChild(cardContainer);
  }
}

window.onload = (event) =>{
  const figures = document.querySelectorAll("figure");
  figures.forEach(figure=> {
    myLibrary.push(figure);
  });
};
