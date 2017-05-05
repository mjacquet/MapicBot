const hbid = process.env.HUE_BRIDGE_ID;
const hbtoken = process.env.HUE_BRIDGE_TOKEN;
const rp = require('request-promise');
var Episode7 = require('episode-7');

function* hueLights(
                       light){

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
