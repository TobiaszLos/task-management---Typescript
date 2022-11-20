import { v4 as uuidv4 } from 'uuid'

import { id } from './helpers/id'

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

/// ADD TASK

const addTaskInputElement = document.querySelector(
  '[data-add-task-input]'
) as HTMLInputElement

const addTaskFormElement = document.querySelector(
  '[data-add-task-form]'
) as HTMLFormElement

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

selectedTodoListTask = JSON.parse(
  localStorage.getItem(LOCAL_STORAGE_SELECTED_TODO)!
)

let todos: ListTask[] = JSON.parse(dbAllTodos) || []

const todosList: ListTask[] = [...todos]

/** START APP ----- */
const render = () => {
  todoListUlElement.innerHTML = ''

  todosList.forEach(task => {
    renderTodoList(todoListUlElement, task)
  })

  const selectedTodo = todosList.find(todo => todo.id === selectedTodoListTask)

  todoListTasksElement.innerHTML = ''
  if (selectedTodo?.tasks !== undefined) {
    renderTodoListTasks(selectedTodo?.tasks, todoListTasksElement)
  }
}

/** TODO LIST ----- ↓ */
todoListFormElement.addEventListener('submit', (e: Event) => {
  e.preventDefault()

  const task = {
    name: todoListInputElement.value,
    count: 0,
    id: uuidv4(),
    tasks: []
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
    // console.log('nie rowna sie')
    // console.log({ task, selectedTodoListTask })
  }

  parent.appendChild(LiElement)
}

const saveToLocalStorage = (todos: ListTask[]) => {
  localStorage.setItem(LOCAL_STORAGE_TODOS_LIST, JSON.stringify(todos))
}

/** TODO LIST TASKS ----- ↓ */

addTaskFormElement.addEventListener('submit', e => {
  e.preventDefault()

  const taskName = addTaskInputElement.value
  const activeList = todosList.find(todo => todo.id === selectedTodoListTask)

  const task: Task = {
    name: taskName,
    id: uuidv4(),
    completed: false
  }

  if (activeList?.tasks !== undefined) {
    activeList.tasks.push(task)
  }

  render()
  saveToLocalStorage(todosList)
})

const renderTodoListTasks = (todoTask: Task[], container: HTMLElement) => {
  todoTask.forEach((task, id) => {
    console.log(task, 'TASK!!')
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
