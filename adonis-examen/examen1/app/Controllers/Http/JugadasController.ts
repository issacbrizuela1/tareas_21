import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import JUGADA from 'App/Models/Jugada'
import Env from '@ioc:Adonis/Core/Env'
import mongoose, { Schema } from 'mongoose'
export default class JugadasController {
  private URL = Env.get('MOGO_URL')
  private mongo = mongoose
  private fecha = Date
  private actual = this.fecha.now()
  //EXTRAS
  async autoincrement() {
    try {
      const con = mongoose.createConnection(this.URL)
      const preb = con.model('jugada', JUGADA)
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
        idpartida: 1,
        id: 1,
        turno: 1,
        usuario: "yo",
        valor: 1,
        fecha: { ano: year, mes: month, dia: day },
      })
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
