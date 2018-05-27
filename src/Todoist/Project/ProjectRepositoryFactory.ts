import { ProjectRepository } from "./ProjectRepository"
import PersonalToken from "../Token/PersonalToken"
import OAuthTokenRepository from "../Token/OAuthToken"

export async function createProjectRepository(): Promise<ProjectRepository> {
  const clientId = process.env.TODOIST_CLIENT_ID
  const clientSecret = process.env.TODOAIT_CLIENT_SECRET

  const { TODOIST_PERSONAL_TOKEN } = process.env

  console.log(clientId)
  console.log(clientSecret)
  console.log(TODOIST_PERSONAL_TOKEN)

  if (
    clientId === undefined ||
    clientSecret === undefined ||
    TODOIST_PERSONAL_TOKEN === undefined
  ) {
    throw new Error("OAuth credentials が存在しない")
  }

  const personalToken: PersonalToken = TODOIST_PERSONAL_TOKEN

  const oAuthTokenRepository = new OAuthTokenRepository(clientId, clientSecret)
  const oAuthToken = await oAuthTokenRepository.getByPersonalToken(
    personalToken
  )

  return new ProjectRepository(oAuthToken)
}
