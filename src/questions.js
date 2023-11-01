import { createQuestion, deleteQuestion, fetchQuestions, fetchResults, updateQuestion } from "./api"
import { button, div, h3, input, label, option, select } from "./elements"

export async function createEmptyQuestion(managerElement, results) {
  const question = await createQuestion()
  createQuestionForm(managerElement, question, results)
}

export async function loadQuestionsManager(managerElement) {
  managerElement.innerHTML = ""
  const questions = await fetchQuestions()
  const results = await fetchResults()

  questions.forEach((question) => createQuestionForm(managerElement, question, results))
}

function createQuestionForm(managerElement, question, results) {
  const questionForm = document.createElement("form")
  questionForm.className = "questionForm"

  questionForm.addEventListener("submit", async (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const text = formData.get("text")

    const points = {}
    points.fullyDisagree = +formData.get("fullyDisagree")
    points.partiallyDisagree = +formData.get("partiallyDisagree")
    points.dontKnow = +formData.get("dontKnow")
    points.partiallyAgree = +formData.get("partiallyAgree")
    points.fullyAgree = +formData.get("fullyAgree")

    await updateQuestion(question.id, text, points)
    alert("Pergunta atualizada com sucesso!")
  })

  const questionFormTitle = h3(`Pergunta ${question.id}`)
  const questionTextLabel = label("Texto da Pergunta:", `question-${question.id}-text`)
  const questionTextInput = input("text", {
    id: `question-${question.id}-text`,
    name: "text",
    value: question.text
  })

  const fullyDisagreeField = createAlternativeField({
    labelText: "Discordo Completamente",
    fieldId: `question-${question.id}-fully-disagree`,
    fieldName: "fullyDisagree"
  }, question, results)

  const partiallyDisagreeField = createAlternativeField({
    labelText: "Discordo Parcialmente",
    fieldId: `question-${question.id}-partially-disagree`,
    fieldName: "partiallyDisagree"
  }, question, results)

  const dontKnowField = createAlternativeField({
    labelText: "Não Sei",
    fieldId: `question-${question.id}-dont-know`,
    fieldName: "dontKnow"
  }, question, results)

  const partiallyAgreeField = createAlternativeField({
    labelText: "Concordo Parcialmente",
    fieldId: `question-${question.id}-partially-agree`,
    fieldName: "partiallyAgree"
  }, question, results)

  const fullyAgreeField = createAlternativeField({
    labelText: "Concordo Completamente",
    fieldId: `question-${question.id}-fully-agree`,
    fieldName: "fullyAgree"
  }, question, results)

  const buttonGroup = div({ className: "button-group" })

  const submitBtn = button("Salvar Pergunta", { type: "submit" })
  const deleteBtn = button("Excluir Pergunta", {
    type: "button",
    onClick: async () => {
      await deleteQuestion(question.id)
      questionForm.remove()
    }
  })

  buttonGroup.append(submitBtn, deleteBtn)

  questionForm.append(
    questionFormTitle,
    questionTextLabel,
    questionTextInput,
    fullyDisagreeField,
    partiallyDisagreeField,
    dontKnowField,
    partiallyAgreeField,
    fullyAgreeField,
    buttonGroup
  )

  managerElement.append(questionForm)
}

// alternative = { labelText, id, name }
function createAlternativeField(alternative, question, results) {
  const container = div({ className: "inline-block" })

  const fieldLabel = label(alternative.labelText, alternative.fieldId)
  const fieldSelect = select(alternative.fieldId, alternative.fieldName)

  const defaultOption = option("Selecione...", { selected: true, disabled: true })
  fieldSelect.options.add(defaultOption)

  results.forEach((result) => {
    const resultOption = option(result.name, {
      value: result.id,
      selected: question.points[alternative.fieldName] === result.id
    })
    fieldSelect.options.add(resultOption)
  })

  container.append(fieldLabel, fieldSelect)
  return container
}

// objeto.propriedade
// objeto["string qualquer"]