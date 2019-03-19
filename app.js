'use strict'

const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const api = require('./routes')
const playerRoutes = require('./routes/playerRoutes')
const gunRoutes = require('./routes/gunRoutes')
const teamRoutes = require('./routes/teamRoutes')
const gameRoutes = require('./routes/gameRoutes')

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', ['POST', 'PUT', 'GET'])
  res.setHeader('Access-Control-Allow-Headers', ['Content-Type', '*'])
  next();
});

app.use('/player', playerRoutes);
app.use('/gun', gunRoutes);
app.use('/team', teamRoutes);
app.use('/game', gameRoutes);
app.use('/api', api);

module.exports = app