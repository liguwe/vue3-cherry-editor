(function () {
    'use strict';

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

    function Plugin () {
      global.add('cherry-video', function plugin(editor) {
        var videoTemplateCallback = editor.getParam('video_template_callback');
        var doUpload = function () {
          var filePickerCallback = editor.getParam('file_picker_callback');
          if (filePickerCallback) {
            filePickerCallback(function (data) {
              if (data.preview_url) {
                var video = videoTemplateCallback(data);
                if (!data.loadingImg) {
                  editor.insertContent(video);
                } else {
                  var bookmark = editor.selection.getBookmark(2, true);
                  var content = editor.getContent();
                  content = content.replace(data.loadingImg, video);
                  editor.setContent(content);
                  editor.selection.moveToBookmark(bookmark);
                }
              }
            }, '', { filetype: 'media' });
          }
        };
        editor.ui.registry.addButton('ch-video', {
          icon: 'video',
          tooltip: 'Video',
          onAction: function () {
            doUpload();
          }
        });
      });
    }

    Plugin();

}());
