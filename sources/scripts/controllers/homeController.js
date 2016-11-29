app.controller('homeController', function($scope, $rootScope) {
    $scope.colorPallete = ['#3AF2C9', '#F23A3A', '#983AF2'];
    $scope.backgroundColor = $scope.colorPallete[Math.floor(Math.random() * $scope.colorPallete.length)];

    var $title = angular.element(document.getElementsByClassName('title'));
    var splitted = $title.text().split('');

    $title.text('');

    for (var i = 0; i < splitted.length; i++) {
        $title.append('<span style="width: ' + 100 / splitted.length + '%">' + splitted[i] + '</span>');
    };

    for (var i = 0; i < 100; i++) {
        angular.element(document.getElementsByClassName('wrapper')).append('<div class="tile"></div>');
    };

    setTimeout(function () {
        angular.forEach(angular.element($title.find('span')), function(value, key){
            var a = angular.element(value);
            a.css('top', Math.floor(Math.random() * 90) + 1 + '%');
        });
    }, 1000);

    $scope.animate = function () {
        var $tiles = angular.element(document.getElementsByClassName('tile'));
        $tiles.addClass('active');

        setTimeout(function () {
            $scope.$apply(function () {
                $scope.backgroundColor = $scope.colorPallete[0];
            });

            $tiles.removeClass('active');
        }, 1500);
    };
});
