import { ListItem } from './ListItem'
import { TaskItem } from './TaskItem'

interface List {
  list: ListItem[]
  save(): void
  clearList(): void
  addItem(item: ListItem): void
  removeItem(id: string): void
}

type ListItemObj = { _id: string; _item: string; _tasks: TaskItem[] }

export class FullList implements List {
  static instance: FullList = new FullList()

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

  save () {
    localStorage.setItem('myTodoList', JSON.stringify(this._list))
  }

  clearList () {
    this._list = []
    this.save()
  }

  addItem (item: ListItem) {
    console.log('added ITEM', item, this.list)
    this._list.push(item)
    this.save()
  }

  removeItem (id: string) {
    this._list.filter(item => item.id !== id)
    this.save()
  }
}
