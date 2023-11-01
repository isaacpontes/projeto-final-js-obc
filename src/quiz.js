import { fetchQuestions, findResult } from "./api";
import { button, div, h2 } from "./elements";

export async function loadQuestions(quizElement) {
  const questions = await fetchQuestions()
  const answers = questions.map((question) => ({ questionId: question.id, answer: null }))

  questions.forEach((question, index) => {
    const questionContainer = div({ className: "question" })

    const textElement = h2(question.text)

    const alternatives = div({ className: "" })
    const alternativeBtns = createAlternativeBtns(question, answers)
    // operador spread
    // alternatives.append(alternativeBtns[0], alternativeBtns[1], alternativeBtns[2], ....)
    alternatives.append(...alternativeBtns)

    if (index > 0) {
      const goBackBtn = button("Voltar à pergunta anterior", { onClick: scrollToPreviousQuestion })
      questionContainer.append(goBackBtn)
    }

    questionContainer.append(textElement, alternatives)
    quizElement.append(questionContainer)
  })

  const finishBtnContainer = div({ className: "finish-btn-container" })
  const finishBtn = button("Ver meu resultado!", {
    className: "finish-btn",
    onClick: async () => {
      const result = await calculateResults(questions, answers)
      quizElement.innerHTML = `<div class="result"><h2>Seu resultado foi: ${result.name}!</h2><p>${result.description}</p></div>`
    }
  })

  finishBtnContainer.append(finishBtn)
  quizElement.append(finishBtnContainer)
}

async function calculateResults(questions, answers) {
  const results = []

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i]
    const answer = answers[i]
    results.push(question.points[answer.answer]) // ex.: question.points["fullyDisagree"]
  }

  const resultsCount = {}
  // short-circuit evaluation
  // resultsCount[2] = (resultsCount[2] || 0)
  results.forEach((result) => resultsCount[result] = (resultsCount[result] || 0) + 1)

  let winnerResult
  let highestCount = 0

  // for (let chave in objeto)
  for (let result in resultsCount) {
    if (resultsCount[result] > highestCount) {
      winnerResult = result
      highestCount = resultsCount[result]
    }
  }

  const result = await findResult(winnerResult)
  return result
}

// answer = { questionId: 1, answer: "fullyDisagree" }
function createAlternativeBtns(question, answers) {
  const fullyDisagreeBtn = button("Discordo Completamente", {
    className: "inline-block",
    onClick: handleSelectAlternative
  })
  fullyDisagreeBtn.addEventListener("click", () => {
    const currentAnswer = answers.find((answer) => answer.questionId === question.id)
    currentAnswer.answer = "fullyDisagree"
  })

  const partiallyDisagreeBtn = button("Discordo Parcialmente", {
    className: "inline-block",
    onClick: handleSelectAlternative
  })
  partiallyDisagreeBtn.addEventListener("click", () => {
    const currentAnswer = answers.find((answer) => answer.questionId === question.id)
    currentAnswer.answer = "partiallyDisagree"
  })

  const dontKnowBtn = button("Não sei", {
    className: "inline-block",
    onClick: handleSelectAlternative
  })
  dontKnowBtn.addEventListener("click", () => {
    const currentAnswer = answers.find((answer) => answer.questionId === question.id)
    currentAnswer.answer = "dontKnow"
  })

  const partiallyAgreeBtn = button("Concordo Parcialmente", {
    className: "inline-block",
    onClick: handleSelectAlternative
  })
  partiallyAgreeBtn.addEventListener("click", () => {
    const currentAnswer = answers.find((answer) => answer.questionId === question.id)
    currentAnswer.answer = "partiallyAgree"
  })

  const fullyAgreeBtn = button("Concordo Completamente", {
    className: "inline-block",
    onClick: handleSelectAlternative
  })
  fullyAgreeBtn.addEventListener("click", () => {
    const currentAnswer = answers.find((answer) => answer.questionId === question.id)
    currentAnswer.answer = "fullyAgree"
  })

  return [fullyDisagreeBtn, partiallyDisagreeBtn, dontKnowBtn, partiallyAgreeBtn, fullyAgreeBtn]
}

function handleSelectAlternative(event) {
  const clickedBtn = event.target
  clickedBtn.parentElement.childNodes.forEach((node) => {
    node.classList.remove("selected")
  })
  clickedBtn.classList.add("selected")

  setTimeout(scrollToNextQuestion, 250)
}

function scrollToNextQuestion() {
  window.scrollBy({ top: document.querySelector(".question").scrollHeight, behavior: "smooth"})
}

function scrollToPreviousQuestion() {
  window.scrollBy({ top: -document.querySelector(".question").scrollHeight, behavior: "smooth"})
}