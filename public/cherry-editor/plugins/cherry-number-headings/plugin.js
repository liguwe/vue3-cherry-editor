(function () {
    'use strict';

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

    var global$1 = tinymce.util.Tools.resolve('tinymce.util.Delay');

    function Plugin () {
      global.add('cherry-number-headings', function plugin(editor) {
        var toggleState = false;
        editor.ui.registry.addToggleButton('ch-number-headings', {
          tooltip: 'Number Headings',
          icon: 'number-headings',
          onAction: function () {
            toggleState = !toggleState;
            editor.fire('NumberHeadingsToggleStateChange');
          },
          onSetup: function (api) {
            var doNumberHeadings = function () {
              var $ = editor.$;
              if (toggleState) {
                var ids_1 = [];
                $('h1,h2,h3,h4').each(function () {
                  var level = Number(this.nodeName[1]);
                  if (ids_1.length >= level) {
                    ids_1[level - 1]++;
                  } else {
                    ids_1.push(1, 1, 1, 1);
                  }
                  ids_1.length = level;
                  var obj = $(this).find('.nh-number');
                  if (obj.length > 0) {
                    var preContent = obj.text().replace(/^\s*(\d\.?)+\s?/, '');
                    $(this).prepend(preContent);
                  }
                  $(this).prepend('<span class="nh-number">' + ids_1.join('.') + '. </span>');
                  obj.remove();
                });
              } else {
                $('span.nh-number').remove();
              }
            };
            var toggleStateChangeHandler = function () {
              api.setActive(toggleState);
              doNumberHeadings();
            };
            var contentChangeHandler = global$1.debounce(function () {
              var newToggleState = editor.$('span.nh-number').length > 0;
              if (newToggleState !== toggleState) {
                toggleState = newToggleState;
                editor.fire('NumberHeadingsToggleStateChange');
              }
            });
            editor.on('NumberHeadingsToggleStateChange', toggleStateChangeHandler);
            editor.on('LoadContent SetContent input', contentChangeHandler);
            return function () {
              editor.off('NumberHeadingsToggleStateChange', toggleStateChangeHandler);
              editor.off('LoadContent SetContent input', contentChangeHandler);
            };
          }
        });
      });
    }

    Plugin();

}());
