(function () {
    'use strict';

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

    function Plugin () {
      global.add('cherry-word', function plugin(editor) {
        editor.ui.registry.addToggleButton('ch-word', {
          tooltip: 'Word',
          icon: 'word',
          onAction: function () {
            var filePickerCallback = editor.getParam('file_picker_callback');
            if (filePickerCallback) {
              filePickerCallback(function (data) {
                var res = data.match(/<body>([\S\s]*)<\/body>/);
                if (res) {
                  var dom = document.createElement('div');
                  dom.innerHTML = res[1];
                  editor.insertContent(dom.outerHTML);
                }
              }, '', { filetype: 'word' });
            }
          }
        });
      });
    }

    Plugin();

}());
