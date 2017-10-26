"use strict";

let messenger = require('./messenger'),
formatter = require('./formatter'),
uploads = require('./uploads');


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
};
