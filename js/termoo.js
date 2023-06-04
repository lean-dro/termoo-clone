var palavra = [
['','','','',''],
['','','','',''],
['','','','',''],
['','','','',''],
['','','','',''],
['','','','',''],
]
var gabarito = ['A','R','E','I','O']
var ultimoQuadradoEscolhido;
var primeiraEscolha = true
function gerarGrade() {
    var grade = document.getElementById("div_grade")
    div_grade.innerHTML = ""
    for(var i = 0; i<6; i++){
        var linha = document.createElement("div")
        linha.classList.add("linha")
        for(var j = 0; j<5; j++){
            linha.innerHTML += gerarQuadrado(i,j)
        }
        grade.appendChild(linha)
    }
}

function gerarQuadrado(linha,coluna) {
    return `
    <input onclick="selecionarInput(this)" onkeyup="inserirLetra(this, ${linha}, ${coluna})" id="input${linha}${coluna}" class="quadrado" disabled>`
}

function ativarLinhas(linha) {
    for (var coluna = 0; coluna < 5; coluna++) {
       var inputAtual = document.getElementById(`input${linha-1}${coluna}`)
       inputAtual.removeAttribute("disabled")
       inputAtual.classList.add("ativado")
    }
}

function selecionarInput(input) {
    if(primeiraEscolha){
        primeiraEscolha = false
     }else{
        ultimoQuadradoEscolhido.classList.remove("escolhido")
     }
     input.classList.add("escolhido")
     ultimoQuadradoEscolhido = input
}

function inserirLetra(input,linha,coluna) {
    var valorInput = input.value.toUpperCase()
    input.value = valorInput.toUpperCase()
   
    
    if(valorInput.length > 1){
        alert("Apenas uma letra por quadrado!")
        valorInput = ""
        input.value = ""
    }else{
        palavra[linha][coluna] = valorInput
        if(valorInput != ""){
            input.value = valorInput
            direcaoPulo(linha, coluna, "avançar")
        }else{
            direcaoPulo(linha, coluna, "voltar")
        }
    }
}

function direcaoPulo(linha, coluna, direcao) {
    if(direcao=="avançar"){
        if(coluna < 4){
            var proximoInput = document.getElementById(`input${linha}${coluna+1}`)
            proximoInput.focus()
            selecionarInput(proximoInput)
        }
    }else{
        if(coluna > 0){
            var proximoInput = document.getElementById(`input${linha}${coluna-1}`)
            proximoInput.focus()
            selecionarInput(proximoInput)
        }
    }  
}

function validarLinha() {
    
}
gerarGrade()
ativarLinhas(1)