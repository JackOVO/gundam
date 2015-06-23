(function() {
  'use strict';

  angular
    .module('gundam.user')
    .controller('userCtrl', userCtrl);

  userCtrl.$inject = ['$stateParams', '$modal', '$state', '$scope', 'rolesService', 'userService'];
  function userCtrl($stateParams, $modal, $state, $scope, rolesService, userService) {
    $scope.pageNum = $stateParams.num;
    var that = this;
    that.num = 1;
    that.list = [];
    that.count = 0;

     // 搜索所需
    $scope.isSearch = false;
    $scope.khtype = [{'code': 'TRIAL', 'name': 'TRIAL'}, {'code': 'NORMAL', 'name': 'NORMAL'}];
    $scope.roles = []; // 角色类型
    $scope.ser = {};
    rolesService.getAll().then(function(list) { $scope.roles= list; });

    that.del = function(code, name) {
     
      var modal = $modal.open({
        scope: $scope, backdrop: true, size: 'sm',
        templateUrl: 'app/template/alert.html'
      });
      $scope.title = '用户删除';
      $scope.message = '你确认删除-' + name + '-用户吗?';
      $scope.cancel = function(){ modal.close(); };
      $scope.confirm = function(){
        delUser(code);
        $scope.cancel();
      };
    };

    that.detail = function(code) {
      userService.get(code);
    };

    // 格式化事件
    $scope.formart = function data(time) {
      var ary = time.split(''), pk = ',';
      return ary[0] + ary[1] + ary[2] + ary[3] + pk + ary[4] + ary[5] + pk + ary[6] + ary[7];
    };

    that.gogo = function gogo(pageNum) {
      $state.go('home.layout', {module: 'user', num: pageNum});
    };

    // 监听搜索条件
    $scope.$watch('ser', function(ser) {
      $scope.isSearch = false;
      angular.forEach(ser, function(value, key) {
        if(value !== "") {
          $scope.isSearch = true;
        }
      });
    }, true);

    $scope.$watch('pageNum', function(pageNum) {
      if(pageNum) { that.num = pageNum; }

      userService.getList(that.num).then(function(result) {
        that.list = result.list;
        that.count = result.count;
      });
    });

    // 删除用户信息
    function delUser(code) {
      userService.del(code)
        .then(function(ok) {
          if(ok) { getUserList(that.num); }
        });
    }

    // 回去角色信息并绑定
    function getUserList(pageNum) {
      return userService.getList(pageNum)
        .then(function(result) {
          if(result) {
            that.list = result.list;
            that.count = result.count;
          }
        });
    }
  }
})();