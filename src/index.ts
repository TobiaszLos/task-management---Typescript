import { ListItem } from "./model/ListItem"
import { TaskItem } from "./model/TaskItem"

const initApp = (): void => {
  const test = new TaskItem()
  const test2 = new ListItem()

 console.log(test2)



}



document.addEventListener('DOMContentLoaded', initApp)