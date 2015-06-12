(function() {
  'use strict';

  angular
    .module('gundam.directives')
    .directive('list', listDirective);

  listDirective.$inject = ['$sce'];
  function listDirective($sce) {
    return {
      replace: true,
      scope: {'colhead': '=', 'data': '='},
      controller: function($scope) {
        $scope.ruminant = function(item) {
          var html = createHTML(item, $scope.colhead);
          return $sce.trustAsHtml(html);
        };

        /**
         * 创建一行单元格
         * @param  {Object} item 一项数据
         * @param  {Array} colhead 列头表示
         * @return {String} 拼接的html
         */
        function createHTML(item, colhead) {
          var html = '';
          angular.forEach(colhead, function(head, key) {
            if (head.key) {
              html += '<td>'+ (item[head.key] || '空') +'</td>';
            } else if(head.html) {
              if(angular.isFunction) { html += '<td>' + head.html(item) + '</td>'; }
              else { html += '<td>' + head.html + '</td>'; }
            } else { html += '<td></td>'; }
          });
          return html;
        }
      },
      templateUrl: 'app/directives/list.html',
      link: function($scope) {

      }
    };
  }
})();