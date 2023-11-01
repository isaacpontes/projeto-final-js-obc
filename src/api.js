export async function fetchResults() {
  const results = await fetch("http://localhost:3000/results").then((response) => response.json())
  return results
}

export async function findResult(resultId) {
  return await fetch(`http://localhost:3000/results/${resultId}`).then((response) => response.json())
}

export async function createResult(name, description) {
  // const body = JSON.stringify({ name: name, description: description })
  const body = JSON.stringify({ name, description })

  await fetch("http://localhost:3000/results", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body
  })
}

export async function deleteResult(resultId) {
  await fetch(`http://localhost:3000/results/${resultId}`, { method: "DELETE" })
}

/**
 * pergunta:
 *  - texto: string
 *  - pontos: objetos
 *      fullyDisagree: resultId
 *      partiallyDisagree: resultId
 *      dontKnow: resultId
 *      partiallyAgree: resultId
 *      fullyAgree: resultId
 */


// função para carregar as perguntas do backend
export async function fetchQuestions() {
  return await fetch("http://localhost:3000/questions").then((response) => response.json())
}

// função para criar um pergunta vazia
export async function createQuestion(text = "Escreva sua pergunta...", points = {
  fullyDisagree: null,
  partiallyDisagree: null,
  dontKnow: null,
  partiallyAgree: null,
  fullyAgree: null
}) {
  const body = JSON.stringify({ text: text, points: points })

  const response = await fetch("http://localhost:3000/questions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body
  })

  if (!response.ok) return alert("Erro ao criar uma nova pergunta.")

  return await response.json()
}

// função para atualizar uma pergunta existente
export async function updateQuestion(questionId, text, points) {
  const body = JSON.stringify({ text, points })

  await fetch(`http://localhost:3000/questions/${questionId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: body
  })
}

// função para excluir uma pergunta
export async function deleteQuestion(questionId) {
  await fetch(`http://localhost:3000/questions/${questionId}`, { method: "DELETE" })
}