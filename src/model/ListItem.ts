import { TaskItem } from './TaskItem'

export interface ItemL {
  id: string
  item: string
  tasks: TaskItem[]
}

export class ListItem implements ItemL {
  constructor (
    private _id: string = '',
    private _item: string = '',
    private _tasks: TaskItem[] = []
  ) {}

  get id (): string {
    return this._id
  }

  set id (id: string) {
    this._id = id
  }

  get item (): string {
    return this._item
  }

  set item (item: string) {
    this._item = item
  }

  get tasks (): TaskItem[] {
    return this._tasks
  }

  set tasks (task: TaskItem[]) {
    this._tasks = task
  }
}
