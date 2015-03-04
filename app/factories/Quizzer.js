app.factory('Quizzer', function(){
    return {
        nextReviewTime: function(streak) {
            var minute, hour, day, week, month, now = Date.now();

            minute = 60 * 1000;
            hour = 60 * minute;
            day = 24 * hour;
            week = 7 * day;
            month = 30 * day;

            if(streak === 0) { //Review in 5 minutes
                return now + (5 * minute);
            }
            else if(streak == 1) { //Review in 10 minutes
                return now + (10 * minute);
            }
            else if(streak == 2) { //Review in 60 minutes
                return now + hour;
            }
            else if(streak == 3) { //Review in 24 hours
                return now + day;
            }
            else if(streak == 4) { //Review in 48 hours
                return now + (2 * day);
            }
            else if(streak == 5) { //Review in 1 week
                return now + week;
            }
            else { //Review in 1 month
                return now + month;
            }
        }
    };
});