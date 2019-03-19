"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GunSchema = new Schema({
  gunName: { type: String, required: true, unique: true },
  damage: { type: Number, default: 0 },
  healing: { type: Number, default: 0 },
	mqttId: { type: String },
	ammo: { type: Number, default: 0 }
});

module.exports = mongoose.model(
    'Gun', 
    GunSchema
);