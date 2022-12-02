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

  // load data from local storage to state
  fullList.load()
  // render template base on local stroage data
  templateList.render(fullList)




  const taskItemLog = new TaskItem()
  const listItemLog = new ListItem()
  console.log({ taskItemLog, listItemLog, fullList }, 'LOG Z INDEX><JS')

  console.log({ taskTemplate: new TaskTemplate() })
}

document.addEventListener('DOMContentLoaded', initApp)
