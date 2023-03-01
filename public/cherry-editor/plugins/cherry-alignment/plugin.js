(function () {
    'use strict';

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

    function Plugin () {
      global.add('cherry-alignment', function (editor) {
        editor.ui.registry.addSplitButton('ch-alignment', {
          icon: 'align-left',
          tooltip: 'Alignment',
          presets: 'listpreview',
          columns: 3,
          onAction: function () {
            return editor.execCommand('JustifyLeft');
          },
          fetch: function (callback) {
            var items = [
              {
                type: 'choiceitem',
                icon: 'align-left',
                value: 'alignleft'
              },
              {
                type: 'choiceitem',
                icon: 'align-center',
                value: 'aligncenter'
              },
              {
                type: 'choiceitem',
                icon: 'align-right',
                value: 'alignright'
              }
            ];
            callback(items);
          },
          onItemAction: function (_splitButtonApi, value) {
            if (value === 'alignleft') {
              return editor.execCommand('JustifyLeft');
            }
            if (value === 'aligncenter') {
              return editor.execCommand('JustifyCenter');
            }
            return editor.execCommand('JustifyRight');
          }
        });
      });
    }

    Plugin();

}());
