class Product {
  constructor(id, name, category, img, price) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.img = img;
    this.price = price;
  }
}

const menu = [
  new Product(
    1,
    "Capuccino",
    "Bebidas Quentes",
    "https://rafaelescalfoni.github.io/desenv_web/img/capuccino.png",
    7
  ),
  new Product(
    2,
    "Espresso",
    "Bebidas Quentes",
    "https://rafaelescalfoni.github.io/desenv_web/img/espresso.png",
    4
  ),
  new Product(
    3,
    "Frapuccino",
    "Bebidas Quentes",
    "https://rafaelescalfoni.github.io/desenv_web/img/frapuccino.png",
    8
  ),
  new Product(
    4,
    "Chococcino",
    "Bebidas Quentes",
    "https://rafaelescalfoni.github.io/desenv_web/img/chococcino.png",
    7
  ),
  new Product(
    5,
    "Chocolate Quente",
    "Bebidas Quentes",
    "https://rafaelescalfoni.github.io/desenv_web/img/chocolate_quente.png",
    10
  ),
  new Product(
    6,
    "Frapê",
    "Bebidas Frias",
    "https://rafaelescalfoni.github.io/desenv_web/img/frape.png",
    12
  ),
  new Product(
    7,
    "Suco de Laranja",
    "Bebidas Frias",
    "https://rafaelescalfoni.github.io/desenv_web/img/suco_laranja.png",
    10
  ),
  new Product(
    8,
    "Açaí",
    "Doces",
    "https://rafaelescalfoni.github.io/desenv_web/img/acai.png",
    12
  ),
  new Product(
    9,
    "Bolo de Laranja",
    "Doces",
    "https://rafaelescalfoni.github.io/desenv_web/img/bolo_laranja.png",
    8
  ),
];

menu.forEach((product) => {
  $("#menu").append(`<div class"col">
    <div id="${product.id}" class="p-card d-flex flex-column border border-black rounded p-2">
    <h2>${product.name}</h2>
    <img src="${product.img}" class="img-fluid my-3">
    <h3>$ ${product.price}</h3>
    </div>
    </div>`);
});

const selectedProducts = [];

function clearSelectedProductsList() {
  $("#orderList").empty();
  $("#order").addClass("d-none");
}

function loadSelectedProductsList() {
  if (selectedProducts.length > 0) {
    selectedProducts.forEach((product) => {
      if (document.getElementById(`s-${product.id}`) !== null) {
        $(`#s-${product.id} span`).text(
          parseInt($(`#s-${product.id} span`).text()) + 1
        );
      } else {
        $("#orderList")
          .append(`<li id='s-${product.id}' class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
          <div class="fw-bold">${product.name}</div>
          ${product.category}
          </div>
          <span class="badge text-bg-primary rounded-pill">1</span>
          </li>`);
      }
    });
    $("#order").removeClass("d-none");
  }
}

function loadTotalCost() {
  $("#totalCost").text(
    selectedProducts.reduce(function (total, product) {
      return (total += product.price);
    }, 0)
  );
}

$(function () {
  let localyStored = JSON.parse(localStorage.getItem("selectedProducts"));
  if (localyStored !== null) {
    localyStored.forEach((product) => {
      selectedProducts.push(product);
    });
  }
  loadSelectedProductsList();
  loadTotalCost();
});

$(".p-card").on({
  click: function () {
    let selectedId = this.id;
    selectedProducts.push(
      menu.find((product) => {
        return product.id == selectedId;
      })
    );
    localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
    clearSelectedProductsList();
    loadSelectedProductsList();
    loadTotalCost();
  },
  mouseenter: function () {
    $(this).css("cursor", "pointer");
  },
});

$("#clear").click(function () {
  localStorage.clear();
  selectedProducts.length = 0;
  clearSelectedProductsList();
});
