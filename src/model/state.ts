import { ListItem } from './ListItem'
import { TaskItem } from './TaskItem'

interface List {
  list: ListItem[]
  selectedItemId: string
  currentList: ListItem
  saveList(): void
  clearCompletedList(): void
  addItem(item: ListItem): void
  findAndDeleteList(id: string): void
  setCurrentList(id: string): void
  setItemAndCurrentList(id: string): void
  addTaskToList(task: TaskItem): void
  saveSelectedItemId(id: string): void
  uncompletedTasksCount(): string
  load(): void
}

// types data from LOCAL STORAGE ↓
export type taskItemObj = { _id: string; _name: string; _completed: boolean }
export type ListItemObj = { _id: string; _item: string; _tasks: taskItemObj[] }

export class State implements List {
  static instance: State = new State()

  private _selectedItemId: string = localStorage.getItem('mySelectedItem')!
  private _currentList: ListItem = new ListItem()

  constructor (private _list: ListItem[] = []) {}

  load () {
    const storedList = localStorage.getItem('myTodoList')
    if (typeof storedList !== 'string') return

    const parsedList: ListItemObj[] = JSON.parse(storedList)

    parsedList.forEach(obj => {
      const newTaskItem: TaskItem[] = []

      obj._tasks.forEach(task => {
        newTaskItem.push(new TaskItem(task._id, task._name, task._completed))
      })

      const newListItem = new ListItem(obj._id, obj._item, newTaskItem)
      this.addItem(newListItem)
    })
    this.setCurrentList(this._selectedItemId)
    
    

  }

  get list (): ListItem[] {
    return this._list
  }

  get currentList (): ListItem {
    return this._currentList
  }

  get selectedItemId (): string {
    return this._selectedItemId
  }

  saveList () {
    localStorage.setItem('myTodoList', JSON.stringify(this._list))
  }

  saveSelectedItemId (id: string) {
    localStorage.setItem('mySelectedItem', id)
  }

  addItem (item: ListItem) {
    this._list.push(item)
    this.saveList()
  }

  findAndDeleteList (id: string) {
    this._list = this._list.filter(item => item.id !== id)

    if(this._list.length !== 0) {
      this._currentList = this._list[this._list.length - 1]
      this._selectedItemId = this._currentList.id
      this.saveSelectedItemId(this._currentList.id)
    } 
 
    this.saveList()
  }

  setItemAndCurrentList (id: string) {
    this.saveSelectedItemId(id)
    this._selectedItemId = id
    this._currentList = this._list.find(item => item.id === id)!
  }

  setCurrentList (id: string) {
    const currentList = this._list.find(item => item.id === id)!
    this._currentList = currentList
  }

  addTaskToList (task: TaskItem) {
    this._currentList.tasks.push(task)
    this.saveList()
  }

  clearCompletedList () {
    const filtredTasks = this._currentList.tasks.filter(task => !task.completed)

    this.currentList.tasks = filtredTasks
    this.saveList()
  }

  uncompletedTasksCount() {
    const filtredTasks = this._currentList.tasks.filter(task => !task.completed)
    return filtredTasks.length.toString()
  }
}
