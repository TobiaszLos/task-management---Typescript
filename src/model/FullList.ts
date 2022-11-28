
import { ListItem } from './ListItem'

export class FullList {
  static instance: FullList = new FullList()

  constructor (private _list: ListItem[] = []) {}

  load () {
    const storedList = localStorage.getItem('myTodoList')
    if (typeof storedList !== 'string') return

    const parsedList: ListItem[] = JSON.parse(storedList)

    parsedList.forEach(obj => {
      const newListObj = new ListItem(obj.id, obj.item, obj.tasks)
      FullList.instance.addItem(newListObj)
    })
  }

  save() {
    localStorage.setItem("myTodoList", JSON.stringify(this._list))
  }

  clearList() {
    this._list = []
  }

  addItem(item: ListItem) {
    this._list.push(item)
  }

  removeItem(id:string) {
    return this._list.filter(item => item.id !== id)
  }
}
