(function() {
  'use strict';

  angular
    .module('gundam', [
      'ui.router',
      'ngResource',
      'ngSanitize',
      'gundam.core'])
    .config(appConfig);

  appConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function appConfig ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/orz',
        templateUrl: 'app/core/layout.html',
        controller: 'IndexCtrl as vm'
      })
      .state('home.layout', {
        url: '/:module',
        templateUrl: function(stateParam) {
          console.info(stateParam);
        },
        controller: 'IndexCtrl as vm'
      })
      /*.state('home.character', {
        url: '/character',
        templateUrl: 'app/character/character.html'
      });*/

    $urlRouterProvider.otherwise('/orz');

  }
})();


