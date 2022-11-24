import { v4 as uuidv4 } from 'uuid'
import { ListTask, Task } from './types'

const deleteListElement = document.querySelector(
  '[data-delete-list]'
) as HTMLButtonElement

const clearCompletedTaskEl = document.querySelector(
  '[data-clear-completed-tasks]'
) as HTMLButtonElement

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

const taskListElement = document.querySelector(
  '.todo-tasks-title'
) as HTMLElement
const countListElement = document.querySelector(
  '.todo-tasks-count'
) as HTMLElement

/// ADD TASK

const addTaskInputElement = document.querySelector(
  '[data-add-task-input]'
) as HTMLInputElement

const addTaskFormElement = document.querySelector(
  '[data-add-task-form]'
) as HTMLFormElement

let selectedTodoListTask: string

const LOCAL_STORAGE_SELECTED_TODO = 'selected_todo'
const LOCAL_STORAGE_TODOS_LIST = 'todos_list'

const dbAllTodos = localStorage.getItem(LOCAL_STORAGE_TODOS_LIST)!

selectedTodoListTask = JSON.parse(
  localStorage.getItem(LOCAL_STORAGE_SELECTED_TODO)!
)

const todos: ListTask[] = JSON.parse(dbAllTodos) || []

let todosList: ListTask[] = [...todos]

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
    setTodoListCount(selectedTodo?.tasks?.length, countListElement)
  }

  setTodoListTitle(selectedTodo?.name!, taskListElement)
  saveToLocalStorage(todosList)
}

/** TODO LIST ----- ↓ */
todoListFormElement.addEventListener('submit', (e: Event) => {
  e.preventDefault()

  const taskList = {
    name: todoListInputElement.value,
    id: uuidv4(),
    tasks: []
  }

  todosList.push(taskList)

  renderTodoList(todoListUlElement, taskList)
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
      <span class="list-count">${task.tasks?.length}</span>
    `
  //data-list-todo-id
  LiElement.dataset.listTodoId = task.id

  if (task.id === selectedTodoListTask) {
    LiElement.setAttribute('active-list', '')
  }

  parent.appendChild(LiElement)
}

const saveToLocalStorage = (todos: ListTask[]) => {
  localStorage.setItem(LOCAL_STORAGE_TODOS_LIST, JSON.stringify(todosList))
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
    const inputEl = document.createElement('input')
    inputEl.type = 'checkbox'
    inputEl.name = ''
    inputEl.setAttribute('id', `${id}-${task.name}`)
    inputEl.setAttribute('class', 'todo-task-checkbox')
    inputEl.checked = task.completed

    const labelEl = document.createElement('label')
    labelEl.setAttribute('class', 'checkbox-label-container')
    labelEl.setAttribute('for', `${id}-${task.name}`)

    labelEl.onclick = () => {
      task.completed = !task.completed
      saveToLocalStorage(todosList)
    }

    const customSpan = document.createElement('span')
    customSpan.setAttribute('class', 'custom-checkbox')

    const span = document.createElement('span')
    span.setAttribute('class', 'task-text')
    span.innerText = task.name

    labelEl.append(customSpan, span)

    const containerElement = document.createElement('div')
    containerElement.append(inputEl, labelEl)

    container.append(containerElement)
  })
}

const setTodoListTitle = (title: string, element: HTMLElement) => {
  element.innerText = title
}

const setTodoListCount = (count: number, element: HTMLElement) => {
  element.innerHTML = `${count.toString()} tasks left`
}

/** TODO LIST TASKS  ----- ↑ */
// TOOLS
const clearUpcompletedTasks = () => {
  todosList.find(list => {
    if (list.id !== selectedTodoListTask) return

    const chj = list.tasks?.filter(task => task.completed === false)
    list.tasks = chj

    render()
  })
}

const deleteList = () => {
  const selectedTodo = todosList.find((list, index) => {
    return list.id === selectedTodoListTask
  }) as ListTask

  const newState = todosList.filter(
    (task) => task.id !== selectedTodo.id
  )

  todosList = newState
  selectedTodoListTask = newState[newState.length - 1].id
  localStorage.setItem(
    LOCAL_STORAGE_SELECTED_TODO,
    JSON.stringify(newState[newState.length - 1].id)
  )

  render()
}

deleteListElement.addEventListener('click', () => {
  deleteList()
})

clearCompletedTaskEl.addEventListener('click', () => {
  clearUpcompletedTasks()
})

render()
