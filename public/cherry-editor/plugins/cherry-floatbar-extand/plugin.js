(function () {
    'use strict';

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

    function Plugin () {
      global.add('cherry-floatbar-extand', function plugin(editor) {
        var isEditable = function (node) {
          return editor.dom.getContentEditableParent(node) !== 'false';
        };
        var isImage = function (node) {
          return node.nodeName === 'IMG' || node.nodeName === 'FIGURE' && /image/i.test(node.className);
        };
        var inTable = function (node) {
          var parent = node.parentNode;
          while (parent && parent.tagName !== 'TABLE') {
            parent = parent.parentNode;
          }
          return parent && parent.tagName === 'TABLE';
        };
        var isLink = function (node) {
          var isA = node && node.nodeName.toLowerCase() === 'a';
          var hasHref = node && node.getAttribute('href');
          return isA && !!hasHref;
        };
        var isHr = function (node) {
          return node.nodeName === 'HR';
        };
        editor.ui.registry.addContextToolbar('textselection', {
          predicate: function (node) {
            return !isImage(node) && !editor.selection.isCollapsed() && isEditable(node) && !inTable(node) && !isHr(node) && !isLink(node);
          },
          items: editor.getParam('quickbars_selection_toolbar', 'bold italic | quicklink h2 h3 blockquote'),
          position: 'selection',
          scope: 'editor'
        });
      });
    }

    Plugin();

}());
