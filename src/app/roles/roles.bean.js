(function() {
  'use strict';

  angular
    .module('gundam.roles')
    .factory('rolesBean', rolesBean);

  function rolesBean () {
    var service = {
      'parse': parse
    };
    return service;

    function Roles(code, name, desc) {
      this.code = code;
      this.name = name;
      this.desc = desc;
    }

    /**
     * 后转前台实体
     * @param  {Object} source 后台源数据格式
     * @return {Roles} 前台角色实体
     */
    function parse(source) {
      var code = source.roleCode;
      var name = source.roleName;
      var desc = source.desc;

      return new Roles(code, name, desc);
    }
  }
})();
