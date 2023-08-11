const container = document.querySelector(".container"); //grid container.
const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");
const submit = document.querySelector(".submit");
const edit = document.querySelector(".edit");
const inProgressRadio = document.getElementById("in_progress");
const fileInput = document.getElementById("cover");
const figures = document.querySelectorAll("figure");
let delButtons = document.getElementsByClassName("fa-trash-can");

let selectedImg = "template";
let currentBook;

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
};

function addBookToLibrary() {
  const title = document.getElementById("title_input").value;
  const author = document.getElementById("author_input").value;
  const pagesProgress = document.getElementById("pages_progress_input").value;
  const pagesTotal = document.getElementById("pages_total_input").value;
  const read = document.querySelector('input[name="read"]:checked').value;

  const newBook = new Book(
    title,
    author,
    pagesProgress,
    pagesTotal,
    read,
    selectedImg
  );

  showBook(newBook);
  moveAddButton();
}

function showBook(book) {
  const cardContainer = document.createElement("figure");
  const image = document.createElement("img");
  const figcaption = document.createElement("figcaption");
  const ul = document.createElement("ul");
  const buttonContainer = document.createElement("div");
  const delButton = document.createElement("button");
  const editButton = document.createElement("button");

  if (book.cover != "template") {
    image.setAttribute("src", URL.createObjectURL(book.cover));
  } else image.setAttribute("src", "./images/coverTemplate.jpg");

  delButton.classList.add("fa-solid", "fa-trash-can");
  editButton.classList.add("fa-sharp", "fa-solid", "fa-pen-to-square");
  buttonContainer.classList.add("buttonContainer");

  for (const key in book) {
    let card = document.createElement("li");
    switch (key) {
      case "title":
        card.innerHTML = book.title;
        card.classList.add("title");
        break;
      case "author":
        card.innerHTML = book.author;
        card.classList.add("author");
        break;
      case "pagesProgress":
        if (
          book.read === "In Progress" &&
          book.pagesProgress <= book.pagesTotal
        ) {
          card.innerHTML =
            book.read + `(${book.pagesProgress}/${book.pagesTotal})`;
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
  container.appendChild(cardContainer); //displays book on the page.
  myLibrary.push(cardContainer); //adds book to the array.
}

function editForm(book) {
  const pagesProgress = document.getElementById(
    "pages_progress_input_edit"
  ).value;
  const pagesTotal = document.getElementById("pages_total_input_edit").value;
  const read = document.querySelector('input[name="read_edit"]:checked').value;

  const child = book.childNodes;
  const fig = child[3];
  const figChild = fig.childNodes;
  const ul = figChild[1];
  const ulChild = ul.childNodes;
  const readStatus = ulChild[5];

  if (book.read === "In Progress" && pagesProgress <= pagesTotal) {
    readStatus.innerHTML = `${read} (${pagesProgress}/${pagesTotal})`;
  } else readStatus.innerHTML = read;
}

function moveAddButton() {
  const addBookFig = myLibrary.at(-2);
  myLibrary.splice(-2, 1);
  myLibrary.push(addBookFig);
  container.appendChild(addBookFig);
}

function openForm() {
  const popUp = document.getElementById("add");
  popUp.classList.add("active");
}

function closeForm() {
  const popUp = document.getElementById("add");
  popUp.classList.remove("active");
}

function clearInputs() {
  inputs.forEach((input) => (input.value = ""));
}

function openEditForm() {
  const popUp = document.getElementById("editForm");
  popUp.classList.add("active");
}

function closeEditForm() {
  const popUp = document.getElementById("editForm");
  popUp.classList.remove("active");
}

function updateIndex() {
  for (let i = 0; i < myLibrary.length; i++) {
    myLibrary[i].dataset.index = i;
  }
}

function deleteElement(index) {
  myLibrary[index].remove();
  myLibrary.splice(index, 1);
}

function validate() {
  let isValid = true;
  const inputs = Array.from(form.elements);

  const formInputs = inputs.filter((input) => input.hasAttribute("required"));

  formInputs.forEach((input) => {
    if (!input.checkValidity()) {
      input.classList.add("invalid");
      input.reportValidity();
      isValid = false;
    } else {
      input.classList.remove("invalid");
      input.reportValidity();
    }
  });

  return isValid;
}

submit.addEventListener("click", function (event) {
  event.preventDefault();
  if (validate() == true) {
    addBookToLibrary();
    updateIndex();
    closeForm();
    clearInputs();
  }
});

edit.addEventListener("click", function (event) {
  event.preventDefault();
  editForm(currentBook);
  closeEditForm();
  clearInputs();
});

document.addEventListener("click", function (e) {
  const target = e.target.closest(".fa-trash-can");

  if (target) {
    const bookContainer = target.parentNode.parentNode;
    deleteElement(bookContainer.dataset.index);
    updateIndex();
  }
});

document.addEventListener("click", function (e) {
  const target = e.target.closest(".fa-pen-to-square");

  if (target) {
    openEditForm();
    const book = target.parentNode.parentNode;
    currentBook = book;
  }
});

window.onload = (event) => {
  figures.forEach((figure) => {
    myLibrary.push(figure);
  });
  updateIndex();
};
