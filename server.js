"use strict";

var express = require('express'),
    bodyParser = require('body-parser'),
    processor = require('./modules/processor'),
    handlers = require('./modules/handlers'),
    postbacks = require('./modules/postbacks'),
    uploads = require('./modules/uploads'),
    messenger = require('./modules/messenger'),
    FB_VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN,
    app = express();

app.set('port', process.env.PORT || 5000);

app.use(bodyParser.json());
app.use(express.static('public'));
app.get('/webhook', (req, res) => {
    if (req.query['hub.verify_token'] === FB_VERIFY_TOKEN) {
        res.send(req.query['hub.challenge']);
    } else {
        res.send('Error, wrong validation token');
    }
});

app.get('/orderdone', handlers['orderdone']);

app.post('/webhook', (req, res) => {
    let events = req.body.entry[0].messaging;
    for (let i = 0; i < events.length; i++) {
        let event = events[i];
        let sender = event.sender.id;
        if (process.env.MAINTENANCE_MODE && ((event.message && event.message.text) || event.postback)) {
            messenger.send({text: `Sorry I'm taking a break right now.`}, sender);
        } else if (event.message && event.message.text) {
          if (event.message.quick_reply) {
            let payload = event.message.quick_reply.payload;
            console.log(event.message.quick_reply.payload);
            let postback = postbacks[payload];
            if (postback && typeof postback === "function") {
                postback(sender, payload);
            } else {
                console.log("Postback Quick Reply " + postback + " is not defined");
            }
          }
          else {
            let result = processor.match(event.message.text);
            if (result) {
                let handler = handlers[result.handler];
                if (handler && typeof handler === "function") {
                    handler(sender, result.match);
                } else {
                    console.log("Handler " + result.handlerName + " is not defined");
                }
            }
            else {
              messenger.send({text: `Désolé je n'ai pas compris.\nEnvoyez-moi la photo d'un vaisseau et je vous donnerai toutes les informations.`}, sender);
            }
          }
        } else if (event.postback) {
            let payload = event.postback.payload.split(",");
            let postback = postbacks[payload[0]];
            if (postback && typeof postback === "function") {
                postback(sender, payload[1]);
            } else {
                console.log("Postback " + postback + " is not defined");
            }
        } else if (event.message && event.message.attachments) {
            uploads.processUpload(sender, event.message.attachments);
        }
    }
    res.sendStatus(200);
});

app.listen(app.get('port'), function () {
    console.log('Heroku bot - Express server listening on port ' + app.get('port'));
});
