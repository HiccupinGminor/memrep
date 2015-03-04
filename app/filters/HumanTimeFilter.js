app.filter('humanTime', function() {
    return function(input) {
        var now, timeNow, timeToReview, minute, hour, day, pretty;
        
        timeNow = Date.now();
        timeToReview = input - timeNow;

        if(timeToReview < 0) {
            timeToReview = 0;
        }

        minute = 60 * 1000;
        hour = 60 * minute;
        day = 24 * hour;

        if(timeToReview >= minute && timeToReview < hour) {
            var minutes = Math.ceil(timeToReview / minute);

            pretty = minutes + " minutes";
        }
        else if(timeToReview >= hour && timeToReview < day){
            var hours = Math.ceil(timeToReview / hour);

            pretty = hours + " hours";
        }
        else if(timeToReview >= day) {
            var days = Math.ceil(timeToReview / day);

            pretty = days + " days";
        }
        return pretty;
    };
});