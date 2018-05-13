import axios from "axios"

function buildHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`
  }
}

interface ProjectResponse {
  id: number
  name: string
  order: number
  indent: number
  comment_count: number
}

type ProjectsResponse = ProjectResponse[]

export interface TodoistProject {
  id: number
  name: string
  order: number
  indent: number
}

export async function getAllProjects(token: string): Promise<TodoistProject[]> {
  const headers = buildHeaders(token)
  const url = "https://beta.todoist.com/API/v8/projects"

  const response: ProjectsResponse = await axios
    .get(url, {
      headers
    })
    .then(response => response.data)

  return response.map(resProject => ({
    id: resProject.id,
    name: resProject.name,
    order: resProject.order,
    indent: resProject.indent
  }))
}

interface TaskResponse {
  id: number
  project_id: number
  content: string
  comment_count: number
  order: number
  indent: number
  priority: number
  url: string
}

export interface TodoistTask {
  id: number
  projectId: number
  content: string
  order: number
  indent: number
  priority: number
}

type TasksResponse = TaskResponse[]

export async function getTodayTasks(token: string): Promise<TodoistTask[]> {
  const headers = buildHeaders(token)
  const url = "https://beta.todoist.com/API/v8/tasks?filter=today | overdue"

  const response: TasksResponse = await axios
    .get(url, {
      headers
    })
    .then(response => response.data)

  return response.map(resTask => ({
    id: resTask.id,
    projectId: resTask.project_id,
    content: resTask.content,
    order: resTask.order,
    indent: resTask.indent,
    priority: resTask.priority
  }))
}

export async function getProject(
  token: string,
  projectId: number
): Promise<TodoistProject> {
  const headers = buildHeaders(token)
  const url = `https://beta.todoist.com/API/v8/projects/${projectId}`

  const response: ProjectResponse = await axios
    .get(url, {
      headers
    })
    .then(response => response.data)

  return {
    id: response.id,
    name: response.name,
    order: response.order,
    indent: response.indent
  }
}
