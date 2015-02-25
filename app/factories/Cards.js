app.factory('Cards', function(localStorageService) {

    function cardMatch(card1, card2) {
        if(card1.front == card2.front && card1.back == card2.back) {
            return true;
        }
        return false;
    }

    return {
        getCards: function() {
            return localStorageService.get('cards') || [];
        },

        addCard: function(newCard) {
            var cards;

            newCard.streak = newCard.streak || 0;
            newCard.nextReview = newCard.nextReview || 0;

            cards = localStorageService.get('cards') || [];
            
            cards.push(newCard);

            localStorageService.set('cards', cards);

            return cards;
        },

        findCard: function(card) {
            cards = localStorageService.get('cards');

            for (var i = 0; i < cards.length; i++) {
                if(cardMatch(cards[i], card)) {
                    return cards[i];
                }
            }

            return false;           
        },

        deleteCard: function(card) {
            var cards;

            cards = localStorageService.get('cards');

            cards.forEach(function(value, index, array) {

                if(cardMatch(value, card)) {
                    array.splice(index, 1);
                }
            });

            localStorageService.set('cards', cards);

            return cards;           
        },

        updateCard: function(card, updates) {
            var storedCard = this.findCard(card);
            if(storedCard) {
                //Execute update
                for(var key in storedCard) {
                    storedCard[key] = updates[key] || storedCard[key];
                }
                //Replace existing card with new one
                this.deleteCard(storedCard);

                return this.addCard(storedCard);
            }
            else return false;
        },
    };
});