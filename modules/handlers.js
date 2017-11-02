"use strict";

let messenger = require('./messenger'),
formatter = require('./formatter'),
uploads = require('./uploads');
var Redis = require('ioredis');
var redis = new Redis(process.env.REDIS_URL);

exports.Greetings = async(sender) => {
  console.log('start',sender);
 // if(sender!="822485231243369"){
    let response=await messenger.getUserInfo(sender);
    messenger.send(formatter.bonjour(response), sender);
   /* setTimeout(function () {
      messenger.writingIcon(sender);
    }, 500)
    setTimeout(function () {
      messenger.send(formatter.information(response), sender);
    }, 2000)*/
  //}
};

exports.repas = (sender,text) => {
  messenger.send(formatter.looking(), sender);
  setTimeout(function () {
    messenger.writingIcon(sender);
  }, 500)
  setTimeout(function () {
    messenger.send(formatter.information(), sender);
  }, 1500)
};


exports.information = (sender) => {
  messenger.send(formatter.information(), sender);
};

exports.booknbr = (sender,memory,nbpax) => {
  //should check the input of nbpax
  memory.data.nbpax=nbpax;
  redis.set(sender,memory);
  messenger.send(formatter.time(), sender);
};

