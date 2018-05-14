import * as React from "react"
import { ProjectId } from "./Todoist/Project/Project"
import { Actions, default as Store, initialStore, State } from "./store"

const Context = React.createContext(initialStore)
const { Provider, Consumer } = Context

export const AppConsumer = Consumer

export default class Root extends React.Component<{}, State> {
  state: State = {
    todoistPersonalToken: process.env.TODOIST_PERSONAL_TOKEN || "",
    projects: []
  }

  handleSelectProject(projectId: ProjectId) {
    const projects = this.state.projects.map(project => {
      if (project.id === projectId) {
        project.select()
      }
      return project
    })

    this.setState({ projects })
  }

  handleUnSelectProject(projectId: ProjectId) {
    const projects = this.state.projects.map(project => {
      if (project.id === projectId) {
        project.unSelect()
      }
      return project
    })

    this.setState({ projects })
  }

  createStore = (): Store => {
    const actions: Actions = {
      changeTodoistPersonalToken: (token: string) => {
        this.setState({ todoistPersonalToken: token })
      },
      selectProject: (projectId: ProjectId) =>
        this.handleSelectProject(projectId),
      unSelectProject: (projectId: ProjectId) => {
        this.handleUnSelectProject(projectId)
      },
      generateNippoMarkdown: () => {}
    }

    return {
      state: this.state,
      actions: actions
    }
  }

  render() {
    return (
      <Provider value={this.createStore()}>
        <App />
      </Provider>
    )
  }
}
