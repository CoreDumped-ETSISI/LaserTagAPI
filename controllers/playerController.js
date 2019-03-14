"use strict";

const Player = require("../models/player");
const mongoose = require("mongoose");

function getPlayer(req, res) {
    let playerId = req.params.playerId;
  
    Player.findById(playerId, (err, player) => {
      if (err)
        return res
          .status(500)
          .send({ message: `Error al realizar peticion: ${err}` });
      if (!player) return res.status(404).send({ message: `El jugador no existe` });
      res.status(200).send({ player });
    });
  }

  function getPlayers(req, res) {
    Player.find({}, (err, players) => {
      if (err)
        return res
          .status(500)
          .send({ message: `Error al realizar la petición: ${err}` });
      if (!players) return res.status(404).send({ message: "No existen jugadores" });
  
      res.status(200).send({ players });
    });
  }

  function getPlayerByName(req, res) {
    let name = req.params.name;
  
    Player.find({ userName: name })
      .exec((err, player) => {
        if (err)
          return res
            .status(500)
            .send({ message: `Error al realizar la petición: ${err}` });
        if (!player)
          return res.status(404).send({ message: "No existen el jugador" });
  
        res.status(200).send(player);
      });
  }

  function createPlayer(req, res) {
    const player = new Player();
  
    player.userName = req.body.userName;
  
    player.save((err, playerStored) => {
		if(err) res.status(500).send({message: `Error al salvar la base de datos ${err}`})
		else res.status(200).send({player: playerStored})
	})
  }

  function updatePlayer(req, res) {
    let updated = req.body;
    let playerId = req.params.playerId;
  
    Player.findByIdAndUpdate(playerId, updated, (err, oldPlayer) => {
      if (err)
        return res
          .status(500)
          .send({ message: `Error al actualizar jugador: ${err}` });
      res.status(200).send({ oldPlayer });
    });
  }

  function deletePlayer(req, res) {
    let playerId = req.params.playerId;
  
    Player.findById(playerId, (err, player) => {
      if (err)
        return res
          .status(500)
          .send({ message: `Error al borrar jugador: ${err}` });
      if (!player) return res.status(404).send({ message: `El jugador no existe` });
      player.remove(err => {
        if (err)
          return res
            .status(500)
            .send({ message: `Error al borrar jugador: ${err}` });
        res.status(200).send({ message: `El jugador ha sido borrado` });
      });
    });
  }

  

  module.exports = {
    getPlayer,
    getPlayers,
    getPlayerByName,
    createPlayer,
    updatePlayer,
    deletePlayer
  };