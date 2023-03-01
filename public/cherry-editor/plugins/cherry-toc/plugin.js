(function () {
    'use strict';

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

    var global$1 = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');

    var global$2 = tinymce.util.Tools.resolve('tinymce.util.I18n');

    var create = function (prefix) {
      var counter = 0;
      return function () {
        var guid = new Date().getTime().toString(32);
        return prefix + guid + (counter++).toString(32);
      };
    };

    var tocId = create('chtoc_');
    var getTocClass = function (editor) {
      return editor.getParam('toc_class', 'toc');
    };
    var readHeaders = function (editor) {
      var headers = editor.$('h1,h2,h3,h4,h5,h6');
      var idMaps = {};
      var ret = [];
      for (var i = 0; i < headers.length; i++) {
        var h = headers[i];
        if (editor.$.text(h).trim().length <= 0) {
          continue;
        }
        var id = h.id;
        var hId = id ? id : 0;
        if (!id || idMaps[id]) {
          hId = tocId();
          h.setAttribute('id', hId);
        }
        idMaps[hId] = true;
        ret.push({
          id: hId,
          level: parseInt(h.nodeName.replace(/^H/i, ''), 10),
          title: editor.$.text(h),
          element: h
        });
      }
      return ret;
    };
    var getStartLevel = function (headers) {
      var minLevel = 9;
      for (var i = 0; i < headers.length; i++) {
        if (headers[i].level < minLevel) {
          minLevel = headers[i].level;
        }
      }
      return minLevel > 1 ? minLevel : 1;
    };
    var generateTocHtml = function (editor) {
      var html = '<p class="toc-title">' + global$1.DOM.encode(global$2.translate('Table of Contents')) + '</p>';
      var headers = readHeaders(editor);
      if (!headers.length) {
        return getTocLayout(editor, html);
      }
      var startLevel = getStartLevel(headers);
      for (var i = 0; i < headers.length; i++) {
        var h = headers[i];
        var spaces = '';
        for (var j = 0; j < h.level - startLevel; j++) {
          spaces += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
        }
        html += '<li class="toc-li">' + spaces + '<a class="level-' + h.level + '" href="#' + h.id + '">' + h.title + '</a></li>';
      }
      return getTocLayout(editor, html);
    };
    var getTocLayout = function (editor, html) {
      return '<div class="' + getTocClass(editor) + '" contenteditable="false">' + html + '</div>';
    };
    var insertToc = function (editor) {
      editor.insertContent(generateTocHtml(editor) + '<p></p>');
    };
    var testNeedChange = function (headersString, headers) {
      var index = 0;
      var needChange = false;
      var hasTest = false;
      headersString.replace(/<a class="level-(\d)" href="[^"]*?#(.*?)">(.*?)<\/a>/g, function (all, level, id, title) {
        var h = headers[index];
        if (!h || level != h.level || id != h.id || title != h.title) {
          needChange = true;
        }
        index++;
        hasTest = true;
        return all;
      });
      return !hasTest || needChange || headers[index];
    };
    var updateToc = function (editor) {
      if (editor.tocUpdater) {
        clearTimeout(editor.tocUpdater);
      }
      editor.tocUpdater = setTimeout(function () {
        var tocClass = getTocClass(editor);
        var $tocElms = editor.$('.' + tocClass);
        if ($tocElms.length <= 0) {
          return '';
        }
        var newToc = generateTocHtml(editor);
        var headers = readHeaders(editor);
        var _loop_1 = function (i) {
          var $tocElm = $tocElms[i];
          if (testNeedChange($tocElm.innerHTML, headers)) {
            editor.undoManager.ignore(function () {
              $tocElm.outerHTML = newToc;
            });
          }
        };
        for (var i = 0; i < $tocElms.length; i++) {
          _loop_1(i);
        }
      }, 100);
    };
    var removeToc = function (editor) {
      var currentNode = editor.selection.getNode();
      var targetDom = null;
      if (editor.dom.is(currentNode, 'div') && editor.dom.hasClass(currentNode, getTocClass(editor))) {
        targetDom = currentNode;
      } else {
        var parentDom = editor.dom.getParent(currentNode, 'div.' + getTocClass(editor));
        if (parentDom) {
          targetDom = parentDom;
        }
      }
      if (!targetDom || !editor.dom.hasClass(targetDom, getTocClass(editor))) {
        return false;
      }
      editor.dom.remove(targetDom);
      editor.nodeChanged();
    };

    var register = function (editor) {
      editor.addCommand('cherryInsertToc', function () {
        insertToc(editor);
      });
      editor.addCommand('cherryUpdateToc', function () {
        updateToc(editor);
      });
      editor.addCommand('cherryRemoveToc', function () {
        removeToc(editor);
      });
    };

    var toggleState = function (editor) {
      return function (api) {
        var toggleDisabledState = function () {
          api.setDisabled(editor.mode.isReadOnly());
        };
        toggleDisabledState();
        editor.on('LoadContent SetContent change', toggleDisabledState);
        editor.on('change keyup', function () {
          editor.execCommand('cherryUpdateToc');
        });
        return function () {
          return editor.on('LoadContent SetContent change', toggleDisabledState);
        };
      };
    };
    var isToc = function (editor) {
      return function (elm) {
        var ret = elm && editor.dom.is(elm, '.' + editor.getParam('toc_class', 'toc')) && editor.getBody().contains(elm);
        return ret && elm.getAttribute('data-mce-selected');
      };
    };
    var register$1 = function (editor) {
      editor.ui.registry.addButton('ch-toc', {
        icon: 'cherry-toc',
        tooltip: 'Table of contents',
        onAction: function () {
          return editor.execCommand('cherryInsertToc');
        },
        onSetup: toggleState(editor)
      });
      editor.ui.registry.addButton('ch-toc-remove', {
        icon: 'remove',
        tooltip: 'Remove',
        onAction: function () {
          return editor.execCommand('cherryRemoveToc');
        }
      });
      editor.ui.registry.addContextToolbar('ch-toc', {
        items: 'ch-toc-remove',
        predicate: isToc(editor),
        scope: 'node',
        position: 'node'
      });
    };

    function Plugin () {
      global.add('cherry-toc', function (editor) {
        register(editor);
        register$1(editor);
      });
    }

    Plugin();

}());
