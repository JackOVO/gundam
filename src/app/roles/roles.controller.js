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
        scope: $scope, backdrop: true, size: 'sm',
        templateUrl: 'app/template/alert.html'
      });
      $scope.title = '角色删除';
      $scope.message = '你确认删除-' + name + '-角色吗?';
      $scope.cancel = function(){ modal.close(); };
      $scope.confirm = function(){ delRoles(code); $scope.cancel(); }
    };

    that.detail = function(code) {
      getRoles(code).then(function(source) {
        $scope.source = source;
      }); 
      var modal = $modal.open({
        scope: $scope, backdrop: true, size: 'sm',
        templateUrl: 'app/template/rolesinfo.html'
      });

      $scope.title = '角色详情';
      $scope.cancel = function(){ $scope.source = null; modal.close(); };
      $scope.confirm = null;
    };

    that.add = function() {
      $scope.roles = {};
      $scope.roles.name = '';
      $scope.roles.desc = '';
      $scope.roles.funcCode = [];
      $scope.checkFn = function(fn) {
        //fn.functionCode;
        fn.isChoosed = !fn.isChoosed;
        if(fn.isChoosed === true) {
          $scope.roles.funcCode.push(fn.functionCode);
        } else {
          var index = $scope.roles.funcCode.indexOf(fn.functionCode);
          $scope.roles.funcCode.splice(index, 1);
        }
      };

      // 获取方法
      rolesService.getFnList().then(function(fnlist) { $scope.fns = fnlist; });
      var modal = $modal.open({
        scope: $scope, backdrop: true, size: 'sm',
        templateUrl: 'app/template/rolesadd.html'
      });
      $scope.title = '添加角色';

      $scope.cancel = function(){ modal.close(); };
      $scope.confirm = function(){
        modal.close();
        rolesService.add($scope.roles)
          .then(function() {
            getRolesList(that.num);
          });
      };
    };

    that.gogo = function gogo(pageNum) {
      $state.go('home.layout', {module: 'roles', num: pageNum});
    };

    $scope.$watch('pageNum', function(num){ getRolesList(num); });

    // 根据页码获取角色, 当页无数据会向前移动
    function getRolesList(pageNum) {
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
          if(ok) { getRolesList(that.num); }
        });
    }

    // 回去角色信息并绑定
    function getRoles(code) {
      return rolesService.get(code)
        .then(function(source) {
          if(source) { return source; }
        });
    }
  }
})();