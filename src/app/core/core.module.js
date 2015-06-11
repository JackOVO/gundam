(function() {
  'use strict';

  angular
    .module('gundam.core', ['ngCookies'])
    .constant('coreCF', {
      baseUrl: 'http://192.168.1.57:8080/DFinderManagementSystem/',
      urlMap: {
        'roles': 'roles'
      },
      spreadKey: {
        'selectedModuleKeyChange': 'cmkc'
      }
    });

})();