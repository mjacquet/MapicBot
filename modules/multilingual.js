var lang = process.env.LANGUAGE;
var strings={
    "hello":{
        "fr":"Bonjour PLACEHOLDER, comment puis-je vous aider?",
        "en":"Hello PLACEHOLDER, how may I help you?"
    },
    "lookingforrestaurants":{
        "fr":"Je cherche le restaurant parfait pour vous! ",
        "en":"I am looking for the perfect place for you!"
    },
    "menu":{
        "fr": "Menu du jour",
        "en": "Menu"
    },
    "book":{
        "fr": "Réserver",
        "en": "Book"
    },
    "map":{
        "fr": "S'y rendre",
        "en": "Directions"
    },
    "nbpax":{
        "fr": "Combien de convives?",
        "en": "How many people?"
    },
    "timing":{
        "fr": "Pour quand souhaitez-vous réserver?",
        "en": "When would like a table?"
    },
    "confirm":{
        "fr": "Merci! Nous vous attendons avec impatience. Voici le chemin pour venir à nous.",
        "en": "Thanks, we are eager to see you there! Here is a map to come to us."
    },
    "community":{
        "fr": "Avis utilisateurs",
        "en": "Reviews"
    },
    "locale":{
        "fr": "fr_FR",
        "en": "en_US"
    },
    "currency":{
        "fr": "EUR",
        "en": "USD"
    },
    "shipto":{
        "fr": {
            "street_1":"6 rue Daguerre",
            "city":"Paris",
            "postal_code":"75014",
            "state":"Ile-De-France",
            "country":"FR"
          },
        "en": {
            "street_1":"747 Howard St",
            "city":"San Francisco",
            "postal_code":"94103",
            "state":"California",
            "country":"US"
          }
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