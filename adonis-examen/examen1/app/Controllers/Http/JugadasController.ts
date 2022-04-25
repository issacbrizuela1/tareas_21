import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import JUGADA from 'App/Models/Jugada'
import Env from '@ioc:Adonis/Core/Env'
import mongoose, { Schema } from 'mongoose'
import sch_JUGADA from 'App/Models/Jugada'
import Jugada from 'App/Models/Jugada'

export default class JugadasController {
  private URL = Env.get('MOGO_URL')
  private mongo = mongoose
  private fecha = Date
  private actual = this.fecha.now()

  //EXTRAS
  async autoincrement() {
    try {
      const con = mongoose.createConnection(this.URL)
      const preb = con.model('jugadas', sch_JUGADA)
      let s = await preb.aggregate([{
        $project: {
          idj: 1,
          _id: 0
        }
      }, {
        $sort: {
          idj: -1
        }
      }, { $limit: 1 }])
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
  async insertarJugada({ request }) {
    const datos = request.all()
    const con = mongoose.createConnection(this.URL, {
      maxIdleTimeMS: 6000,
    })
    let date = new Date()
    let [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()]
    const preb = con.model('jugada', JUGADA)
    let idp = await this.autoincrement()
    const id = (await idp) + 1
    preb
      .insertMany({
        idj: id,
        valorcreador: datos.valorcreador,
        valordeloponente: datos.valordeloponente,
        idcreador: datos.idcreador,
        idoponente: datos.idoponente
      })
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  async insertarJugadacreador({ request }) {
    const datos = request.all()
    const con = mongoose.createConnection(this.URL, {
      maxIdleTimeMS: 6000,
    })
    let date = new Date()
    let [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()]
    const preb = con.model('jugada', JUGADA)
    let idp = await this.autoincrement()
    const id = (await idp) + 1
    preb
      .insertMany({
        idj: 1,
        idpartida: datos.idpartida,
        valorcreador: datos.valorcreador,
        valordeloponente: datos.valordeloponente,
        idcreador: datos.idcreador,
        idoponente: datos.idoponente
      })
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  public async valores({ }: HttpContextContract) {
    const con = mongoose.createConnection(this.URL, {
      maxIdleTimeMS: 6000,
    })
    const valores = con.model('jugada', Jugada)
    let val = await valores.aggregate([
      {
        $project: {
          valordeloponente: 1,
          valorcreador: 1
        },
      },

    ])


  }

}
