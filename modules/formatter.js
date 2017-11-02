"use strict";

let moment = require("moment"),
    ml = require("./multilingual"),
    numeral = require("numeral");

 var price={"tiefighter":1250.99,"xwing":1399.99,"uwing":1250.99};
 var commlinks={xwing:process.env.COMMUNITY_XWING,tiefighter:process.env.COMMUNITY_TIE_FIGHTER,uwing:process.env.COMMUNITY_UWING};


exports.bonjour = response => {
    return {
        "text":ml.get("hello",response.first_name),
    }
};

exports.looking = () =>{
    return {
        "text":ml.get("lookingforrestaurants")
    }
  };

exports.time = () =>{
  return {
      "text":ml.get("lookingforrestaurants"),
      "quick_replies":[
        {
          "content_type":"text",
          "title":"Now",
          "payload":"booktime,now"
        },
        {
            "content_type":"text",
            "title":"In 15 minutes",
            "payload":"booktime,in 15 minutes"
        },
        {
          "content_type":"text",
          "title":"In 30 minutes",
          "payload":"booktime,in 30 minutes"
        }
      ]
  }
};
exports.confirm = (details) =>{
    return {
        "text":"Would you like to confirm a table for "+details.data.nbpax+" pax at "+details.data.place+" "+details.data.time,
        "quick_replies":[
          {
            "content_type":"text",
            "title":"Book",
            "payload":"confirm,yes"
          },
          {
              "content_type":"text",
              "title":"Cancel",
              "payload":"confirm,no"
          }
        ]
    }
  };

exports.time = () =>{
    return {
        "text":ml.get("timing"),
    }
  };

  exports.information = () => {
    
        let elements = [];
            elements.push(
                {
                    title: "Mapic Sushi",
                    "image_url": 'https://mapicbot.herokuapp.com/sushi.png?'+process.env.HEROKU_RELEASE_VERSION,
                    "buttons": [
                        {
                            "type": "postback",
                            "title": ml.get("menu"),
                            "payload": "menu,sushi"
                        },
                        {
                            "type":"postback",
                            "title":ml.get("book"),
                            "payload": "book,sushi"
    
                        },
                        {
                            "type":"postback",
                            "title":ml.get("map"),
                            "payload": "map,sushi"
    
                        }
                    ]
                }
            );
            elements.push(
                {
                    title: "Burgers at Mapic",
                    "image_url": 'https://mapicbot.herokuapp.com/burger.png?'+process.env.HEROKU_RELEASE_VERSION,
                    "buttons": [
                        {
                            "type": "postback",
                            "title": ml.get("menu"),
                            "payload": "menu,burger"
                        },
                        {
                            "type":"postback",
                            "title":ml.get("book"),
                            "payload": "book,burger"
    
                        },
                        {
                            "type":"postback",
                            "title":ml.get("map"),
                            "payload": "map,burger"
    
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

    exports.map = restaurant => {
        return {
            "attachment": {
                "type": "image",
                "payload": {
                    "url": 'https://mapicbot.herokuapp.com/map.gif?'+process.env.HEROKU_RELEASE_VERSION
                }
            }
        };
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
        "currency":ml.get("currency"),
        "payment_method":"Visa 7977",
        "elements":[
          {
            "title":shipType,
            "quantity":1,
            "price":price[shipType],
            "currency":ml.get("currency"),
            "image_url":'https://legocitybot.herokuapp.com/'+shipType+'.png?'+process.env.HEROKU_RELEASE_VERSION
          }
        ],
        "address":ml.get("shipto"),
        "summary":{
          "total_cost":price[shipType]
        }
      }
    }
  }
};


exports.avis = vaisseau => {
  //  console.log('onBoard2');
    return {
        "text":ml.get("infos")
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
                        "title": ml.get("specs"),
                        "payload": "fiche,"+shipType
                    },
                    {
                        "type":"web_url",
                        "title":ml.get("avis"),
                        "url": "https://sdodemo-main-141e22218e0-144-15950af6391.force.com/starforce/s/topic/"+commlinks[shipType.replace('-','').replace(' ','').toLowerCase()]+"?"+process.env.HEROKU_RELEASE_VERSION,
                        "webview_height_ratio": "full",
                        "messenger_extensions": false

                    },
                    {
                      "type":"web_url",
                      "title":ml.get("buy",price[shipType.replace('-','').replace(' ','').toLowerCase()]),
                      "url": checkouturl,
                      "webview_height_ratio": "tall",
                      "messenger_extensions": false,
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
                "url": 'https://legocitybot.herokuapp.com/'+shipType.replace('-','').replace(' ','').toLowerCase()+'-specs-'+process.env.LANGUAGE+'.png?'+process.env.HEROKU_RELEASE_VERSION
            }
        }
    };
};

exports.feedback = pUrl => {
    
        let elements = [];
            elements.push(
                {
                    title: 'Quel est le bon vaisseau?',
                    "image_url": pUrl,
                    "buttons": [
                        {
                            "type": "postback",
                            "title": "X-wing",
                            "payload": "feedback,X-Wing;"+pUrl
                        },
                        {
                            "type": "postback",
                            "title": "U-wing",
                            "payload": "feedback,U-Wing;"+pUrl
                        },
                        {
                            "type": "postback",
                            "title": "Tie Fighter",
                            "payload": "feedback,Tie Fighter;"+pUrl
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