(function () {
    'use strict';

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

    function Plugin () {
      global.add('cherry-blockquotefix', function plugin(editor) {
        editor.on('KeyDown', function (e) {
          if (e.keyCode == 27) {
            var dom = editor.dom;
            var parentBlock = editor.selection.getSelectedBlocks()[0];
            var containerBlock = parentBlock.parentNode.nodeName == 'BODY' ? dom.getParent(parentBlock, dom.isBlock) : dom.getParent(parentBlock.parentNode, dom.isBlock);
            var newBlock = editor.dom.create('p');
            newBlock.innerHTML = '<br data-mce-bogus="1">';
            dom.insertAfter(newBlock, containerBlock);
            var rng = dom.createRng();
            newBlock.normalize();
            rng.setStart(newBlock, 0);
            rng.setEnd(newBlock, 0);
            editor.selection.setRng(rng);
          }
        });
      });
    }

    Plugin();

}());
