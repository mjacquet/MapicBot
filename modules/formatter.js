"use strict";

let moment = require("moment"),
    numeral = require("numeral");

exports.bonjour = response => {
    return {
        "text":"Bonjour " + response.first_name + " et bienvenue à la XWING Factory. Que puis-je faire pour vous?",
        "quick_replies":[
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
        ]
    }
};

exports.information = response => {
    console.log('onBoard2');
    return {
        "text":"Envoyez moi une photo du vaisseau"
      }
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
