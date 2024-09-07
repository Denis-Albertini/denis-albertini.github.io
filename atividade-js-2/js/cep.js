$("#search").click(function () {
  $.get(`https://viacep.com.br/ws/${$("#cep").val()}/json`, function (data) {
    $("#d-area").append(`<div class='mt-3'>
        Cep: ${data.cep} <br>
        Bairro: ${data.bairro} <br>
        DDD: ${data.ddd} <br>
        Estado: ${data.estado} <br>
        Localidade: ${data.localidade} <br>
        Logradouro: ${data.logradouro} <br>
        Região: ${data.regiao} <br>
        UF: ${data.uf}
        </div>`);
  });
  $("#cep").val("");
});
