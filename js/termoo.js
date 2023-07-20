var palavra = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

var palavra = "AREIO"
var gabarito = palavra.split("")
var gabaritoAuxiliar = palavra.split("")
gabaritoAuxiliar = gabarito


var linhaAtual = 1;
var ultimoQuadradoEscolhido;
var primeiraEscolha = true;
function gerarGrade() {
  var grade = document.getElementById("div_grade");
  div_grade.innerHTML = "";
  for (var i = 0; i < 6; i++) {
    var linha = document.createElement("div");
    linha.classList.add("linha");
    for (var j = 0; j < 5; j++) {
      linha.innerHTML += gerarQuadrado(i, j);
    }
    grade.appendChild(linha);
  }
}

function gerarQuadrado(linha, coluna) {
  return `
    <input onclick="selecionarInput(this)" onkeyup="inserirLetra(this, ${linha}, ${coluna})" id="input${linha}${coluna}" class="quadrado" disabled>`;
}

function ativarLinhas() {
  for (var coluna = 0; coluna < 5; coluna++) {
    var inputAtual = document.getElementById(`input${linhaAtual - 1}${coluna}`);
    inputAtual.removeAttribute("disabled");
    inputAtual.classList.add("ativado");
  }
}

function selecionarInput(input) {
  if (primeiraEscolha) {
    primeiraEscolha = false;
  } else {
    ultimoQuadradoEscolhido.classList.remove("escolhido");
  }
  input.classList.add("escolhido");
  ultimoQuadradoEscolhido = input;
}

function inserirLetra(input, linha, coluna) {
  var valorInput = input.value.toUpperCase();
  input.value = valorInput.toUpperCase();

  if (valorInput.length > 1) {
    input.value = valorInput[1];
  } else {
    palavra[linha][coluna] = valorInput;
    if (valorInput != "") {
      input.value = valorInput;
      direcaoPulo(coluna, "avançar");
    } else {
      direcaoPulo(coluna, "voltar");
    }
  }
}

function direcaoPulo(coluna, direcao) {
  if (direcao == "avançar") {
    if (coluna < 4) {
      var proximoInput = document.getElementById(
        `input${linhaAtual - 1}${coluna + 1}`
      );
      proximoInput.focus();
      selecionarInput(proximoInput);
    }
  } else {
    if (coluna > 0) {
      var proximoInput = document.getElementById(
        `input${linhaAtual - 1}${coluna - 1}`
      );
      proximoInput.focus();
      selecionarInput(proximoInput);
    }
  }
}

function resultadoLinha() {
  for (var coluna = 0; coluna < 5; coluna++) {
    var input = document.getElementById(`input${linhaAtual - 1}${coluna}`);
    input.classList.remove("ativado");
    input.setAttribute("disabled", true);
    var letra = input.value
    validarColuna(coluna, letra, input)
}

}

function validarColuna(coluna, letra, input) {
    var indice = gabaritoAuxiliar.indexOf(letra)
    if(indice > -1){
      if(indice == coluna){
        input.classList.add("certo")
      }else{
        input.classList.add("aviso")
      }
      gabaritoAuxiliar[indice] = null
    }
}

function validarLinha() {
  var blocoPreenchido = true;
  for (var coluna = 0; coluna < 5; coluna++) {
    var input = document.getElementById(`input${linhaAtual - 1}${coluna}`);
    var valorInput = input.value;
    if (valorInput == "") {
      blocoPreenchido = false;
    }
    input.classList.remove("escolhido");
  }
  if (blocoPreenchido) {
    resultadoLinha();
    if (linhaAtual < 6) {
      linhaAtual++;
      ativarLinhas(linhaAtual);
      direcaoPulo(0, "avançar");
   
      return true;
    }
  } else {
    return false;
  }
}

gerarGrade();
ativarLinhas();
if (primeiraEscolha) {
  var inputInicio = document.getElementById("input00");
  inputInicio.focus();
  selecionarInput(inputInicio);
}
var tela = document.getElementById("tela");
tela.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    validarLinha();
    gabarito = palavra.split("")
    gabaritoAuxiliar = palavra.split("")
  }
});
