import * as React from "react"
import Project from "./Todoist/Project/Project"

export interface ComponentProps {
  apiToken: string
  markdownText: string
  projects: Project[]
  onChangeApiToken(event: React.SyntheticEvent<HTMLElement>): void
}

export default class Component extends React.Component<ComponentProps, {}> {
  render() {
    const { apiToken, markdownText, projects, onChangeApiToken } = this.props
    return (
      <>
        <div>
          <label>
            <span>Todoist の API トークン：</span>
            <input type="text" onChange={onChangeApiToken} value={apiToken} />
          </label>
        </div>
        <ul>
          {projects.map(project => (
            <li>
              <div>
                <input type="checkbox" checked={project.selected} />
                <span>{project.name}</span>
              </div>
            </li>
          ))}
        </ul>
        <textarea value={markdownText} />
      </>
    )
  }
}
