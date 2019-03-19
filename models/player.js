"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  userName: { type: String, required: true, unique: true },
  score: { type: Number, default: 0 },
  deaths: { type: Number, default: 0 },
  kills: { type: Number, default: 0 },
  gun: {type: Schema.Types.ObjectId, ref: 'Gun', default: null }
});

module.exports = mongoose.model(
    'Player', 
    PlayerSchema
);