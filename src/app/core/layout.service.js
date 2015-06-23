(function() {
  'use strict';

  angular
    .module('gundam.core')
    .factory('layoutService', layoutService);

  layoutService.$inject = ['$rootScope', 'coreCF'];
  function layoutService($rootScope, config) {
    var spk = config.spreadKey;
    var moduleAry = [
      {key: 'roles', name: '角色'},
      {key: 'groups', name: '群组'},
      //{key: 'subjection', name: '隶属'},
      {key: 'user', name: '用户'}
    ];

    var service = {
      'getModules': function() { return moduleAry; },
      'selectModule': selectModule
    };
    return service;

    /**
     * 选择一项模块
     * @param  {String} key 模块的key必需存在
     * @return {Object} 找到的模块 | 错误提示
     */
    function selectModule(key) {
      for (var i = 0, ilen = moduleAry.length; i < ilen; i++) {
        var module = moduleAry[i];
        if(module.key === key) {
          $rootScope.$broadcast(spk.selectedModuleKeyChange, key);
          return module;
        }
      }
      console.error('没有找到指定的moduleKey!');
    }
  }

})();