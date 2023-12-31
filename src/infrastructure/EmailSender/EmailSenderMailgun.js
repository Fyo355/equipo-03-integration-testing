import { EmailSender } from "../../domain/services/EmailSender.js"
import { config } from "../Shared/config.js"
import { InvalidAPIKeyError } from "../../domain/errors/InvalidAPIKeyError.js"

export class EmailSenderMailgun extends EmailSender {
  constructor({
    domain = config.mailgun.domain,
    authUser = config.mailgun.authUser,
    apiKey = config.mailgun.APIKey,
  } = {}) {
    super()
    this.domain = domain
    this.authUser = authUser
    this.apiKey = apiKey
  }

  async sendWelcomeEmail(user) {
    const body = new FormData()
    const domain = this.domain

    body.append("from", `Fabrizio <mailgun@${domain}>`)
    body.append("to", user.email.email)
    body.append("subject", "Hello")
    body.append("template", "welcome")
    body.append("t:variables", JSON.stringify({ name: user.name }))

    const response = await fetch(`https://api.mailgun.net/v3/${domain}/messages`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body,
    })

    if (response.status === 401) {
      throw new InvalidAPIKeyError()
    }

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message)
    }
  }

  getAuthHeaders() {
    return {
      Authorization: "Basic " + btoa(this.authUser + ":" + this.apiKey),
    }
  }
}
