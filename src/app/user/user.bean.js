(function() {
  'use strict';

  angular
    .module('gundam.user')
    .factory('userBean', userBean);

  var kvMap = [
    {'key': 'name', 'text': '名称'},
    {'key': 'time', 'text': '使用时间'},
    {'key': 'type', 'text': '类型'},
    {'key': 'roles', 'text': '角色'}
  ];

  function userBean() {
    var service = {
      'parse': parse,
      'kvMap': kvMap
    };
    return service;

    function User(code, name, type, desc, time, roles) {
      this.code = code;
      this.name = name;
      this.type = type;
      this.desc = desc;
      this.time = time;
      this.roles = roles;
    }

    /**
     * 后转前台实体
     * @param  {Object} source 后台源数据格式
     * @return {Roles} 前台角色实体
     */
    function parse(source) {
      var code = source.code;
      var name = source.name;
      var type = source.clientType;
      var desc = source.desc;
      var time = [source.startTime, source.endTime];
      var roles = source.roles;

      return new User(code, name, type, desc, time, roles);
    }
  }
})();