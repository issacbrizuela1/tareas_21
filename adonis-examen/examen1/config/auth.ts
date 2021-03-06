import { AuthConfig } from '@ioc:Adonis/Addons/Auth'

const authConfig: AuthConfig = {
  guard: 'api',
  list: {
    api: {
      driver: 'oat',

      tokenProvider: {
        type: 'api',
        driver: 'database',
        table: 'api_tokens',
        foreignKey: 'user_id',
      },

      provider: {
        driver: 'lucid',

        identifierKey: 'id',

        uids: ['email'],

        model: () => import('App/Models/auth'),
      },
    },
  },
}

export default authConfig
