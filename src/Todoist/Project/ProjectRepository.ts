import axios, { AxiosResponse } from "axios"
import Project, { ProjectProps } from "./Project"

class ProjectRepository {
  private readonly token: string
  projects?: Project[]

  constructor(token: string) {
    this.token = token
  }

  async ready(): Promise<void> {
    const params = new URLSearchParams()
    params.append("sync_token", "*")
    params.append("resource_types", '["projects", "items"]')
    params.append("token", "8a1a2b34fd475b88db52a0f5c9c58bc9a8999041")

    const response: AxiosResponse<ResponseSync> = await axios.post(
      "https://todoist.com/api/v7/sync",
      params
    )

    const projects = response.data.projects.map(project => {
      const items = response.data.items.filter(item => {
        return item.project_id === project.id
      })
      new Project({
        id: project.id,
        name: project.name,
        order: project.order,
        items: items.map(item => {
          return new Item({
            id: item.id,
            content: item.content,
            indent: item.indent,
            order: item.item_order,
            completed: false,
            completedDate: undefined
          })
        })
      })
    })

    console.log(projects)
  }

  getAllProjects(): Promise<Project[]> {
    return new Promise(resolve => {
      resolve(this.projects)
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
