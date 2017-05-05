const hbid = process.env.HUE_BRIDGE_ID;
const hbtoken = process.env.HUE_BRIDGE_TOKEN;
const rp = require('request-promise');
var Episode7 = require('episode-7');
var lights=[];

function* hueLights(
  light){

    if(lights==null){
      let hueinit = yield Episode7.run(hueLightsInit).then((lights) => {
        console.log('hue initialized',lights);
      });

    }
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



    var formData = {
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
*/
    console.log('Hue api return:',body);
    return body;

  }

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
  return lights;
}

module.exports = hueLights;
module.exports = hueLightsInit;
