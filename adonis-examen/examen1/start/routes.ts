import Route from '@ioc:Adonis/Core/Route'
Route.post('/register', 'AuthController.register')
Route.post('/login', 'AuthController.login')
Route.group(() => {
  Route.get('token', async ({ auth }) => {
    await auth.use('api').authenticate()
    console.log(auth.use('api').user!)
    return { resp: 'activo' }
  })
  Route.get('straerUsuario', 'AuthController.getUser')
  Route.get('idusuario', 'AuthController.idusuario')
}).middleware('auth')
Route.get('',()=>{
  return {"hola": "hay jalando"}
})
//partidas
Route.post('/insertarPartida','PartidasController.insertarPartida')
Route.post('/insertarPartidasinoponente','PartidasController.insertarPartidasinoponente')
Route.post('/agregarOponente','PartidasController.agregarOponente')
Route.get('/mostrarpartidassinoponente','PartidasController.mostrarpartidas_sin_oponente')



//extras
Route.get('/id','PartidasController.autoincrement')
Route.get('/url','PartidasController.verfecha')//autoincrement
Route.get('/idultimapartida','PartidasController.autoincrement')


//jugadas
Route.post('/insertarJugada','JugadasController.insertarJugadacreador')
Route.get('/idultimajugada','JugadasController.autoincrement')
//insertarJugadacreador
