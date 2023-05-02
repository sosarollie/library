const container = document.querySelector(".container"); //grid container.
const submit = document.querySelector(".submit");
const inProgressRadio = document.getElementById("in_progress"); 
const fileInput = document.getElementById('cover');

let selectedImg;

let myLibrary = [];

function Book(title, author, pagesProgress, pagesTotal, read, cover) {
  this.title = title;
  this.author = author;
  this.pagesProgress = pagesProgress;
  this.pagesTotal = pagesTotal;
  this.read = read;
  this.cover = cover;
}

fileInput.onchange = () => {
  selectedImg = fileInput.files[0];
}

function addBookToLibrary() {

  const title = document.getElementById('title_input').value;
  const author = document.getElementById('author_input').value;
  const pagesProgress = document.getElementById('pages_progress_input').value;
  const pagesTotal = document.getElementById('pages_total_input').value;
  const read = document.querySelector('input[name="read"]:checked').value;

  const newBook = new Book(title, author, pagesProgress, pagesTotal, read, selectedImg);
  
  showBook(newBook);
  moveAddButton();
  console.log(myLibrary);
}

function showBook(book) {
    const cardContainer = document.createElement("figure");
    const image = document.createElement("img");
    const figcaption = document.createElement("figcaption");
    const ul = document.createElement("ul");
    const buttonContainer = document.createElement("div");
    const delButton = document.createElement("button");
    const editButton = document.createElement("button");

    image.setAttribute("src", URL.createObjectURL(book.cover));
    delButton.classList.add("fa-solid", "fa-trash-can");
    editButton.classList.add("fa-sharp", "fa-solid", "fa-pen-to-square");
    buttonContainer.classList.add("buttonContainer");

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
        case "pagesProgress":
          if (book.read === "In Progress"){
            card.innerHTML = book.read + `(${book.pagesProgress}/${book.pagesTotal})`;  
          } else card.innerHTML = book.read;
          card.classList.add("status_display");
          break;
      }
      ul.appendChild(card);
    }

    figcaption.appendChild(ul);
    cardContainer.appendChild(image);
    cardContainer.appendChild(figcaption);
    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(delButton);
    cardContainer.appendChild(buttonContainer);
    container.appendChild(cardContainer); //displays book on the page
    myLibrary.push(cardContainer); //adds book to the array.
}

function moveAddButton() {
  const addBookFig =  myLibrary.at(-2);
  myLibrary.splice(-2, -2);
  myLibrary.push(addBookFig);
  container.appendChild(addBookFig);
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