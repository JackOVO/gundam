(function() {
  'use strict';

  angular
    .module('gundam', [
      'ui.router',
      'ngResource',
      'ngSanitize'])
    .config(appConfig);

  appConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function appConfig ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/core/layout.html',
        //controller: 'SheetCtrl', // 绑定的试图完成事件, 会广播给大家
        //controllerAs: 'scvm'
      });

    $urlRouterProvider.otherwise('/');
  }
})();


