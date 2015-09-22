app.factory('Cards', function(StorageService) {

    function cardMatch(card1, card2) {
        if(card1.front == card2.front && card1.back == card2.back) {
            return true;
        }
        return false;
    }

    var obj =  {

        getCards: function() {
          return StorageService.all().then(function(items) {
            return items;
          });
        },

        addCard: function(newCard) {
          // TODO verify newCard is in proper format
          newCard.streak = newCard.streak || 0;
          newCard.nextReview = newCard.nextReview || 0;

          return StorageService.set(newCard.front, newCard);
        },

        findCard: function(key) {
            return StorageService.get(key);
        },

        deleteCard: function(key) {
            return StorageService.delete(key);
        },

        updateCard: function(card) {
            //Replace existing card with new one
            var newCard = {front: card.front, back: card.back};
            newCard.streak = card.streak || 0;
            newCard.nextReview = card.nextReview || 0;

            return obj.deleteCard(card.front).then(function(){
              return obj.addCard(newCard);
            });
        },
    };

    return obj;
});