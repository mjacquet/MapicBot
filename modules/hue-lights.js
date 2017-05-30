const hbid = process.env.HUE_BRIDGE_ID;
const hbtoken = process.env.HUE_BRIDGE_TOKEN;
const rp = require('request-promise');
let request = require('request');
var Episode7 = require('episode-7');
var lights={xwing:process.env.HUE_XWING_ID,tiefighter:process.env.HUE_TIEFIGHTER_ID,uwing:process.env.HUE_UWING_ID};
var modes={orange:'{"on": true,"bri": 254,"hue": 6751,"sat": 254,"effect": "none","xy":[0.554,0.4116],"ct": 500,"alert": "lselect","colormode": "xy"}',
            green:'{"on": true,"bri": 254,"hue": 22463,"sat": 254,"effect": "none","xy": [0.2339,0.652],"ct": 153,"alert": "select","colormode": "xy"}',
            off:'{"on": false}'
          }


function* hueLights(light){

var options = {
  url: `https://client.meethue.com/api/0/lights/`+lights[light.shipType]+`/state`,
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'x-token': hbtoken
  },
  body:modes[light.mode]

}
//'{"on": true}'
console.log('hueAPI request',options);
let { body, isUnauthorized } = yield Episode7.call((options) => {
  return rp(options)
  .then( body => ({ body }) )
  .catch( error => {
    if(error.statusCode === 401) {
      return { isUnauthorized: true };
    } else {
      throw error;
    }
  })
},options);

console.log('Hue api return:',body);
return body;
}

module.exports = hueLights;
