"use strict";

const Player = require("../models/player");
const Team = require("../models/team");
const Gun = require("../models/gun");
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
    player.idPlayer = req.body.idPlayer;
  
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
      Team.find({}, (err, teams) => {
        if (!err && teams) {
          teams.forEach(team => {
            if(team.members.indexOf(playerId)>-1){
              team.members.splice(team.members.indexOf(playerId), 1);
              team.save((err, tSaved) => {
                console.log(tSaved);
              });
            }
          });
        }
      });
      player.remove(err => {
        if (err)
          return res
            .status(500)
            .send({ message: `Error al borrar jugador: ${err}` });
        res.status(200).send({ message: `El jugador ha sido borrado` });
      });
    });
  }
  
  function addGun(req, res){
    let playerId = req.params.playerId;
    let gunId = req.params.gunId;

    Player.findById(playerId, (err, player) => {
      if (err)
        return res
          .status(500)
          .send({ message: `Error al realizar peticion: ${err}` });
      if (!player) return res.status(404).send({ message: `El jugador no existe` });
      Gun.findById(gunId, (err2, gun) => {
        if (err2)
          return res
            .status(500)
            .send({ message: `Error al realizar peticion: ${err2}` });
        if (!gun) return res.status(404).send({ message: `El arma no existe` });
        player.gun = gun;
        player.save((err, pSaved) => {
          //console.log(pSaved);
        });
        res.status(200).send({ player });
      });
    });
  }

  function removeGun(req, res){
    let playerId = req.params.playerId;

    Player.findById(playerId, (err, player) => {
      if (err)
        return res
          .status(500)
          .send({ message: `Error al realizar peticion: ${err}` });
      if (!player) return res.status(404).send({ message: `El jugador no existe` });
      player.gun = null;
      player.save((err, pSaved) => {
        //console.log(pSaved);
      });
      res.status(200).send({ player });
    });
  }

  function playerShot(req, res){
    let playerId = req.params.playerId;
    let playerIdShot = req.params.playerIdShot;

    Player.findById(playerId)
      .populate("gun")
      .exec((err, player) => {
      if (err)
        return res
          .status(500)
          .send({ message: `Error al realizar peticion: ${err}` });
      if (!player) return res.status(404).send({ message: `El jugador no existe` });
      
      if(player.gun!=null){
        Player.findById(playerIdShot, (err2, playerShot) => {
          if (err2)
            return res
              .status(500)
              .send({ message: `Error al realizar peticion: ${err2}` });
          if (!playerShot) return res.status(404).send({ message: `El jugador no existe` });
          player.successfulShots++;
          console.log(playerShot.health-player.gun.damage);
          console.log(player.gun.damage);
          console.log(playerShot.health);
          playerShot.health=playerShot.health-player.gun.damage;
          console.log(playerShot.health);
          if(playerShot.health<=0){
            playerShot.deaths++;
            player.kills++;
          }
          player.save((err3, pSaved) => {
            console.log(pSaved);
          });
          playerShot.save((err4, pSSaved) => {
            console.log(pSSaved);
          });
          res.status(200).send({ player });
        });
      }
      else{
        res.status(409).send({ message: `El jugador no tiene un arma asignada` });
      }
    });
  }

  function shootPlayer(req, res){
    let playerId = req.params.playerId;

    Player.findById(playerId, (err, player) => {
      if (err)
        return res
          .status(500)
          .send({ message: `Error al realizar peticion: ${err}` });
      if (!player) return res.status(404).send({ message: `El jugador no existe` });
      if(player.gun!=null){
        player.shots++;
        player.save((err, pSaved) => {
          //console.log(pSaved);
        });
        res.status(200).send({ player });
      }
      else{
        res.status(409).send({ message: `El jugador no tiene un arma asignada` });
      }
    });
  }

  module.exports = {
    getPlayer,
    getPlayers,
    getPlayerByName,
    createPlayer,
    updatePlayer,
    deletePlayer,
    addGun,
    removeGun,
    playerShot,
    shootPlayer
  };