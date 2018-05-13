import axios, { AxiosResponse } from "axios"
import Project, { ProjectProps } from "./Project"
import ProjectWithItems from "./ProjectWithItems"

interface IProjectRepository<T extends Project | ProjectWithItems> {
  getAllProjects(): Promise<T[]>
}

class ProjectRepository implements IProjectRepository<Project> {
  private readonly token: string

  constructor(token: string) {
    this.token = token
  }

  /**
   *
   * @returns {Promise<Project[]>}
   * @throws AxiosError
   */
  getAllProjects(): Promise<any> {
    return axios
      .get("https://beta.todoist.com/API/v8/projects", {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
      .then((response: AxiosResponse<ResponseProject[]>) => {
        response.data.map(responseProject => {
          const props: ProjectProps = {
            id: responseProject.id,
            name: responseProject.name,
            order: responseProject.order
          }

          return new Project(props)
        })
      })
  }
}

interface ResponseProject {
  id: number
  name: string
  order: number
  indent: number
  comment_out: number
}
