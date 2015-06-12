(function() {
  'use strict';

  angular
    .module('gundam.core')
    .controller('LayoutCtrl', LayoutCtrl);

  LayoutCtrl.$inject = ['$scope', '$state', 'layoutService', 'coreCF'];
  function LayoutCtrl($scope, $state, layoutService, config) {
    var that = this;
    that.selected = null;
    that.modules = layoutService.getModules();
    that.switching = function(key) { $state.go('home.layout', {module: key, num: 1}); };

    var spk = config.spreadKey;

    $scope.$on(spk.selectedModuleKeyChange, function(e, moduleKey) {
that.selected = moduleKey;
    });

  }

})();

// http://localhost:8080/DFinderManagementSystem/roles?action=add&roleName=%E6%B5%8B%E8%AF%95&roleDesc=%E6%B5%8B%E8%AF%95&funcCode=20001,20002