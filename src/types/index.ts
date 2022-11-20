export interface Task {
  name: string
  id: string
  completed: false
}

export interface ListTask {
  name: string
  id: string
  tasks?: Task[]
}
