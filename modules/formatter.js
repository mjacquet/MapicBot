"use strict";

let moment = require("moment"),
    numeral = require("numeral");

 var price={"tiefighter":1250.99,"xwing":1399.99,"uwing":1250.99};
 var commlinks={xwing:process.env.COMMUNITY_XWING,tiefighter:process.env.COMMUNITY_TIE_FIGHTER,uwing:process.env.COMMUNITY_UWING};


exports.bonjour = response => {
    return {
        "text":"Bonjour " + response.first_name + ", et bienvenue dans votre assistant StarForce.",
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

exports.recu = shipType =>{

    return {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"receipt",
        "recipient_name":"Rachel Skywalker",
        "merchant_name":"StarForce",
        "order_number":new Date().getTime(),
        "currency":"EUR",
        "payment_method":"Visa 7977",
        "elements":[
          {
            "title":shipType,
            "quantity":1,
            "price":price[shipType],
            "currency":"EUR",
            "image_url":'https://legocitybot.herokuapp.com/'+shipType+'.png?'+process.env.HEROKU_RELEASE_VERSION
          }
        ],
        "address":{
          "street_1":"6 rue Daguerre",
          "city":"Paris",
          "postal_code":"75014",
          "state":"Ile-De-France",
          "country":"FR"
        },
        "summary":{
          "total_cost":price[shipType]
        }
      }
    }
  }
};

exports.information = response => {
  //  console.log('onBoard2');
    return {
        "text":"Un vaisseau vous plaît ? Envoyez-moi sa photo et je vous donnerai toutes les informations."
      }
};

exports.avis = vaisseau => {
  //  console.log('onBoard2');
    return {
        "text":"Un vaisseau vous plaît ? Envoyez-moi sa photo et je vous donnerai toutes les informations."
      }
};


exports.ficheinfo = (shipType,checkouturl) => {

    let elements = [];
        elements.push(
            {
                title: shipType,
                "image_url": 'https://legocitybot.herokuapp.com/'+shipType.replace('-','').replace(' ','').toLowerCase()+'.png?'+process.env.HEROKU_RELEASE_VERSION,
                "buttons": [
                    {
                        "type": "postback",
                        "title": "Fiche Technique",
                        "payload": "fiche,"+shipType
                    },
                    {
                        "type":"web_url",
                        "title":"Avis Communauté",
                        "url": "https://sdodemo-main-141e22218e0-144-15950af6391.force.com/starforce/s/topic/"+commlinks[shipType.replace('-','').replace(' ','').toLowerCase()]+"?"+process.env.HEROKU_RELEASE_VERSION,
                        "webview_height_ratio": "full",
                        "messenger_extensions": false

                    },
                    {
                      "type":"web_url",
                      "title":"Acheter - "+price[shipType.replace('-','').replace(' ','').toLowerCase()]+"€",
                      "url": checkouturl,
                      "webview_height_ratio": "tall",
                      "messenger_extensions": true,
                      "webview_share_button":"hide"
                    }
                ]
            }
        );
// console.log("bouton",elements[0].buttons[2]);
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
                "url": 'https://legocitybot.herokuapp.com/'+shipType.replace('-','').replace(' ','').toLowerCase()+'-specs.png?'+process.env.HEROKU_RELEASE_VERSION
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
