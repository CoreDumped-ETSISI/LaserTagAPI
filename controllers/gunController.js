"use strict";

const Gun = require("../models/gun");
const Player = require("../models/player");
var crypto = require("crypto");
const mongoose = require("mongoose");

function getGun(req, res) {
    let gunId = req.params.gunId;
  
    Gun.findById(gunId, (err, gun) => {
      if (err)
        return res
          .status(500)
          .send({ message: `Error al realizar peticion: ${err}` });
      if (!gun) return res.status(404).send({ message: `El arma no existe` });
      res.status(200).send({ gun });
    });
  }

  function getGuns(req, res) {
    Gun.find({}, (err, guns) => {
      if (err)
        return res
          .status(500)
          .send({ message: `Error al realizar la petición: ${err}` });
      if (!guns) return res.status(404).send({ message: "No existen armas" });
  
      res.status(200).send({ guns });
    });
  }

  function getGunByName(req, res) {
    let name = req.params.name;
  
    Gun.find({ gunName: name })
      .exec((err, gun) => {
        if (err)
          return res
            .status(500)
            .send({ message: `Error al realizar la petición: ${err}` });
        if (!gun)
          return res.status(404).send({ message: "No existen el arma" });
  
        res.status(200).send(gun);
      });
  }

  // mqttId se genera aleatoriamente por el momento
  function createGun(req, res) {
    const gun = new Gun();
  
    gun.gunName = req.body.gunName;
    gun.damage = req.body.damage;
    gun.healing = req.body.healing;
    gun.mqttId = crypto.randomBytes(20).toString('hex');
    gun.ammo = req.body.ammo;
  
    gun.save((err, gunStored) => {
		if(err) res.status(500).send({message: `Error al salvar la base de datos ${err}`})
		else res.status(200).send({gun: gunStored})
	})
  }

  function updateGun(req, res) {
    let updated = req.body;
    let gunId = req.params.gunId;
  
    Gun.findByIdAndUpdate(gunId, updated, (err, oldGun) => {
      if (err)
        return res
          .status(500)
          .send({ message: `Error al actualizar arma: ${err}` });
      res.status(200).send({ oldGun });
    });
  }

  function deleteGun(req, res) {
    let gunId = req.params.gunId;
  
    Gun.findById(gunId, (err, gun) => {
      if (err)
        return res
          .status(500)
          .send({ message: `Error al borrar arma: ${err}` });
      if (!gun) return res.status(404).send({ message: `El arma no existe` });

      Player.find({}, (err, players) => {
        if (!err && players) {
          players.forEach(u => {
            if(u.gun==gunId){
              u.gun=null;
              u.save((err, uSaved) => {
                //console.log(uSaved);
              });
            }
          });
        }
      });

      gun.remove(err => {
        if (err)
          return res
            .status(500)
            .send({ message: `Error al borrar arma: ${err}` });
        res.status(200).send({ message: `El arma ha sido borrado` });
      });
    });
  }

  

  module.exports = {
    getGun,
    getGuns,
    getGunByName,
    createGun,
    updateGun,
    deleteGun
  };