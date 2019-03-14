"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  teamName: { type: String, required: true, unique: true },
  teamScore: { type: Number, default: 0 },
  members: [
      {
          type: Schema.Types.ObjectId,
          ref: 'Player'
      }
  ]
});

module.exports = mongoose.model(
  'Team',
  TeamSchema
);