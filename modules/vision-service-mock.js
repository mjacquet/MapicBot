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
//model with all pictures of all time N2I3KTHJV2M5R5DDW3H63K3XEQ
//model with picture porte de versaille only DAH3BPSYBJBOCPXWPRDKONO2O4
//model with picture porte de versaille and good labels: 5YH2PZF43TNFZUD6HPL2RDAIRE
  let request = require('request');
  var querystring = require('querystring');


  console.log('hue+Einsteinvision');
    Episode7.run(hueLights,{shipType:"tiefighter",mode:"off"}).then((hueresult)=>{});
    Episode7.run(hueLights,{shipType:"xwing",mode:"off"}).then((hueresult)=>{});
    Episode7.run(hueLights,{shipType:"uwing",mode:"off"}).then((hueresult)=>{})

    Episode7.run(queryVisionApi,pvsUrl,imageURL,model,accountId,privateKey,oAuthToken.get()).then((visionApiResult)=>{
      let jsvar=JSON.parse(visionApiResult);
  //    console.log('vison api result ',jsvar.probabilities[0].label);
      if(jsvar.probabilities[0].probability<0.4){
        console.log("probability too low",jsvar.probabilities[0].probability);
        resolve(null);
      }
      else {
        Episode7.run(hueLights,{shipType:jsvar.probabilities[0].label.replace('-','').replace(' ','').toLowerCase(),mode:"orange"}).then((hueresult)=>{
          let jsvar2=JSON.parse(hueresult);
        //  console.log("hue result",jsvar2);
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
