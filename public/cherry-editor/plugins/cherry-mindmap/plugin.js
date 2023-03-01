(function () {
    'use strict';

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

    var CHERRY_MINDMAP_DIALOG = '\n    <div class="cherry-mindmap-dialog__mask">\n    <div class="cherry-mindmap-dialog__content">\n        <div class="cherry-mindmap-dialog__head clearfix">\n            <span class="cherry-mindmap-dialog__head-title">\u63d2\u5165\u601d\u7ef4\u5bfc\u56fe</span>\n            <span class="cherry-mindmap-dialog__head-close ico-dialog-close j-close-dialog"></span>\n            <span class="cherry-mindmap-dialog__head-fullscreen font-editor font-editor-fullscreen j-set-dialog-size"></span>\n        </div>\n        <div class="cherry-mindmap-dialog__body">\n            <div class="cherry-mindmap-dialog__body--loading j-dialog-loading" style="display: block;">\n               <div class="cherry-mindmap-dialog__body--loading_icon strip-loading2"></div>\n            </div>\n            <iframe style="visibility: visible;" allowtransparency="true" id="cherry-mindmap-dialog-iframe" src="CHERRY_MINDMAP_URL" width="100%" frameborder="0" height="100%" loaded="true"></iframe>\n        </div>\n        <div class="cherry-mindmap-dialog__foot">\n        <div class="cherry-mindmap-dialog__foot-btns">\n            <span class="foot-btn foot-btn__ensure j-foot-btn__ensure">\u786e\u5b9a</span>\n            <span class="foot-btn foot-btn__cancel j-close-dialog">\u53d6\u6d88</span>\n        </div>\n        </div>\n    </div>\n    </div>\n';
    var CherryMindmapDialogHelper = function () {
      function CherryMindmapDialogHelper() {
        var _this = this;
        this.target = null;
        this.editor = null;
        this.created = false;
        this.dialogVisble = false;
        this.handlers = {};
        window.addEventListener('message', function (event) {
          if (!event.data || !event.data.eventName || !_this.target) {
            return;
          }
          document.querySelector('.j-cherry-mindmap-dialog .j-dialog-loading').style.display = 'none';
          switch (event.data.eventName) {
          case 'GET_MINDMAP_DATA:SUCCESS':
            _this.onSure(_this.encodeJSON(event.data.value.jsonData), event.data.value.base64Data, event.data.value.imageInfo);
            break;
          }
        }, false);
      }
      CherryMindmapDialogHelper.prototype.init = function (editor) {
        this.editor = editor;
        this.mindmapUrl = editor.getParam('cherry_mindmap_url', '');
      };
      CherryMindmapDialogHelper.prototype.onSure = function (jsonData, base64Data, imageInfo) {
        var _this = this;
        if (imageInfo === void 0) {
          imageInfo = {};
        }
        var self = this;
        var imageTarget = this.target;
        this.beforeInsertJSON(jsonData, function (id, token) {
          if (token === void 0) {
            token = '';
          }
          var imagesUploadHandler = _this.editor.getParam('images_upload_handler', null);
          function success(data) {
            imageTarget.setAttribute('src', data);
            imageTarget.setAttribute('data-mce-src', data);
            imageTarget.setAttribute('data-mindmap-json', id);
            imageTarget.setAttribute('data-mindmap-oldjson', '');
            imageTarget.setAttribute('data-mindmap-oldsrc', '');
            imageTarget.setAttribute('data-mindmap-token', token);
            imageTarget.setAttribute('data-start-key', '');
            if (imageInfo.width) {
              imageTarget.setAttribute('width', '' + imageInfo.width);
            }
            document.querySelector('.j-cherry-mindmap-dialog').style.display = 'none';
            self.target = null;
            self.editor.fire('closeCustomDialog');
          }
          function failed() {
            document.querySelector('.j-cherry-mindmap-dialog').style.display = 'none';
            var mindmapSaveFailed = self.getParam('mindmap_save_failed', null);
            if (typeof mindmapSaveFailed === 'function') {
              mindmapSaveFailed(self.target);
            }
            self.target = null;
            self.editor.fire('closeCustomDialog');
          }
          if (imagesUploadHandler) {
            imagesUploadHandler({
              base64: function () {
                return base64Data;
              }
            }, success, failed);
          } else {
            failed();
          }
        });
      };
      CherryMindmapDialogHelper.prototype.openMindmapDialog = function (item) {
        if (!item) {
          return;
        }
        this.setDialogVisible(item, true, item.getAttribute('data-mindmap-json'), item.getAttribute('data-mindmap-token'));
      };
      CherryMindmapDialogHelper.prototype.setDialogVisible = function (target, val, json, token) {
        var _this = this;
        if (json === void 0) {
          json = '';
        }
        if (token === void 0) {
          token = '';
        }
        var fromInsert = false;
        if (this.target) {
          fromInsert = !!this.target.getAttribute('data-start-key');
          if (!val && fromInsert) {
            this.editor.dom.remove(this.target);
          }
        }
        this.dialogVisble = val;
        if (this.created) {
          this.resetDialogSize();
        }
        if (val) {
          this.target = target;
          this.createIframe(function () {
            if (json && target) {
              _this.beforeParseJSON(json, token, function (originJSON) {
                _this.updateMindmap(originJSON);
              });
            } else {
              _this.updateMindmap(json);
            }
          });
          document.querySelector('.j-cherry-mindmap-dialog').style.display = 'block';
          document.querySelector('.j-cherry-mindmap-dialog .j-dialog-loading').style.display = 'block';
        } else {
          document.querySelector('.j-cherry-mindmap-dialog').style.display = 'none';
          if (!fromInsert && this.target.getAttribute('data-mindmap-oldjson')) {
            this.target.setAttribute('data-mindmap-json', this.target.getAttribute('data-mindmap-oldjson'));
            this.target.setAttribute('src', this.target.getAttribute('data-mindmap-oldsrc'));
            this.target.setAttribute('data-mce-src', this.target.getAttribute('data-mindmap-oldsrc'));
            this.target.setAttribute('data-mindmap-oldjson', '');
            this.target.setAttribute('data-mindmap-oldsrc', '');
          }
          this.target = target;
        }
      };
      CherryMindmapDialogHelper.prototype.insertEmptyImg = function () {
        var key = this.encodeJSON(this.generateRandomKey()).replace(/=/g, '');
        this.editor.insertContent(this.createEmptyMindmaphImg(key));
        var img = this.editor.$('img[data-start-key="' + key + '"]');
        this.openMindmapDialog(img[0]);
      };
      CherryMindmapDialogHelper.prototype.createEmptyMindmaphImg = function (key) {
        var emptyImgPath = this.editor.getParam('mindmap_empty_img');
        var emptyImgJSON = this.editor.getParam('mindmap_empty_json');
        return '<img src="' + emptyImgPath + '" data-start-key="' + key + '" alt="cherry-mindmap" title="\u70b9\u51fb\u56fe\u7247\uFF0C\u8fdb\u5165\u601d\u7ef4\u5bfc\u56fe\u7f16\u8f91" data-control="cherry-mindmap" data-mindmap-json="' + emptyImgJSON + '" data-mindmap-oldjson="' + emptyImgJSON + '">';
      };
      CherryMindmapDialogHelper.prototype.createIframe = function (cb) {
        if (this.created && document.querySelector('.j-cherry-mindmap-dialog')) {
          cb();
          document.querySelector('#cherry-mindmap-dialog-iframe').focus();
          return;
        }
        this.created = true;
        var dialog = document.createElement('div');
        dialog.setAttribute('class', 'cherry-mindmap-dialog j-cherry-mindmap-dialog cherry-mindmap-dialog--normal');
        dialog.style = 'display:none;';
        dialog.innerHTML = CHERRY_MINDMAP_DIALOG.replace('CHERRY_MINDMAP_URL', this.mindmapUrl);
        document.body.appendChild(dialog);
        this.bindEvent();
        setTimeout(function () {
          cb();
          dialog.querySelector('#cherry-mindmap-dialog-iframe').focus();
        }, 3000);
      };
      CherryMindmapDialogHelper.prototype.updateMindmap = function (json) {
        if (!this.dialogVisble) {
          return;
        }
        var ifram = document.getElementById('cherry-mindmap-dialog-iframe').contentWindow;
        ifram.postMessage({
          eventName: 'INIT_MINDMAP',
          value: this.decodeJSON(json)
        }, '*');
        var oldJSON = this.target.getAttribute('data-mindmap-oldjson');
        if (!oldJSON) {
          this.target.setAttribute('data-mindmap-oldjson', this.target.getAttribute('data-mindmap-json'));
          this.target.setAttribute('data-mindmap-oldsrc', this.target.getAttribute('src'));
          this.target.setAttribute('src', this.editor.getParam('mindmap_empty_img'));
          this.target.setAttribute('data-mce-src', this.editor.getParam('mindmap_empty_img'));
        }
      };
      CherryMindmapDialogHelper.prototype.decodeJSON = function (json) {
        if (json && json.trim().indexOf('id:') === 0) {
          return json;
        }
        return json ? decodeURIComponent(escape(window.atob(json))) : null;
      };
      CherryMindmapDialogHelper.prototype.encodeJSON = function (json) {
        if (json && json.trim().indexOf('id:') === 0) {
          return json;
        }
        return window.btoa(unescape(encodeURIComponent(json)));
      };
      CherryMindmapDialogHelper.prototype.bindEvent = function () {
        var _this = this;
        if (!document.querySelector('.j-cherry-mindmap-dialog')) {
          return;
        }
        document.querySelector('.j-cherry-mindmap-dialog .j-foot-btn__ensure').addEventListener('click', function (e) {
          _this.onInsertMindmap(e);
          _this.editor.fire('showDialogTitle');
        });
        document.querySelectorAll('.j-cherry-mindmap-dialog .j-close-dialog').forEach(function (item) {
          item.addEventListener('click', function (e) {
            _this.editor.fire('showDialogTitle');
            _this.setDialogVisible(null, false);
            _this.editor.fire('closeCustomDialog');
          });
        });
        document.querySelector('.j-cherry-mindmap-dialog .j-set-dialog-size').addEventListener('click', function (e) {
          var dialog = document.querySelector('.j-cherry-mindmap-dialog');
          var target = e.target;
          var targetClass = target.getAttribute('class');
          var dialogClass = '';
          if (targetClass.indexOf('font-editor-fullscreen-restore') < 0) {
            dialogClass = dialog.getAttribute('class').replace(/cherry-mindmap-dialog--normal/g, 'cherry-mindmap-dialog--fullscreen');
            targetClass = targetClass.replace(/font-editor-fullscreen/g, 'font-editor-fullscreen-restore');
          } else {
            dialogClass = dialog.getAttribute('class').replace(/cherry-mindmap-dialog--fullscreen/g, 'cherry-mindmap-dialog--normal');
            targetClass = targetClass.replace(/font-editor-fullscreen-restore/g, 'font-editor-fullscreen');
          }
          dialog.setAttribute('class', dialogClass);
          target.setAttribute('class', targetClass);
        });
      };
      CherryMindmapDialogHelper.prototype.resetDialogSize = function () {
        var dialog = document.querySelector('.j-cherry-mindmap-dialog');
        var dialogClass = dialog.getAttribute('class');
        if (dialogClass.indexOf('cherry-mindmap-dialog--fullscreen') > -1) {
          dialogClass = dialogClass.replace(/cherry-mindmap-dialog--fullscreen/g, 'cherry-mindmap-dialog--normal');
          dialog.setAttribute('class', dialogClass);
          var fullscreenIcon = document.querySelector('.j-cherry-mindmap-dialog .j-set-dialog-size');
          var fullscreenIconClass = fullscreenIcon.getAttribute('class');
          fullscreenIconClass = fullscreenIconClass.replace(/font-editor-fullscreen-restore/g, 'font-editor-fullscreen');
          fullscreenIcon.setAttribute('class', fullscreenIconClass);
        }
      };
      CherryMindmapDialogHelper.prototype.onInsertMindmap = function (e) {
        var ifram = document.getElementById('cherry-mindmap-dialog-iframe').contentWindow;
        ifram.postMessage({
          eventName: 'GET_MINDMAP_DATA',
          value: ''
        }, '*');
        document.querySelector('.j-cherry-mindmap-dialog .j-dialog-loading').style.display = 'block';
      };
      CherryMindmapDialogHelper.prototype.base64ToFile = function (base64Data, name) {
        var bytes = window.atob(base64Data.split(',')[1]);
        var ab = new ArrayBuffer(bytes.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < bytes.length; i++) {
          ia[i] = bytes.charCodeAt(i);
        }
        var file = new Blob([ab], { type: 'image/png' });
        file.lastModifiedDate = new Date();
        file.name = name;
        return file;
      };
      CherryMindmapDialogHelper.prototype.beforeInsertJSON = function (json, cb) {
        var beforeInsertJSON = this.editor.getParam('mindmap_before_insert_json', '');
        if (beforeInsertJSON) {
          beforeInsertJSON(json, function (id, token) {
            if (id) {
              cb('id:' + id, token);
            } else {
              cb(json);
            }
          });
          return;
        }
        cb(json);
      };
      CherryMindmapDialogHelper.prototype.beforeParseJSON = function (json, token, cb) {
        var id = '';
        if (json && json.trim().indexOf('id:') === 0) {
          id = json.trim().replace('id:', '');
        } else {
          cb(json);
          return;
        }
        var beforeParseJSON = this.editor.getParam('mindmap_before_parse_json', '');
        if (beforeParseJSON) {
          beforeParseJSON(id, token, function (orignJSON) {
            if (orignJSON) {
              cb(orignJSON);
            } else {
              cb(json);
            }
          });
          return;
        }
        cb(json);
      };
      CherryMindmapDialogHelper.prototype.generateRandomKey = function () {
        return Math.random().toString(36);
      };
      CherryMindmapDialogHelper.prototype.cacheMindmap = function (json) {
        this.target.setAttribute('data-mindmap-json', this.encodeJSON(json));
        this.editor.fire('keyup', this.editor);
      };
      return CherryMindmapDialogHelper;
    }();
    var mindmapDialogHelper = new CherryMindmapDialogHelper();

    var mindmapIcon = '<svg width="20px" height="20px" version="1.1" id="\u56fe\u5c42_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n     viewBox="0 0 850.394 850.394" enable-background="new 0 0 850.394 850.394" xml:space="preserve">\n     <g transform="scale(0.9)">\n        <path fill="#2aa3ab"  d="M883 940h-765q-24 0 -41 -16.5t-17 -40.5v-765q0 -24 17 -41t41 -17h765q24 0 40.5 17t16.5 41v765q0 24 -16.5 40.5t-40.5 16.5zM882 118h-764v764h764v-764zM256 213q25 0 42 17t17 41q0 8 -2 15l84 71q29 -21 65 -21q18 0 35 5l49 -78q-9 -15 -9 -32q0 -24 17 -41\n        t41.5 -17t41.5 17t17 41t-17 41.5t-42 17.5l-6 -1l-50 79q23 23 29 54l124 4q8 -15 21.5 -23.5t30.5 -8.5q24 0 41 17t17 41t-17 41t-41 17q-17 0 -31.5 -9.5t-21.5 -24.5l-124 -4q-7 24 -23 42.5t-39 28.5l24 136q27 4 45 25t18 49q0 31 -22 53t-53 22t-53 -22t-22 -53\n        q0 -21 10.5 -38.5t27.5 -26.5l-24 -136q-29 -2 -54 -18l-65 62q3 8 3 18q0 24 -17.5 41t-41.5 17t-41 -17t-17 -41.5t17 -41.5t41 -17q11 0 22 4l65 -61q-14 -25 -14 -54q0 -26 11 -49l-84 -71q-12 5 -25 5q-24 0 -41 -17t-17 -41t17 -41t41 -17z"/>\n     </g>\n</svg>';
    function Plugin () {
      global.add('cherry-mindmap', function plugin(editor) {
        editor.on('openCustomDialog', function () {
          editor.getBody().setAttribute('contenteditable', 'false');
        });
        editor.on('closeCustomDialog', function () {
          editor.getBody().setAttribute('contenteditable', 'true');
        });
        editor.ui.registry.addIcon('ch-mindmap', mindmapIcon);
        editor.ui.registry.addButton('ch-mindmap', {
          icon: 'ch-mindmap',
          tooltip: 'CherryMindmap',
          onAction: function () {
            mindmapDialogHelper.init(editor);
            mindmapDialogHelper.insertEmptyImg();
            editor.fire('openCustomDialog');
          },
          onSetup: function () {
            function openMindmapDialog(event) {
              if (event.target.getAttribute('data-control') === 'cherry-mindmap') {
                mindmapDialogHelper.init(editor);
                mindmapDialogHelper.openMindmapDialog(event.target);
                editor.fire('openCustomDialog');
              }
            }
            editor.on('click', openMindmapDialog);
            return function () {
            };
          }
        });
      });
    }

    Plugin();

}());
