export interface Task {
  name: string
  id: string
  completed: boolean
}

export type List = {
  name: string
  id: string
  tasks?: Task[]
}
