import { v4 as uuidv4 } from 'uuid'

import { id } from './helpers/id'

console.log(typeof uuidv4(), 'aaa')

let x = uuidv4()

//////////////// LIST TODOS ///////////////////
const todoListUlElement = document.querySelector(
  '[data-todo-list-container]'
) as HTMLUListElement

const todoListFormElement = document.querySelector(
  '[data-todo-form]'
) as HTMLFormElement

const todoListInputElement = document.querySelector(
  '[data-input-list]'
) as HTMLInputElement

//////////////// LIST TODOS TASKS ///////////////////
const todoListTasksElement = document.querySelector(
  '[data-tasks-container]'
) as HTMLElement

type Task = { name: string; id: string; completed: false }

type ListTask = {
  name: string
  count: number
  id: string
  tasks?: Task[]
}

let selectedTodoListTask: string



const LOCAL_STORAGE_SELECTED_TODO = 'selected_todo'
const LOCAL_STORAGE_TODOS_LIST = 'todos_list'

const dbAllTodos = localStorage.getItem(LOCAL_STORAGE_TODOS_LIST)!

console.log(JSON.parse(localStorage.getItem(LOCAL_STORAGE_SELECTED_TODO)!), 'aaa')



selectedTodoListTask = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SELECTED_TODO)!)

let todos: ListTask[] = JSON.parse(dbAllTodos) || []

let testTodo: ListTask = {
  name: 'test Task',
  count: 0,
  id: uuidv4(),
  tasks: [{ name: 'TO JEST TESTOWY TASK', id: uuidv4(), completed: false }]
}

const todosList: ListTask[] = [...todos]

/** START APP ----- */
const render = () => {
  todoListUlElement.innerHTML = ''

  todosList.forEach(task => {
    renderTodoList(todoListUlElement, task)
  })
}

/** TODO LIST ----- ↓ */
todoListFormElement.addEventListener('submit', (e: Event) => {
  e.preventDefault()

  const task = {
    name: todoListInputElement.value,
    count: 0,
    id: uuidv4()
  }

  todosList.push(task)

  renderTodoList(todoListUlElement, task)
  saveToLocalStorage(todosList)

  todoListInputElement.value = ''
})

todoListUlElement.addEventListener('click', (e: MouseEvent) => {
  const target = e.target as HTMLElement

  if (target.nodeName === 'LI') {
    selectedTodoListTask = target.dataset.listTodoId!

    render()
    localStorage.setItem(
      LOCAL_STORAGE_SELECTED_TODO,
      JSON.stringify(selectedTodoListTask)
    )
  }

  console.log(target.dataset.listTodoId, id())
  console.log('listTodoId', selectedTodoListTask)
})

const renderTodoList = (parent: HTMLUListElement, task: ListTask) => {
  const LiElement = document.createElement('li')
  LiElement.classList.add('list-name')
  LiElement.innerHTML = `
      <span>${task.name}</span>
      <span class="list-count">${task.count}</span>
    `
  //data-list-todo-id
  LiElement.dataset.listTodoId = task.id

  if (task.id === selectedTodoListTask) {
    LiElement.setAttribute('active-list', '')
  
  } else {
    console.log('nie rowna sie')
    console.log({task, selectedTodoListTask})
  }

  parent.appendChild(LiElement)
}

const saveToLocalStorage = (todos: ListTask[]) => {
  console.log('HI')
  localStorage.setItem(LOCAL_STORAGE_TODOS_LIST, JSON.stringify(todos))

}

/** TODO LIST TASKS ----- ↓ */

const renderTodoListTasks = (todoTask: Task[], container: HTMLElement) => {
  todoTask.forEach((task, id) => {
    const contentTemplate = `
    <input
      class="todo-task-checkbox"
      type="checkbox"
      name=""
      id="${id}-${task.name}"
    />
    <label class="checkbox-label-container" for="${id}-${task.name}">
      <span class="custom-checkbox"></span>
      <span class="task-text"> ${task.name}</span>
    </label>
    `
    const containerElement = document.createElement('div')
    containerElement.innerHTML = contentTemplate
    container.append(containerElement)
  })
}

/** TODO LIST TASKS----- ↑ */

render()
