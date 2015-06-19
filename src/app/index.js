(function() {
  'use strict';

  angular
    .module('gundam', ['ui.router', 'ngResource', 'ngSanitize', 'ui.bootstrap',
      'gundam.core', 'gundam.directives',
      'gundam.roles', 'gundam.groups',
      'gundam.user'])
    .config(appConfig);

    appConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function appConfig ($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'app/core/layout.html',
          controller: 'LayoutCtrl as ly'
        })
        .state('home.layout', {
          url: ':module/:num',
          templateUrl: function(stateParams) {
            var module = stateParams.module;
            return 'app/' + module + '/' + module + '.html';
          },
          controllerProvider: ['$stateParams', '$timeout', 'layoutService',
            function($stateParams, $timeout, layoutService) {
              var module = $stateParams.module;
              $timeout(function() {
                layoutService.selectModule(module);
              }, 100);
              return $stateParams.module + 'Ctrl as vm';
            }]
        });

      $urlRouterProvider.otherwise('/');
    }
})();







// (function() {
//   'use strict';

//   angular
//     .module('gundam', ['ui.router', 'ngResource', 'ngSanitize'])
//     .value('coreCF', {
//       urlMap: {
//         'character': 'www.baiud.com'
//       }
//     })
//     .config(appConfig);
    

//   appConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
//   function appConfig ($stateProvider, $urlRouterProvider) {
// alert(1);
//     // $stateProvider
//     //   .state('home', {
//     //     url: '/',
//     //     templateUrl: 'app/core/layout.html',
//     //     controller: 'LayoutCtrl as ly'
//     //   })
//     //   .state('home.layout', {
//     //     url: ':module',
//     //     templateUrl: function(stateParams) {
//     //       var module = stateParams.module;
//     //       return 'app/'+ module +'/'+ module +'.html';
//     //     }/*,
//     //     controllerProvider: ['$stateParams', '$timeout', 'layoutService',
//     //       function($stateParams, $timeout, layoutService) {
//     //         var module = $stateParams.module;
//     //         $timeout(function() {
//     //           layoutService.selectModule(module);
//     //         }, 100);
//     //     }]*/
//     //   });

//     //  $urlRouterProvider.otherwise('/');

//   }
// })();


