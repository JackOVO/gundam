(function() {
  'use strict';

  angular
    .module('gundam.roles')
    .controller('rolesCtrl', RolesCtrl);

  RolesCtrl.$inject = ['$state', '$scope', '$stateParams', '$modal', 'rolesService'];
  function RolesCtrl($state, $scope, $stateParams, $modal, rolesService) {
    $scope.pageNum = $stateParams.num;
    var that = this;
    that.num = 1;
    that.list = [];
    that.count = 0;
    that.colHead = rolesService.keys;

    that.del = function(code, name) {
      var modal = $modal.open({
        templateUrl: 'app/template/alert.html',
        scope: $scope
      });

      $scope.message = '你确认删除-' + name + '-角色吗?';
      $scope.cancel = function(){ modal.close(); };
      $scope.confirm = function(){ delRoles(code); $scope.cancel(); }
    };
    that.gogo = function gogo(pageNum) {
      $state.go('home.layout', {module: 'roles', num: pageNum});
    };

    $scope.$watch('pageNum', function(num){ getRoles(num); });

    // 根据页码获取角色, 当页无数据会向前移动
    function getRoles(pageNum) {
      if(pageNum) { that.num = pageNum; }

      rolesService.getList(pageNum).then(function(result) {
        that.list = result.list;
        that.count = result.count;

        // 本页无数据情况
        if (!that.list.length && !result.count && pageNum !== 1) {
          getRoles(pageNum - 1);
        }
      });
    }

    // 删除角色信息
    function delRoles(code) {
      rolesService.del(code)
        .then(function(ok) {
          if(ok) { getRoles(that.num); }
        });
    }
  }
})();