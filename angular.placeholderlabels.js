angular.module('placeholderlabels', [])
    .directive('placeholder', function () {
        return {
            link: function (scope, element, attrs) {
                element.placeholderlabels();

                // If the placeholder attribute was removed, we are in an old
                // browser that doesn't support placeholders, and so we need to
                // Watch the model so that buggy things like datepickers
                // actually trigger change events properly...
                !element.attr('placeholder') && attrs.ngModel && scope.$watch(attrs.ngModel, function (newValue) { 
                    element.trigger('input');
                });
            }
        }
    });