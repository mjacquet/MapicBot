"use strict";

let messenger = require('./messenger'),
    formatter = require('./formatter'),
    hueLights = require('./hue-lights');


exports.orderdone = (req,res) => {
    res.sendStatus(200);
    console.log('Payment Ingenico Done');
    hueLights.blink(req.query.shipType);
    setTimeout(function(){hueLights.off(req.query.shipType);},10000);
    messenger.send(formatter.recu(req.query.shipType), req.query.sender);
};

exports.start = (sender) => {
    console.log('start',sender);
    if(sender!="822485231243369"){
    messenger.getUserInfo(sender).then(response => {

            messenger.send(formatter.bonjour(response), sender);
            setTimeout(function () {
              messenger.writingIcon(sender);
            }, 500)
            setTimeout(function () {
              messenger.send(formatter.information(response), sender);
            }, 2000)


    });
  }
};


exports.information = (sender) => {
    //console.log('information ');
    //messenger.send({text: `Je vais me charger de trouver l'assurance parfaite pour vous. Cela prendra seulement quelques minutes.`}, sender);
    //messenger.getUserInfo(sender).then(response => {
      //  console.log('Inside getUserInfo');
        messenger.send(formatter.information(response), sender);
  //  });
};
