$.get(
  "https://rafaelescalfoni.github.io/desenv_web/filmes.json",
  function (data, status) {
    if (status !== "success") {
      let errorHeader = document.createElement("h1");
      errorHeader.className = "display-1 fw-bolder text-center mt-5 mb-5";
      errorHeader.appendChild(document.createTextNode("Error"));
      document.querySelector("#displayArea").appendChild(errorHeader);
    } else {
      data.forEach((element) => {
        let col = document.createElement("div");
        col.className = "col";

        let card = document.createElement("div");
        card.id = "card";
        card.className =
          "border border-secondary bg-secondary-subtle rounded p-3 d-flex flex-column justify-content-md-evenly";

        let header = document.createElement("div");
        header.className = "d-flex flex-column gap-3";

        let titleImg = document.createElement("img");
        titleImg.src = element.figura;
        titleImg.alt = "title banner";
        titleImg.id = "titleImg";
        titleImg.className = "img-fluid align-self-center";

        let title = document.createElement("h1");
        title.className = "fs-5 m-0 text-center";
        title.textContent = element.titulo;

        let genreCastRatings = document.createElement("div");
        genreCastRatings.className = "row row-cols-1 row-cols-md-2";

        let genreCast = document.createElement("div");
        genreCast.id = "genreCast";
        genreCast.className = "text-start";

        let genreDiv = document.createElement("div");
        genreDiv.className = "d-flex flex-row gap-1 mb-1";

        let genre = document.createElement("p");
        genre.className = "m-0";

        let genreSpan = document.createElement("p");
        genreSpan.className = "fw-bold";
        genreSpan.textContent = "Gênero";

        genre.textContent = element.generos
          .reduce((text, element) => {
            text += " - ";
            return text + element;
          })
          .trim();

        let castDiv = document.createElement("div");
        castDiv.className = "d-flex flex-row gap-1";

        let cast = document.createElement("p");
        cast.className = "m-0";

        let castSpan = document.createElement("p");
        castSpan.className = "fw-bold";
        castSpan.textContent = "Elenco";

        cast.textContent = element.elenco
          .reduce((text, element) => {
            text += ", ";
            return text + element;
          })
          .trim();

        let ratings = document.createElement("div");
        ratings.className = "d-flex flex-column align-items-center mt-3 m-md-0";

        let classind = document.createElement("img");
        switch (element.classificacao) {
          case 0:
            classind.src = "img/classificacao-livre-logo-7.png";
            break;
          case 10:
            classind.src = "img/classificacao-10-anos-logo-7.png";
            break;
          case 12:
            classind.src = "img/classificacao-12-anos-logo-7.png";
            break;
          case 14:
            classind.src = "img/classificacao-14-anos-logo-7.png";
            break;
          case 16:
            classind.src = "img/classificacao-16-anos-logo-7.png";
            break;
          case 18:
            classind.src = "img/classificacao-18-anos-logo-7.png";
            break;
        }
        classind.alt = "content rating";
        classind.id = "classind";
        classind.className = "mb-2";

        let starDiv = document.createElement("div");
        starDiv.className = "d-flex flex-row";

        let fadeStar = document.createElement("p");
        fadeStar.className = "text-body-tertiary fs-5 m-0";
        let trueRating =
          element.opinioes.reduce((sum, element) => {
            return sum + element.rating;
          }, 0) / element.opinioes.length;
        let splitStar = document.createElement("p");
        splitStar.className = "split-color-star fs-5 m-0";
        splitStar.textContent = "★";
        let goldStar = document.createElement("p");
        goldStar.className = "text-warning fs-5 m-0";
        switch (trueRating) {
          case 0:
            fadeStar.textContent = "★★★★★";
            starDiv.appendChild(fadeStar);
            break;
          case 0.5:
            starDiv.appendChild(splitStar);
            fadeStar.textContent = "★★★★";
            starDiv.appendChild(fadeStar);
            break;
          case 1:
            goldStar.textContent = "★";
            starDiv.appendChild(goldStar);
            fadeStar.textContent = "★★★★";
            starDiv.appendChild(fadeStar);
            break;
          case 1.5:
            goldStar.textContent = "★";
            starDiv.appendChild(goldStar);
            starDiv.appendChild(splitStar);
            fadeStar.textContent = "★★★";
            starDiv.appendChild(fadeStar);
            break;
          case 2:
            goldStar.textContent = "★★";
            starDiv.appendChild(goldStar);
            fadeStar.textContent = "★★★";
            starDiv.appendChild(fadeStar);
            break;
          case 2.5:
            goldStar.textContent = "★★";
            starDiv.appendChild(goldStar);
            starDiv.appendChild(splitStar);
            fadeStar.textContent = "★★";
            starDiv.appendChild(fadeStar);
            break;
          case 3:
            goldStar.textContent = "★★★";
            starDiv.appendChild(goldStar);
            fadeStar.textContent = "★★";
            starDiv.appendChild(fadeStar);
            break;
          case 3.5:
            goldStar.textContent = "★★★";
            fadeStar.appendChild(goldStar);
            fadeStar.appendChild(splitStar);
            fadeStar.textContent = "★";
            starDiv.appendChild(fadeStar);
            break;
          case 4:
            goldStar.textContent = "★★★★";
            starDiv.appendChild(goldStar);
            fadeStar.textContent = "★";
            starDiv.appendChild(fadeStar);
            break;
          case 4.5:
            goldStar.textContent = "★★★★";
            starDiv.appendChild(goldStar);
            starDiv.appendChild(splitStar);
            break;
          case 5:
            goldStar.textContent = "★★★★★";
            starDiv.appendChild(goldStar);
            break;
        }

        let synopsis = document.createElement("p");
        synopsis.id = "synopsis";
        synopsis.className = "text-center m-0 mt-3 mb-4";
        synopsis.textContent = element.resumo;

        let similarTitles = document.createElement("div");
        similarTitles.className = "text-center";

        let similarTitlesHeader = document.createElement("h2");
        similarTitlesHeader.className = "fs-6";
        similarTitlesHeader.textContent = "Títulos similares";

        let similarTitlesImages = document.createElement("div");
        similarTitlesImages.className =
          "d-flex flex-column flex-sm-row gap-2 align-items-center justify-content-center";

        element.titulosSemelhantes.forEach((titleId) => {
          let similarTitleImage = document.createElement("img");
          similarTitleImage.alt = "similar title banner";
          similarTitleImage.id = "similarTitle";
          similarTitleImage.className = "img-fluid";
          for (let i = 0; i < data.length; i++) {
            if (titleId === data[i].id) {
              similarTitleImage.src = data[i].figura;
              break;
            }
          }
          similarTitlesImages.appendChild(similarTitleImage);
        });

        similarTitles.appendChild(similarTitlesHeader);
        similarTitles.appendChild(similarTitlesImages);
        ratings.appendChild(classind);
        ratings.appendChild(starDiv);
        genreDiv.appendChild(genreSpan);
        genreDiv.appendChild(genre);
        castDiv.appendChild(castSpan);
        castDiv.appendChild(cast);
        genreCast.appendChild(genreDiv);
        genreCast.appendChild(castDiv);
        genreCastRatings.appendChild(genreCast);
        genreCastRatings.appendChild(ratings);
        header.appendChild(titleImg);
        header.appendChild(title);
        header.appendChild(genreCastRatings);
        card.appendChild(header);
        card.appendChild(synopsis);
        card.appendChild(similarTitles);
        col.appendChild(card);

        document.querySelector("#cardGrid").appendChild(col);
      });
    }
  },
  "json"
);
