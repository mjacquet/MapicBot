var lang = process.env.LANGUAGE;
var strings={
    "hello":{
        "fr":"Bonjour, PLACEHOLDER et bienvenue dans votre assistant StarForce.",
        "en":"Hello PLACEHOLDER, and welcome to your StarForce assistant."
    },
    "which":{
        "fr":"Quel vaisseau vous intéresse en particulier? ",
        "en":"Which spaceship do you prefer? "
    },
    "specs":{
        "fr": "Fiche Technique",
        "en": "Technical Specs"
    },
    "avis":{
        "fr": "Avis Communauté",
        "en": "Community Reviews"
    },
    "buy":{
        "fr": "Acheter - PLACEHOLDER€",
        "en": "Buy online - $PLACEHOLDER"
    }
};



exports.getLang = () => {
    return lang;
  }

  exports.setLang = (lan) => {
    lang=lan;
  }

  exports.get = (mark,ph=false) => {
      if(ph!==false){
        return strings[mark][lang].replace(/PLACEHOLDER/, ph);  
      }
      else
        return strings[mark][lang];
  }