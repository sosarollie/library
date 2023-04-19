const container = document.querySelector(".container");
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
    let card = document.createElement("figure");
    card.innerHTML = myLibrary[i];
    console.log(myLibrary[i]);
    console.log(card);
    container.appendChild(card);
  }
}

window.onload = (event) =>{
  for (let i = 0; i < 5; i++){
    addBookToLibrary();
  }
  showBooks();
};
