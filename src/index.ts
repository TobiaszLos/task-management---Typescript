import { FullList } from "./model/FullList"
import { ListItem } from "./model/ListItem"
import { TaskItem } from "./model/TaskItem"

const initApp = (): void => {
  
  const fullist = FullList.instance
  
  const test = new TaskItem()
  const test2 = new ListItem()



 console.log(test2)


  fullist.addItem(new ListItem('asddsa123', 'task1', []))


}



document.addEventListener('DOMContentLoaded', initApp)