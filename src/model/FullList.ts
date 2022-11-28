import { ListItem } from './ListItem'

interface List {
  list: ListItem[]
  save(): void
  clearList(): void
  addItem(item: ListItem): void
  removeItem(id: string): void
}

export class FullList implements List {
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
    this._list.push(item)
    this.save()
  }

  removeItem (id: string) {
    this._list.filter(item => item.id !== id)
    this.save()
  }
}
