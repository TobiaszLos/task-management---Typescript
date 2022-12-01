import { ListItem } from './ListItem'
import { TaskItem } from './TaskItem'

interface List {
  list: ListItem[]
  selectedItem: string
  saveList(): void
  clearList(): void
  addItem(item: ListItem): void
  removeItem(id: string): void
  saveSelectedItem(id: string): void
  setSelectedItem(id: string): void
}

type ListItemObj = { _id: string; _item: string; _tasks: TaskItem[] }

export class FullList implements List {
  static instance: FullList = new FullList()

  _selectedItem: string = localStorage.getItem('mySelectedItem')!

  constructor (private _list: ListItem[] = []) {}

  load () {
    const storedList = localStorage.getItem('myTodoList')
    if (typeof storedList !== 'string') return

    const parsedList: ListItemObj[] = JSON.parse(storedList)

    parsedList.forEach(obj => {
      const newListObj = new ListItem(obj._id, obj._item, obj._tasks)
      FullList.instance.addItem(newListObj)
    })
  }

  get list (): ListItem[] {
    return this._list
  }

  get selectedItem (): string {
    return this._selectedItem
  }

  saveList () {
    localStorage.setItem('myTodoList', JSON.stringify(this._list))
  }

  saveSelectedItem (id: string) {
    localStorage.setItem('mySelectedItem', id)
  }

  clearList () {
    this._list = []
    this.saveList()
  }

  addItem (item: ListItem) {
    this._list.push(item)
    this.saveList()
  }

  removeItem (id: string) {
    this._list.filter(item => item.id !== id)
    this.saveList()
  }

  setSelectedItem (id: string) {
    this._selectedItem = id
    this.saveSelectedItem(id)
  }

  addTaskToList (task: TaskItem) {
    const currentList = this._list.find(item => item.id === this._selectedItem)
    currentList?.tasks.push(task)
    this.saveList()
  }
}
