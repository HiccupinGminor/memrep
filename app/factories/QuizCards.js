app.factory('QuizCards', function(Cards){

	function isCardDue(card) {
		now = Date.now();

		return card.nextReview <= now;
	}

	return {

		getAll: function() {
            var filtered, cards = Cards.getCards();

            filtered = cards.filter(isCardDue);

            return filtered;
		}
	};
});
