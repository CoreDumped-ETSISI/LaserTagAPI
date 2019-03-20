"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  userName: { type: String, required: true, unique: true },
  score: { type: Number, default: 0 },
  health: { type: Number, default: 0 },
  deaths: { type: Number, default: 0 },
  kills: { type: Number, default: 0 },
  shots: { type: Number, default: 0 },
  successfulShots: { type: Number, default: 0 },
  idPlayer: { type: Number, required: true, unique:true, min:0, max:63},
  gun: {type: Schema.Types.ObjectId, ref: 'Gun', default: null }
});

module.exports = mongoose.model(
    'Player', 
    PlayerSchema
);