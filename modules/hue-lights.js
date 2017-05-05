const hbid = process.env.HUE_BRIDGE_ID;
const hbtoken = process.env.HUE_BRIDGE_TOKEN;
const rp = require('request-promise');
let request = require('request');
var Episode7 = require('episode-7');
var lights={xwing:'1',tiefighter:'2'};



function* hueLights(
  light){


            var options = {
              uri: `https://client.meethue.com/api/0/lights/1/state`,
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'x-token': 'VXh1U0tvSnlMN1ZkS3hOaWdOSWJRRFp4UGo3V3IxSUNPb1pVYlpHZUZNND0='
              },
              body:'{"on": true}'
            }
            request(options, function (err, res, body) {
              console.log("hue request direct",body);
              resolve(body);
            });
}


  /*  if(lights==null){
      let hueinit = yield Episode7.call(hueLightsInit);
        console.log('hue initialization done',lights);

    }*/

  //  console.log('hue initialized',lights);
/*
    var formData = {
      clipmessage:{
        bridgeid:hbid,
        clipcommand:{
          url:'/api/groups/1/state',
          method:'PUT',
          body:{
            "on":false
          }
        }
      }
    }
    var options = {
      url: `https://www.meethue.com/api/sendmessage?token=${hbtoken}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      formData:formData
    }//formData:formData
    console.log('hueAPI request1',options);
    let { body1, isUnauthorized1 } = yield Episode7.call((options) => {
      return rp(options)
      .then( body1 => ({ body }) )
      .catch( error => {
        if(error.statusCode === 401) {
          return { isUnauthorized1: true };
        } else {
          throw error;
        }
      })
    },options);

  console.log('Hue api return1:',body);
*/
/*    var formData = {
      clipmessage:{
        bridgeid:hbid,
        clipcommand:{
          url:'/api/lights/'+lights[light]+'/state',
          method:'PUT',
          body:{
            "on":true
          }
        }
      }
    }
    var options = {
      url: `https://www.meethue.com/api/sendmessage?token=${hbtoken}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      formData:formData

    }//formData:formData
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
/*
  function* hueLightsInit(){

  var options = {
    url: `https://www.meethue.com/api/getbridge?token=${hbtoken}&bridgeid=${hbid}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }

  }//formData:formData
  console.log('hueAPI init request',options);
  let { body, isUnauthorized } = yield Episode7.call((options) => {
    return rp(options)
    .then( body => ({ body }) )
    .catch( error => {
      if(error.statusCode === 401) {
        console.log("------- HUE API UNAUTHORIZED------------\n-----UPDATE TOKEN------")
      } else {
        throw error;
      }
    })
  },options);

  let aLights=JSON.parse(body).lights;
//  console.log('Hue api init return lights:',aLights["1"]);
for (var l in aLights) {
  lights[aLights[l].name]=l;
  }
  console.log('hue init done:',lights)
  return JSON.stringify(lights);
}
*/
//exports.turnOn = turnOn;
module.exports = hueLights;
//module.exports = hueLightsInit;
