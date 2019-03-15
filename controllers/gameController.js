"use strict";

const Game = require("../models/game");
const mongoose = require("mongoose");
const Team = require("../models/team");

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

  function addTeam(req, res){
    let gameId = req.params.gameId;
    let teamId = req.params.teamId;

    return addRemove(gameId, teamId, false, res);
  }

  function removeTeam(req, res){
    let gameId = req.params.gameId;
    let teamId = req.params.teamId;

    return addRemove(gameId, teamId, true, res);
  }

  // removes when rem is true adds otherwise
  function addRemove(gameId, teamId, rem, res){
    Game.findById(gameId, (err, game) => {
      if (err)
        return res
          .status(500)
          .send({ message: `Error al realizar peticion: ${err}` });
      if (!game) return res.status(404).send({ message: `La partida no existe` });
      Team.findById(teamId, (err2, team) => {
        if (err2)
          return res
            .status(500)
            .send({ message: `Error al realizar peticion: ${err2}` });
        if (!team) return res.status(404).send({ message: `El equipo no existe` });
        if(rem){
          if(game.teams.indexOf(teamId)>-1){
            game.teams.splice(game.teams.indexOf(teamId), 1);
            game.save((err, gSaved) => {
              console.log(gSaved);
            });
          }
          else return res.status(409).send({ message: 'El equipo no esta en la partida' });
        }
        else{
          if(game.teams.indexOf(teamId)<0){
            game.teams.push(team);
            game.save((err, gSaved) => {
              console.log(gSaved);
            });
          }
          else return res.status(404).send({ message: 'El equipo ya esta en la partida' });
        }
        res.status(200).send({ game });
      });
    });
  }

  

  module.exports = {
    getGame,
    getGames,
    createGame,
    deleteGame,
    removeTeam,
    addTeam
  };