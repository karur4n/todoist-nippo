import axios, { AxiosResponse } from "axios"
import PersonalToken from "./PersonalToken"

type OAuthToken = string

export default class OAuthTokenRepository {
  clientId: string
  clientSecret: string

  constructor(clientId: string, clientSecret: string) {
    this.clientId = clientId
    this.clientSecret = clientSecret
  }

  async getByPersonalToken(personalToken: PersonalToken): Promise<OAuthToken> {
    const response: AxiosResponse<
      MigratePersonalTokenResponse
    > = await axios.post(
      "https://todoist.com/api/access_tokens/migrate_personal_token",
      {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        personal_token: personalToken,
        scope: "data:read"
      },
      {
        headers: {
          "Content-Type": "application/json",
        }
      }
    )

    const oAuthToken = response.data.access_token

    return oAuthToken
  }
}

interface MigratePersonalTokenResponse {
  access_token: string
  token_type: string
}
