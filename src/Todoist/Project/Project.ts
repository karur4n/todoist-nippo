export interface ProjectProps {
  id: number
  name: string
  order: number
  items: Item[]
}

export type ProjectId = number

export default class Project {
  id: ProjectId
  name: string
  order: number
  items: Item[]
  selected: boolean

  constructor(props: ProjectProps) {
    this.id = props.id
    this.name = props.name
    this.order = props.order
    this.items = props.items
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
