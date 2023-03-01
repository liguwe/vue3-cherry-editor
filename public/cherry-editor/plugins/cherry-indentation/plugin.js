(function () {
    'use strict';

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

    function Plugin () {
      global.add('cherry-indentation', function plugin(editor) {
        editor.ui.registry.addButton('ch-right-indentation', {
          icon: 'indent',
          tooltip: 'Right Indentation',
          onAction: function () {
            return editor.execCommand('indent');
          }
        });
        editor.ui.registry.addButton('ch-left-indentation', {
          icon: 'outdent',
          tooltip: 'Left Indentation',
          onAction: function () {
            return editor.execCommand('outdent');
          }
        });
        editor.ui.registry.addSplitButton('ch-indentation', {
          icon: 'indent',
          tooltip: 'Indentation',
          presets: 'listpreview',
          columns: 2,
          onAction: function () {
            return editor.execCommand('indent');
          },
          fetch: function (callback) {
            var items = [
              {
                type: 'choiceitem',
                icon: 'indent',
                value: 'indent'
              },
              {
                type: 'choiceitem',
                icon: 'outdent',
                value: 'outdent'
              }
            ];
            callback(items);
          },
          onItemAction: function (_splitButtonApi, value) {
            if (value === 'indent') {
              return editor.execCommand('indent');
            }
            return editor.execCommand('outdent');
          }
        });
      });
    }

    Plugin();

}());
