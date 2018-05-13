import * as React from "react"
import { getProject, getTodayTasks, TodoistTask } from "./todoist"

interface Project {
  id: number
  name: string
  order: number
  indent: number
}

type Task = TodoistTask

interface State {
  todoistToken: string
  projects: Project[]
  tasks: Task[]
}

export default class App extends React.Component<{}, State> {
  state: State = {
    todoistToken: process.env.TODOIST_PERSONAL_TOKEN || "",
    projects: [],
    tasks: []
  }

  private handleChangeToken = () => {}

  private handleClickGenerateButton = async (
    e: React.MouseEvent<HTMLElement>
  ) => {
    const { todoistToken } = this.state

    e.preventDefault()

    const tasks = await getTodayTasks(todoistToken)

    const uniquenessProjectId = tasks.reduce(
      (acc: number[], task: TodoistTask) => {
        const includes = acc.includes(task.projectId)

        if (includes) {
          return acc
        }

        return [...acc, task.projectId]
      },
      []
    )

    const projects: Project[] = await Promise.all(
      uniquenessProjectId.map(async projectId => {
        const project = await getProject(todoistToken, projectId)

        return project
      })
    )

    this.setState({ projects, tasks })
  }

  private renderProject(p: Project) {
    const { tasks } = this.state

    const filteredTasks = tasks.filter(t => t.projectId === p.id)

    console.log(p)
    console.log(tasks)

    return (
      <div>
        <h2>{p.name}</h2>
        {filteredTasks.map(t => <p>{t.content}</p>)}
      </div>
    )
  }

  render() {
    const { todoistToken, projects } = this.state
    console.log(process.env.TODOIST_CLIENT_ID)
    return (
      <div>
        <div>
          <label>Todoist のトークン：</label>
          <input
            type={"text"}
            onChange={this.handleChangeToken}
            value={todoistToken}
          />
        </div>

        <button onClick={this.handleClickGenerateButton}>日報を生成する</button>

        {projects.map(p => {
          return this.renderProject(p)
        })}
      </div>
    )
  }
}
