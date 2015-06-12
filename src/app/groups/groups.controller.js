(function() {
  'use strict';

  angular
    .module('gundam.groups')
    .controller('groupsCtrl', GroupsCtrl);

  GroupsCtrl.$inject = ['$state', '$scope', '$stateParams', 'groupsService'];
  function GroupsCtrl($state, $scope, $stateParams, groupsService) {
    $scope.pageNum = $stateParams.num;
    var that = this;
    that.num = 1;
    that.list = [];
    that.count = 0;
    that.colHead = groupsService.keys;

    that.gogo = function gogo(pageNum) {
      $state.go('home.layout', {module: 'groups', num: pageNum});
    };

    $scope.$watch('pageNum', function(pageNum) {
      if(pageNum) { that.num = pageNum; }

      groupsService.getList(that.num).then(function(result) {
        that.list = result.list;
        that.count = result.count;
      });
    });
  }

})();