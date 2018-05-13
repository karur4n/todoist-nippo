interface TodoistItem {
  id: number
  projectId: number
  content: string
  indent: number
  itemOrder: number
  completed: boolean
}

interface TodoistItemsRepository {
  constructor(token: string): TodoistItemsRepository
  getCompletedItems(): Promise<TodoistItem[]>
}
