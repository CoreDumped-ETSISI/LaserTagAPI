"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameSchema = new Schema({
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