"use strict";

let messenger = require('./messenger'),
    formatter = require('./formatter');

/*
exports.test = (sender) => {
    messenger.getUserInfo(sender).then(response => {
        salesforce.createCase(response.first_name, response.last_name, sender).then(() => {
            messenger.send(formatter.onBoard1(response), sender);
        });
    });
};
*/

exports.orderdone = (sender,shipType) => {
    console.log('Payment Ingenico Done');

            messenger.send({text: `Votre commande est validée.`}, sender);


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
