import Project from "./Todoist/Project/Project"

export function markdownify(projects: Project[]): string {
  let content = ""

  content += "## 本日のタスク"

  content += markdownifyToday(projects)

  content += "\n"
  content += "## すべてのタスク"

  content += markdownifyTasks(projects)

  return content
}

function markdownifyToday(projects: Project[]): string {
  let content = ""

  const now = new Date()

  projects.forEach(project => {
    const completedItems = project.completedItems.filter(item => {
      const isSameYear = item.completedDate.getFullYear() === now.getFullYear()
      const isSameMonth = item.completedDate.getMonth() === now.getMonth()
      const isSameDate = item.completedDate.getDate() === now.getDate()

      return isSameYear && isSameMonth && isSameDate
    })

    content += `### ${project.name}\n`

    completedItems.forEach(item => {
      content += `- [x] ${item.content}\n`
    })

    project.tasks
      .slice()
      .sort((a, b) => {
        return a.order - b.order
      })
      .forEach(task => {
        const indent = " ".repeat(task.indent)

        content += indent + `- [ ] ${task.content}`
      })
  })

  return content
}

function markdownifyTasks(projects: Project[]): string {
  let content = ""

  projects.forEach(project => {
    content += `### ${project.name}\n`

    project.completedItems.forEach(item => {
      content += `- [x] ${item.content}\n`
    })
  })

  return content
}
