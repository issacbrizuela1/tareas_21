import Route from '@ioc:Adonis/Core/Route'
Route.post('/register', 'AuthController.register')
Route.post('/login', 'AuthController.login')
Route.group(() => {
  Route.get('token', async ({ auth }) => {
    await auth.use('api').authenticate()
    console.log(auth.use('api').user!)
    return { resp: 'activo' }
  })
}).middleware('auth')
Route.get('/usuario','AuthController.mostrarusuario')
//partidas
Route.post('/insertarPartida','PartidasController.insertarPartida')
Route.post('/insertarPartidasinoponente','PartidasController.insertarPartidasinoponente')
Route.post('/agregarOponente','PartidasController.agregarOponente')



//extras
Route.get('/id','PartidasController.autoincrement')
Route.get('/url','PartidasController.verfecha')


//jugadas
Route.post('/insertarJugada','JugadasController.insertarJugada')