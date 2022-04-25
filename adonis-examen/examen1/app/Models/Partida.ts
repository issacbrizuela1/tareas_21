import mongoose, { Schema } from 'mongoose';



const sch_PARTIDA=new Schema({
  id:Number,
  creador:Number,
  oponente:Number,
  fecha:Object,
  estado:String,
  ganador:String,
});
export default sch_PARTIDA;
