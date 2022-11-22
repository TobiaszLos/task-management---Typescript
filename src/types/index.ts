export interface Task {
  name: string
  id: string
  completed: boolean
}

export type ListTask = {
  name: string
  id: string
  tasks?: Task[]
}
