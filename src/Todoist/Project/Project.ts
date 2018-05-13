export interface ProjectProps {
  id: number
  name: string
  order: number
}

export default class Project {
  id: number
  name: string
  order: number

  constructor(props: ProjectProps) {
    this.id = props.id
    this.name = props.name
    this.order = props.order
  }

  toString(): string {
    return this.name
  }
}
