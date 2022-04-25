import mongoose, { Schema } from 'mongoose';

const sch_JUGADA=new Schema({
  idpartida:Number,
  id:Number,
  turno:Number,
  usuario:String,
  valor:Number,
  fecha:Object,
});
export default sch_JUGADA;