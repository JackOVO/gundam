(function() {
  'use strict';

  angular
    .module('gundam.groups')
    .controller('groupsCtrl', GroupsCtrl);

  GroupsCtrl.$inject = ['$state', '$scope', '$modal', '$stateParams', 'rolesService', 'groupsService'];
  function GroupsCtrl($state, $scope, $modal, $stateParams, rolesService, groupsService) {
    $scope.pageNum = $stateParams.num;
    var that = this;
    that.num = 1;
    that.list = [];
    that.count = 0;


    that.detail = function(code) {
       var modal = $modal.open({
        scope: $scope, backdrop: true, size: 'sm',
        templateUrl: 'app/template/groupsinfo.html'
      });
      $scope.source = null;
      $scope.title = '群组详情';
      $scope.cancel = function(){ modal.close(); };

      groupsService.get(code)
        .then(function(source) {
          $scope.source = source;
        });
    };
    that.del = function(code, name) {
      var modal = $modal.open({
        scope: $scope, backdrop: true, size: 'sm',
        templateUrl: 'app/template/alert.html'
      });
      $scope.title = '群组删除';
      $scope.message = '你确认删除-' + name + '-群组吗?';
      $scope.cancel = function(){ modal.close(); };
      $scope.confirm = function(){
        delGroups(code);
        $scope.cancel();
      };
    }
    that.add = function() {

    }

    // 搜索所需
    $scope.isSearch = false;
    $scope.khtype = [{'code': 'TRIAL', 'name': 'TRIAL'}, {'code': 'NORMAL', 'name': 'NORMAL'}];
    $scope.roles = []; // 角色类型
    $scope.ser = {};
    rolesService.getAll().then(function(list) { $scope.roles= list; });

    that.gogo = function gogo(pageNum) {
      $state.go('home.layout', {module: 'groups', num: pageNum});
    };

    $scope.search = function() {
      console.info('s');
      that.gogo(1);
      getGroupsList(1);
    };

    $scope.clear = function() {
      $scope.ser = {};
      that.gogo(1);
      getGroupsList(1);
    };

    // 格式化事件
    $scope.formart = function data(time) {
      var ary = time.split(''), pk = ',';
      return ary[0] + ary[1] + ary[2] + ary[3] + pk + ary[4] + ary[5] + pk + ary[6] + ary[7];
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

    // 监听页码
    $scope.$watch('pageNum', function(pageNum) {
      if(pageNum) { that.num = pageNum; }
      getGroupsList(that.num);
    });

    // 获取组
    function getGroupsList(pageNum) {
      if ($scope.isSearch === false) {
        groupsService.getList(pageNum).then(function(result) {
          that.list = result.list;
          that.count = result.count;
        });
      } else {
        groupsService.search(that.num, $scope.ser).then(function(result) {
          that.list = result.list;
          that.count = result.count;
        });
      }
    }

    // 删除群组
    function delGroups(code) {
      groupsService.del(code)
        .then(function(ok) {
          if(ok!==true) { return; }
          groupsService.getList(that.num).then(function(result) {
            that.list = result.list;
            that.count = result.count;
          });
        });
    }
  }

})();