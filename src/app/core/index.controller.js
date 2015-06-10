(function() {
  'use strict';

  angular
    .module('gundam.core')
    .controller('IndexCtrl', IndexController);

  function IndexController($state, $scope, $rootScope, $stateParams) {
    $scope.param = $stateParams;
    var vm = this;
    vm.modules = [
      {key: 'character', name: '角色'},
      {key: 'groups', name: '群组'},
      {key: 'subjection', name: '隶属'},
      {key: 'user', name: '用户'}];
    vm.selected = null;
    vm.switching = switching;

    $scope.$watch('param', function(v) {
console.info(v);
// $state.go('home.character');
    });

    /**
     * 切换模块视图
     * @param  {String} moduleKey 模块名
     */
    function switching(moduleKey) {
      vm.selected = moduleKey;
      console.info('切换', moduleKey);
    }
  }
})();