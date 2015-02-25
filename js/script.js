var app = angular.module('app', ['LocalStorageModule']);

app.controller('NewCardController', function($scope, Cards){

	$scope.newCard = {};

	$scope.addCard = function() {

		$scope.$parent.cards = Cards.addCard($scope.newCard);

		$scope.newCard = '';
	};
});

app.controller('CardListController', function($scope, Cards){

	$scope.cards = Cards.getCards();

	$scope.deleteCard = function(card) {
		var cards = Cards.deleteCard(card);

		$scope.cards = cards;
	};
});

app.controller('QuizController', function($scope, Cards, Quizzer, $timeout) {

	$scope.reviewIndex = 0;
	$scope.reviewMode = false;
	$scope.currentTime = Date.now();

	$scope.greaterThan = function(val, prop) {
	    return function(item){
			return val > item[prop];
	    };
	};

	var tick = function() {
		$scope.currentTime = Date.now();
		$scope.$apply(); //Re renders the templates / filters
		console.log("HERE");
		$timeout(tick, 1000);
	};

	$scope.skipCard = function() {

		nextCard();
	};

	function nextCard() {

		$scope.reviewMode = false;

		var numCards = $scope.$parent.cards.length;

		if($scope.reviewIndex >= numCards - 1)
		{
			$scope.reviewIndex = 0;
		}
		else 
		{
			$scope.reviewIndex += 1;
		}		
	}

	$scope.flipCard = function() {
		$scope.reviewMode = !$scope.reviewMode;
	};

	$scope.markCorrect = function(card) {
		var storedCard = Cards.findCard(card);
		var newStreak = parseInt(storedCard.streak) + 1;

		var nextReview = Quizzer.nextReviewTime(newStreak);
		Cards.updateCard(card, {streak: newStreak, nextReview: nextReview});
		nextCard();
	};

	$scope.markWrong = function(card) {
		var storedCard = Cards.findCard(card);
		var newStreak = parseInt(storedCard.streak) - 1;
		
		if(newStreak < 0)
			newStreak = 0;

		var nextReview = Quizzer.nextReviewTime(newStreak);
		Cards.updateCard(card, {streak: newStreak, nextReview: nextReview});
		nextCard();
	};

	$timeout(tick, 1000);
});

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

app.factory('Quizzer', function(){
	return {
		nextReviewTime: function(streak) {
			var now = Date.now();

			if(streak === 0) { //Review in 5 minutes
				// return now + (5 * 60 * 1000);

			}
			else if(streak == 1) { //Review in 10 minutes
				// return now + (10 * 60 * 1000);
			}
			else if(streak == 2) { //Review in 60 minutes
				// return now + (60 * 60 * 1000);
			}
			else if(streak == 3) { //Review in 24 hours
				// return now + (24 * 60 * 60 * 1000);
			}
			else { //Review in 48 hours
				// return now + (48 * 60 * 60 * 1000);
			}
			return now + (6 * 1000);
		}
	};
});