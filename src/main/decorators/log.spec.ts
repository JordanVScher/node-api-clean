import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

describe('Log Decorator', () => {
  test('Should call controller handle',async () => {
    class ControlledStub implements Controller {
      async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        const httpReponse: HttpResponse = {
          body: { name: 'foobar' },
          statusCode: 200
        }
        return new Promise(resolve => resolve(httpReponse))
      }
    }

    const controllerStub = new ControlledStub()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const sut = new LogControllerDecorator(controllerStub)
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith({
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    })
  })
})
