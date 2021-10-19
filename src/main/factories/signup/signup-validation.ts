import { Validation } from '../../../presentation/helpers/protocols/validation'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'
import { CompareFieldValidation, EmailValidation, RequiredFieldValidation, ValidationComposite } from '../../../presentation/helpers/validators'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}