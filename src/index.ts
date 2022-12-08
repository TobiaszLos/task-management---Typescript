import { State } from './model/state'
import { ListItem } from './model/ListItem'
import { TaskItem } from './model/TaskItem'
import { ListTemplate } from './templates/ListTemplate'
import { TaskTemplate } from './templates/TaskTemplate'
import { v4 as uuidv4 } from 'uuid'

const initApp = (): void => {
  const state = State.instance // local storage full list
  const templateList = ListTemplate.instance
  const templateTasks = TaskTemplate.instante

  // Add new item to list of todos
  const addListFormElement = document.querySelector(
    '[data-todo-form]'
  ) as HTMLFormElement

  addListFormElement.addEventListener('submit', e => {
    e.preventDefault()

    const inputList = document.querySelector(
      '[data-input-list]'
    ) as HTMLInputElement

    const inputValue = inputList.value.trim()
    if (!inputValue.length) return

    state.addItem(new ListItem(uuidv4().slice(0, 6), inputValue, []))
    inputList.value = ''

    templateList.render(state)
  })

  const addTaskToListElement = document.querySelector(
    '[data-add-task-form]'
  ) as HTMLFormElement

  addTaskToListElement.addEventListener('submit', e => {
    e.preventDefault()
    const input = document.querySelector(
      '[data-add-task-input]'
    ) as HTMLInputElement

    state.addTaskToList(new TaskItem(uuidv4().slice(0, 6), input.value, false))
    input.value = ''
    templateTasks.render(state._curretList)
  })

  // load data from local storage to stateP
  state.load()
  // render template base on local stroage data
  templateList.render(state)

  templateTasks.render(state._curretList)

  console.log('🚀 ~ file: index.ts:54 ~ initApp ~ fullList', state)

  // Default setting tasks section

  const h2 = document.querySelector('.todo-tasks-title') as HTMLElement
  h2.innerText = state._curretList.item
}

document.addEventListener('DOMContentLoaded', initApp)
