import PersonalToken from "./Todoist/Token/PersonalToken"
import Project from "./Todoist/Project/Project"

export interface State {
  todoistPersonalToken: PersonalToken
  projects: Project[]
}

export interface Actions {
  changeTodoistPersonalToken: (token: string) => void
  selectProject: (projectId: number) => void
  unSelectProject: (projectId: number) => void
  generateNippoMarkdown: () => void
}

const initialState: State = {
  projects: [],
  todoistPersonalToken: ""
}

export default interface Store {
  state: State
  actions: Actions
}

export const initialStore: Store = {
  state: initialState,
  actions: {
    changeTodoistPersonalToken: () => {},
    generateNippoMarkdown: () => {},
    selectProject: () => {},
    unSelectProject: () => {}
  }
}
