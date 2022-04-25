import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Partida from 'App/Models/Partida'
import Env from '@ioc:Adonis/Core/Env'
import mongoose, { Schema } from 'mongoose'

export default class PartidasController {
  private URL = Env.get('MOGO_URL')
  private mongo = mongoose
  private fecha = Date
  private actual = this.fecha.now()
  async conexcion() {
    try {
      await this.mongo
        .connect(this.URL, {
          maxIdleTimeMS: 6000,
        })
        .then((db) => console.log('conectado a' + this.mongo.connection.name))
        .catch((er) => console.log(er))
    } catch (error) {
      return error
    }
  }
  async mostrarurl() {
    return this.URL
  }
  //EXTRAS
  async autoincrement() {
    try {
      const con = mongoose.createConnection(this.URL)
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
  //CRUD PARTIDA

  async insertarPartida({ request }) {
    const datos = request.all()
    const con = mongoose.createConnection(this.URL, {
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
  }

  async update_oponente({ request }) {
    const datos = request.all()
    const con = mongoose.createConnection(this.URL, {
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
        console.log(err)
      })
  }
  //SIN OPONENTE
  async insertarPartidasinoponente({ request }) {
    const datos = request.all()
    const con = mongoose.createConnection(this.URL, {
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
    const con = mongoose.createConnection(this.URL, {
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
        { id: datos.id},
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
}
