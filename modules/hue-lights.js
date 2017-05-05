const hbid = process.env.HUE_BRIDGE_ID;
const hbtoken = process.env.HUE_BRIDGE_TOKEN;
const rp = require('request-promise');
var Episode7 = require('episode-7');
var lights=null;

function* hueLights(
                       action,
                       light=null){

  if(lights==null){
    let hueinit = yield Episode7.call(
      hueLightsInit
    );
    console.log('hue init');
  }
/*  var formData = {
    modelId: modelId,
    sampleLocation : resizedImgUrl
  }*/
  var options = {
      url: `https://www.meethue.com/api/sendmessage?token=${hbtoken}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      formData:{clipmessage:{bridgeid:hbid,clipcommand:{url:'/api/lights/1/state',method:'PUT',body:{on:true}}}}

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

function* hueLightsInit(){

/*  var formData = {
    modelId: modelId,
    sampleLocation : resizedImgUrl
  }*/
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
    console.log('Hue api init return lights:',aLights);

    return aLights;

}

module.exports = hueLights;
module.exports = hueLightsInit;
