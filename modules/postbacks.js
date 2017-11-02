"use strict";

let messenger = require('./messenger'),
formatter = require('./formatter'),
einstein = require('./einstein'),
uploads = require('./uploads');
var http = require('http');
var fs = require('fs');
var ml = require("./multilingual");
var Redis = require('ioredis');
var redis = new Redis(process.env.REDIS_URL);

exports.book = (sender,restaurant) => {
  console.log('book  ',restaurant );
  redis.set(sender,{"action":"book","data":{}});
  messenger.send({text: ml.get("nbpax")}, sender);
};

exports.map = (sender,restaurant) => {
  console.log('map  ',restaurant );
  messenger.send(formatter.map(restaurant), sender);
};

exports.acheter = (sender,shipType) => {
  console.log('acheter  ',shipType );
  messenger.send({text: 'acheter'}, sender);
};

exports.fiche = (sender,shipType) => {
  console.log('fiche technique',shipType );
  messenger.send(formatter.fiche(shipType), sender);
};

exports.xwing = (sender) => {
  uploads.doAct(sender,"X-Wing");
};

exports.uwing = (sender) => {
  uploads.doAct(sender,"U-Wing");
};

exports.tiefighter = (sender) => {
  uploads.doAct(sender,"Tie Fighter");
};

exports.information = (sender) => {
  messenger.send(formatter.information(response), sender);
};

exports.feedback = (sender,feedb) => {
  console.log('feedback',feedb);
  var f=feedb.split(";");
  einstein.feedback(sender,f[0],f[1]).then(function(result){console.log(result);});
};
