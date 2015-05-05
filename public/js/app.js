'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider) {
  // $routeProvider
  // 	.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'})
  // 	.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'})
  // 	.otherwise({redirectTo: '/view1'});

  $routeProvider
  	.when('/admin/login', {templateUrl: 'partials/admin/login.html', controller: 'AdminLoginCtrl'})
  	.when('/admin/pages', {templateUrl: 'partials/admin/pages.html', controller: 'AdminPagesCtrl'})
  	.when('/admin/manage-page/:id', {templateUrl: 'partials/admin/manage-page.html', controller: 'ManagePageCtrl'})
  	.otherwise({redirectTo: '/'});

  $locationProvider.html5Mode({
  	enabled: true,
  	requireBase: false
  });
}]);
