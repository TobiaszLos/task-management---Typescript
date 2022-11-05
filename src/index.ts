const todoListUlElement = document.querySelector(
  '[data-todo-list-container]'
) as HTMLUListElement

const todoListFormElement = document.querySelector(
  '[data-todo-form]'
) as HTMLFormElement

const todoListInputElement = document.querySelector(
  '[data-input-list]'
) as HTMLInputElement

type ListTask = {
  name: string
  count: number
}

const SELECTED_TODO = 'selected_todo'
const LOCAL_STORAGE_TODOS_LIST = 'todos_list'

const dbAllTodos = localStorage.getItem(LOCAL_STORAGE_TODOS_LIST)!

let todos: ListTask[] = JSON.parse(dbAllTodos)

const todosList: ListTask[] = [...todos]

todoListFormElement.addEventListener('submit', (e: Event) => {
  e.preventDefault()

  const task = {
    name: todoListInputElement.value,
    count: 0
  }

  todosList.push(task)

  renderTodoList(todoListUlElement, task)
  saveToLocalStorage(todosList)
})

const init = () => {
  todoListUlElement.innerHTML = ''

  todos.forEach(task => {
    renderTodoList(todoListUlElement, task)
  })
}

const renderTodoList = (parent: HTMLUListElement, task: ListTask) => {
  const LiElement = document.createElement('li')
  LiElement.classList.add('list-name')
  LiElement.innerHTML = `
      <span>${task.name}</span>
      <span class="list-count">${task.count}</span>
    `
  parent.appendChild(LiElement)
}

const saveToLocalStorage = (todos: ListTask[]) => {
  localStorage.setItem(LOCAL_STORAGE_TODOS_LIST, JSON.stringify(todos))
}

console.log(dbAllTodos)

init()
