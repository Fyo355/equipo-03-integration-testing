import { ErrorCode } from "./ErrorCode.js"
import { DomainError } from "./DomainError.js"
export class InvalidAPIKeyError extends DomainError {
  constructor() {
    super(ErrorCode.Invalid_Api_Key, "Invalid API key")
  }
}