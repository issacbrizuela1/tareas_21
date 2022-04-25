import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { AsyncLocalStorage } from 'async_hooks'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import auth from 'App/Models/auth'
export const storage = new AsyncLocalStorage()
export default class AuthController {
  
  public async register({ request, response }: HttpContextContract) {
    const validations = await schema.create({
      email: schema.string({}, [rules.email(), rules.unique({ table: 'auths', column: 'email' })]),

      username: schema.string({ trim: true }, [
        rules.unique({ table: 'auths', column: 'username', caseInsensitive: true }),
      ]),

      password: schema.string({}, [rules.minLength(8)]),
    })
    const data = await request.validate({ schema: validations })
    const user = await auth.create(data)
    return response.created(user)
  }
  public async login({ request, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    const token = await auth.attempt(email, password)
    return token.toJSON()
  }
  public async getUser({ auth }) {
    await auth.use('api').authenticate()
    const user = auth.use('api').user.$attributes
    return user
  }
  public async idusuario({ auth }) {
    await auth.use('api').authenticate()
    const user = auth.use('api').user.$attributes
    return user['id']
  }
  
}
