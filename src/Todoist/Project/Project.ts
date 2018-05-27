import { CompletedItem, Task } from "../Item/Item"

export interface ProjectProps {
  id: number
  name: string
  order: number
  tasks: Task[]
  completedItems: CompletedItem[]
}

export type ProjectId = number

export default class Project {
  id: ProjectId
  name: string
  order: number
  tasks: Task[]
  completedItems: CompletedItem[]
  selected: boolean = true

  constructor(props: ProjectProps) {
    this.id = props.id
    this.name = props.name
    this.order = props.order
    this.tasks = props.tasks
    this.completedItems = props.completedItems
  }

  toString(): string {
    return this.name
  }

  select(): void {
    this.selected = true
  }

  unSelect(): void {
    this.selected = false
  }
}
