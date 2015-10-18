angular.module('quizApp')

.filter('groupByCustomField', function($parse) {
    var dividers = {};

    return function(input,fieldName){
        if(!input) return input;

        var output = [],
            previousValue,
            currentValue;

            for (var i = 0, ii = input.length; i < ii && (item = input[i]); i++) {
                currentValue = item[fieldName];

                if (!previousValue ||
                    previousValue != currentValue) {

                    var dividerId = item[fieldName];

                    if (!dividers[dividerId]) {
                        dividers[dividerId] = {
                            isDivider: true,
                            _id: dividerId,
                            divider: item[fieldName]
                        };
                    }

                    output.push(dividers[dividerId]);
                }

                output.push(item);
                previousValue = currentValue;
            }
        return output;
    }
});