"use strict";

let messenger = require('./messenger'),
    formatter = require('./formatter'),
    visionService = require('./vision-service-mock'),
    nodeGeocoder = require('node-geocoder');

var options = {
      provider: 'google'
};

var geocoder = nodeGeocoder(options);

exports.processUpload = (sender, attachments) => {
    if (attachments.length > 0) {
        let attachment = attachments[0];
      //  console.log('attachment: ', attachment);
        if (attachment.type === "image") {
      //      console.log('image attachment');

            messenger.send({text: 'Laissez-moi analyser cette photo avec Salesforce Einstein Vision Service...'}, sender);
            setTimeout(function () {
              messenger.writingIcon(sender);
            }, 50)
            visionService.classify(attachment.payload.url)
                .then(shipType => {
                  console.log('classification defined:',shipType);
                  if(shipType===null){
                      messenger.send({text: `Je ne reconnais pas ce vaisseau. Merci de réessayer.`}, sender);
                  }
                  else{
                    messenger.send({text: `Le ${shipType}. Très bon choix. Voilà ses caractéristiques`}, sender);
                  //  console.log('ficheinfo',formatter.ficheinfo(shipType));
                    messenger.send(formatter.ficheinfo(shipType), sender);

                    }
                })


        }else if (attachment.type === "location") {

            messenger.getUserInfo(sender).then(response => {
                messenger.send(formatter.renderRooms(response), sender);
            });

            console.log('attachment.payload.coordinates.lat: ', attachment.payload.coordinates.lat);
            console.log('attachment.payload.coordinates.long: ', attachment.payload.coordinates.long);
            console.log('geocoder: ', geocoder);

            geocoder.reverse({lat: attachment.payload.coordinates.lat, lon: attachment.payload.coordinates.long}).then(function(res) {
                console.log('result: ', res);
                console.log('ZIPCODE!: ', res[0].zipcode);

                messenger.setZip(res[0].zipcode);

                /*
                messenger.getSuggestion(res[0].zipcode, '2').then(response => {
                    messenger.send({text: `${response.service_plan}`}, sender);
                });
                */

            }).catch(function(err) {
                console.log('err: ', err);
            });



        } else {
            messenger.send({text: 'This type of attachment is not supported'}, sender);
        }
    }
};
