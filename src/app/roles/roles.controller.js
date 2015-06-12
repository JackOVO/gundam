(function() {
  'use strict';

  angular
    .module('gundam.roles')
    .controller('rolesCtrl', RolesCtrl);

  RolesCtrl.$inject = ['$state', '$scope', '$stateParams', 'rolesService'];
  function RolesCtrl($state, $scope, $stateParams, rolesService) {
    $scope.pageNum = $stateParams.num;
    var that = this;
    that.num = 1;
    that.list = [];
    that.count = 0;
    that.colHead = rolesService.keys;

    that.gogo = function gogo(pageNum) {
      $state.go('home.layout', {module: 'roles', num: pageNum});
    };

    $scope.$watch('pageNum', function(pageNum) {
      if(pageNum) { that.num = pageNum; }

      rolesService.getList(that.num).then(function(result) {
        that.list = result.list;
        that.count = result.count;
      });
    });
  }
})();