import { FullList } from '../model/FullList'
import { TaskItem } from '../model/TaskItem'

interface DOMList {
  ul: HTMLUListElement
  clear(): void
  render(fullList: FullList): void
  // selectedItem: string
}

export class ListTemplate implements DOMList {
  ul: HTMLUListElement
  // selectedItem: string

  static instance: ListTemplate = new ListTemplate()

  constructor () {
    this.ul = document.querySelector(
      '[data-todo-list-container]'
    ) as HTMLUListElement

    // this.selectedItem = localStorage.getItem('mySelectedItem')!
  }

  clear () {
    this.ul.innerHTML = ''
  }

  render (fullList: FullList) {
    this.clear()
    console.log({ ...fullList }, 'LOG Z render(fullList: FullList)')
    fullList.list.forEach(item => {
      const LiElement = document.createElement('li')
      LiElement.classList.add('list-name')
      LiElement.innerHTML = `
          <span>${item.item}</span>
          <span class="list-count">${item.tasks?.length}</span>
        `
      //data-list-todo-id
      LiElement.dataset.listTodoId = item.id

      LiElement.addEventListener('click', () => {
        fullList.setItemAndCurrentList(item.id)
        this.render(fullList)

        // fullList.addTaskToList(new TaskItem('123fff','sniadanie', false))

      })

      if (item.id === fullList._selectedItem) {
        LiElement.setAttribute('active-list', '')
      }
      this.ul.appendChild(LiElement)
    })
  }
}
