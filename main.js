import { fetchResults } from './src/api'
import { createEmptyQuestion, loadQuestionsManager } from './src/questions'
import { loadQuestions } from './src/quiz'
import { addSubmitResultListener, loadResults } from './src/results'
import './style.css'

document.addEventListener("DOMContentLoaded", async function () {
  const newResultForm = document.getElementById("newResultForm")
  if (newResultForm) addSubmitResultListener(newResultForm)

  const results = await fetchResults()

  const resultsList = document.getElementById("resultsList")
  if (resultsList) loadResults(resultsList)

  const questionsManager = document.getElementById("questionsManager")
  if (questionsManager) loadQuestionsManager(questionsManager)

  const newQuestionBtn = document.getElementById("newQuestion")
  if (newQuestionBtn) newQuestionBtn.addEventListener("click", () => {
    createEmptyQuestion(questionsManager, results)
  })

  const quizElement = document.getElementById("quiz")
  if (quizElement) loadQuestions(quizElement)
})