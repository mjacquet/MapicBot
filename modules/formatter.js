"use strict";

let moment = require("moment"),
    numeral = require("numeral");
var connectSdk = require('connect-sdk-nodejs');

connectSdk.init({
    host: 'api-sandbox.globalcollect.com',
    scheme: 'https',
    port: 443,
    enableLogging: false, // defaults to false
    logger: undefined, // if undefined console.log will be used
    apiKeyId: '4e1e4f14eb2e7ce0',
    secretApiKey: 'ZcCt/sttr0qY8f51asdjw11DbP1ZTHy2DlCx0uoMa38=',
    integrator: 'Starforce'
    });

exports.bonjour = response => {
    return {
        "text":"Bonjour " + response.first_name + ", et bienvenue dans votre assistant Vaisseau'lib.",
      /*  "quick_replies":[
          {
            "content_type":"text",
            "title":"Decouvrir le dernier XWING",
            "payload":"theStart"
          },
          {
            "content_type":"text",
            "title":"Plus d'information sur un vaisseau",
            "payload":"information"
          }
        ]*/
    }
};

exports.information = response => {
  //  console.log('onBoard2');
    return {
        "text":"Un vaisseau vous plaît ? Envoyez-moi sa photo et je vous donnerai toutes les informations"
      }
};

exports.avis = vaisseau => {
  //  console.log('onBoard2');
    return {
        "text":"Un vaisseau vous plaît ? Envoyez-moi sa photo et je vous donnerai toutes les informations"
      }
};

var commlinks={xwing:process.env.COMMUNITY_XWING,tiefighter:process.env.COMMUNITY_TIE_FIGHTER,uwing:process.env.COMMUNITY_UWING};

exports.ficheinfo = shipType => {


  var body = {
  "hostedCheckoutSpecificInput": {
    "locale": "fr_FR"
  },
  "order": {
    "amountOfMoney": {
      "currencyCode": "EUR",
      "amount": 2345
    },
    "customer": {
      "billingAddress": {
        "countryCode": "FR"
      },
      "merchantCustomerId": "12345678"
    }
  }
};

connectSdk.hostedcheckouts.create("3154", body, null, function (error, sdkResponse) {
  console.log("INGENICO",process.env.INGENICO_SUBDOMAIN+sdkResponse.body.partialRedirectUrl);
});

    let elements = [];
        elements.push(
            {
                title: shipType,
                "image_url": 'https://legocitybot.herokuapp.com/'+shipType.replace('-','').replace(' ','').toLowerCase()+'.png',
                "buttons": [
                    {
                        "type": "postback",
                        "title": "Fiche Technique",
                        "payload": "fiche,"+shipType
                    },
                    {
                        "type":"web_url",
                        "title":"Avis Communauté",
                        "url": "https://sdodemo-main-141e22218e0-144-15950af6391.force.com/starforce/s/topic/"+commlinks[shipType.replace('-','').replace(' ','').toLowerCase()],
                        "webview_height_ratio": "full",
                        "messenger_extensions": false

                    },
                    {
                        "type": "postback",
                        "title": "Acheter",
                        "payload": "acheter,"+shipType
                    }
                ]
            }
        );
 console.log(elements);
    return {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": elements
            }
        }
    };
};

exports.fiche = shipType => {
    return {
        "attachment": {
            "type": "image",
            "payload": {
                "url": 'https://legocitybot.herokuapp.com/'+shipType.replace('-','').replace(' ','').toLowerCase()+'.png'
            }
        }
    };
};


exports.onBoard5 = response => {

    let elements = [];
        elements.push(
            {
                title: 'Cumulus Confort',
                subtitle: `17,99€ par mois`,
                "image_url": 'https://drive.google.com/uc?export=view&id=0BxwASYlURQ-JWHdVeWM2dVc5Q2o0dzZVMUJVVGE5NGg3MF84',
                "buttons": [
                    {
                        "type":"web_url",
                        "url":"https://www.facebook.com/cumulusfrance",
                        "title":"Avis Communauté"
                    },
                    {
                        "type": "postback",
                        "title": "Rdv conseiller",
                        "payload": "schedule_visit"
                    },
                    {
                        "type": "postback",
                        "title": "Souscrire",
                        "payload": "image_postback"
                    }
                ]
            },
            {
                title: 'Cumulus Confort Plus',
                subtitle: `20,99€ par mois`,
                "image_url": 'https://drive.google.com/uc?export=view&id=0BxwASYlURQ-JLWRiUjBPejFHREh3dnFZMjNRbzh2U2hyOE9V',
                "buttons": [
                    {
                        "type":"web_url",
                        "url":"https://www.facebook.com/cumulusfrance",
                        "title":"Avis Communauté"
                    },
                    {
                        "type": "postback",
                        "title": "Rdv conseiller",
                        "payload": "schedule_visit"
                    },
                    {
                        "type": "postback",
                        "title": "Souscrire",
                        "payload": "image_postback"
                    }
                ]
            },
            {
                title: 'Offre maison connectée',
                subtitle: `17,99€ par mois`,
                "image_url": 'https://drive.google.com/uc?export=view&id=0BxwASYlURQ-JOEpjd0wxRTllZUpaNnJWWnpfNTQ2S2gxbHc0',
                "buttons": [
                    {
                        "type":"web_url",
                        "url":"https://www.facebook.com/cumulusfrance",
                        "title":"Avis Communauté"
                    },
                    {
                        "type": "postback",
                        "title": "Rdv conseiller",
                        "payload": "schedule_visit"
                    },
                    {
                        "type": "postback",
                        "title": "Souscrire",
                        "payload": "image_postback"
                    }
                ]
            }


        );

    return {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": elements
            }
        }
    };
};

exports.onBoard10 = response => {
    let elements = [];
        elements.push(
            {
                title: 'Agent',
                "image_url": 'http://www.marbellafamilyfun.com/images/wanted-customer-support-agent-21854988.jpg',
                "buttons": [
                    {
                        "type": "postback",
                        "title": "Contactez-moi",
                        "payload": "button"
                    }
                ]
            }
        );

    return {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": elements
            }
        }
    };
};



exports.imageShow = response => {

    let elements = [];
        elements.push(
            {
                title: 'Image',
                "image_url": 'https://www.dropbox.com/s/575mqq3jhzvxkxm/gfacebook.png?raw=1'
            }
        );

    return {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": elements
            }
        }
    };
};


exports.sendLocation = response => {
    return {
        "text":"Où est situé votre logement?",
        "quick_replies":[
          {
            "content_type":"location"
          }
        ]
    }
};
