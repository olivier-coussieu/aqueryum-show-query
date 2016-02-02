'use strict';

var path_name = location.pathname;
var app_name = (path_name) ? path_name.split('/')[1] : "";
var aShowQApp = angular.module('aShowQApp', ['ngRoute']);

aShowQApp.config(function ($routeProvider) {
    $routeProvider.when('/list',            {templateUrl: 'view/list.html',     controller: 'DancerListCtrl'});
    $routeProvider.otherwise({redirectTo: '/list'});
});

aShowQApp.run(function ($rootScope, $location) {
    $rootScope.location = $location;
});

