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
    },
    "shipchoice":{
        "fr": "Le PLACEHOLDER. Très bon choix. Voilà ses caractéristiques:",
        "en": "The PLACEHOLDER. Very good choice. Here are its detailed specs:"
    },
    "einstein":{
        "fr": "Laissez-moi analyser cette photo avec Salesforce Einstein Vision Service...",
        "en": "Let me analyse this picture with Einstein Vision..."
    },
    "norec":{
        "fr": "Je ne reconnais pas ce vaisseau. Merci de réessayer.",
        "en": "I do not recognize this spaceship. Please try again."
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