const books = [];

function addBook() {
  const book = {
    title: $("#title").val(),
    description: $("#description").val(),
    genre: [],
    authors: [],
  };
  $("#genre")
    .val()
    .split(/,+/)
    .forEach((element) => {
      element = element.trim();
      book.genre.push(element);
    });
  $("#authors")
    .val()
    .split(/,+/)
    .forEach((element) => {
      element = element.trim();
      book.authors.push(element);
    });
  books.push(book);
}

function emptyList() {
  $(".table").find("tbody").empty();
}

function createList() {
  books.forEach((book) => {
    $(".table")
      .find("tbody")
      .append(
        `<tr><td>${book.title}</td><td>${
          book.description
        }</td><td>${book.genre.join(", ")}</td><td>${book.authors.join(
          ", "
        )}</td></tr>`
      );
  });
}

function showList() {
  $(".table, #clear, #send").removeClass("d-none");
}

function clearForm() {
  $("#title, #description, #genre, #authors").val("");
}

function emptyBooks() {
  books.length = 0;
}

function hideList() {
  $(".table, #clear, #send").addClass("d-none");
}

function send() {
  $.post("http://httpbin.org/post", books, function (_data, status) {
    if (status == "success") {
      alert(`Conteúdo enviado com sucesso!`);
    } else {
      alert(`Erro na requisição!`);
    }
  });
}

$("#add").click(function () {
  addBook();
  emptyList();
  createList();
  showList();
  clearForm();
});

$("#clear").click(function () {
  emptyBooks();
  emptyList();
  hideList();
});

$("#send").click(function () {
  try {
    send();
  } catch (error) {
    alert(error.message);
  }
  emptyBooks();
  emptyList();
  hideList();
  clearForm();
});
