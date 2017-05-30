"use strict";

exports.classify = imageURL => new Promise((resolve, reject) => {

  const Episode7     = require('episode-7');
  const oAuthToken   = require('./oauth-token');
  const updateToken  = require('./update-token');
  const queryVisionApi = require('./query-vision-api');
  const hueLights = require('./hue-lights');

  const pvsUrl = process.env.EINSTEIN_VISION_URL;
  const accountId  = process.env.EINSTEIN_VISION_ACCOUNT_ID;
  const privateKey = process.env.EINSTEIN_VISION_PRIVATE_KEY;
  const model= process.env.EINSTEIN_VISION_MODEL;

  let request = require('request');
  var querystring = require('querystring');


  console.log('hue+Einsteinvision');

    Episode7.run(queryVisionApi,pvsUrl,imageURL,model,accountId,privateKey,oAuthToken.get()).then((visionApiResult)=>{
      let jsvar=JSON.parse(visionApiResult);
  //    console.log('vison api result ',jsvar.probabilities[0].label);
      if(jsvar.probabilities[0].probability<0.6){
        console.log("probability too low",jsvar.probabilities[0].probability);
        resolve(null);
      }
      else {
        Episode7.run(hueLights,jsvar.probabilities[0].label).then((hueresult)=>{
          let jsvar2=JSON.parse(hueresult);
          console.log("hue result",jsvar2);
        });
        resolve(jsvar.probabilities[0].label);
      }
    });

/*
Episode7.run(hueLights,jsvar.probabilities[0].label).then((hueresult)=>{
  let jsvar2=JSON.parse(hueresult);
  console.log("hue result",jsvar2);
});
*/
});
