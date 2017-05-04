"use strict";

exports.classify = imageURL => new Promise((resolve, reject) => {
/*
  var jwt = require('jsonwebtoken');
  var request = require('request');

  var url = process.env.EINSTEIN_VISION_URL
  var private_key = process.env.EINSTEIN_VISION_PRIVATE_KEY
  var account_id = process.env.EINSTEIN_VISION_ACCOUNT_ID*/

  const Episode7     = require('episode-7');
  const oAuthToken   = require('./oauth-token');
  const updateToken  = require('./update-token');
  const queryVisionApi = require('./query-vision-api');

  const pvsUrl = process.env.EINSTEIN_VISION_URL;
  const accountId  = process.env.EINSTEIN_VISION_ACCOUNT_ID;
  const privateKey = process.env.EINSTEIN_VISION_PRIVATE_KEY;

  Episode7.run(updateToken, pvsUrl, accountId, privateKey)
  .then(() => {
    console.log('token',oAuthToken.get())
    Episode7.run(queryVisionApi,pvsUrl,imageURL,'GeneralImageClassifier',accountId,privateKey,oAuthToken.get()).then((visionApiResult)=>{
      console.log('vison api result',visionApiResult)
    });

  });




  /*var reqUrl = `${url}v1/oauth2/token`;

  // JWT payload
  var rsa_payload = {
    "sub":account_id,
    "aud":url
  }

  var rsa_options = {
    header:{
      "alg":"RS256",
      "typ":"JWT"
    },
    expiresIn: '1h'
  }

  // Sign the JWT payload
  var assertion = jwt.sign(
    rsa_payload,
    private_key,
    rsa_options
  );

  var options = {
    url: reqUrl,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'accept': 'application/json'
    },
    body:`grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${encodeURIComponent(assertion)}`
  }

  console.log('vision service oauth request options',options);
  // Make the OAuth call to generate a token
  request.post(options, function(error, response, body) {
    console.log('vision service token request json',body);
    var data = JSON.parse(body);
    console.log('vision service token request',data);
    console.log('access token',data["access_token"]);
    resolve(data["access_token"]);
  });*/
  /*
 console.log('vision service  image url ',imageURL);

  let token='b724fc3070ccf0403b54e3c4ba7d38ee226af91b';
  var options = {
    url: url+'v1/vision/predict',
    headers: {
      'Content-Type': 'multipart/form-data',
      'Cache-Control': 'no-cache',
      'Authorization': 'Bearer '+token,
    },
    form:{'sampleLocation':imageURL,'modelId':'GeneralImageClassifier'}
  }

    console.log('vision service  request ',options);


    var FormData = require('form-data');

    var form = new FormData();
    form.append("sampleLocation", imageURL);
    form.append("modelId", "GeneralImageClassifier");

    form.getLength(function(err, length){
      if (err) {
        return requestCallback(err);
      }

      var r = request.post(url+'v1/vision/predict', requestCallback);
      r._form = form;
      r.setHeader('content-length', length);
      r.setHeader('Cache-Control', 'no-cache');
      r.setHeader('Authorization', 'Bearer '+token);
      r.setHeader('Content-Type', 'multipart/form-data');

    });


    function requestCallback(err, res, body) {
      console.log('new request to vision service return',body);
    }


*/



  /*request.post(options, function(error, response, body) {
    console.log('vision service response ',body);
  });*/
  /*
  setTimeout(() => {
    resolve("X-WING");
  }, 2000);*/
});
