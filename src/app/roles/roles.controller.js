(function() {
  'use strict';

  angular
    .module('gundam.roles')
    .controller('rolesCtrl', rolesCtrl);

  rolesCtrl.$inject = ['$scope', '$stateParams', 'rolesService'];
  function rolesCtrl($scope, $stateParams, rolesService) {
    $scope.pageNum = $stateParams.num;
    var that = this;
    that.num = 1;
    that.list = [];
    that.count = 0;

    $scope.$watch('pageNum', function(pageNum) {
console.info('num', pageNum);
      if(pageNum) { that.num = pageNum; }

      rolesService.getList(that.num).then(function(result) {
        that.list = result.list;
        that.count = result.count;
      });
    });
  }
})();