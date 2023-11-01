export function h2(text) {
  const h2 = document.createElement("h2")
  h2.textContent = text
  return h2
}

export function h3(text) {
  const h3 = document.createElement("h3")
  h3.textContent = text
  return h3
}

export function listItem(text, { id, innerHTML}) {
  const li = document.createElement("li")
  li.textContent = text
  li.innerHTML = innerHTML
  li.id = id
  return li
}

export function label(text, htmlFor) {
  const label = document.createElement("label")
  label.htmlFor = htmlFor
  label.textContent = text
  return label
}

export function input(type, { id, name, value }) {
  const input = document.createElement("input")
  input.id = id
  input.name = name
  input.type = type
  input.value = value
  return input
}

export function select(id, name) {
  const select = document.createElement("select")
  select.id = id
  select.name = name
  return select
}

export function option(text, { selected, disabled, value } = {}) {
  const option = document.createElement("option")
  option.textContent = text
  option.selected = selected
  option.disabled = disabled
  option.value = value
  return option
}

export function button(text, { type, className, onClick } = { type: "submit" }) {
  const button = document.createElement("button")
  button.type = type
  button.textContent = text
  button.className = className
  button.addEventListener("click", onClick)
  return button
}

export function div({ className }) {
  const div = document.createElement("div")
  div.className = className
  return div
}
