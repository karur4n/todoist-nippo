import OAuthTokenRepository from "./OAuthToken"

export function createOAuthTokenRepository(): OAuthTokenRepository {
  const { TODOIST_CLIENT_ID, TODOIST_CLIENT_SECRET } = process.env

  if (TODOIST_CLIENT_ID === undefined || TODOIST_CLIENT_SECRET === undefined) {
    throw new Error("Todoist credential has not been set")
  }

  return new OAuthTokenRepository(TODOIST_CLIENT_ID, TODOIST_CLIENT_SECRET)
}
