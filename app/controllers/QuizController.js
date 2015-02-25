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