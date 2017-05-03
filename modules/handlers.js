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
exports.sample = (sender) => {
    messenger.getUserInfo(sender).then(response => {
        messenger.send({text: `Please send location`}, sender);
    });
};
exports.test = (sender) => {
    messenger.getSuggestion('75001','2').then(response => {
        messenger.send({text: `${response.service_plan}`}, sender);
    });
};
exports.hi = (sender) => {
    console.log('hi');
    messenger.getUserInfo(sender).then(response => {
        messenger.send({text: `Hello, ${response.first_name}!`}, sender);
    });
};

exports.start = (sender) => {
    console.log('start');
    messenger.getUserInfo(sender).then(response => {

            messenger.send(formatter.onBoard1(response), sender);
    });
};


exports.theStartTwo = (sender) => {
    console.log('theStartTwo ');
    //messenger.send({text: `Je vais me charger de trouver l'assurance parfaite pour vous. Cela prendra seulement quelques minutes.`}, sender);
    messenger.getUserInfo(sender).then(response => {
        console.log('Inside getUserInfo');
        messenger.send(formatter.onBoard6(response), sender);
    });
};
