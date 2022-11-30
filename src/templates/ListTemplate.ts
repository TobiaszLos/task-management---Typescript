import { FullList } from "../model/FullList"

interface DOMList {
  ul: HTMLUListElement
  clear(): void
  render(fullList: FullList): void
}

export class ListTemplate implements DOMList {
  ul: HTMLUListElement

  static instance: ListTemplate = new ListTemplate()

  
  constructor () {
    this.ul = document.querySelector(
      '[data-todo-list-container]'
    ) as HTMLUListElement
  }

  clear () {
    this.ul.innerHTML = ''
  }


  render(fullList: FullList) {
    this.clear()

    fullList.list.forEach(item => {
      const LiElement = document.createElement('li')
      LiElement.classList.add('list-name')
      LiElement.innerHTML = `
          <span>${item.item}</span>
          <span class="list-count">${item.tasks?.length}</span>
        `
      //data-list-todo-id
      LiElement.dataset.listTodoId = item.id
    
      // if (item.id === selectedTodoListTask) {
      //   LiElement.setAttribute('active-list', '')
      // }
      this.ul.appendChild(LiElement)
    })
  }

}
