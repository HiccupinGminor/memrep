app.factory('Cards', function(ChromeStorage) {

    var cardPrefix = 'mc-';

    function cardMatch(card1, card2) {
        if(card1.front == card2.front && card1.back == card2.back) {
            return true;
        }
        return false;
    }

    function stripPrefix(string) {

        return string.replace(cardPrefix, '');
    }

    function addPrefix(string) {

        return cardPrefix + string;
    }

    var obj =  {

        getCards: function() {
          return ChromeStorage.all().then(function(items) {
            var re = '^' + cardPrefix;
            var results = [];
            var strippedKey;
            var obj;

            for (key in items) {
              if (key.match(re) != null) {
                strippedKey = stripPrefix(key);
                obj = items[key];
                obj.front = strippedKey;
                results.push(items[key]);
              }
            }

            return results;
          });
        },

        addCard: function(newCard) {
          // TODO verify newCard is in proper format
          newCard.streak = newCard.streak || 0;
          newCard.nextReview = newCard.nextReview || 0;

          return ChromeStorage.set(addPrefix(newCard.front), newCard);
        },

        findCard: function(key) {
            return ChromeStorage.get(addPrefix(key));
        },

        deleteCard: function(key) {
            return ChromeStorage.delete(addPrefix(key));
        },

        updateCard: function(card) {
            //Replace existing card with new one
            return obj.deleteCard(addPrefix(card.front)).then(function(){
              return obj.addCard(card);
            });
        },
    };

    return obj;
});