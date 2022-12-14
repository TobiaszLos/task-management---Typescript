import { State } from './model/state'
import { ListItem } from './model/ListItem'
import { TaskItem } from './model/TaskItem'
import { ListTemplate } from './templates/ListTemplate'
import { TaskTemplate } from './templates/TaskTemplate'
import { v4 as uuidv4 } from 'uuid'
import { setCount, setTitle, toggleDisplay } from './helpers'

const initApp = (): void => {
  const state = State.instance // local storage full list
  const templateList = ListTemplate.instance
  const templateTasks = TaskTemplate.instante

  // -----ADD TO LIST -------- //
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

    const newItemList = new ListItem(uuidv4().slice(0, 6), inputValue, [])

    state.addItem(newItemList)
    state.setItemAndCurrentList(newItemList.id) // set active list

    inputList.value = ''

    templateList.render(state)

    templateTasks.render(state)
    setTitle(state.currentList.item)
    setCount(state.uncompletedTasksCount())

    if (state.list.length !== 0) {
      toggleDisplay('show')
    }
  })

  // -----ADD TASK TO LIST -------- //
  const addTaskToListElement = document.querySelector(
    '[data-add-task-form]'
  ) as HTMLFormElement

  addTaskToListElement.addEventListener('submit', e => {
    e.preventDefault()
    const input = document.querySelector(
      '[data-add-task-input]'
    ) as HTMLInputElement

    const inputValue = input.value.trim()

    if (!inputValue.length) return

    state.addTaskToList(new TaskItem(uuidv4().slice(0, 6), inputValue, false))
    input.value = ''
    templateList.render(state) // just to set count
    templateTasks.render(state)

    setCount(state.uncompletedTasksCount())
  })

  // ----DELETE LIST-------- //
  const deleteList = document.querySelector(
    '[data-delete-list]'
  ) as HTMLButtonElement

  deleteList.addEventListener('click', () => {
    state.findAndDeleteList(state.currentList.id)
    templateTasks.render(state)
    templateList.render(state)

    setTitle(state.currentList.item)
    setCount(state.uncompletedTasksCount())

    if (state.list.length === 0) {
      toggleDisplay('hidden')
    }
  })

  // ----CLEAR COMPLETED lIST ------- //
  const clearCompletedList = document.querySelector(
    '[data-clear-completed-tasks]'
  ) as HTMLButtonElement

  clearCompletedList.addEventListener('click', () => {
    state.clearCompletedList()

    templateTasks.render(state)
    templateList.render(state) // reRender count number in list section
    setCount(state.uncompletedTasksCount())
  })

  // ---- DEFAULT -------- //

  state.load()
  templateList.render(state)

  if (state.list.length) {
    templateTasks.render(state)

    setTitle(state.currentList.item)
    setCount(state.uncompletedTasksCount())
  } else {
    toggleDisplay('hidden')
  }

  console.log('state: ', state)
}

document.addEventListener('DOMContentLoaded', initApp)
