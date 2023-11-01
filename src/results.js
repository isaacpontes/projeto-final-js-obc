import { createResult, deleteResult, fetchResults } from "./api"
import { button, listItem } from "./elements"

export async function loadResults(ul) {
  ul.innerHTML = ""
  const results = await fetchResults()

  results.forEach((result) => {
    const li = listItem("", {
      id: `result-${result.id}`,
      innerHTML: `<h3>${result.name}</h3><p>${result.description}</p>`
    })

    const deleteBtn = button("Excluir Resultado", {
      type: "button",
      className: "",
      onClick: async () => {
        await deleteResult(result.id)
        li.remove()
      }
    })

    li.append(deleteBtn)
    ul.append(li)
  })
}

export function addSubmitResultListener(form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault()

    const formData = new FormData(form)

    const nameField = formData.get("name")
    const descriptionField = formData.get("description")

    await createResult(nameField, descriptionField)

    form.reset()
    loadResults(document.getElementById("resultsList"))
  })
}