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

exports.start = (sender) => {
    console.log('start');
    messenger.getUserInfo(sender).then(response => {

            messenger.send(formatter.bonjour(response), sender);
            messenger.send(formatter.information(response), sender);
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
