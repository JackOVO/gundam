(function() {
  'use strict';

  angular
    .module('gundam.roles')
    .factory('rolesService', rolesService);

  rolesService.$inject = ['dataService', 'rolesBean'];
  function rolesService(dataService, rolesBean) {
    var service = {
      'get': getRolesByCode,
      'del': delRolesByCode,
      'getFnList': getFnList,
      'getList': getRolesList,
      'getAll': getAllRolesList,
      'add': addRoles
    };
    var priv = {
      listAction: 'list',
      pageSize: 10
    };
    return service;

    function addRoles(roles) {
      var params = {
        'action': 'add',
        'funcCode': roles.funcCode,
        'roleName': roles.name,
        'desc': roles.desc
      };

      return dataService.get('roles', params)
        .then(function(source) {
          return source;
        });
    }

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
     * 获取全局的角色
     * @return {[type]} [description]
     */
    function getAllRolesList() {
      var params = {'action': 'simpleList'};

      return dataService.get('roles', params)
        .then(function(source) {
          //if (!source) { return null; }
          return source;
        });
    }

    // 获取功能方法
    function getFnList() {
      var params = {
        'action': 'newRole'
      };

      return dataService.get('object', params)
        .then(function(source) {
          return source;
        });
    }

    /**
     * 删除角色信息
     * @param  {String} code 角色id
     * @return {Promise} 承诺
     */
    function delRolesByCode(code) {
      var params = {'roleCode': code, 'action': 'delete'};

      return dataService.get('roles', params)
        .then(function(source) {
          if (!source) {
            console.error('删除角色失败!', source, code);
          }
          return source;
        });
    }

    /**
     * 获取角色信息根据code
     * @param  {String} code 角色code
     * @return {Promise} 承诺
     */
    function getRolesByCode(code) {
      var params = {'roleCode': code, 'action': 'detail'};

      return dataService.get('roles', params)
        .then(function(source) {
          if (!source) {
            console.error('获取角色失败!', source, code);
          }
          //var roles = rolesBean.parse(source);
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
      angular.forEach(source.roleInfoBOLst, function(val, key) {
        var roles = rolesBean.parse(val);
        result.list.push(roles);
      });
      result.count = source.pageCount;
      return result;
    }
  }

})();