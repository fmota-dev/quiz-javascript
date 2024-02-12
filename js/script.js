const perguntas = [
	{
		pergunta: "Qual é a finalidade do comando 'console.log()' em JavaScript?",
		respostas: [
			"Exibir uma mensagem de erro",
			"Imprimir dados no console",
			"Criar uma variável",
		],
		correta: 1,
	},
	{
		pergunta: "Qual é a função do operador '===' em comparações em JavaScript?",
		respostas: [
			"Comparação de valores sem considerar o tipo",
			"Atribuição de valores",
			"Comparação estrita de valores e tipos",
		],
		correta: 2,
	},
	{
		pergunta: "Como se declara uma variável em JavaScript?",
		respostas: [
			"let myVar;",
			"const myVar = 10;",
			"ambas as opções acima estão corretas",
		],
		correta: 2,
	},
	{
		pergunta: "O que é uma função em JavaScript?",
		respostas: [
			"Um tipo de dado",
			"Um bloco de código reutilizável",
			"Uma variável global",
		],
		correta: 1,
	},
	{
		pergunta:
			"Qual é a diferença entre 'let' e 'const' na declaração de variáveis?",
		respostas: [
			"Nenhuma, são sinônimos",
			"let é usado para valores constantes, const para variáveis",
			"let permite reatribuição, const cria variáveis imutáveis",
		],
		correta: 2,
	},
	{
		pergunta: "O que é o DOM em JavaScript?",
		respostas: [
			"Um método de criptografia",
			"Um modelo de objeto para manipular documentos HTML",
			"Uma linguagem de programação",
		],
		correta: 1,
	},
	{
		pergunta:
			"Como se realiza uma iteração sobre os elementos de um array em JavaScript?",
		respostas: [
			"Usando a estrutura 'if-else'",
			"Com a declaração 'switch'",
			"Utilizando loops como 'for' ou 'forEach'",
		],
		correta: 2,
	},
	{
		pergunta: "O que é o JSON em JavaScript?",
		respostas: [
			"Um método de formatação de texto",
			"Uma linguagem de estilização",
			"Um formato de dados leve e intercambiável",
		],
		correta: 2,
	},
	{
		pergunta: "Qual é a diferença entre 'null' e 'undefined' em JavaScript?",
		respostas: [
			"São iguais, usados de forma intercambiável",
			"'null' representa a ausência de valor, 'undefined' é atribuído explicitamente",
			"Ambos representam valores vazios",
		],
		correta: 1,
	},
	{
		pergunta:
			"Como se adiciona um evento a um elemento HTML usando JavaScript?",
		respostas: [
			"Apenas com CSS",
			"Usando o atributo 'event'",
			"Através do método 'addEventListener'",
		],
		correta: 2,
	},
]

const quiz = document.querySelector("#quiz")
const template = document.querySelector("template")
const enviarButton = document.querySelector("#enviar")
const reiniciarButton = document.querySelector("#reiniciar")
const acertosContainer = document.querySelector("#acertos")
const mostrarTotal = document.querySelector("#acertos span")
const corretas = new Set()
const totalDePerguntas = perguntas.length

// loop ou laço de repetição
for (const item of perguntas) {
	const quizItem = template.content.cloneNode(true)
	quizItem.querySelector("h3").textContent = item.pergunta

	for (let resposta of item.respostas) {
		const dt = quizItem.querySelector("dl dt").cloneNode(true)
		dt.querySelector("span").textContent = resposta
		dt.querySelector("input").setAttribute(
			"name",
			"pergunta-" + perguntas.indexOf(item)
		)
		dt.querySelector("input").value = item.respostas.indexOf(resposta)
		quizItem.querySelector("dl").appendChild(dt)
	}

	quizItem.querySelector("dl dt").remove()
	quiz.appendChild(quizItem)
}

// Adiciona evento de clique para o botão "Enviar"
enviarButton.addEventListener("click", () => {
	// Verificar se todas as perguntas foram respondidas
	const perguntasRespondidas = document.querySelectorAll("input:checked").length
	if (perguntasRespondidas !== totalDePerguntas) {
		alert(
			`Por favor, responda todas as ${totalDePerguntas} perguntas antes de enviar.`
		)
		return
	}

	// Resetar o conjunto de respostas corretas
	corretas.clear()

	// Iterar sobre as respostas selecionadas e verificar se estão corretas
	const respostasSelecionadas = document.querySelectorAll("input:checked")
	respostasSelecionadas.forEach((resposta) => {
		const perguntaIndex = parseInt(resposta.name.split("-")[1])
		const pergunta = perguntas[perguntaIndex]
		if (parseInt(resposta.value) === pergunta.correta) {
			corretas.add(pergunta)
		}
	})

	// Atualizar a contagem de acertos
	mostrarTotal.textContent = corretas.size + " de " + totalDePerguntas

	// Mostrar o contêiner de acertos e o botão de reiniciar
	acertosContainer.style.display = "block"
	reiniciarButton.style.display = "inline"
})

// Adiciona evento de clique para o botão "Reiniciar"
reiniciarButton.addEventListener("click", () => {
	// Limpar seleções
	const respostasSelecionadas = document.querySelectorAll("input:checked")
	respostasSelecionadas.forEach((resposta) => {
		resposta.checked = false
	})

	// Resetar contagem de acertos
	corretas.clear()
	mostrarTotal.textContent = "0 de " + totalDePerguntas

	// Ocultar contêiner de acertos e botão de reiniciar
	acertosContainer.style.display = "none"
	reiniciarButton.style.display = "none"
})
