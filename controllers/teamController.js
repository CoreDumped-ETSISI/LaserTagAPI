"use strict";

const Team = require("../models/team");
const Player = require("../models/player");
const mongoose = require("mongoose");

function getTeam(req, res) {
    let teamId = req.params.teamId;
  
    Team.findById(teamId, (err, team) => {
      if (err)
        return res
          .status(500)
          .send({ message: `Error al realizar peticion: ${err}` });
      if (!team) return res.status(404).send({ message: `El jugador no existe` });
      res.status(200).send({ team });
    });
  }

  function getTeams(req, res) {
    Team.find({}, (err, teams) => {
      if (err)
        return res
          .status(500)
          .send({ message: `Error al realizar la petición: ${err}` });
      if (!teams) return res.status(404).send({ message: "No existen equipos" });
  
      res.status(200).send({ teams });
    });
  }

  function getTeamByName(req, res) {
    let name = req.params.name;
  
    Team.find({ teamName: name })
      .exec((err, team) => {
        if (err)
          return res
            .status(500)
            .send({ message: `Error al realizar la petición: ${err}` });
        if (!team)
          return res.status(404).send({ message: "No existen el equipo" });
  
        res.status(200).send(team);
      });
  }

  function createTeam(req, res) {
    const team = new Team();
  
    team.teamName = req.body.teamName;
  
    team.save((err, teamStored) => {
		if(err) res.status(500).send({message: `Error al salvar la base de datos ${err}`})
		else res.status(200).send({team: teamStored})
	})
  }

  function updateTeam(req, res) {
    let updated = req.body;
    let teamId = req.params.teamId;
  
    Team.findByIdAndUpdate(teamId, updated, (err, oldTeam) => {
      if (err)
        return res
          .status(500)
          .send({ message: `Error al actualizar equipo: ${err}` });
      res.status(200).send({ oldTeam });
    });
  }

  function deleteTeam(req, res) {
    let teamId = req.params.teamId;
  
    Team.findById(teamId, (err, team) => {
      if (err)
        return res
          .status(500)
          .send({ message: `Error al borrar equipo: ${err}` });
      if (!team) return res.status(404).send({ message: `El equipo no existe` });
      team.remove(err => {
        if (err)
          return res
            .status(500)
            .send({ message: `Error al borrar equipo: ${err}` });
        res.status(200).send({ message: `El equipo ha sido borrado` });
      });
    });
  }

  function addPlayer(req, res){
    let teamId = req.params.teamId;
    let playerId = req.params.playerId;

    return addRemove(teamId, playerId, false, res);
  }

  function removePlayer(req, res){
    let teamId = req.params.teamId;
    let playerId = req.params.playerId;

    return addRemove(teamId, playerId, true, res);
  }

  // removes when rem is true adds otherwise
  function addRemove(teamId, playerId, rem, res){
    Team.findById(teamId, (err, team) => {
      if (err)
        return res
          .status(500)
          .send({ message: `Error al realizar peticion: ${err}` });
      if (!team) return res.status(404).send({ message: `El equipo no existe` });
      Player.findById(playerId, (err2, player) => {
        if (err2)
          return res
            .status(500)
            .send({ message: `Error al realizar peticion: ${err2}` });
        if (!player) return res.status(404).send({ message: `El jugador no existe` });
        if(rem){
          if(team.members.indexOf(playerId)>-1){
            team.members.splice(team.members.indexOf(playerId), 1);
            team.save((err, tSaved) => {
                console.log(tSaved);
              });
          }
          else return res.status(409).send({ message: 'El jugador no esta en el equipo' });
        }
        else{
          if(team.members.indexOf(playerId)<0){
            team.members.push(player);
            team.save((err, tSaved) => {
              console.log(tSaved);
            });
          }
          else return res.status(404).send({ message: 'El jugador ya esta en el equipo' });
        }
        res.status(200).send({ team });
      });
    });
  }

  

  module.exports = {
    getTeam,
    getTeams,
    getTeamByName,
    createTeam,
    updateTeam,
    deleteTeam,
    addPlayer,
    removePlayer
  };