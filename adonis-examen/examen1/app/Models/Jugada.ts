import mongoose, { Schema } from 'mongoose';

const sch_JUGADA=new Schema({
  idj:Number,
  idpartida:Number,
  valorcreador:Number,
  valordeloponente:Number,
  idcreador:Number,
  idoponente:Number
});
export default sch_JUGADA;