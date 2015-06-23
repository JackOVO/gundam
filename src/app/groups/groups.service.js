(function(){
  'use strict';

  angular
    .module('gundam.groups')
    .factory('groupsService', groupsService);

  groupsService.$inject = ['groupsBean', 'dataService'];
  function groupsService(groupsBean, dataService) {
    var service = {
      'del': delGroups,
      'get': groupsDetail,
      'getList': getGroupsList,
      'search': searchGroupsList
    };
    var priv = {
      listAction: 'list',
      pageSize: 10
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

    function searchGroupsList(pageNum, p) {
      console.info(p);
      var params = {
        'action': 'search',
        'type': p.khtype && p.khtype.code,
        'name': p.name,
        'endDate': p.endDate,
        'roleCode': p.rltype && p.rltype.code,
        'startDate': p.startDate,
        'pn': pageNum,
        'ps': priv.pageSize,
      };

      return dataService.get('groups', params)
        .then(function(source) {
          if (!source) { return null; }
          return parseList(source);
        });
    }

    function groupsDetail(code) {
      var params = {'code': code, 'action': 'detail'};

      return dataService.get('groups', params)
        .then(function(source) {
          return source;
        });
    }

    function delGroups(code) {
      var params = {'code': code, 'action': 'delete'};

      return dataService.get('groups', params)
        .then(function(source) {
          return source;
        })
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