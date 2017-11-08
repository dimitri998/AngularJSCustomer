'use strict';

/**
 * @ngdoc overview
 * @name angular15ComponentsAppApp
 * @description
 * # angular15ComponentsAppApp
 *
 * Main module of the application.
 */
angular
  .module('angular15ComponentsAppApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
