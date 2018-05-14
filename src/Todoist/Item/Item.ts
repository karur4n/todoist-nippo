interface ItemProps {
  id: number
  content: string
  indent: number
  order: number
  completed: boolean
  completedDate?: Date
}

class Item {
  id: number
  content: string
  indent: number
  order: number
  completed: boolean
  completedDate?: Date

  constructor(props: ItemProps) {
    this.id = props.id
    this.content = props.content
    this.indent = props.order
    this.order = props.order
    this.completed = props.completed
    this.completedDate = props.completedDate
  }

  toString() {
    return this.content
  }
}
