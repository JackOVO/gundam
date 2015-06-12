(function() {
  'use strict';

  angular
    .module('gundam.user')
    .controller('userCtrl', userCtrl);

  userCtrl.$inject = [];
  function userCtrl() {
    // $scope.pageNum = $stateParams.num;
    // var that = this;
    // that.num = 1;
    // that.list = [];
    // that.count = 0;
    // that.colHead = rolesService.keys;

    // that.gogo = function gogo(pageNum) {
    //   $state.go('home.layout', {module: 'roles', num: pageNum});
    // };

    // $scope.$watch('pageNum', function(pageNum) {
    //   if(pageNum) { that.num = pageNum; }

    //   rolesService.getList(that.num).then(function(result) {
    //     that.list = result.list;
    //     that.count = result.count;
    //   });
    // });
  }
})();