import Env from '@ioc:Adonis/Core/Env'
import { SessionConfig } from '@ioc:Adonis/Addons/Session'

const sessionConfig: SessionConfig = {
  driver: Env.get('SESSION_DRIVER'),

  cookieName: 'adonis-session',

  clearWithBrowser: false,

  age: '2h',

  cookie: {
    path: '/',
    httpOnly: true,
    sameSite: false,
  },

  file: {
    location: '',
  },

  redisConnection: 'local',
}

export default sessionConfig
