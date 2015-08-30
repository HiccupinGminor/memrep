app.factory('QuizCards', function(Cards){

	function isCardDue(card) {
		now = Date.now();
		return card.nextReview <= now || typeof card.nextReview == 'undefined';
	}

	return {
		getAll: function() {
      var filtered;

      return Cards.getCards().then(function(cards) {
      	filtered = cards.filter(isCardDue);

      	return filtered;
      });
		}
	};
});
