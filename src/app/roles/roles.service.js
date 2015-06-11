(function() {
  'use strict';

  angular
    .module('gundam.roles')
    .factory('rolesService', rolesService);

  rolesService.$inject = ['dataService', 'rolesBean'];
  function rolesService(dataService, rolesBean) {
    var service = {
      'getList': getRolesList
    };
    var priv = {
      listAction: 'list',
      pageSize: 1
    };
    return service;

    /**
     * 获取角色列表并进行转换后返回
     * @param  {Number} pageNum 页码
     * @return {Promise} 承诺
     */
    function getRolesList(pageNum) {
      var params = {
        'pn': pageNum,
        'ps': priv.pageSize,
        'action': priv.listAction
      };

      return dataService.get('roles', params)
        .then(function(source) {
          if (!source) { return null; }
          return parseList(source);
        });
    }

    /**
     * 后转前列表结果
     * @param  {Object} source 后台列表源数据
     * @return {Object} {'list': [], count: 0}
     */
    function parseList(source) {
      var result = {'list': [], count: 0};
      angular.forEach(source.roleInfoBOLst, function(val, key) {
        var roles = rolesBean.parse(val);
        result.list.push(roles);
      });
      result.count = source.pageCount;
      return result;
    }
  }

})();