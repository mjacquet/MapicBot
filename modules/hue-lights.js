const hbid = process.env.HUE_BRIDGE_ID;
const hbtoken = process.env.HUE_BRIDGE_TOKEN;
const rp = require('request-promise');
let request = require('request');
var Episode7 = require('episode-7');
var lights={xwing:process.env.HUE_XWING_ID,tiefighter:process.env.HUE_TIEFIGHTER_ID,uwing:process.env.HUE_UWING_ID};



function* hueLights(light){

var options = {
  url: `https://client.meethue.com/api/0/lights/`+lights[light.shipType.replace('-','').replace(' ','').toLowerCase()]+`/state`,
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'x-token': hbtoken
  },
  body:'{"on": true}'

}
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
