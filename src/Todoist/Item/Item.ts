interface ItemProps {
  id: number
  content: string
  indent: number
  order: number
  completed: boolean
}

class Item {
  id: number
  content: string
  indent: number
  order: number
  completed: boolean

  constructor(props: ItemProps) {
    this.id = props.id
    this.content = props.content
    this.indent = props.order
    this.order = props.order
    this.completed = props.completed
  }

  toString() {
    return this.content
  }
}
