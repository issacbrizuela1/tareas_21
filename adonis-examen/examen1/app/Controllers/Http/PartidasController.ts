import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Partida from 'App/Models/Partida'
import Env from '@ioc:Adonis/Core/Env'
import mongoose, { Schema } from 'mongoose'
import sch_PARTIDA from 'App/Models/Partida'


let URL = Env.get('MOGO_URL')



export default class PartidasController {

  private mongo = mongoose
  private fecha = Date
  private actual = this.fecha.now()

  async conexcion() {
    try {
      await this.mongo
        .connect(URL, {
          maxIdleTimeMS: 6000,
        })
        .then((db) => console.log('conectado a' + this.mongo.connection.name))
        .catch((er) => console.log(er))
    } catch (error) {
      return error
    }
  }
  async mostrarurl() {
    return URL
  }
  //EXTRAS
  async autoincrement() {
    try {
      const con = mongoose.createConnection(URL)
      const preb = con.model('partida', Partida)
      let s = await preb.aggregate([
        {
          $project: {
            id: 1,
          },
        },
        {
          $sort: {
            id: -1,
          },
        },
        { $limit: 1 },
      ])
      let res
      s.forEach((element) => {
        res = element.id
      })
      console.log(res)
      return res
    } catch (error) {
      return error
    }
  }

  public async historialPartidas({ response, params }: HttpContextContract) {
    try {
      const con = mongoose.createConnection(URL, {
        maxIdleTimeMS: 6000,
      })
      const parti = con.model('partida', Partida).find({idUsuario : params.id}).exec().the((date)=>{
        response.status(200).json({
          message: 'Successfully.',
          data: date
        })
      }).catch(()=>{
        response.status(404).json({
          message: "Failing created a new model."
        })
      })
      
    }
    catch (error) {
     
    }
  }

  

  //CRUD PARTIDA
  async insertarPartida({ request, response }) {
    try {
      const datos = request.all()
    const con = mongoose.createConnection(URL, {
      maxIdleTimeMS: 6000,
    })
    let date = new Date()
    let [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()]
    const preb = con.model('partida', Partida)
    let idp = await this.autoincrement()
    const id = (await idp) + 1
    let ganador = datos.ganador
    if (ganador != '') {
    } else {
      ganador = 'no definido'
    }
    let estado = ''
    if (ganador != 'no definido') {
      estado = 'finalizado'
    } else {
      estado = 'pausa'
    }
    preb
      .insertMany({
        id: id,
        creador: datos.creador,
        oponente: datos.oponente,
        fecha: { ano: year, mes: month, dia: day },
        estado: estado,
        ganador: ganador,
      })
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
      response.status(200).json({
        message: 'Successfully.',
      })
    } catch (error) {
      response.status(404).json({
        message : "Failing created a new model."
      })
    }
    
  }

  async update_oponente({ request,response }) {
    const datos = request.all()
    const con = mongoose.createConnection(URL, {
      maxIdleTimeMS: 6000,
    })
    let date = new Date()
    let [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()]
    const preb = con.model('partida', Partida)
    let idp = await this.autoincrement()
    const id = (await idp) + 1
    let ganador = datos.ganador
    if (ganador != '') {
    } else {
      ganador = 'no definido'
    }
    let estado = ''
    if (ganador != 'no definido') {
      estado = 'finalizado'
    } else {
      estado = 'pausa'
    }
    preb
      .updateOne({
        id: id,
        creador: datos.creador,
        oponente: datos.oponente,
        fecha: { ano: year, mes: month, dia: day },
        estado: estado,
        ganador: ganador,
      })
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        return response.status(404).json({
          message : err
        })
      })
  }
  //SIN OPONENTE
  async insertarPartidasinoponente({ request }) {
    const datos = request.all()
    const con = mongoose.createConnection(URL, {
      maxIdleTimeMS: 6000,
    })
    let date = new Date()
    let [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()]
    const preb = con.model('partida', Partida)
    let idp = await this.autoincrement()
    const id = (await idp) + 1
    let ganador = datos.ganador
    if (ganador != '') {
    } else {
      ganador = 'no definido'
    }
    let estado = ''
    if (ganador != 'no definido') {
      estado = 'finalizado'
    } else {
      estado = 'pausa'
    }
    preb
      .insertMany({
        id: id,
        creador: datos.creador,
        oponente: '',
        fecha: { ano: year, mes: month, dia: day },
        estado: estado,
        ganador: ganador,
      })
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  async agregarOponente({ request }) {
    const datos = request.all()
    const con = mongoose.createConnection(URL, {
      maxIdleTimeMS: 6000,
    })
    let date = new Date()
    let [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()]
    const preb = con.model('partida', Partida)
    let idp = await this.autoincrement()
    const id = (await idp) + 1
    let ganador = datos.ganador
    if (ganador != '') {
    } else {
      ganador = 'no definido'
    }
    let estado = ''
    if (ganador != 'no definido') {
      estado = 'finalizado'
    } else {
      estado = 'pausa'
    }
    preb
      .updateOne(
        { id: datos.id },
        {
          oponente: datos.oponente
        }
      )
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  async mostrarpartidas_sin_oponente({ response }: HttpContextContract) {
    try {
      const response = await mongoose.createConnection(URL).model('partidas', sch_PARTIDA).aggregate(
        [{
          $match: {
            oponente: ''
          }
        }]
      ).exec()
      return response
    } catch (error) {
      return error
    }

  }
}