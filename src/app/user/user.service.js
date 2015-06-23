(function() {
  'use strict';

  angular
    .module('gundam.user')
    .factory('userService', userService);

  userService.$inject = ['userBean', 'dataService'];
  function userService(userBean, dataService) {
    var service = {
      'get': getUser,
      'del': deleteUser,
      'getList': getUserList
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
    function getUserList(pageNum) {
      var params = {
        'pn': pageNum,
        'ps': priv.pageSize,
        'action': priv.listAction
      };

      return dataService.get('user', params)
        .then(function(source) {
          if (!source) { return null; }
          return parseList(source);
        });
    }

    // 获取用户
    function getUser(code) {
      var params = {
        'action': 'detail',
        'usrCode': code
      };

      return dataService.get('user', params)
        .then(function(source) {
          return source;
        });
    }

    function searchUser(code, p) {
      var params = {
          'action': 'search',
          'type': p.type,
          'name': p.name,
          'endDate': p.endDate,
          'roleCode': p.roleCode,
          'startDate': p.startDate,
          'pn': pageNum,
          'ps': priv.pageSize,
      };

      // return dataService.get('groups', params)
      //   .then(function(source) {
      //     if (!source) { return null; }
      //     return parseList(source);
      //   });
    }

    // 删除
    function deleteUser(code) {
      var params = {
        'action': 'delete',
        'usrCode': code
      };

      return dataService.get('user', params)
        .then(function(source) {
          return source;
        });
    }

    /**
     * 后转前列表结果
     * @param  {Object} source 后台列表源数据
     * @return {Object} {'list': [], count: 0}
     */
    function parseList(source) {
      var result = {'list': [], count: 0};
      angular.forEach(source.userList, function(val, key) {
        var group = userBean.parse(val);
        result.list.push(group);
      });
      result.count = source.pageCount;
      return result;
    }

  }
})();