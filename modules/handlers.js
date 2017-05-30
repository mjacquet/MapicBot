"use strict";

let messenger = require('./messenger'),
    formatter = require('./formatter');
    const hueLights = require('./hue-lights');
    var Episode7 = require('episode-7');


/*
exports.test = (sender) => {
    messenger.getUserInfo(sender).then(response => {
        salesforce.createCase(response.first_name, response.last_name, sender).then(() => {
            messenger.send(formatter.onBoard1(response), sender);
        });
    });
};
*/

exports.orderdone = (req,res) => {
    console.log('Payment Ingenico Done');
//req.query.sender
          Episode7.run(hueLights,{shipType:req.query.shipType,mode:"green"}).then((hueresult)=>{
              //let jsvar2=JSON.parse(hueresult);
              //console.log("hue result",jsvar2);
              window.setTimeout(Episode7.run(hueLights,{shipType:req.query.shipType,mode:"off"}).then((hueresult)=>{})
                ,10000);
            });
            messenger.send(formatter.recu(req.query.shipType), req.query.sender);

            res.sendStatus(200);
};

exports.start = (sender) => {
    console.log('start');
    messenger.getUserInfo(sender).then(response => {

            messenger.send(formatter.bonjour(response), sender);
            setTimeout(function () {
              messenger.writingIcon(sender);
            }, 500)
            setTimeout(function () {
              messenger.send(formatter.information(response), sender);
            }, 2000)


    });
};


exports.information = (sender) => {
    console.log('information ');
    //messenger.send({text: `Je vais me charger de trouver l'assurance parfaite pour vous. Cela prendra seulement quelques minutes.`}, sender);
    messenger.getUserInfo(sender).then(response => {
        console.log('Inside getUserInfo');
        messenger.send(formatter.information(response), sender);
    });
};
