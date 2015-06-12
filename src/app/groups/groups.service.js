(function(){
  'use strict';

  angular
    .module('gundam.groups')
    .factory('groupsService', groupsService);

  groupsService.$inject = ['groupsBean', 'dataService'];
  function groupsService(groupsBean, dataService) {
    var service = {
      'getList': getGroupsList,
      'keys': createColHead()
    };
    var priv = {
      listAction: 'list',
      pageSize: 3
    };
    return service;

    /**
     * 获取群组列表并进行转换后返回
     * @param  {Number} pageNum 页码
     * @return {Promise} 承诺
     */
    function getGroupsList(pageNum) {
      var params = {
        'pn': pageNum,
        'ps': priv.pageSize,
        'action': priv.listAction
      };

      return dataService.get('groups', params)
        .then(function(source) {
          if (!source) { return null; }
          return parseList(source);
        });
    }

    /**
     * 创建列表头
     * @return {Array} 列表头
     */
    function createColHead() {
      var kvmap = groupsBean.kvMap;
      kvmap.push({
        'text': '功能',
        'html': function(role) {
          var html = '<a href="javascript:alert(0);" class="fna">详情</a>' + 
            '<a href="javascript:alert(1);" class="fna">删除</a>';
          return html;
        }
      });
      return kvmap;
    }

    /**
     * 后转前列表结果
     * @param  {Object} source 后台列表源数据
     * @return {Object} {'list': [], count: 0}
     */
    function parseList(source) {
      var result = {'list': [], count: 0};
      angular.forEach(source.userList, function(val, key) {
        var group = groupsBean.parse(val);
        result.list.push(group);
      });
      result.count = source.pageCount;
      return result;
    }

  }
})();