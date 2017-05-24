"use strict";

let messenger = require('./messenger'),
    formatter = require('./formatter');


    exports.acheter = (sender,shiptype) => {
        	console.log('acheter  ',shipType );
            	messenger.send({text: 'acheter'}, sender);
        };

    exports.fiche = (sender,shiptype) => {
        	console.log('fiche technique',shipType );
          messenger.send(formatter.fiche(shipType), sender);
        };


exports.schedule_visit = (sender) => {
	console.log('schedule_visit');
	messenger.getUserInfo(sender).then(response => {
    	messenger.send(formatter.formatAppointment(response), sender);
    });
};

exports.information = (sender) => {
	console.log('information');
	messenger.getUserInfo(sender).then(response => {
    	messenger.send(formatter.information(response), sender);
    });
};

exports.confirm_visit = (sender, values) => {
	console.log('values: ', values);
    messenger.send({text: `Votre rendez-vous est confirmé pour le ${values[1]}`}, sender);
};
/*
exports.link_postback = (sender, values) => {
	console.log('link_postback');
    messenger.send({text: `Link`}, sender);
};
*/
exports.image_postback = (sender, values) => {
	console.log('image_postback');
	messenger.getUserInfo(sender).then(response => {
    	messenger.send(formatter.imageShow(response), sender);
    });
};
