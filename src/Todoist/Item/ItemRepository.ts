import axios, { AxiosResponse } from "axios"
import Project from "../Project/Project"

class ItemRepository {
  token: string

  constructor(token: string) {
    this.token = token
  }

  /**
   * 本日完了させた Item[] を返す
   */
  async getCompletedItems(project: Project): Promise<Item[]> {
    return axios.get("")
  }

  async getUnCompletedItems(): Promise<Item[]> {
    const response: AxiosResponse<ResponseActivity[]> = await axios.get(
      `https://todoist.com/api/v7/activity/get?event_type=${
        EventType.Completed
      }`,
      {
        headers: {
          token: this.token
        }
      }
    )

    const items: ResponseTask[] = await Promise.all(
      response.data.map(async (activity): Promise<ResponseTask> => {
        const response: AxiosResponse<ResponseTask> = await axios.get(
          `https://beta.todoist.com/API/v8/tasks/${activity.object_id}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`
            }
          }
        )

        return response.data
      })
    )

    return items.map(item => {
      return new Item({
        id: item.id,
        content: item.content,
        indent: item.indent,
        order: item.order,
        completed: item.completed
      })
    })
  }
}

interface ResponseActivity {
  id: number
  object_type: "item" | "note" | "project"
  object_id: number
  event_type: EventType
  event_date: string
  parent_project_id: number
  parent_item_id: number
  initiator_id: number
  extra_data: Object
}

interface ResponseTask {
  id: number
  project_id: number
  content: string
  completed: boolean
  label_ids: number[]
  order: number
  indent: number
  priority: number
  due: Object
  url: string
  comment_count: number
}

enum EventType {
  Added = "added",
  Updated = "updated",
  Deleted = "deleted",
  Completed = "completed",
  UnComplted = "uncompleted",
  Archived = "archived",
  UnArchived = "unarchived",
  Shared = "shared",
  Left = "left"
}
