(function() {
  'use strict';

  angular
    .module('gundam.directives')
    .directive('page', pageDirective);

  function pageDirective() {
    return {
      replace: true,
      scope: {'num': '=', 'count': '=', 'go': '&'},
      controller: function($scope) {
        var that = this;
        that.createPageNum = createPageNum;
        /**
         * 根据当前页码和总页数创建数组
         * @param  {Number} num 页码
         * @param  {Number} count 总数
         * @return {Array} 页码数组
         */
        function createPageNum(num, count) {
          var length = 9, index = 1, array = [];
          if (count <= length) { // 小于最大页码长度
            length = count;
          } else {
            index = num - window.parseInt(length / 2);
            if (index <= 0) { index = 1; }
            length = index + length - 1;
            if (length > count) { length = count; index = length - 9; }
          }

          for (;index <= length; index++) { array.push(index === num?''+index:index); }
          return array;
        }

      },
      templateUrl: 'app/directives/page.html',
      link: function(scope, element, attrs, ctrl) {
        var count = scope.count;
        var go = scope.go();

        scope.go = function(num) {
          console.info(num);
          if (num <= 0 || num > count) { return; }
          go(num);
        };

        scope.$watch('count', function(cNum) {
          // 重新得到页码
          scope.pageAry = ctrl.createPageNum(scope.num, cNum);
          count = cNum;
        });
      }
    };
  }
})();