import axios, { AxiosResponse } from "axios"
import PersonalToken from "./PersonalToken"

interface OAuthToken {
  token: string
}

export default class OAuthTokenRepository {
  oAuthTokens: { [personalToken: string]: string } = {}
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
          "Content-Type": "application/json"
        }
      }
    )

    const oAuthToken = response.data.access_token

    this.oAuthTokens[personalToken.token] = oAuthToken

    return {
      token: oAuthToken
    }
  }
}

interface MigratePersonalTokenResponse {
  access_token: string
  token_type: string
}
