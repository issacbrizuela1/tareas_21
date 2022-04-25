import mongoose, { Schema } from 'mongoose';



const sch_PARTIDA=new Schema({
  id:Number,
  creador:String,
  oponente:String,
  fecha:Object,
  estado:String,
  ganador:String,
});
export default sch_PARTIDA;
