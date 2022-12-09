import { setTitle } from '../helpers'
import { State } from '../model/state'
import { TaskTemplate } from './TaskTemplate'

interface DOMList {
  ul: HTMLUListElement
  clear(): void
  render(state: State): void
  tasksTemplate: TaskTemplate
}

export class ListTemplate implements DOMList {
  ul: HTMLUListElement
  tasksTemplate: TaskTemplate = TaskTemplate.instante

  static instance: ListTemplate = new ListTemplate()

  constructor () {
    this.ul = document.querySelector(
      '[data-todo-list-container]'
    ) as HTMLUListElement
  }

  clear () {
    this.ul.innerHTML = ''
  }

  render (state: State) {
    this.clear()

    state.list.forEach(item => {
      const LiElement = document.createElement('li')
      LiElement.classList.add('list-name')
      LiElement.innerHTML = `
          <span>${item.item}</span>
          <span class="list-count">${item.tasks?.length}</span>
        `
      //data-list-todo-id
      LiElement.dataset.listTodoId = item.id

      LiElement.addEventListener('click', () => {
        state.setItemAndCurrentList(item.id)
        this.render(state)

        this.tasksTemplate.render(state.currentList)

        // Set TITLE in tasks section 
        setTitle(state.currentList.item)
      })

      if (item.id === state.selectedItemId) {
        LiElement.setAttribute('active-list', '')
      }

      this.ul.appendChild(LiElement)
    })
  }
}
