import axios, { AxiosResponse } from "axios"
import Project from "./Project"
import {
  CompletedItem,
  CompletedItemProps,
  Task,
  TaskProps
} from "../Item/Item"

export class ProjectRepository {
  private readonly token: string

  constructor(token: string) {
    this.token = token
  }

  public async getAllProjects(): Promise<Project[]> {
    const syncParams = new URLSearchParams()
    syncParams.append("sync_token", "*")
    syncParams.append("resource_types", '["projects", "items"]')
    syncParams.append("token", this.token)

    const syncResponse: AxiosResponse<ResponseSync> = await axios.post(
      "https://todoist.com/api/v7/sync",
      syncParams
    )

    const getAllParams = new URLSearchParams()
    getAllParams.append("token", this.token)

    const allCompletedResponse: AxiosResponse<
      AllCompletedTasksResponse
    > = await axios.post(
      "https://todoist.com/api/v7/completed/get_all",
      getAllParams
    )

    return syncResponse.data.projects.map(project => {
      const completedItems = allCompletedResponse.data.items
        .filter(item => {
          return item.project_id === project.id
        })
        .map(item => {
          const props: CompletedItemProps = {
            id: item.id,
            content: item.content,
            completedDate: new Date(item.completed_date)
          }

          return new CompletedItem(props)
        })

      const tasks = syncResponse.data.items
        .filter(item => {
          return item.project_id === project.id
        })
        .map(item => {
          const props: TaskProps = {
            id: item.id,
            content: item.content,
            indent: item.indent,
            order: item.item_order
          }

          return new Task(props)
        })

      return new Project({
        id: project.id,
        name: project.name,
        order: project.order,
        tasks: tasks,
        completedItems: completedItems
      })
    })
  }
}

interface ResponseSync {
  sync_token: string
  temp_id_mapping: Object
  full_sync: boolean
  projects: ResponseProject[]
  items: ResponseItem[]
}

interface ResponseProject {
  id: number
  name: string
  order: number
  indent: number
  comment_out: number
}

interface ResponseItem {
  id: number
  user_id: number
  project_id: number
  content: string
  date_string: string
  date_lang: string
  due_date_utc?: string
  indent: number
  priority: number
  item_order: number
  day_order: number
  collapsed: number
  children?: any
  labels: number[]
  assigned_by_uid: number
  responsible_uid?: number
  checked: number
  in_history: number
  is_deleted: number
  is_archived: number
  sync_id?: number
  date_added: string
}

interface AllCompletedTasksResponse {
  items: ResponseCompletedTask[]
}

interface ResponseCompletedTask {
  id: number
  content: string
  project_id: number
  completed_date: string
}
