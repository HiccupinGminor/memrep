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