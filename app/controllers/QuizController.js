app.controller('QuizController', function($scope, Cards, Quizzer, $timeout, QuizCards) {

    $scope.reviewIndex = 0;
    $scope.reviewMode = false;
    $scope.currentTime = Date.now();

    QuizCards.getAll().then(function(cards) {
      $scope.quizCards = cards;
    });

    var tick = function() {

      $scope.currentTime = Date.now();

      QuizCards.getAll().then(function(cards) {
        $scope.quizCards = cards;
      });

      $scope.$apply(); //Re renders the templates
      $timeout(tick, 1000);
    };

    $scope.skipCard = function() {
      nextCard();
    };

    function nextCard() {

      $scope.quizCards = QuizCards.getAll().then(function(cards) {
        $scope.quizCards = cards;

        $scope.reviewMode = false;

        var numCards = $scope.quizCards.length;

        if($scope.reviewIndex >= numCards - 1)
        {
            $scope.reviewIndex = 0;
        }
        else 
        {
            $scope.reviewIndex += 1;
        }    
      });
    }

    $scope.flipCard = function() {
      $scope.reviewMode = !$scope.reviewMode;
    };

    $scope.markCorrect = function(card) {
      Cards.findCard(card.front).then(function(storedCard) {
        var newStreak = parseInt(storedCard.streak) + 1;
        var nextReview = Quizzer.nextReviewTime(newStreak);

        storedCard.nextReview = nextReview;
        storedCard.streak = newStreak;

        Cards.updateCard(storedCard).then(function() {        
          nextCard();
        });
      });        
    };

    $scope.markWrong = function(card) {
      Cards.findCard(card.front).then(function(card) {
        var newStreak = parseInt(card.streak) - 1;

        if(newStreak < 0) {
          newStreak = 0;
        }

        card.nextReview = Quizzer.nextReviewTime(newStreak);
        card.streak = newStreak;

        Cards.updateCard(card).then(function() {
          nextCard();
        });
      });
    };

    $timeout(tick, 1000);
});