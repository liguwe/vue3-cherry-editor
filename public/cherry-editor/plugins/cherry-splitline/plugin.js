(function () {
    'use strict';

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

    function Plugin () {
      global.add('cherry-splitline', function plugin(editor) {
        editor.ui.registry.addButton('ch-splitline', {
          icon: 'splitline',
          tooltip: 'Split Line',
          onAction: function () {
            editor.insertContent('<div><hr></div>');
          }
        });
      });
    }

    Plugin();

}());
