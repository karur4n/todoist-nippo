interface ItemProps {
  id: number
  content: string
}

class Item {
  id: number
  content: string

  constructor(props: ItemProps) {
    this.id = props.id
    this.content = props.content
  }
}

export interface TaskProps extends ItemProps {
  indent: number
  order: number
}

/**
 * 未完了の Item
 */
export class Task extends Item {
  indent: number
  order: number

  constructor(props: TaskProps) {
    super(props)

    this.indent = props.indent
    this.order = props.order
  }
}

export interface CompletedItemProps extends ItemProps {
  completedDate: Date
}

/**
 * 完了済みの Item
 */
export class CompletedItem extends Item {
  completedDate: Date

  constructor(props: CompletedItem) {
    super(props)

    this.completedDate = props.completedDate
  }
}
