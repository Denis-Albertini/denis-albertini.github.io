$.get(
  "https://rafaelescalfoni.github.io/desenv_web/receitas.json",
  function (data) {
    data.forEach((element) => {
      $("#recipes").append(
        `<li id='${element.id}'>
            <h1>${element.nome}</h1>
            <p class='p-0 m-0'>${element.descricao}</p>
            <img src='${element.foto}' alt='recipe image' class='img-fluid'>
            <ol>
            <h2>Preparo</h2>
            </ol>
            <ul>
            <h2>Ingredientes</h2>
            </ul>
            </li>`
      );
      element.preparo.forEach((passo) => {
        $("#recipes").find(`#${element.id} ol`).append(`<li>${passo}</li>`);
      });
      element.ingredientes.forEach((ingrediente) => {
        $("#recipes")
          .find(`#${element.id} ul`)
          .append(`<li>${ingrediente}</li>`);
      });
    });
  },
  "json"
);
