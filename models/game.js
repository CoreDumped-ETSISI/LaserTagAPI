"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    creationDate: { type: Date, default: Date.now()},
    teams: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Team'
        }
    ]
});

module.exports = mongoose.model(
    'Game',
    GameSchema
);