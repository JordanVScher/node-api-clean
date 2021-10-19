import validator from 'validator'
import { EmailValidator } from '../presentation/helpers/protocols/email-validator'

export class EmailValidatorAdapter implements EmailValidator {
  isValid (email: string): boolean {
    return validator.isEmail(email)
  }
}
