export interface itemT {
  id: string
  name: string
  completed: boolean
}

export class TaskItem implements itemT {
  constructor (
    private _id: string = '',
    private _name: string = '',
    private _completed: boolean = false
  ) {}

  get id (): string {
    return this._id
  }

  set id (id: string) {
    this._id = id
  }

  get name (): string {
    return this._name
  }

  set name (name: string) {
    this._name = name
  }

  get completed (): boolean {
    return this._completed
  }

  set completed (completed: boolean) {
    this._completed = completed
  }
}
