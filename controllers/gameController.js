"use strict";

const Game = require("../models/game");
const mongoose = require("mongoose");

function getGame(req, res) {
    let gameId = req.params.gameId;
  
    Game.findById(gameId, (err, game) => {
      if (err)
        return res
          .status(500)
          .send({ message: `Error al realizar peticion: ${err}` });
      if (!game) return res.status(404).send({ message: `La partida no existe` });
      res.status(200).send({ game });
    });
  }

  function getGames(req, res) {
    Game.find({}, (err, games) => {
      if (err)
        return res
          .status(500)
          .send({ message: `Error al realizar la petición: ${err}` });
      if (!games) return res.status(404).send({ message: "No existen partidas" });
  
      res.status(200).send({ games });
    });
  }

  function createGame(req, res) {
    const game = new Game();
  
    game.save((err, gameStored) => {
		if(err) res.status(500).send({message: `Error al salvar la base de datos ${err}`})
		else res.status(200).send({game: gameStored})
	})
  }

  function deleteGame(req, res) {
    let gameId = req.params.gameId;
  
    Game.findById(gameId, (err, game) => {
      if (err)
        return res
          .status(500)
          .send({ message: `Error al borrar partida: ${err}` });
      if (!game) return res.status(404).send({ message: `La partida no existe` });
      game.remove(err => {
        if (err)
          return res
            .status(500)
            .send({ message: `Error al borrar partida: ${err}` });
        res.status(200).send({ message: `La partida ha sido borrado` });
      });
    });
  }

  

  module.exports = {
    getGame,
    getGames,
    createGame,
    deleteGame
  };