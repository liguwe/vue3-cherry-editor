(function () {
    'use strict';

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

    var global$1 = tinymce.util.Tools.resolve('tinymce.util.I18n');

    var t = global$1.translate;
    var CHERRY_APP_DIALOG = '\n    <div class="cherry-app-dialog__mask">\n    <div class="cherry-app-dialog__content" style="CHERRY_APP_STYLE">\n        <div class="cherry-app-dialog__head clearfix">\n            <span class="cherry-app-dialog__head-title">INSERT_APP_NAME</span>\n            <span class="cherry-app-dialog__head-close ico-dialog-close j-close-dialog"></span>\n            <span class="cherry-app-dialog__head-fullscreen font-editor font-editor-fullscreen j-set-dialog-size" style="display: none"></span>\n        </div>\n        <div class="cherry-app-dialog__body">\n            <div class="cherry-app-dialog__body--loading j-dialog-loading" style="display: block;">\n               <div class="cherry-app-dialog__body--loading_icon strip-loading2"></div>\n            </div>\n            <iframe style="visibility: visible;" allowtransparency="true" id="cherry-open-app-dialog-iframe" src="CHERRY_APP_URL" width="100%" frameborder="0" height="100%" loaded="true"></iframe>\n        </div>\n        <div class="cherry-app-dialog__foot">\n        <div class="cherry-app-dialog__foot-btns">\n            <span class="foot-btn foot-btn__ensure j-foot-btn__ensure">COMFIRM</span>\n            <span class="foot-btn foot-btn__cancel j-close-dialog">CANCEL</span>\n        </div>\n        </div>\n    </div>\n    </div>\n';
    var CHERRY_APP_WRAPPER = '\n<div class="cherry-app-wrapper" contenteditable="false" style="position: relative;" data-app-filename="CHERRY_APP_FILENAME" data-app-url="CHERRY_APP_FILEURL" data-app-config="CHERRY_APP_CONFIG" data-app-mode="1">\n  <div class="preview-card">\n      <iframe src="CHERRY_APP_FILEURL" frameborder="0"></iframe>\n      <div class="filename" title="CHERRY_APP_FILENAME">\n          <img />\n          <span class="name">CHERRY_APP_NAME</span>\n          <span class="note">CHERRY_APP_NOTE</span>\n      </div>\n  </div>\n  <div class="preview-textlink" style="display: none">\n      <img />\n      <span>CHERRY_APP_FILENAME</span>\n  </div>\n  <span class="end"></span>\n</div>\n';
    var id = 1;
    var CherryAppDialogHelper = function () {
      function CherryAppDialogHelper() {
        this.target = null;
        this.editor = null;
        this.created = false;
        this.dialogVisble = false;
        this.handlers = {};
        this.appConfig = {};
      }
      CherryAppDialogHelper.prototype.init = function (editor) {
        var _this = this;
        this.editor = editor;
        this.editor.settings._cherryAppId = id;
        id += 1;
        this.editor.on('OPENAPP_ENTRANCE_INIT:SUCCESS', function (data) {
          var loadingEl = _this.getAppDialogEl('.j-dialog-loading');
          if (loadingEl) {
            loadingEl.style.display = 'none';
          }
        });
        this.editor.on('OPENAPP_ENTRANCE_CONFIRM:SUCCESS', function (data) {
          _this.onSure(data.filename, data.url, data.sub);
        });
      };
      CherryAppDialogHelper.prototype.cleanup = function () {
        var appDialogEl = this.getAppDialogEl();
        appDialogEl === null || appDialogEl === void 0 ? void 0 : appDialogEl.remove();
      };
      CherryAppDialogHelper.prototype.onSure = function (filename, url, sub) {
        if (sub === void 0) {
          sub = '';
        }
        var self = this;
        var imageTarget = self.target;
        var base64Config = self.encodeJSON(self.appConfig);
        var html = CHERRY_APP_WRAPPER.replace(/CHERRY_APP_FILEURL/g, url).replace(/CHERRY_APP_FILENAME/g, '' + filename + sub).replace(/CHERRY_APP_NAME/g, filename).replace(/CHERRY_APP_NOTE/g, sub).replace(/CHERRY_APP_CONFIG/g, base64Config);
        imageTarget.outerHTML = html;
        var dialogEl = this.getAppDialogEl();
        if (dialogEl) {
          dialogEl.style.display = 'none';
        }
        self.target = null;
        self.editor.fire('closeCustomDialog');
      };
      CherryAppDialogHelper.prototype.openAppDialog = function (item) {
        if (!item) {
          return;
        }
        this.appConfig = this.decodeJSON(item.getAttribute('data-app-config'));
        this.appConfig.iframeId = 'cherry-open-app-dialog-iframe';
        this.setDialogVisible(item, true, item.getAttribute('data-app-filename'), item.getAttribute('data-app-url'));
      };
      CherryAppDialogHelper.prototype.setDialogVisible = function (target, val, filename, url) {
        var _this = this;
        if (filename === void 0) {
          filename = '';
        }
        if (url === void 0) {
          url = '';
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
          var data_1 = Object.assign({}, this.appConfig);
          if (url) {
            data_1.filename = filename;
            data_1.fileurl = url;
          }
          this.createIframe(data_1.url, function () {
            _this.updateApp(data_1);
          });
          var dialogEl = this.getAppDialogEl();
          if (dialogEl) {
            dialogEl.style.display = 'block';
          }
          var loadingEl = this.getAppDialogEl('.j-dialog-loading');
          if (loadingEl) {
            loadingEl.style.display = 'block';
          }
        } else {
          var dialogEl = this.getAppDialogEl();
          if (dialogEl) {
            dialogEl.style.display = 'none';
          }
          if (!fromInsert) {
            this.target.setAttribute('data-app-filename', this.target.getAttribute('data-app-oldfilename'));
            this.target.setAttribute('data-app-url', this.target.getAttribute('data-app-oldurl'));
            this.target.setAttribute('data-app-oldfilename', '');
            this.target.setAttribute('data-app-oldurl', '');
          }
          this.target = target;
        }
      };
      CherryAppDialogHelper.prototype.insertEmptyImg = function (config) {
        this.appConfig = config;
        this.appConfig.iframeId = 'cherry-open-app-dialog-iframe';
        var key = this.encodeJSON(this.generateRandomKey()).replace(/=/g, '');
        this.editor.insertContent(this.createEmptyApphImg(key));
        var img = this.editor.$('img[data-start-key="' + key + '"]');
        this.openAppDialog(img[0]);
      };
      CherryAppDialogHelper.prototype.createEmptyApphImg = function (key) {
        var emptyImgPath = this.editor.getParam('mindmap_empty_img');
        var base64Config = this.encodeJSON(this.appConfig);
        return '<img src="' + emptyImgPath + '" style="display:none" data-start-key="' + key + '" alt="cherry-app" data-control="cherry-app" data-app-filename data-app-url data-app-config="' + base64Config + '">';
      };
      CherryAppDialogHelper.prototype.createIframe = function (url, cb) {
        var dialogEl = this.getAppDialogEl();
        if (this.created && dialogEl) {
          document.querySelector('#cherry-open-app-dialog-iframe').setAttribute('src', url);
          var dialogTitleDom = dialogEl.querySelector('.cherry-app-dialog__head-title') || {};
          dialogTitleDom.innerText = this.appConfig.name;
          cb();
          return;
        }
        this.created = true;
        var dialog = document.createElement('div');
        var id = this.editor.settings._cherryAppId;
        dialog.setAttribute('class', 'cherry-app-dialog j-cherry-app-dialog j-cherry-app-dialog-' + id + ' cherry-app-dialog--normal');
        dialog.style = 'display:none;';
        var style = '';
        var _a = this.appConfig, width = _a.width, height = _a.height, name = _a.name;
        if (width) {
          style += 'width: ' + width + 'px;';
        }
        if (height) {
          style += 'height: ' + height + 'px;';
        }
        dialog.innerHTML = CHERRY_APP_DIALOG.replace('CHERRY_APP_URL', url).replace('CHERRY_APP_STYLE', style).replace('INSERT_APP_NAME', '' + t('Insert ') + t(name)).replace('COMFIRM', t('Comfirm')).replace('CANCEL', t('Cancel'));
        document.body.appendChild(dialog);
        this.bindEvent();
        cb();
      };
      CherryAppDialogHelper.prototype.updateApp = function (config) {
        if (!this.dialogVisble) {
          return;
        }
        this.editor.fire('OPENAPP_ENTRANCE_INIT', config);
        var oldUrl = this.target.getAttribute('data-app-oldurl');
        if (!oldUrl) {
          this.target.setAttribute('data-app-oldfilename', this.target.getAttribute('data-app-filename'));
          this.target.setAttribute('data-app-oldurl', this.target.getAttribute('data-app-url'));
        }
      };
      CherryAppDialogHelper.prototype.decodeJSON = function (json) {
        return json ? JSON.parse(decodeURIComponent(escape(window.atob(json)))) : null;
      };
      CherryAppDialogHelper.prototype.encodeJSON = function (json) {
        return window.btoa(unescape(encodeURIComponent(JSON.stringify(json))));
      };
      CherryAppDialogHelper.prototype.bindEvent = function () {
        var _this = this;
        var dialogEl = this.getAppDialogEl();
        if (!dialogEl) {
          return;
        }
        var ensureBtnEl = this.getAppDialogEl('.j-foot-btn__ensure');
        if (ensureBtnEl) {
          ensureBtnEl.addEventListener('click', function (e) {
            _this.onInsertApp(e);
            _this.editor.fire('showDialogTitle');
          });
        }
        dialogEl.querySelectorAll('.j-close-dialog').forEach(function (item) {
          item.addEventListener('click', function (e) {
            _this.editor.fire('showDialogTitle');
            _this.setDialogVisible(null, false);
            _this.editor.fire('closeCustomDialog');
          });
        });
        var setSizeBtnEl = this.getAppDialogEl('.j-set-dialog-size');
        if (setSizeBtnEl) {
          setSizeBtnEl.addEventListener('click', function (e) {
            var dialog = _this.getAppDialogEl();
            var target = e.target;
            var targetClass = target.getAttribute('class');
            var dialogClass = '';
            if (targetClass.indexOf('font-editor-fullscreen-restore') < 0) {
              dialogClass = dialog.getAttribute('class').replace(/cherry-app-dialog--normal/g, 'cherry-app-dialog--fullscreen');
              targetClass = targetClass.replace(/font-editor-fullscreen/g, 'font-editor-fullscreen-restore');
            } else {
              dialogClass = dialog.getAttribute('class').replace(/cherry-app-dialog--fullscreen/g, 'cherry-app-dialog--normal');
              targetClass = targetClass.replace(/font-editor-fullscreen-restore/g, 'font-editor-fullscreen');
            }
            dialog.setAttribute('class', dialogClass);
            target.setAttribute('class', targetClass);
          });
        }
      };
      CherryAppDialogHelper.prototype.resetDialogSize = function () {
        var dialog = this.getAppDialogEl();
        if (!dialog) {
          return;
        }
        var dialogClass = dialog.getAttribute('class');
        if (dialogClass.indexOf('cherry-app-dialog--fullscreen') > -1) {
          dialogClass = dialogClass.replace(/cherry-app-dialog--fullscreen/g, 'cherry-app-dialog--normal');
          dialog.setAttribute('class', dialogClass);
          var fullscreenIcon = this.getAppDialogEl('.j-set-dialog-size');
          if (fullscreenIcon) {
            var fullscreenIconClass = fullscreenIcon.getAttribute('class');
            fullscreenIconClass = fullscreenIconClass.replace(/font-editor-fullscreen-restore/g, 'font-editor-fullscreen');
            fullscreenIcon.setAttribute('class', fullscreenIconClass);
          }
        }
      };
      CherryAppDialogHelper.prototype.onInsertApp = function (e) {
        this.editor.fire('OPENAPP_ENTRANCE_CONFIRM');
      };
      CherryAppDialogHelper.prototype.base64ToFile = function (base64Data, name) {
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
      CherryAppDialogHelper.prototype.beforeInsertJSON = function (json, cb) {
        var beforeInsertJSON = this.editor.getParam('app_before_insert_json', '');
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
      CherryAppDialogHelper.prototype.beforeParseJSON = function (json, token, cb) {
        var id = '';
        if (json && json.trim().indexOf('id:') === 0) {
          id = json.trim().replace('id:', '');
        } else {
          cb(json);
          return;
        }
        var beforeParseJSON = this.editor.getParam('app_before_parse_json', '');
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
      CherryAppDialogHelper.prototype.generateRandomKey = function () {
        return Math.random().toString(36);
      };
      CherryAppDialogHelper.prototype.cacheApp = function (json) {
        this.target.setAttribute('data-app-json', this.encodeJSON(json));
        this.editor.fire('keyup', this.editor);
      };
      CherryAppDialogHelper.prototype.getAppDialogEl = function (childSelector) {
        if (childSelector === void 0) {
          childSelector = '';
        }
        var id = this.editor.settings._cherryAppId;
        var dialogEl = document.querySelector('.j-cherry-app-dialog-' + id);
        if (!childSelector) {
          return dialogEl;
        }
        return dialogEl === null || dialogEl === void 0 ? void 0 : dialogEl.querySelector(childSelector);
      };
      return CherryAppDialogHelper;
    }();

    var appIcon = '<svg width="20" height="20" version="1.1" id="\u56fe\u5c42_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\t viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"><style type="text/css">\t.st0{fill-rule:evenodd;clip-rule:evenodd;fill:url(#\u77e9\u5f62_1_);}\t.st1{opacity:0.3;fill-rule:evenodd;clip-rule:evenodd;fill:#FFFFFF;enable-background:new    ;}\t.st2{opacity:0.6;fill-rule:evenodd;clip-rule:evenodd;fill:#FFFFFF;enable-background:new    ;}\t.st3{fill-rule:evenodd;clip-rule:evenodd;fill:#FFFFFF;}</style><linearGradient id="\u77e9\u5f62_1_" gradientUnits="userSpaceOnUse" x1="-272.8743" y1="415.7895" x2="-272.3338" y2="414.8329" gradientTransform="matrix(24 0 0 -24 6555 9980.3604)">\t<stop  offset="0" style="stop-color:#6DA6FF"/>\t<stop  offset="1" style="stop-color:#2F7AFD"/></linearGradient><path id="\u77e9\u5f62" class="st0" d="M3,0h18c1.7,0,3,1.3,3,3v18c0,1.7-1.3,3-3,3H3c-1.7,0-3-1.3-3-3V3C0,1.3,1.3,0,3,0z"/><g id="Group-3" transform="translate(4.000000, 3.600000)">\t<path id="Rectangle-19" class="st1" d="M8.7,8.5l7.6,3.5c0.4,0.2,0.5,0.6,0.3,0.9c-0.1,0.1-0.2,0.3-0.3,0.3l-7.6,4\t\tc-0.2,0.1-0.4,0.1-0.6,0l-7.6-4c-0.3-0.2-0.5-0.6-0.3-0.9c0.1-0.1,0.2-0.2,0.3-0.3l7.6-3.5C8.3,8.4,8.5,8.4,8.7,8.5z"/>\t<path id="Rectangle-19_1_" class="st2" d="M8.7,4.5L16.3,8c0.4,0.2,0.5,0.6,0.3,0.9c-0.1,0.1-0.2,0.3-0.3,0.3l-7.6,4\t\tc-0.2,0.1-0.4,0.1-0.6,0l-7.6-4C0.1,9.1,0,8.7,0.1,8.3C0.2,8.2,0.3,8.1,0.5,8l7.6-3.5C8.3,4.4,8.5,4.4,8.7,4.5z"/>\t<path id="Rectangle-19_2_" class="st3" d="M8.2,0.4L15.7,4C16,4.2,16.2,4.6,16,5c-0.1,0.1-0.2,0.2-0.3,0.3L8.2,9.4\t\tC8,9.5,7.8,9.5,7.6,9.4L0.1,5.3c-0.3-0.2-0.5-0.6-0.3-1C-0.1,4.2,0,4.1,0.1,4l7.5-3.6C7.8,0.3,8,0.3,8.2,0.4z"/></g></svg>';

    var textlinkIcon = '<svg width="12" height="12" version="1.1" id="\u56fe\u5c42_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n\t viewBox="0 0 850.394 850.394" enable-background="new 0 0 850.394 850.394" xml:space="preserve">\n<g>\n\t<path fill="#040000" d="M214.426,580.873C129.275,580.873,60,511.599,60,426.448s69.275-154.425,154.425-154.425h114.089\n\t\tc85.15,0,154.424,69.275,154.424,154.425c0,16.568,13.432,30,30,30s30-13.432,30-30c0-118.234-96.19-214.425-214.424-214.425\n\t\tH214.426c-57.275,0-111.122,22.304-151.622,62.804C22.305,315.327,0,369.173,0,426.448c0,57.275,22.304,111.122,62.804,151.621\n\t\tc40.5,40.5,94.347,62.804,151.622,62.804c16.568,0,30-13.432,30-30S230.994,580.873,214.426,580.873z"/>\n\t<path fill="#040000" d="M787.59,272.324c-40.5-40.499-94.347-62.803-151.622-62.803c-16.568,0-30,13.432-30,30s13.432,30,30,30\n\t\tc85.15,0,154.426,69.274,154.426,154.424c0,85.151-69.275,154.426-154.426,154.426H521.879\n\t\tc-85.149,0-154.424-69.275-154.424-154.426c0-16.568-13.432-30-30-30s-30,13.432-30,30c0,57.275,22.304,111.122,62.803,151.622\n\t\tc40.5,40.5,94.347,62.805,151.621,62.805h114.089c57.275,0,111.122-22.305,151.622-62.805s62.804-94.347,62.804-151.622\n\t\tS828.089,312.823,787.59,272.324z"/>\n</g>\n</svg>';

    var cardIcon = '<svg width="12" height="12" version="1.1" id="\u56fe\u5c42_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\nviewBox="0 0 850.394 850.394" enable-background="new 0 0 850.394 850.394" xml:space="preserve">\n<g>\n<path fill="#040000" d="M793.139,0H57.256C25.685,0,0,25.686,0,57.257v586.72c0,31.57,25.685,57.255,57.255,57.255h735.883\n   c31.57,0,57.255-25.685,57.255-57.255V57.257C850.394,25.686,824.709,0,793.139,0z M790.394,641.231H60V60h730.393V641.231z"/>\n<path fill="#040000" d="M820.394,790.394H30c-16.568,0-30,13.432-30,30s13.432,30,30,30h790.393c16.568,0,30-13.432,30-30\n   S836.962,790.394,820.394,790.394z"/>\n</g>\n</svg>';

    var openIcon = '<svg width="12" height="12" version="1.1" id="\u56fe\u5c42_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\nviewBox="0 0 850.394 850.394" enable-background="new 0 0 850.394 850.394" xml:space="preserve">\n<g>\n<path fill="#060001" d="M816.97,259.72c-21.41-50.64-52.06-96.11-91.09-135.15c-39.04-39.05-84.5-69.71-135.13-91.13\n   C538.31,11.25,482.63,0,425.25,0c-57.39,0-113.09,11.25-165.54,33.44c-50.64,21.42-96.11,52.08-135.16,91.13\n   c-39.04,39.04-69.7,84.51-91.12,135.14C11.25,312.15,0,367.83,0,425.2c0,57.39,11.25,113.08,33.43,165.52\n   c21.42,50.64,52.08,96.11,91.13,135.15c39.04,39.03,84.52,69.69,135.16,91.1c52.44,22.18,108.13,33.42,165.53,33.42\n   c57.38,0,113.06-11.24,165.49-33.42c50.64-21.42,96.1-52.07,135.13-91.11c39.04-39.03,69.69-84.5,91.1-135.14\n   c22.18-52.44,33.42-108.13,33.42-165.52C850.39,367.83,839.15,312.15,816.97,259.72z M683.45,683.44\n   c-68.97,68.97-160.66,106.95-258.2,106.95c-97.56,0-189.29-37.98-258.27-106.95C97.99,614.46,60,522.75,60,425.2\n   c0-97.52,37.99-189.22,106.98-258.21C235.98,98,327.7,60,425.25,60c97.52,0,189.22,38,258.19,106.99S790.39,327.68,790.39,425.2\n   C790.39,522.75,752.41,614.47,683.45,683.44z"/>\n<path fill="#060001" d="M593.87,219.14L348.08,319.53c-7.16,2.92-12.91,8.5-16.06,15.56L217.78,591.27\n   c-4.95,11.1-2.71,24.09,5.66,32.9c5.78,6.06,13.68,9.32,21.74,9.32c3.64,0,7.32-0.67,10.84-2.03l259.65-100.67\n   c7.82-3.03,14.01-9.2,17.08-17.02l100.39-255.9c4.39-11.18,1.69-23.89-6.86-32.32C617.73,217.12,604.98,214.6,593.87,219.14z\n    M425.2,485.4c-33.25,0-60.21-26.95-60.21-60.2s26.96-60.21,60.21-60.21s60.2,26.96,60.2,60.21S458.45,485.4,425.2,485.4z"/>\n</g>\n</svg>';

    var removeIcon = '<svg width="12" height="12" version="1.1" id="\u56fe\u5c42_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\nviewBox="0 0 850.394 850.394" enable-background="new 0 0 850.394 850.394" xml:space="preserve">\n<g>\n<path fill="#040000" d="M814.887,72.207H700.737H561.039V44.433c0-2.701-0.255-5.341-0.719-7.911\n   c0.466-2.101,0.719-4.281,0.719-6.522c0-16.568-13.432-30-30-30h-14.433H333.789h-14.434c-16.568,0-30,13.432-30,30\n   c0,2.241,0.253,4.421,0.719,6.522c-0.464,2.569-0.719,5.21-0.719,7.911v27.774H149.659H35.507c-16.568,0-30,13.432-30,30\n   s13.432,30,30,30h71.032v672.142c0,25.39,19.343,46.045,43.12,46.045h551.079c23.776,0,43.119-20.655,43.119-46.045V132.207h71.03\n   c16.568,0,30-13.432,30-30S831.455,72.207,814.887,72.207z M349.355,60h151.684v12.207H349.355V60z M683.856,790.394H166.539\n   V132.207h167.25h182.817h167.25V790.394z"/>\n<path fill="#040000" d="M328.978,286.972c-16.568,0-30,13.432-30,30V605.63c0,16.568,13.432,30,30,30s30-13.432,30-30V316.972\n   C358.978,300.403,345.546,286.972,328.978,286.972z"/>\n<path fill="#040000" d="M491.417,316.972V605.63c0,16.568,13.432,30,30,30s30-13.432,30-30V316.972c0-16.568-13.432-30-30-30\n   S491.417,300.403,491.417,316.972z"/>\n</g>\n</svg>';

    var MAX_PLUGINS_NUM = 10;
    function Plugin () {
      global.add('cherry-app', function plugin(editor) {
        var appDialogHelper = new CherryAppDialogHelper();
        appDialogHelper.init(editor);
        editor.on('remove', function () {
          appDialogHelper.cleanup();
        });
        editor.ui.registry.addIcon('ch-app', appIcon);
        editor.ui.registry.addIcon('ch-app-textlink', textlinkIcon);
        editor.ui.registry.addIcon('ch-app-card', cardIcon);
        editor.ui.registry.addIcon('ch-app-open', openIcon);
        editor.ui.registry.addIcon('ch-app-remove', removeIcon);
        editor.on('openCustomDialog', function () {
          editor.getBody().setAttribute('contenteditable', 'false');
        });
        editor.on('closeCustomDialog', function () {
          editor.getBody().setAttribute('contenteditable', 'true');
        });
        var _loop_1 = function (i) {
          editor.ui.registry.addButton('ch-app' + i, {
            icon: 'ch-app',
            tooltip: 'CherryApp' + i,
            onAction: function () {
              var getCherryAppConfig = editor.getParam('getCherryAppConfig', null);
              if (getCherryAppConfig) {
                getCherryAppConfig(function (config) {
                  if (config.length > i) {
                    appDialogHelper.insertEmptyImg(config[i]);
                    editor.fire('openCustomDialog');
                  }
                });
              }
            }
          });
        };
        for (var i = 0; i < MAX_PLUGINS_NUM; i++) {
          _loop_1(i);
        }
        var currentNode = null;
        editor.ui.registry.addToggleButton('ch-app-textlink', {
          tooltip: 'Text Link',
          icon: 'ch-app-textlink',
          onAction: function (api) {
            if (currentNode) {
              var root = editor.$(currentNode);
              root.attr('data-app-mode', '2');
              root.css({
                'width': 'max-content',
                'box-shadow': 'none'
              });
              root.find('.preview-card').css('display', 'none');
              root.find('.preview-textlink').css('display', 'inline-flex');
              document.querySelector('.tox-pop').remove();
              api.setActive(!api.isActive());
            }
          },
          onSetup: function (api) {
            if (currentNode) {
              var root = editor.$(currentNode);
              api.setActive(root.attr('data-app-mode') === '2');
            }
            return function () {
            };
          }
        });
        editor.ui.registry.addToggleButton('ch-app-card', {
          tooltip: 'Card Preview',
          icon: 'ch-app-card',
          onAction: function (api) {
            if (currentNode) {
              var root = editor.$(currentNode);
              root.css({
                'width': '50%',
                'box-shadow': '5px 5px 5px #e0e0e0'
              });
              root.attr('data-app-mode', '1');
              root.find('.preview-textlink').css('display', 'none');
              root.find('.preview-card').css('display', 'block');
              document.querySelector('.tox-pop').remove();
              api.setActive(!api.isActive());
            }
          },
          onSetup: function (api) {
            if (currentNode) {
              var root = editor.$(currentNode);
              api.setActive(root.attr('data-app-mode') === '1');
            }
            return function () {
            };
          }
        });
        editor.ui.registry.addButton('ch-app-open', {
          tooltip: 'Open',
          icon: 'ch-app-open',
          onAction: function () {
            if (currentNode) {
              window.open(currentNode.getAttribute('data-app-url'));
            }
          }
        });
        editor.ui.registry.addButton('ch-app-remove', {
          tooltip: 'Delete',
          icon: 'ch-app-remove',
          onAction: function () {
            if (currentNode) {
              currentNode.outerHTML = '<br />';
              document.querySelector('.tox-pop').remove();
            }
          }
        });
        editor.ui.registry.addContextToolbar('ch-app-toolbar', {
          items: 'ch-app-textlink ch-app-card ch-app-open ch-app-edit ch-app-remove',
          predicate: function (node) {
            if (node.className === 'cherry-app-wrapper') {
              currentNode = node;
              node.setAttribute('data-mce-selected', '1');
              return true;
            }
            if (currentNode) {
              currentNode.removeAttribute('data-mce-selected');
              currentNode = null;
            }
            return false;
          },
          position: 'node',
          scope: 'node'
        });
      });
    }

    Plugin();

}());
