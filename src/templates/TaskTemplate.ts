import { ListItem } from '../model/ListItem'
import { TaskItem } from '../model/TaskItem'

export class TaskTemplate {
  private ul: HTMLUListElement

  static instante: TaskTemplate = new TaskTemplate()

  constructor () {
    this.ul = document.querySelector(
      '[data-tasks-container]'
    ) as HTMLUListElement
  }

  render (tasksList: ListItem) {
    //console.log(tasksList, 'task')
    tasksList.tasks.forEach((task, id) => {
      //console.log(task, 'task -------')
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
        // saveToLocalStorage(todosList)
     
        //console.log('TASK', task)
      }

      const customSpan = document.createElement('span')
      customSpan.setAttribute('class', 'custom-checkbox')

      const span = document.createElement('span')
      span.setAttribute('class', 'task-text')
      span.innerText = task.name

      labelEl.append(customSpan, span)

      const containerElement = document.createElement('div')
      containerElement.append(inputEl, labelEl)



      this.ul.append(containerElement)
    })
  }
}
