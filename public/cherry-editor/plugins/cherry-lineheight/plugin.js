(function () {
    'use strict';

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

    function Plugin () {
      global.add('cherry-lineheight', function plugin(editor) {
        var lineheightVal = editor.getParam('lineheight_val', '1 1.5 1.6 1.75 1.8 2 3');
        editor.on('init', function () {
          editor.formatter.register({
            lineheight: {
              selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table',
              styles: { 'line-height': '%value' }
            }
          });
        });
        var doAct = function (value) {
          editor.formatter.apply('lineheight', { value: value });
          editor.fire('change', {});
        };
        editor.ui.registry.addMenuButton('ch-lineheight', {
          icon: 'lineheight',
          tooltip: 'Line Spacing',
          fetch: function (callback) {
            var dom = editor.dom;
            var blocks = editor.selection.getSelectedBlocks();
            var lhv = 0;
            var isSetDefaultLhv = true;
            Array.prototype.forEach.call(blocks, function (block) {
              if (lhv === 0) {
                lhv = dom.getStyle(block, 'line-height') || dom.getStyle(block.parentNode, 'line-height') ? dom.getStyle(block, 'line-height') || dom.getStyle(block.parentNode, 'line-height') : 0;
              }
            });
            var items = lineheightVal.split(' ').map(function (item) {
              var text = item;
              var value = item;
              if (lhv) {
                isSetDefaultLhv = false;
              }
              return {
                type: 'togglemenuitem',
                text: text,
                active: lhv == value,
                onAction: function () {
                  doAct(value);
                }
              };
            });
            if (isSetDefaultLhv) {
              var lineheightDefaultVal_1 = editor.getParam('lineheight_default_value', '1');
              items.find(function (item) {
                return item.text == lineheightDefaultVal_1;
              }).active = true;
            }
            callback(items);
          }
        });
      });
    }

    Plugin();

}());
