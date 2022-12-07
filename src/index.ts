import { FullList } from './model/FullList'
import { ListItem } from './model/ListItem'
import { TaskItem } from './model/TaskItem'
import { ListTemplate } from './templates/ListTemplate'

import { v4 as uuidv4 } from 'uuid'
import { TaskTemplate } from './templates/TaskTemplate'

const initApp = (): void => {
  const fullList = FullList.instance // local storage full list
  const templateList = ListTemplate.instance
  const templateTasks = TaskTemplate.instante

  // Add new item to list of todos
  const addListForm = document.querySelector(
    '[data-todo-form]'
  ) as HTMLFormElement

  addListForm.addEventListener('submit', e => {
    e.preventDefault()

    const inputList = document.querySelector(
      '[data-input-list]'
    ) as HTMLInputElement

    const inputValue = inputList.value.trim()
    if (!inputValue.length) return

    fullList.addItem(new ListItem(uuidv4().slice(0, 6), inputValue, []))
    inputList.value = ''

    templateList.render(fullList)
  })

  const addTaskToListForm = document.querySelector(
    '[data-add-task-form]'
  ) as HTMLFormElement

  addTaskToListForm.addEventListener('submit', e => {
    e.preventDefault()
    const inputAddTask = document.querySelector(
      '[data-add-task-input]'
    ) as HTMLInputElement

    fullList.addTaskToList(
      new TaskItem(uuidv4().slice(0, 6), inputAddTask.value, false)
    )
  })

  // load data from local storage to stateP
  fullList.load()
  // render template base on local stroage data
  templateList.render(fullList)

  templateTasks.render(fullList._curretList)
}

document.addEventListener('DOMContentLoaded', initApp)

