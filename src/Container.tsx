import * as React from "react"
import Project from "./Todoist/Project/Project"
import { ProjectRepository } from "./Todoist/Project/ProjectRepository"
import { createProjectRepository } from "./Todoist/Project/ProjectRepositoryFactory"
import Component, { ComponentProps } from "./Component"

interface State {
  apiToken: string
  markdownText: string
  projects: Project[]
}

export default class Container extends React.Component<{}, State> {
  state = {
    apiToken: "",
    markdownText: "",
    projects: []
  }

  projectRepository?: ProjectRepository

  async componentDidMount() {
    await this.setProjectRepository()
    await this.loadProjects()
  }

  setProjectRepository = async () => {
    this.projectRepository = await createProjectRepository()
  }

  loadProjects = async (): Promise<void> => {
    if (this.projectRepository === undefined) {
      return undefined
    }

    const projects = await this.projectRepository.getAllProjects()

    this.setState({ projects })
  }

  handleChangeApiToken = (
    event: React.SyntheticEvent<HTMLInputElement>
  ): void => {
    this.setState({
      apiToken: event.currentTarget.value
    })
  }

  render() {
    const props: ComponentProps = {
      apiToken: this.state.apiToken,
      markdownText: this.state.markdownText,
      projects: this.state.projects,
      onChangeApiToken: this.handleChangeApiToken
    }
    return <Component {...props} />
  }
}
