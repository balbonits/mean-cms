'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'ui.tinymce',
  'ngCookies',
  'message.flash'
])
.config(['$routeProvider','$locationProvider','$httpProvider', function($routeProvider,$locationProvider,$httpProvider) {
  // $routeProvider
  // 	.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'})
  // 	.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'})
  // 	.otherwise({redirectTo: '/view1'});

  $routeProvider
  	.when('/admin/login', {templateUrl: 'partials/admin/login.html', controller: 'AdminLoginCtrl'})
  	.when('/admin/pages', {templateUrl: 'partials/admin/pages.html', controller: 'AdminPagesCtrl'})
  	.when('/admin/manage-page/:id', {templateUrl: 'partials/admin/manage-page.html', controller: 'ManagePageCtrl'})
    .when('/:url', {templateUrl: 'partials/page.html', controller: 'PageCtrl'})
  	.otherwise({redirectTo: '/home'});

  $locationProvider.html5Mode({
  	enabled: true,
  	requireBase: false
  });

  $httpProvider.interceptors.push('myHttpInterceptor');
}])
