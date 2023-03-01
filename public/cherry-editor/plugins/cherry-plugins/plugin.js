(function () {
    'use strict';

    var global$1 = tinymce.util.Tools.resolve('tinymce.PluginManager');

    var FULL_SCREEN_ICON = '\n<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path d="M12.9946 3.71637L12.9946 6.51441C12.9946 6.79055 13.2185 7.01441 13.4946 7.01441C13.7708 7.0144 13.9946 6.79055 13.9946 6.5144L13.9946 3.0144C13.9946 2.46212 13.5469 2.0144 12.9946 2.0144H9.49463C9.21849 2.0144 8.99463 2.23826 8.99463 2.5144C8.99463 2.79055 9.21849 3.0144 9.49463 3.0144L12.2824 3.0144L8.93648 6.36035C8.74122 6.55562 8.74122 6.8722 8.93649 7.06746C9.13175 7.26272 9.44833 7.26272 9.64359 7.06745L12.9946 3.71637Z" fill="#182B50"/>\n<path d="M2.01904 12.9883C2.01904 13.5406 2.46676 13.9883 3.01904 13.9883L6.51904 13.9883C6.79519 13.9883 7.01904 13.7644 7.01904 13.4883C7.01904 13.2121 6.79519 12.9883 6.51904 12.9883L3.77304 12.9883L7.09758 9.66386C7.29285 9.46861 7.29286 9.15202 7.0976 8.95676C6.90234 8.76149 6.58576 8.76149 6.39049 8.95674L3.01904 12.3281L3.01904 9.48828C3.01904 9.21214 2.79519 8.98828 2.51904 8.98828C2.2429 8.98828 2.01904 9.21214 2.01904 9.48828V12.9883Z" fill="#182B50"/>\n</svg>\n';

    var EXIT_FULL_SCREEN_ICON = '<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path d="M10.2224 6.98322L13.0102 6.98322C13.2863 6.98322 13.5102 7.20708 13.5102 7.48322C13.5102 7.75936 13.2863 7.98322 13.0102 7.98322L9.51016 7.98322C8.95788 7.98322 8.51017 7.53551 8.51016 6.98322L8.51015 3.48322C8.51015 3.20708 8.73401 2.98322 9.01015 2.98322C9.28629 2.98322 9.51015 3.20707 9.51015 3.48322L9.51016 6.28122L12.8612 2.93014C13.0564 2.73488 13.373 2.73487 13.5683 2.93013C13.7636 3.1254 13.7636 3.44198 13.5683 3.63724L10.2224 6.98322Z" fill="#182B50"/>\n<path d="M7.51015 10.0001C7.51015 9.44778 7.06244 9.00006 6.51015 9.00006L3.01015 9.00006C2.73401 9.00006 2.51015 9.22392 2.51015 9.50006C2.51015 9.77621 2.73401 10.0001 3.01015 10.0001L5.75616 10.0001L2.43161 13.3245C2.23634 13.5197 2.23634 13.8363 2.4316 14.0316C2.62685 14.2269 2.94344 14.2269 3.1387 14.0316L6.51015 10.6603L6.51015 13.5001C6.51015 13.7762 6.73401 14.0001 7.01015 14.0001C7.28629 14.0001 7.51015 13.7762 7.51015 13.5001L7.51015 10.0001Z" fill="#182B50"/>\n</svg>';

    var CLOSE_ICON = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path d="M4.35355 3.64645C4.15829 3.45118 3.84171 3.45118 3.64645 3.64645C3.45118 3.84171 3.45118 4.15829 3.64645 4.35355L7.29314 8.00024L3.64645 11.6469C3.45118 11.8422 3.45118 12.1588 3.64645 12.354C3.84171 12.5493 4.15829 12.5493 4.35355 12.354L8.00024 8.70735L11.6464 12.3536C11.8417 12.5488 12.1583 12.5488 12.3536 12.3536C12.5488 12.1583 12.5488 11.8417 12.3536 11.6464L8.70735 8.00024L12.3539 4.35374C12.5491 4.15848 12.5491 3.8419 12.3539 3.64663C12.1586 3.45137 11.842 3.45137 11.6467 3.64663L8.00024 7.29314L4.35355 3.64645Z" fill="#182B50"/>\n</svg>\n';

    var TAPD_GRAP_DIALOG_STYLES = '\n    img[data-control="tapd-graph"] {\n        cursor: pointer;\n    }\n    .tapd-grap-dialog {\n        position: fixed;\n        left: 0;\n        top: 0;\n        z-index: 9999;\n        width: 100%;\n        height: 100%;\n        text-align: center;\n    }\n    .tapd-grap-dialog--fullscreen .tapd-grap-dialog__content{\n        width: 100%;\n        height: 100%;\n    }\n    .tapd-grap-dialog--fullscreen .tapd-grap-dialog__mask{\n        padding-top: 0;\n    }\n    .tapd-grap-dialog__mask {\n        width: 100%;\n        height: 100%;\n        padding-top: 50px;\n        background-color: rgba(0, 0, 0, .1);\n    }\n    .tapd-grap-dialog__content {\n        width: 80%;\n        height: 80%;\n        margin: 0 auto;\n        background-color: #fff;\n        opacity: 1;\n        border-radius: 3px;\n        border: solid 1px #aab5c1;\n        -moz-box-shadow: 0 2px 6px rgba(0,0,0,0.3);\n        -webkit-box-shadow: 0 2px 6px rgba(0,0,0,0.3);\n        -o-box-shadow: 0 2px 6px rgba(0,0,0,0.3);\n        box-shadow: 0 2px 6px rgba(0,0,0,0.3);\n    }\n    .tapd-grap-dialog__head {\n        padding: 0 18px;\n        height: 43px;\n        line-height: 43px;\n        background-color: transparent;\n        border-bottom: 1px solid #dfe6ee;\n        border-top-right-radius: 3px;\n        border-top-left-radius: 3px;\n        text-align: left;\n    }\n    .tapd-grap-dialog__head .ch-icon:hover {\n        color: #3582fb;\n    }\n    .tapd-grap-dialog__head-title {\n        font-size: 14px;\n        color: #3f4a56;\n    }\n    .tapd-grap-dialog__head-close,\n    .tapd-grap-dialog__head-fullscreen {\n        float: right;\n        margin-left: 15px;\n        color: #8091a5;\n        font-size: 14px;\n        cursor: pointer;\n    }\n    .tapd-grap-dialog .tapd-grap-dialog__head-close{\n        line-height: 44px;\n    }\n    .tapd-grap-dialog__body {\n        position: relative;\n        height: calc(100% - 100px);\n    }\n    .tapd-grap-dialog__body--loading {\n        position: absolute;\n        left: 0;\n        top: 0;\n        width: 100%;\n        height: calc(100% - 50px);\n        line-height: 50px;\n        color: #3f4a56;\n        background-color: rgba(255, 255, 255, .5);\n    }\n    .tapd-grap-dialog__body--loading_icon {\n        background-repeat: no-repeat;\n    }\n    .tapd-grap-dialog__foot {\n        height: 55px;\n    }\n    .tapd-grap-dialog__foot-btns {\n        float: right;\n        margin-top: 12px;\n    }\n    .tapd-grap-dialog__foot-btns .foot-btn {\n        display: inline-block;\n        min-width: 60px;\n        height: 30px;\n        line-height: 30px;\n        margin-right: 10px;\n        cursor: pointer;\n        text-decoration: none;\n        outline: 0;\n        border-radius: 2px;\n        text-align: center;\n        vertical-align: middle;\n        font-size: 12px;\n    }\n    .tapd-grap-dialog__foot-btns .foot-btn__ensure {\n        color: #fff;\n        border: 1px solid #3582fb;\n        background-color: #3582fb;\n    }\n    .tapd-grap-dialog__foot-btns .foot-btn__ensure:hover {\n        border: 1px solid #5d9bfc;\n        background-color: #5d9bfc\n    }\n    .tapd-grap-dialog__foot-btns .foot-btn__cancel {\n        margin-right: 25px;\n        color: #3582fb;\n        border: 1px solid #d7e6fe;\n        background-color: #fff;\n    }\n    .tapd-grap-dialog__foot-btns .foot-btn__cancel:hover {\n        color: #5d9bfc;\n        border: 1px solid #5d9bfc;\n        background-color: #fff\n    }\n\n';
    var TAPD_GRAP_DIALOG = '\n    <div class="tapd-grap-dialog__mask">\n    <div class="tapd-grap-dialog__content">\n        <div class="tapd-grap-dialog__head clearfix">\n            <span class="tapd-grap-dialog__head-title">\u63d2\u5165\u753b\u56fe</span>\n            <span class="tapd-grap-dialog__head-close j-close-dialog">' + CLOSE_ICON + '</span>\n            <span class="tapd-grap-dialog__head-fullscreen j-set-dialog-size">' + FULL_SCREEN_ICON + '</span>\n        </div>\n        <div class="tapd-grap-dialog__body">\n            <div class="tapd-grap-dialog__body--loading j-dialog-loading" style="display: block;">\n               <div class="tapd-grap-dialog__body--loading_icon strip-loading2"></div>\n            </div>\n            <iframe style="visibility: visible;" allowtransparency="true" id="tapd-grap-dialog-iframe" src="TAPD_GRAP_URL" width="100%" frameborder="0" height="100%" loaded="true"></iframe>\n        </div>\n        <div class="tapd-grap-dialog__foot">\n        <div class="tapd-grap-dialog__foot-btns">\n            <span class="foot-btn foot-btn__ensure j-foot-btn__ensure">\u786e\u5b9a</span>\n            <span class="foot-btn foot-btn__cancel j-close-dialog">\u53d6\u6d88</span>\n        </div>\n        </div>\n    </div>\n    </div>\n';
    var TapdGrapDialogHelper = function () {
      function TapdGrapDialogHelper() {
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
          switch (event.data.eventName) {
          case 'GET_GRAP_DATA:SUCCESS':
            _this.onSure(_this.encodeXml(event.data.value.xmlData), event.data.value.base64);
            break;
          case 'INIT_GRAP:SUCCESS':
            document.querySelector('.j-tapd-grap-dialog .j-dialog-loading').style.display = 'none';
            break;
          }
        }, false);
      }
      TapdGrapDialogHelper.prototype.init = function (editor) {
        this.editor = editor;
        this.drawioUrl = editor.getParam('cherry_drawio_url', '');
      };
      TapdGrapDialogHelper.prototype.onSure = function (xmlData, base64Data) {
        var _this = this;
        var self = this;
        var imageTarget = this.target;
        this.beforeInsertXML(xmlData, function (xmlId, token) {
          if (token === void 0) {
            token = '';
          }
          var imagesUploadHandler = _this.editor.getParam('images_upload_handler', null);
          function success(data) {
            imageTarget.setAttribute('src', data);
            imageTarget.setAttribute('data-mce-src', data);
            imageTarget.setAttribute('data-origin-xml', xmlId);
            imageTarget.setAttribute('data-graph-oldxml', '');
            imageTarget.setAttribute('data-graph-oldsrc', '');
            imageTarget.setAttribute('data-graph-token', token);
            imageTarget.setAttribute('data-start-key', '');
            document.querySelector('.j-tapd-grap-dialog').style.display = 'none';
            self.target = null;
            self.editor.fire('closeCustomDialog');
          }
          function failed() {
            document.querySelector('.j-tapd-grap-dialog').style.display = 'none';
            var graphSaveFailed = self.getParam('graph_save_failed', null);
            if (typeof graphSaveFailed === 'function') {
              graphSaveFailed(self.target);
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
      TapdGrapDialogHelper.prototype.openGrapDialog = function (item) {
        if (!item) {
          return;
        }
        this.setDialogVisible(item, true, item.getAttribute('data-origin-xml'), item.getAttribute('data-graph-token'));
      };
      TapdGrapDialogHelper.prototype.setDialogVisible = function (target, val, xml, token) {
        var _this = this;
        if (xml === void 0) {
          xml = '';
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
            if (xml && target) {
              _this.beforeParseXML(xml, token, function (originXml) {
                _this.updateGrap(originXml);
              });
            } else {
              _this.updateGrap(xml);
            }
          });
          document.querySelector('.j-tapd-grap-dialog').style.display = 'block';
          document.querySelector('.j-tapd-grap-dialog .j-dialog-loading').style.display = 'block';
        } else {
          document.querySelector('.j-tapd-grap-dialog').style.display = 'none';
          if (!fromInsert && this.target.getAttribute('data-graph-oldxml')) {
            this.target.setAttribute('data-origin-xml', this.target.getAttribute('data-graph-oldxml'));
            this.target.setAttribute('src', this.target.getAttribute('data-graph-oldsrc'));
            this.target.setAttribute('data-mce-src', this.target.getAttribute('data-graph-oldsrc'));
            this.target.setAttribute('data-graph-oldxml', '');
            this.target.setAttribute('data-graph-oldsrc', '');
          }
          this.target = target;
        }
      };
      TapdGrapDialogHelper.prototype.insertEmptyImg = function () {
        var key = this.encodeXml(this.generateRandomKey()).replace(/=/g, '');
        this.editor.insertContent(this.createEmptyGraphImg(key));
        var img = this.editor.$('img[data-start-key="' + key + '"]');
        this.openGrapDialog(img[0]);
      };
      TapdGrapDialogHelper.prototype.createEmptyGraphImg = function (key) {
        var emptyImgPath = this.editor.getParam('graph_empty_img');
        var emptyImgXml = this.editor.getParam('graph_empty_xml');
        return '<img src="' + emptyImgPath + '" data-start-key="' + key + '" alt="tapd-graph" title="\u70b9\u51fb\u56fe\u7247\uFF0C\u8fdb\u5165\u56fe\u5f62\u5316\u7f16\u8f91" data-control="tapd-graph" data-origin-xml="' + emptyImgXml + '" data-graph-oldxml="' + emptyImgXml + '">';
      };
      TapdGrapDialogHelper.prototype.createIframe = function (cb) {
        if (this.created && document.querySelector('.j-tapd-grap-dialog')) {
          cb();
          return;
        }
        this.created = true;
        var style = document.createElement('style');
        style.innerHTML = TAPD_GRAP_DIALOG_STYLES;
        document.head.appendChild(style);
        var dialog = document.createElement('div');
        dialog.setAttribute('class', 'tapd-grap-dialog j-tapd-grap-dialog tapd-grap-dialog--normal');
        dialog.style = 'display:none;';
        dialog.innerHTML = TAPD_GRAP_DIALOG.replace('TAPD_GRAP_URL', this.drawioUrl);
        document.body.appendChild(dialog);
        this.bindEvent();
        setTimeout(function () {
          cb();
        }, 3000);
      };
      TapdGrapDialogHelper.prototype.updateGrap = function (xml) {
        if (!this.dialogVisble) {
          return;
        }
        var ifram = document.getElementById('tapd-grap-dialog-iframe').contentWindow;
        ifram.postMessage({
          eventName: 'INIT_GRAP',
          value: this.decodeXml(xml)
        }, '*');
        var oldXml = this.target.getAttribute('data-graph-oldxml');
        if (!oldXml) {
          this.target.setAttribute('data-graph-oldxml', this.target.getAttribute('data-origin-xml'));
          this.target.setAttribute('data-graph-oldsrc', this.target.getAttribute('src'));
          this.target.setAttribute('src', this.editor.getParam('graph_empty_img'));
          this.target.setAttribute('data-mce-src', this.editor.getParam('graph_empty_img'));
        }
      };
      TapdGrapDialogHelper.prototype.decodeXml = function (xml) {
        if (xml && xml.trim().indexOf('id:') === 0) {
          return xml;
        }
        return xml ? decodeURIComponent(escape(window.atob(xml))) : null;
      };
      TapdGrapDialogHelper.prototype.encodeXml = function (xml) {
        if (xml && xml.trim().indexOf('id:') === 0) {
          return xml;
        }
        return window.btoa(unescape(encodeURIComponent(xml)));
      };
      TapdGrapDialogHelper.prototype.bindEvent = function () {
        var _this = this;
        if (!document.querySelector('.j-tapd-grap-dialog')) {
          return;
        }
        document.querySelector('.j-tapd-grap-dialog .j-foot-btn__ensure').addEventListener('click', function (e) {
          _this.onInsertGrap(e);
          _this.editor.fire('showDialogTitle');
        });
        document.querySelectorAll('.j-tapd-grap-dialog .j-close-dialog').forEach(function (item) {
          item.addEventListener('click', function (e) {
            _this.editor.fire('showDialogTitle');
            _this.setDialogVisible(null, false);
            _this.editor.fire('closeCustomDialog');
          });
        });
        document.querySelector('.j-tapd-grap-dialog .j-set-dialog-size').addEventListener('click', function (e) {
          var dialog = document.querySelector('.j-tapd-grap-dialog');
          var target = e.target;
          var spanEl = target.closest('.j-set-dialog-size');
          var fullscreenStatus = spanEl.getAttribute('fullscreen');
          var dialogClass = '';
          if (!fullscreenStatus) {
            dialogClass = dialog.getAttribute('class').replace(/tapd-grap-dialog--normal/g, 'tapd-grap-dialog--fullscreen');
            spanEl.innerHTML = EXIT_FULL_SCREEN_ICON;
            spanEl.setAttribute('fullscreen', '1');
          } else {
            dialogClass = dialog.getAttribute('class').replace(/tapd-grap-dialog--fullscreen/g, 'tapd-grap-dialog--normal');
            spanEl.innerHTML = FULL_SCREEN_ICON;
            spanEl.setAttribute('fullscreen', '');
          }
          dialog.setAttribute('class', dialogClass);
        });
      };
      TapdGrapDialogHelper.prototype.resetDialogSize = function () {
        var dialog = document.querySelector('.j-tapd-grap-dialog');
        var dialogClass = dialog.getAttribute('class');
        if (dialogClass.indexOf('tapd-grap-dialog--fullscreen') > -1) {
          dialogClass = dialogClass.replace(/tapd-grap-dialog--fullscreen/g, 'tapd-grap-dialog--normal');
          dialog.setAttribute('class', dialogClass);
          var fullscreenIcon = document.querySelector('.j-tapd-grap-dialog .j-set-dialog-size');
          var fullscreenIconClass = fullscreenIcon.getAttribute('class');
          fullscreenIconClass = fullscreenIconClass.replace(/font-editor-fullscreen-restore/g, 'font-editor-fullscreen');
          fullscreenIcon.setAttribute('class', fullscreenIconClass);
        }
      };
      TapdGrapDialogHelper.prototype.onInsertGrap = function (e) {
        var ifram = document.getElementById('tapd-grap-dialog-iframe').contentWindow;
        ifram.postMessage({
          eventName: 'GET_GRAP_DATA',
          value: ''
        }, '*');
      };
      TapdGrapDialogHelper.prototype.base64ToFile = function (base64Data, name) {
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
      TapdGrapDialogHelper.prototype.beforeInsertXML = function (xml, cb) {
        var beforeInsertXML = this.editor.getParam('graph_before_insert_XML', '');
        if (beforeInsertXML) {
          beforeInsertXML(xml, function (id, token) {
            if (id) {
              cb('id:' + id, token);
            } else {
              cb(xml);
            }
          });
          return;
        }
        cb(xml);
      };
      TapdGrapDialogHelper.prototype.beforeParseXML = function (xml, token, cb) {
        var id = '';
        if (xml && xml.trim().indexOf('id:') === 0) {
          id = xml.trim().replace('id:', '');
        } else {
          cb(xml);
          return;
        }
        var beforeParseXML = this.editor.getParam('graph_before_parse_XML', '');
        if (beforeParseXML) {
          beforeParseXML(id, token, function (orignXML) {
            if (orignXML) {
              cb(orignXML);
            } else {
              cb(xml);
            }
          });
          return;
        }
        cb(xml);
      };
      TapdGrapDialogHelper.prototype.generateRandomKey = function () {
        return Math.random().toString(36);
      };
      TapdGrapDialogHelper.prototype.cacheGrap = function (xml) {
        this.target.setAttribute('data-origin-xml', this.encodeXml(xml));
        this.editor.fire('keyup', this.editor);
      };
      return TapdGrapDialogHelper;
    }();
    var grapDialogHelper = new TapdGrapDialogHelper();

    var drawioIcon = '<svg width="20px" height="20px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\nviewBox="0 0 850.394 850.394" enable-background="new 0 0 850.394 850.394" xml:space="preserve">\n<g>\n<g>\n<path fill="#DB8736" d="M850.39,58.74v732.91c0,32.39-25.27,58.74-56.34,58.74H56.35C25.28,850.39,0,824.04,0,791.65V58.74\n C0,26.35,25.28,0,56.35,0h737.7C825.12,0,850.39,26.35,850.39,58.74z"/>\n</g>\n<g>\n<path fill="#CA6F2E" d="M850.39,408.83v382.82c0,32.39-25.27,58.74-56.34,58.74H216.17L89.78,724l147.58-116.94l229.78-432.51\n l102.01-45.57L850.39,408.83z"/>\n</g>\n<path fill="#FFFFFF" d="M740.107,501.646H631.763L515.673,348.747h31.414c16.568,0,30-13.432,30-30V148.668\nc0-16.568-13.432-30-30-30h-243.78c-16.568,0-30,13.432-30,30v170.079c0,16.568,13.432,30,30,30h32.887L217.442,501.646H110.286\nc-16.568,0-30,13.432-30,30v170.079c0,16.568,13.432,30,30,30h243.78c16.568,0,30-13.432,30-30V531.646c0-16.568-13.432-30-30-30\nh-60.653l118.752-152.899h28.173l116.09,152.899h-60.1c-16.568,0-30,13.432-30,30v170.079c0,16.568,13.432,30,30,30h243.779\nc16.568,0,30-13.432,30-30V531.646C770.107,515.078,756.676,501.646,740.107,501.646z"/>\n</g>\n</svg>';
    function Plugin () {
      global$1.add('cherry-draw.io', function plugin(editor) {
        editor.on('openCustomDialog', function () {
          editor.getBody().setAttribute('contenteditable', 'false');
        });
        editor.on('closeCustomDialog', function () {
          editor.getBody().setAttribute('contenteditable', 'true');
        });
        editor.ui.registry.addIcon('ch-draw.io', drawioIcon);
        editor.ui.registry.addButton('ch-drawio', {
          icon: 'ch-draw.io',
          tooltip: 'Draw.io',
          onAction: function () {
            grapDialogHelper.init(editor);
            grapDialogHelper.insertEmptyImg();
            editor.fire('openCustomDialog');
          },
          onSetup: function () {
            function openDrawioDialog(event) {
              if (event.target.getAttribute('data-control') === 'tapd-graph') {
                grapDialogHelper.init(editor);
                grapDialogHelper.openGrapDialog(event.target);
                editor.fire('openCustomDialog');
              }
            }
            editor.on('click', openDrawioDialog);
            return function () {
            };
          }
        });
      });
    }

    Plugin();

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
    function Plugin$1 () {
      global$1.add('cherry-mindmap', function plugin(editor) {
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

    Plugin$1();

    var global$2 = tinymce.util.Tools.resolve('tinymce.util.I18n');

    var t = global$2.translate;
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
    function Plugin$2 () {
      global$1.add('cherry-app', function plugin(editor) {
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

    Plugin$2();

    function Plugin$3 () {
      global$1.add('cherry-alignment', function (editor) {
        editor.ui.registry.addSplitButton('ch-alignment', {
          icon: 'align-left',
          tooltip: 'Alignment',
          presets: 'listpreview',
          columns: 3,
          onAction: function () {
            return editor.execCommand('JustifyLeft');
          },
          fetch: function (callback) {
            var items = [
              {
                type: 'choiceitem',
                icon: 'align-left',
                value: 'alignleft'
              },
              {
                type: 'choiceitem',
                icon: 'align-center',
                value: 'aligncenter'
              },
              {
                type: 'choiceitem',
                icon: 'align-right',
                value: 'alignright'
              }
            ];
            callback(items);
          },
          onItemAction: function (_splitButtonApi, value) {
            if (value === 'alignleft') {
              return editor.execCommand('JustifyLeft');
            }
            if (value === 'aligncenter') {
              return editor.execCommand('JustifyCenter');
            }
            return editor.execCommand('JustifyRight');
          }
        });
      });
    }

    Plugin$3();

    function Plugin$4 () {
      global$1.add('cherry-blockquotefix', function plugin(editor) {
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

    Plugin$4();

    function Plugin$5 () {
      global$1.add('cherry-floatbar-extand', function plugin(editor) {
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

    Plugin$5();

    function Plugin$6 () {
      global$1.add('cherry-lineheight', function plugin(editor) {
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

    Plugin$6();

    function Plugin$7 () {
      global$1.add('cherry-word', function plugin(editor) {
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

    Plugin$7();

    function Plugin$8 () {
      global$1.add('cherry-video', function plugin(editor) {
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

    Plugin$8();

    function Plugin$9 () {
      global$1.add('cherry-splitline', function plugin(editor) {
        editor.ui.registry.addButton('ch-splitline', {
          icon: 'splitline',
          tooltip: 'Split Line',
          onAction: function () {
            editor.insertContent('<div><hr></div>');
          }
        });
      });
    }

    Plugin$9();

    var global$3 = tinymce.util.Tools.resolve('tinymce.util.Delay');

    function Plugin$a () {
      global$1.add('cherry-number-headings', function plugin(editor) {
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
            var contentChangeHandler = global$3.debounce(function () {
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

    Plugin$a();

    function Plugin$b () {
      global$1.add('cherry-indentation', function plugin(editor) {
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

    Plugin$b();

    var global$4 = tinymce.util.Tools.resolve('tinymce.util.LocalStorage');

    var left;
    var top;
    var _editor;
    var format = 'forecolor';
    var colorMap = [
      '#fff',
      '#efeff4',
      '#e5e5ea',
      '#d1d1d6',
      '#c7c7cc',
      '#3f4a56',
      '#4a4a4d',
      '#000000',
      '#ff3b30',
      '#ff9500',
      '#ffcc00',
      '#4cd964',
      '#5ac8fa',
      '#007aff',
      '#5856d6',
      '#bd10e0',
      '#ffd8d6',
      '#ffeacc',
      '#fff5cc',
      '#dbf7e0',
      '#def4fe',
      '#cce4ff',
      '#deddf7',
      '#f2cff9',
      '#ffb1ac',
      '#ffd599',
      '#ffeb99',
      '#bff1c7',
      '#bde9fd',
      '#99caff',
      '#bcbbef',
      '#e59ff3',
      '#ff766f',
      '#ffb54d',
      '#ffdb4d',
      '#82e493',
      '#8cd9fc',
      '#4da2ff',
      '#8a89e2',
      '#d158e9',
      '#b22922',
      '#b26800',
      '#b28e00',
      '#359746',
      '#3f8caf',
      '#0055b2',
      '#3d3c95',
      '#840b9c',
      '#661813',
      '#663c00',
      '#665200',
      '#1e5728',
      '#245064',
      '#003166',
      '#232256',
      '#4c065a'
    ];
    var arrowRight = '<svg style="height: 12px;width: 12px;color: #8091a5;" version="1.1" id="\u56fe\u5f62" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n' + '\t viewBox="90.288 58.809 850.394 850.394" enable-background="new 90.288 58.809 850.394 850.394" xml:space="preserve">\n' + '<g>\n' + '\t<path d="M322.498,909.202c-7.622,0-15.245-2.886-21.093-8.668c-11.781-11.649-11.888-30.645-0.238-42.426l368.318-372.482\n' + '\t\tL297.962,109.903c-11.65-11.782-11.543-30.776,0.238-42.426c11.783-11.649,30.777-11.542,42.426,0.238l392.381,396.817\n' + '\t\tc11.558,11.688,11.558,30.5,0,42.188L343.831,900.296C337.964,906.23,330.232,909.202,322.498,909.202z"/>\n' + '</g>\n' + '</svg>';
    function calcPositionByButton(buttonEl) {
      var rect = buttonEl.getBoundingClientRect();
      var left = rect.x;
      var top = rect.y + rect.height + 3;
      return {
        left: left,
        top: top
      };
    }
    function menuClick(editor) {
      editor.editorContainer.getElementsByClassName('tox-editor-header')[0].addEventListener('click', function (e) {
        var parent = e.target.closest('.tox-split-button');
        if (parent) {
          var position = calcPositionByButton(parent);
          left = position.left;
          top = position.top;
        }
        removeMenu();
      });
    }
    function getMenuPosition(name) {
      var _a;
      var id = name === 'forecolor' ? 'tox-icon-text-color__color' : 'tox-icon-highlight-bg-color__color';
      var buttonEl = (_a = document.querySelector('#' + id)) === null || _a === void 0 ? void 0 : _a.closest('.tox-split-button');
      if (buttonEl && !buttonEl.closest('.tox-editor-header')) {
        var position = calcPositionByButton(buttonEl);
        return position;
      }
      return {
        left: left,
        top: top
      };
    }
    function checkBoundary(menuEl) {
      var menuRect = menuEl.getBoundingClientRect();
      var bodyRect = document.body.getBoundingClientRect();
      var SPACE = 8;
      var maxRight = bodyRect.right - SPACE;
      if (menuRect.right > maxRight) {
        menuEl.style.left = menuRect.left - (menuRect.right - maxRight) + 'px';
      }
    }
    var cell = function (initial) {
      var value = {
        forecolor: '#ff3b30',
        hilitecolor: '#ffcc00'
      };
      var get = function (format) {
        return value[format];
      };
      var set = function (v, format) {
        value[format] = v;
      };
      return {
        get: get,
        set: set
      };
    };
    var lastColor = cell();
    var calcCols = function (colors) {
      return Math.max(5, Math.ceil(Math.sqrt(colors)));
    };
    var getColorCols$1 = function (editor) {
      var defaultCols = calcCols(colorMap.length);
      return getColorCols(editor, defaultCols);
    };
    var getColorCols = function (editor, defaultCols) {
      return editor.getParam('color_cols', defaultCols, 'number');
    };
    var setIconColor = function (splitButtonApi, name, newColor) {
      var setIconFillAndStroke = function (pathId, color) {
        splitButtonApi.setIconFill(pathId, color);
        splitButtonApi.setIconStroke(pathId, color);
      };
      var id = name === 'forecolor' ? 'tox-icon-text-color__color' : 'tox-icon-highlight-bg-color__color';
      setIconFillAndStroke(id, newColor);
    };
    var constant = function (value) {
      return function () {
        return value;
      };
    };
    var fireTextColorChange = function (editor, data) {
      return editor.fire('TextColorChange', data);
    };
    var noop = function () {
    };
    var some = function (a) {
      var constantA = constant(a);
      var bind = function (f) {
        return f(a);
      };
      var me = {
        getOr: constantA,
        each: function (f) {
          f(a);
        },
        bind: bind,
        toString: function () {
          return 'some(' + a + ')';
        }
      };
      return me;
    };
    var from = function (value) {
      return value === null || value === undefined ? NONE : some(value);
    };
    var none = function () {
      return NONE;
    };
    var NONE = function () {
      var id = function (n) {
        return n;
      };
      var me = {
        getOr: id,
        each: noop,
        bind: none,
        toString: constant('none()')
      };
      return me;
    }();
    var Option = {
      some: some,
      none: none,
      from: from
    };
    var applyColor = function (editor, format, value, onChoice) {
      onChoice(value);
      editor.execCommand('mceApplyTextcolor', format, value);
    };
    var colorPickerDialog = function (editor) {
      return function (callback, value) {
        var getOnSubmit = function (callback) {
          return function (api) {
            editor.fire('showDialogTitle');
            var data = api.getData();
            callback(Option.from(data.colorpicker));
            api.close();
          };
        };
        var onAction = function (api, details) {
          if (details.name === 'hex-valid') {
            if (details.value) {
              api.enable('ok');
            } else {
              api.disable('ok');
            }
          }
        };
        var initialData = { colorpicker: value };
        var submit = getOnSubmit(callback);
        editor.windowManager.open({
          title: 'Color Picker',
          size: 'normal',
          body: {
            type: 'panel',
            items: [{
                type: 'colorpicker',
                name: 'colorpicker',
                label: 'Color'
              }]
          },
          buttons: [
            {
              type: 'cancel',
              name: 'cancel',
              text: 'Cancel'
            },
            {
              type: 'submit',
              name: 'save',
              text: 'Save',
              primary: true
            }
          ],
          initialData: initialData,
          onAction: onAction,
          onSubmit: submit,
          onClose: function () {
          },
          onCancel: function () {
            callback(Option.none());
            editor.fire('showDialogTitle');
          }
        });
      };
    };
    var addColor = function (color) {
      colorCache.add(color);
    };
    var colorCache = getColorCache(10);
    var indexOf = function (xs, x) {
      var r = rawIndexOf(xs, x);
      return r === -1 ? Option.none() : Option.some(r);
    };
    var rawIndexOf = function (ts, t) {
      return nativeIndexOf.call(ts, t);
    };
    var nativeIndexOf = Array.prototype.indexOf;
    function getColorCache(maxCopy) {
      var max = maxCopy;
      if (max === void 0) {
        max = 8;
      }
      var prune = function (list) {
        var diff = max - list.length;
        return diff < 0 ? list.slice(0, max) : list;
      };
      var add = function (key) {
        var localstorage = getLocalStorage(format === 'forecolor' ? 'choose-colors' : 'back-colors');
        var cache = prune(localstorage);
        var remove = function (idx) {
          cache.splice(idx, 1);
        };
        indexOf(cache, key).each(remove);
        cache.unshift(key);
        if (cache.length > max) {
          cache.pop();
        }
        global$4.setItem(format === 'forecolor' ? 'choose-colors' : 'back-colors', JSON.stringify(cache));
      };
      return { add: add };
    }
    function colorPicker(onChoice, name) {
      var dialog = colorPickerDialog(_editor);
      dialog(function (colorOpt) {
        colorOpt.each(function (color) {
          addColor(color);
          _editor.execCommand('mceApplyTextcolor', name, color);
          onChoice(color);
        });
      }, '#000000');
    }
    function clickColor(e, name) {
      var target = e.target;
      if (target.tagName === 'I') {
        target = target.parentNode;
      }
      if (!target.style.background) {
        return;
      }
      applyColor(_editor, name, target.style.background, function (newColor) {
        var hexNewColor = rgbToHex(newColor);
        lastColor.set(hexNewColor, format);
        addColor(hexNewColor);
        fireTextColorChange(_editor, {
          name: name,
          color: hexNewColor
        });
      });
    }
    function getLocalStorage(name) {
      var storageString = global$4.getItem(name);
      return typeof storageString === 'string' ? JSON.parse(storageString) : [];
    }
    function removeMenu() {
      var menu = document.getElementById('menu-dropdown');
      if (menu) {
        menu.parentNode.removeChild(document.getElementById('menu-dropdown'));
      }
    }
    function rgbToHex(rgb) {
      if (rgb && rgb.indexOf('#') >= 0) {
        return rgb;
      }
      var color = rgb.toString().match(/\d+/g);
      var hex = '#';
      for (var i_1 = 0; i_1 < 3; i_1++) {
        hex += ('0' + Number(color[i_1]).toString(16)).slice(-2);
      }
      return hex;
    }
    var i = '<i style="border-right: 2px solid white;\n' + 'border-top: 2px solid white;' + 'transform: rotate(132deg);' + 'position: absolute;' + 'top: 3px;' + 'left: 3px;' + 'height: 4px;' + 'width: 7px;' + 'display: block;"></i>';
    function menu(editor, colors, name) {
      removeMenu();
      var recentColor = lastColor.get(format);
      if (recentColor) {
        recentColor = rgbToHex(recentColor);
      }
      var colorMap = colors.map(function (item, index) {
        var div = document.createElement('div');
        div.setAttribute('style', 'background: ' + item + '; margin:3px 3px; width: 16px; height: 16px;border-radius: 2px; cursor: pointer;display: inline-block');
        if (index === 0) {
          div.style.border = '1px solid #e8e8e8';
          div.style.boxSizing = 'border-box';
        }
        if (recentColor === item) {
          div.style.position = 'relative';
        }
        div.innerHTML = i;
        return div;
      });
      var columns = getColorCols$1(editor);
      var menuDropDown = document.createElement('div');
      var _loop_1 = function (i_2) {
        var row = document.createElement('div');
        colorMap.splice(0, columns).forEach(function (item) {
          row.appendChild(item);
        });
        row.setAttribute('style', 'text-align: center; height: 22px');
        if (i_2 === 0 || i_2 === 1) {
          row.style.margin = '4px 0';
        }
        row.addEventListener('click', function (e) {
          clickColor(e, name);
        });
        menuDropDown.appendChild(row);
      };
      for (var i_2 = 0; i_2 < columns && colorMap.length; i_2++) {
        _loop_1(i_2);
      }
      var localStorage = getLocalStorage(format === 'forecolor' ? 'choose-colors' : 'back-colors');
      var useRecently = document.createElement('div');
      useRecently.innerHTML = '<h3 style="font-size: 12px; color: #8091a5;font-weight: normal;margin: 0 3px 7px">' + global$2.translate('History Color') + '</h3>';
      useRecently.setAttribute('style', 'padding: 5px 13px;');
      var usedRow = document.createElement('div');
      usedRow.style.textAlign = 'center';
      for (var i_3 = 0; i_3 < columns && localStorage.length; i_3++) {
        var div = document.createElement('div');
        div.setAttribute('style', 'background: ' + localStorage[i_3] + '; margin:3px 3px 5px; width: 16px; height: 16px;border-radius: 2px; cursor: pointer;display: inline-block');
        usedRow.appendChild(div);
      }
      usedRow.addEventListener('click', function (e) {
        clickColor(e, name);
      });
      useRecently.appendChild(usedRow);
      menuDropDown.appendChild(useRecently);
      var customColor = document.createElement('div');
      customColor.innerHTML = '<h3 style="font-size: 12px; font-weight: normal;margin: 0;cursor: pointer;">' + global$2.translate('Custom color') + '</h3>' + arrowRight;
      customColor.setAttribute('style', 'padding: 10px 13px; border-top: 1px solid #C5D7EF;display: flex;align-items: center;justify-content: space-between;');
      customColor.addEventListener('click', function () {
        editor.fire('disableDialogTitle');
        colorPicker(function (newColor) {
          var hexNewColor = rgbToHex(newColor);
          lastColor.set(hexNewColor, format);
          fireTextColorChange(editor, {
            name: name,
            color: hexNewColor
          });
        }, name);
      });
      menuDropDown.appendChild(customColor);
      var position = getMenuPosition(name);
      menuDropDown.setAttribute('style', 'top: ' + position.top + 'px; left: ' + position.left + 'px;background: white; z-index: 2000; width: 202px; border: 1px solid #C5D7EF; box-shadow: 0 6px 12px rgba(0,0,0,0.09); padding: 5px 0; position: absolute');
      menuDropDown.setAttribute('id', 'menu-dropdown');
      document.body.appendChild(menuDropDown);
      checkBoundary(menuDropDown);
    }
    var getFetch = function (editor, name) {
      format = name;
      menu(editor, colorMap, name);
      editor.on('click', function () {
        removeMenu();
      });
    };
    var onItemAction = function (editor, _splitButtonApi, value) {
      applyColor(editor, format, value, function (newColor) {
        var hexNewColor = rgbToHex(newColor);
        lastColor.set(hexNewColor, format);
        fireTextColorChange(editor, {
          name: name,
          color: hexNewColor
        });
      });
    };
    var onSetup = function (editor, splitButtonApi, name) {
      _editor = editor;
      menuClick(_editor);
      setIconColor(splitButtonApi, name, lastColor.get(name));
      var handler = function (e) {
        setIconColor(splitButtonApi, e.name, lastColor.get(e.name));
      };
      editor.on('TextColorChange', handler);
      return function () {
        editor.off('TextColorChange', handler);
      };
    };
    var onAction = function (editor, name) {
      format = name;
      if (lastColor.get(format) !== null) {
        applyColor(editor, name, lastColor.get(format), function () {
        });
      }
    };

    function Plugin$c () {
      var backCmdName = 'hilitecolor';
      var textCmdName = 'forecolor';
      global$1.add('cherry-colorpicker', function plugin(editor) {
        document.body.addEventListener('click', removeMenu);
        editor.ui.registry.addSplitButton('ch-text-color', {
          icon: 'color-picker-text',
          tooltip: 'Text Colour',
          columns: getColorCols$1(editor),
          fetch: function () {
            getFetch(editor, textCmdName);
          },
          onAction: function (_splitButtonApi) {
            onAction(editor, textCmdName);
          },
          onItemAction: function (_splitButtonApi, value) {
            onItemAction(editor, _splitButtonApi, value);
          },
          onSetup: function (splitButtonApi) {
            onSetup(editor, splitButtonApi, textCmdName);
          }
        });
        editor.ui.registry.addSplitButton('ch-back-color', {
          icon: 'color-picker-back',
          tooltip: 'Background Colour',
          columns: getColorCols$1(editor),
          fetch: function () {
            getFetch(editor, backCmdName);
          },
          onAction: function (_splitButtonApi) {
            onAction(editor, backCmdName);
          },
          onItemAction: function (_splitButtonApi, value) {
            onItemAction(editor, _splitButtonApi, value);
          },
          onSetup: function (splitButtonApi) {
            onSetup(editor, splitButtonApi, backCmdName);
          }
        });
      });
    }

    Plugin$c();

    var noop$1 = function () {
    };
    var constant$1 = function (value) {
      return function () {
        return value;
      };
    };
    var never = constant$1(false);
    var always = constant$1(true);

    var none$1 = function () {
      return NONE$1;
    };
    var NONE$1 = function () {
      var eq = function (o) {
        return o.isNone();
      };
      var call = function (thunk) {
        return thunk();
      };
      var id = function (n) {
        return n;
      };
      var me = {
        fold: function (n, _s) {
          return n();
        },
        is: never,
        isSome: never,
        isNone: always,
        getOr: id,
        getOrThunk: call,
        getOrDie: function (msg) {
          throw new Error(msg || 'error: getOrDie called on none.');
        },
        getOrNull: constant$1(null),
        getOrUndefined: constant$1(undefined),
        or: id,
        orThunk: call,
        map: none$1,
        each: noop$1,
        bind: none$1,
        exists: never,
        forall: always,
        filter: none$1,
        equals: eq,
        equals_: eq,
        toArray: function () {
          return [];
        },
        toString: constant$1('none()')
      };
      return me;
    }();
    var some$1 = function (a) {
      var constant_a = constant$1(a);
      var self = function () {
        return me;
      };
      var bind = function (f) {
        return f(a);
      };
      var me = {
        fold: function (n, s) {
          return s(a);
        },
        is: function (v) {
          return a === v;
        },
        isSome: always,
        isNone: never,
        getOr: constant_a,
        getOrThunk: constant_a,
        getOrDie: constant_a,
        getOrNull: constant_a,
        getOrUndefined: constant_a,
        or: self,
        orThunk: self,
        map: function (f) {
          return some$1(f(a));
        },
        each: function (f) {
          f(a);
        },
        bind: bind,
        exists: bind,
        forall: bind,
        filter: function (f) {
          return f(a) ? me : NONE$1;
        },
        toArray: function () {
          return [a];
        },
        toString: function () {
          return 'some(' + a + ')';
        },
        equals: function (o) {
          return o.is(a);
        },
        equals_: function (o, elementEq) {
          return o.fold(never, function (b) {
            return elementEq(a, b);
          });
        }
      };
      return me;
    };
    var from$1 = function (value) {
      return value === null || value === undefined ? NONE$1 : some$1(value);
    };
    var Optional = {
      some: some$1,
      none: none$1,
      from: from$1
    };

    var get = function (xs, i) {
      return i >= 0 && i < xs.length ? Optional.some(xs[i]) : Optional.none();
    };
    var head = function (xs) {
      return get(xs, 0);
    };

    var global$5 = tinymce.util.Tools.resolve('tinymce.dom.TreeWalker');

    var global$6 = tinymce.util.Tools.resolve('tinymce.util.Tools');

    var isLinkUneditable = function (editor, disableMode) {
      var root = editor.selection.getNode();
      return findUneditableLink(root) || false;
      function findUneditableLink(node) {
        var isFound = false;
        if (!node) {
          return false;
        }
        if (node.nodeName === 'A' && node.getAttribute('is-tapdlink') && disableMode.indexOf(node.getAttribute('mode')) > -1) {
          return true;
        } else if (node.nodeName !== 'A') {
          var uneditableList = node.querySelectorAll('a[is-tapdlink="true"]');
          if (!uneditableList.length) {
            return false;
          }
          uneditableList.forEach(function (item) {
            isFound = isFound || findUneditableLink(item);
          });
        }
        return isFound;
      }
    };

    function Plugin$d () {
      var t = window;
      function n() {
      }
      function d(n) {
        return function () {
          return n;
        };
      }
      function e() {
        return c;
      }
      var r;
      var i = d(!1);
      var u = d(!0);
      var c = (r = {
        fold: function (n, e) {
          return n();
        },
        is: i,
        isSome: i,
        isNone: u,
        getOr: f,
        getOrThunk: s,
        getOrDie: function (n) {
          throw new Error(n || 'error: getOrDie called on none.');
        },
        getOrNull: d(null),
        getOrUndefined: d(void 0),
        or: f,
        orThunk: s,
        map: e,
        each: n,
        bind: e,
        exists: i,
        forall: u,
        filter: e,
        equals: o,
        equals_: o,
        toArray: function () {
          return [];
        },
        toString: d('none()')
      }, Object.freeze && Object.freeze(r), r);
      function o(n) {
        return n.isNone();
      }
      function s(n) {
        return n();
      }
      function f(n) {
        return n;
      }
      function g(e) {
        return function (n) {
          return function (n) {
            if (null === n) {
              return 'null';
            }
            var e = typeof n;
            return 'object' == e && (Array.prototype.isPrototypeOf(n) || n.constructor && 'Array' === n.constructor.name) ? 'array' : 'object' == e && (String.prototype.isPrototypeOf(n) || n.constructor && 'String' === n.constructor.name) ? 'string' : e;
          }(n) === e;
        };
      }
      function p(n, e) {
        return -1 < function (n, e) {
          return en.call(n, e);
        }(n, e);
      }
      function N(n, e) {
        for (var r = n.length, t = new Array(r), o = 0; o < r; o++) {
          var i_1 = n[o];
          t[o] = e(i_1, o);
        }
        return t;
      }
      function O(n, e) {
        for (var r_1 = 0, t_1 = n.length; r_1 < t_1; r_1++) {
          e(n[r_1], r_1);
        }
      }
      function w(n) {
        return n.dom().nodeName.toLowerCase();
      }
      function x(n, e, r) {
        if (!(K(r) || J(r) || Z(r))) {
          throw t.console.error('Invalid call to Attr.set. Key ', e, ':: Value ', r, ':: Element ', n), new Error('Attribute value was not simple');
        }
        n.setAttribute(e, '' + r);
      }
      function T(n, e, r) {
        x(n.dom(), e, r);
      }
      function E(n, e) {
        var r = n.dom();
        !function (n, e) {
          for (var r_2 = W(n), t_2 = 0, o_1 = r_2.length; t_2 < o_1; t_2++) {
            var i_2 = r_2[t_2];
            e(n[i_2], i_2);
          }
        }(e, function (n, e) {
          x(r, e, n);
        });
      }
      function S(n, e) {
        n.dom().removeAttribute(e);
      }
      function k(n) {
        return function (n, e, r) {
          return O(n, function (n) {
            r = e(r, n);
          }), r;
        }(n.dom().attributes, function (n, e) {
          return n[e.name] = e.value, n;
        }, {});
      }
      function D(n, e) {
        var r = function (n, e) {
          var r = n.dom().getAttribute(e);
          return null === r ? void 0 : r;
        }(n, e);
        return void 0 === r || '' === r ? [] : r.split(' ');
      }
      function y(n) {
        return void 0 !== n.dom().classList;
      }
      function b(n) {
        return D(n, 'class');
      }
      function C(n, e) {
        return function (n, e, r) {
          var t = D(n, e).concat([r]);
          return T(n, e, t.join(' ')), !0;
        }(n, 'class', e);
      }
      function L(n, e) {
        return function (n, e, r) {
          var t = function (n, e) {
            for (var r = [], t = 0, o = n.length; t < o; t++) {
              var i_3 = n[t];
              e(i_3, t) && r.push(i_3);
            }
            return r;
          }(D(n, e), function (n) {
            return n !== r;
          });
          return 0 < t.length ? T(n, e, t.join(' ')) : S(n, e), !1;
        }(n, 'class', e);
      }
      function A(n, e) {
        y(n) ? n.dom().classList.add(e) : C(n, e);
      }
      function _(n, e) {
        y(n) ? n.dom().classList.remove(e) : L(n, e), function (n) {
          0 === (y(n) ? n.dom().classList : b(n)).length && S(n, 'class');
        }(n);
      }
      function M(n, e) {
        return y(n) ? n.dom().classList.toggle(e) : function (n, e) {
          return p(b(n), e) ? L(n, e) : C(n, e);
        }(n, e);
      }
      function R(n, e) {
        return y(n) && n.dom().classList.contains(e);
      }
      function j(n, e) {
        var r = function (n, e) {
          for (var r_3 = 0; r_3 < n.length; r_3++) {
            var t_3 = n[r_3];
            if (t_3.test(e)) {
              return t_3;
            }
          }
        }(n, e);
        if (!r) {
          return {
            major: 0,
            minor: 0
          };
        }
        function t(n) {
          return Number(e.replace(r, '$' + n));
        }
        return an(t(1), t(2));
      }
      function P(n, e) {
        return function () {
          return e === n;
        };
      }
      function B(n, e) {
        return function () {
          return e === n;
        };
      }
      function F(n, e) {
        var r = String(e).toLowerCase();
        return function (n, e) {
          for (var r_4 = 0, t_4 = n.length; r_4 < t_4; r_4++) {
            var o_2 = n[r_4];
            if (e(o_2, r_4)) {
              return H.some(o_2);
            }
          }
          return H.none();
        }(n, function (n) {
          return n.search(r);
        });
      }
      function U(n, e) {
        return -1 !== n.indexOf(e);
      }
      function X(e) {
        return function (n) {
          return U(n, e);
        };
      }
      function q(n, e) {
        var r = n.dom();
        if (r.nodeType !== Ln) {
          return !1;
        }
        var t = r;
        if (void 0 !== t.matches) {
          return t.matches(e);
        }
        if (void 0 !== t.msMatchesSelector) {
          return t.msMatchesSelector(e);
        }
        if (void 0 !== t.webkitMatchesSelector) {
          return t.webkitMatchesSelector(e);
        }
        if (void 0 !== t.mozMatchesSelector) {
          return t.mozMatchesSelector(e);
        }
        throw new Error('Browser lacks native selectors');
      }
      function V(n, e) {
        var r = void 0 === e ? t.document : e.dom();
        return function (n) {
          return n.nodeType !== Ln && n.nodeType !== An || 0 === n.childElementCount;
        }(r) ? [] : N(r.querySelectorAll(n), Cn.fromDom);
      }
      var Y;
      var z = function (r) {
        function n() {
          return o;
        }
        function e(n) {
          return n(r);
        }
        var t = d(r);
        var o = {
          fold: function (n, e) {
            return e(r);
          },
          is: function (n) {
            return r === n;
          },
          isSome: u,
          isNone: i,
          getOr: t,
          getOrThunk: t,
          getOrDie: t,
          getOrNull: t,
          getOrUndefined: t,
          or: n,
          orThunk: n,
          map: function (n) {
            return z(n(r));
          },
          each: function (n) {
            n(r);
          },
          bind: e,
          exists: e,
          forall: e,
          filter: function (n) {
            return n(r) ? o : c;
          },
          toArray: function () {
            return [r];
          },
          toString: function () {
            return 'some(' + r + ')';
          },
          equals: function (n) {
            return n.is(r);
          },
          equals_: function (n, e) {
            return n.fold(i, function (n) {
              return e(r, n);
            });
          }
        };
        return o;
      };
      var H = {
        some: z,
        none: e,
        from: function (n) {
          return null == n ? c : z(n);
        }
      };
      var W = Object.keys;
      var G = Object.hasOwnProperty;
      var $ = function (n, e) {
        return G.call(n, e);
      };
      var K = g('string');
      var J = g('boolean');
      var Q = g('function');
      var Z = g('number');
      var en = Array.prototype.indexOf;
      var rn = (Q(Array.from) && Array.from, t.Node.DOCUMENT_NODE);
      var tn = (t.Node.ELEMENT_NODE);
      var on = t.Node.TEXT_NODE;
      var un = (void 0 !== t.window ? t.window : Function('return this;')(), Y = on, function (n) {
        return function (n) {
          return n.dom().nodeType;
        }(n) === Y;
      });
      var sn = function (n) {
        function e() {
          return r;
        }
        var r = n;
        return {
          get: e,
          set: function (n) {
            r = n;
          },
          clone: function () {
            return sn(e());
          }
        };
      };
      var fn = function () {
        return an(0, 0);
      };
      var an = function (n, e) {
        return {
          major: n,
          minor: e
        };
      };
      var ln = {
        nu: an,
        detect: function (n, e) {
          var r = String(e).toLowerCase();
          return 0 === n.length ? fn() : j(n, r);
        },
        unknown: fn
      };
      var dn = 'Firefox';
      var mn = function (n) {
        var e = n.current;
        return {
          current: e,
          version: n.version,
          isEdge: P('Edge', e),
          isChrome: P('Chrome', e),
          isIE: P('IE', e),
          isOpera: P('Opera', e),
          isFirefox: P(dn, e),
          isSafari: P('Safari', e)
        };
      };
      var vn = {
        unknown: function () {
          return mn({
            current: void 0,
            version: ln.unknown()
          });
        },
        nu: mn,
        edge: d('Edge'),
        chrome: d('Chrome'),
        ie: d('IE'),
        opera: d('Opera'),
        firefox: d(dn),
        safari: d('Safari')
      };
      var hn = 'Windows';
      var gn = 'Android';
      var pn = 'Solaris';
      var Nn = 'FreeBSD';
      var On = function (n) {
        var e = n.current;
        return {
          current: e,
          version: n.version,
          isWindows: B(hn, e),
          isiOS: B('iOS', e),
          isAndroid: B(gn, e),
          isOSX: B('OSX', e),
          isLinux: B('Linux', e),
          isSolaris: B(pn, e),
          isFreeBSD: B(Nn, e)
        };
      };
      var wn = {
        unknown: function () {
          return On({
            current: void 0,
            version: ln.unknown()
          });
        },
        nu: On,
        windows: d(hn),
        ios: d('iOS'),
        android: d(gn),
        linux: d('Linux'),
        osx: d('OSX'),
        solaris: d(pn),
        freebsd: d(Nn)
      };
      var xn = function (n, r) {
        return F(n, r).map(function (n) {
          var e = ln.detect(n.versionRegexes, r);
          return {
            current: n.name,
            version: e
          };
        });
      };
      var Tn = function (n, r) {
        return F(n, r).map(function (n) {
          var e = ln.detect(n.versionRegexes, r);
          return {
            current: n.name,
            version: e
          };
        });
      };
      var En = /.*?version\/\ ?([0-9]+)\.([0-9]+).*/;
      var Sn = [
        {
          name: 'Edge',
          versionRegexes: [/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],
          search: function (n) {
            return U(n, 'edge/') && U(n, 'chrome') && U(n, 'safari') && U(n, 'applewebkit');
          }
        },
        {
          name: 'Chrome',
          versionRegexes: [
            /.*?chrome\/([0-9]+)\.([0-9]+).*/,
            En
          ],
          search: function (n) {
            return U(n, 'chrome') && !U(n, 'chromeframe');
          }
        },
        {
          name: 'IE',
          versionRegexes: [
            /.*?msie\ ?([0-9]+)\.([0-9]+).*/,
            /.*?rv:([0-9]+)\.([0-9]+).*/
          ],
          search: function (n) {
            return U(n, 'msie') || U(n, 'trident');
          }
        },
        {
          name: 'Opera',
          versionRegexes: [
            En,
            /.*?opera\/([0-9]+)\.([0-9]+).*/
          ],
          search: X('opera')
        },
        {
          name: 'Firefox',
          versionRegexes: [/.*?firefox\/\ ?([0-9]+)\.([0-9]+).*/],
          search: X('firefox')
        },
        {
          name: 'Safari',
          versionRegexes: [
            En,
            /.*?cpu os ([0-9]+)_([0-9]+).*/
          ],
          search: function (n) {
            return (U(n, 'safari') || U(n, 'mobile/')) && U(n, 'applewebkit');
          }
        }
      ];
      var kn = [
        {
          name: 'Windows',
          search: X('win'),
          versionRegexes: [/.*?windows\ nt\ ?([0-9]+)\.([0-9]+).*/]
        },
        {
          name: 'iOS',
          search: function (n) {
            return U(n, 'iphone') || U(n, 'ipad');
          },
          versionRegexes: [
            /.*?version\/\ ?([0-9]+)\.([0-9]+).*/,
            /.*cpu os ([0-9]+)_([0-9]+).*/,
            /.*cpu iphone os ([0-9]+)_([0-9]+).*/
          ]
        },
        {
          name: 'Android',
          search: X('android'),
          versionRegexes: [/.*?android\ ?([0-9]+)\.([0-9]+).*/]
        },
        {
          name: 'OSX',
          search: X('os x'),
          versionRegexes: [/.*?os\ x\ ?([0-9]+)_([0-9]+).*/]
        },
        {
          name: 'Linux',
          search: X('linux'),
          versionRegexes: []
        },
        {
          name: 'Solaris',
          search: X('sunos'),
          versionRegexes: []
        },
        {
          name: 'FreeBSD',
          search: X('freebsd'),
          versionRegexes: []
        }
      ];
      var Dn = {
        browsers: d(Sn),
        oses: d(kn)
      };
      var yn = sn(function (n, e) {
        var r = Dn.browsers();
        var t = Dn.oses();
        var o = xn(r, n).fold(vn.unknown, vn.nu);
        var i = Tn(t, n).fold(wn.unknown, wn.nu);
        return {
          browser: o,
          os: i,
          deviceType: function (n, e, r, t) {
            var o = n.isiOS() && !0 === /ipad/i.test(r);
            var i = n.isiOS() && !o;
            var u = n.isiOS() || n.isAndroid();
            var c = u || t('(pointer:coarse)');
            var s = o || !i && u && t('(min-device-width:768px)');
            var f = i || u && !s;
            var a = e.isSafari() && n.isiOS() && !1 === /safari/i.test(r);
            var l = !f && !s && !a;
            return {
              isiPad: d(o),
              isiPhone: d(i),
              isTablet: d(s),
              isPhone: d(f),
              isTouch: d(c),
              isAndroid: n.isAndroid,
              isiOS: n.isiOS,
              isWebView: d(a),
              isDesktop: d(l)
            };
          }(i, o, n, e)
        };
      }(t.navigator.userAgent, function (n) {
        return t.window.matchMedia(n).matches;
      }));
      var bn = function (n) {
        if (null == n) {
          throw new Error('Node cannot be null or undefined');
        }
        return { dom: d(n) };
      };
      var Cn = {
        fromHtml: function (n, e) {
          var r = (e || t.document).createElement('div');
          if (r.innerHTML = n, !r.hasChildNodes() || 1 < r.childNodes.length) {
            throw t.console.error('HTML does not have a single root node', n), new Error('HTML must have a single root node');
          }
          return bn(r.childNodes[0]);
        },
        fromTag: function (n, e) {
          var r = (e || t.document).createElement(n);
          return bn(r);
        },
        fromText: function (n, e) {
          var r = (e || t.document).createTextNode(n);
          return bn(r);
        },
        fromDom: bn,
        fromPoint: function (n, e, r) {
          var t = n.dom();
          return H.from(t.elementFromPoint(e, r)).map(bn);
        }
      };
      var Ln = tn;
      var An = rn;
      yn.get().browser.isIE();
      function _n(n, e, r, t, o) {
        return n(r, t) ? H.some(r) : Q(o) && o(r) ? H.none() : e(r, t, o);
      }
      function Mn(n, e, r) {
        for (var t_5 = n.dom(), o_3 = Q(r) ? r : d(!1); t_5.parentNode;) {
          t_5 = t_5.parentNode;
          var i_4 = Cn.fromDom(t_5);
          if (e(i_4)) {
            return H.some(i_4);
          }
          if (o_3(i_4)) {
            break;
          }
        }
        return H.none();
      }
      function Rn(n) {
        return H.from(n.dom().parentNode).map(Cn.fromDom);
      }
      function In(n) {
        return N(n.dom().childNodes, Cn.fromDom);
      }
      function jn(n) {
        return function (n, e) {
          var r = n.dom().childNodes;
          return H.from(r[e]).map(Cn.fromDom);
        }(n, 0);
      }
      function Pn(n, e) {
        var r = function (n, e) {
          var r = Cn.fromTag(e);
          var t = k(n);
          return E(r, t), r;
        }(n, e);
        return function (e, r) {
          Rn(e).each(function (n) {
            n.dom().insertBefore(r.dom(), e.dom());
          });
        }(n, r), function (e, n) {
          O(n, function (n) {
            !function (n, e) {
              n.dom().appendChild(e.dom());
            }(e, n);
          });
        }(r, In(n)), function (n) {
          var e = n.dom();
          null !== e.parentNode && e.parentNode.removeChild(e);
        }(n), r;
      }
      function Bn(n, e, r) {
        return Mn(n, function (n) {
          return q(n, e);
        }, r);
      }
      function Fn(i) {
        function u(n) {
          return 'ol' === w(n) || 'ul' === w(n);
        }
        function n() {
          (function (n, e, r) {
            return _n(function (n, e) {
              return e(n);
            }, Mn, n, e, r);
          }(Cn.fromDom(i.selection.getNode()), u).fold(function () {
            if (isLinkUneditable(i, ['card'])) {
              return;
            }
            i.execCommand('InsertUnorderedList', !1, { 'list-attributes': { class: 'tox-checklist' } });
          }, function (e) {
            i.undoManager.transact(function () {
              if (R(e, 'tox-checklist')) {
                i.execCommand('RemoveList');
              } else {
                var n_1 = Pn(e, 'ul');
                A(n_1, 'tox-checklist');
              }
            });
          }));
        }
        i.ui.registry.addToggleButton('ch-checklist', {
          icon: 'checklist',
          tooltip: 'Insert Checklist',
          onAction: n,
          onSetup: function (e) {
            function r(n) {
              return function (n, e) {
                return n.dom() === e.dom();
              }(n, o) || u(n);
            }
            function t(n) {
              return e.setActive(!i.readonly && function (n, e, r) {
                return _n(q, Bn, n, e, r);
              }(Cn.fromDom(n), '.tox-checklist', r).isSome());
            }
            function n(n) {
              return t(n.element);
            }
            var o = Cn.fromDom(i.getBody());
            return i.on('NodeChange', n), t(i.selection.getNode()), function () {
              return i.off('NodeChange', n);
            };
          }
        }), i.ui.registry.addMenuItem('ch-checklist', {
          icon: 'checklist',
          text: 'Checklist',
          onAction: n
        });
      }
      !function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        for (var n_2 = [], e_1 = 0; e_1 < arguments.length; e_1++) {
          n_2[e_1] = arguments[e_1];
        }
      }('element', 'offset');
      function Un(n, e) {
        return void 0 !== n ? n : void 0 !== e ? e : 0;
      }
      function Xn(n) {
        return 'li' === w(n) && function (n) {
          return Rn(n).filter(function (n) {
            return 'ul' === w(n) && R(n, 'tox-checklist');
          }).isSome();
        }(n);
      }
      function qn(n, e) {
        return H.from(n).filter(Xn).exists(function (n) {
          return e < function (n) {
            var e = n.dom().ownerDocument;
            var r = e.body;
            var t = e.defaultView;
            var o = e.documentElement;
            if (r === n.dom()) {
              return $n(r.offsetLeft, r.offsetTop);
            }
            var i = Un(t.pageYOffset, o.scrollTop);
            var u = Un(t.pageXOffset, o.scrollLeft);
            var c = Un(o.clientTop, r.clientTop);
            var s = Un(o.clientLeft, r.clientLeft);
            return Kn(n).translate(u - s, i - c);
          }(n).left();
        });
      }
      function Vn(n) {
        return M(n, 'tox-checklist--checked');
      }
      function Yn(n) {
        return p([
          'ul',
          'ol',
          'dl'
        ], w(n));
      }
      function zn(n) {
        return H.from(n).filter(function (n) {
          return R(n, 'tox-checklist');
        }).bind(jn).map(function (n) {
          'li' === w(n) && jn(n).exists(function (n) {
            return 'ul' === w(n);
          }) && A(n, 'tox-checklist--hidden');
        }), n;
      }
      function Hn(n) {
        n.on('ListMutation', function (n) {
          var e = H.from(n.element).map(Cn.fromDom);
          'IndentList' === n.action || 'OutdentList' === n.action ? e.map(zn).map(function (n) {
            return O(function (n, e) {
              return V(e, n);
            }(n, 'ul'), function (n) {
              return zn(n);
            });
          }) : 'ToggleUlList' !== n.action && 'ToggleOlList' !== n.action && 'ToggleDLList' !== n.action || e.filter(Yn).map(function (n) {
            _(n, 'tox-checklist'), O(In(n), function (n) {
              return _(n, 'tox-checklist--checked');
            });
          });
        });
      }
      function Wn(n) {
        n.on('init', function () {
          !function (n, e) {
            return $(n, e) ? H.from(n[e]) : H.none();
          }(n.plugins, 'lists').isNone() || n.windowManager.alert('Please use the Checklist Plugin together with the Lists plugin.');
        }), Hn(n), Fn(n), function (e) {
          e.shortcuts.add('meta+13', 'Check checklist item', function () {
            var n = e.selection.getSelectedBlocks();
            O(n, function (n) {
              var e = Cn.fromDom(n);
              Xn(e) && Vn(e);
            });
          });
        }(n), function (r) {
          var t = sn(H.none());
          r.on('mousedown touchstart', function (n) {
            var e = Cn.fromDom(n.target);
            !function (e, n) {
              return n.exists(function (n) {
                return 'touchstart' === n.type && 'mousedown' === e.type && e.timeStamp - n.timeStamp < 250;
              });
            }(n, t.get()) && qn(e, function (n) {
              return function (n) {
                return 'touchstart' === n.type;
              }(n) ? n.touches[0].clientX : n.clientX;
            }(n)) && (t.set(H.some(n)), r.undoManager.transact(function () {
              n.preventDefault(), Vn(e);
            }));
          });
        }(n);
      }
      var Gn = function (r, t) {
        return {
          left: d(r),
          top: d(t),
          translate: function (n, e) {
            return Gn(r + n, t + e);
          }
        };
      };
      var $n = Gn;
      var Kn = function (n) {
        var e = n.dom();
        var r = e.ownerDocument.body;
        return r === e ? $n(r.offsetLeft, r.offsetTop) : function (n) {
          var e = un(n) ? n.dom().parentNode : n.dom();
          return null != e && e.ownerDocument.body.contains(e);
        }(n) ? function (n) {
          var e = n.getBoundingClientRect();
          return $n(e.left, e.top);
        }(e) : $n(0, 0);
      };
      global$1.add('cherry-checklist', Wn);
    }

    Plugin$d();

    var tipsICON = '\n<svg version="1.1" id="\u56fe\u5c42_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"\n\t viewBox="0 0 850.394 850.394" enable-background="new 0 0 850.394 850.394" xml:space="preserve">\n<g>\n\t<path fill="currentColor" d="M817.124,260.161c-21.417-50.635-52.071-96.104-91.11-135.144c-39.04-39.04-84.509-69.694-135.145-91.111\n\t\tc-52.44-22.18-108.128-33.426-165.516-33.426c-57.388,0-113.075,11.246-165.515,33.426\n\t\tc-50.635,21.417-96.104,52.071-135.144,91.111S55,209.525,33.583,260.161c-22.18,52.44-33.426,108.127-33.426,165.515\n\t\tc0,57.389,11.246,113.076,33.426,165.516C55,641.827,85.655,687.297,124.694,726.336c39.04,39.04,84.509,69.693,135.144,91.111\n\t\tc52.44,22.18,108.127,33.426,165.515,33.426c57.388,0,113.075-11.246,165.516-33.426c50.636-21.418,96.104-52.071,135.145-91.111\n\t\tc39.039-39.039,69.693-84.509,91.11-135.145c22.181-52.439,33.427-108.127,33.427-165.516\n\t\tC850.551,368.288,839.305,312.601,817.124,260.161z M425.354,790.873c-201.37,0-365.196-163.827-365.196-365.197\n\t\tS223.983,60.479,425.354,60.479s365.197,163.826,365.197,365.196S626.724,790.873,425.354,790.873z"/>\n\t<path fill="currentColor" d="M424.885,277.948c31.312,0,56.693-25.383,56.693-56.692c0-31.312-25.381-56.692-56.693-56.692\n\t\tc-31.31,0-56.692,25.38-56.692,56.692C368.193,252.566,393.576,277.948,424.885,277.948z"/>\n\t<path fill="currentColor" d="M514.503,617.129h-58.617V363.414c0-16.568-13.431-30-30-30h-66.92c-16.568,0-30,13.432-30,30\n\t\ts13.432,30,30,30h36.92v223.715h-60.617c-16.568,0-30,13.432-30,30s13.432,30,30,30h179.234c16.568,0,30-13.432,30-30\n\t\tS531.071,617.129,514.503,617.129z"/>\n</g>\n</svg>\n';

    var infoICON = '\n<svg\n version="1.1" id="\u56fe\u5c42_1"\nxmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"\n\t viewBox="0 0 850.394 850.394" enable-background="new 0 0 850.394 850.394" xml:space="preserve">\n<g>\n\t<path fill="currentColor" d="M815.329,535.818c0.041-0.049,0.086-0.097,0.127-0.146c3.987-4.826,6.493-10.921,6.823-17.588\n\t\tc0.025-0.501,0.038-1.003,0.038-1.507V42.861C822.316,19.228,803.055,0,779.379,0H71.015C47.339,0,28.077,19.228,28.077,42.861\n\t\tv764.671c0,23.634,19.262,42.861,42.938,42.861h414.914c0.132,0,0.263-0.008,0.394-0.01c0.128,0.002,0.255,0.01,0.384,0.01\n\t\tc10.3,0,19.385-5.193,24.788-13.102L813.44,537.88c0.018-0.018,0.034-0.037,0.052-0.054c0.187-0.187,0.367-0.381,0.55-0.573\n\t\tc0.154-0.161,0.312-0.319,0.461-0.484C814.786,536.459,815.059,536.14,815.329,535.818z M88.077,60h674.239v426.577H503.397\n\t\tc-25.745,0-46.69,20.902-46.69,46.594v257.223H88.077V60z M719.456,546.577L516.707,747.625V546.577H719.456z"/>\n\t<path fill="currentColor" d="M253.41,252.283h343.573c11.046,0,20-8.954,20-20s-8.954-20-20-20H253.41c-11.045,0-20,8.954-20,20\n\t\tS242.365,252.283,253.41,252.283z"/>\n\t<path fill="currentColor" d="M328.302,414.976H253.41c-11.046,0-20,8.954-20,20s8.954,20,20,20h74.892c11.046,0,20-8.954,20-20\n\t\tS339.348,414.976,328.302,414.976z"/>\n</g>\n</svg>\n';

    var okICON = '\n<svg version="1.1" id="\u56fe\u5c42_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"\n\t viewBox="0 0 850.394 850.394" enable-background="new 0 0 850.394 850.394" xml:space="preserve">\n<g>\n\t<path fill="currentColor" d="M816.967,259.681c-21.417-50.635-52.071-96.104-91.11-135.144c-39.04-39.04-84.509-69.694-135.145-91.111\n\t\tC538.271,11.246,482.584,0,425.196,0S312.121,11.246,259.682,33.426c-50.636,21.417-96.105,52.071-135.145,91.111\n\t\ts-69.694,84.509-91.111,135.144C11.246,312.121,0,367.808,0,425.196c0,57.389,11.246,113.076,33.426,165.516\n\t\tc21.417,50.636,52.071,96.105,91.111,135.145c39.04,39.04,84.509,69.693,135.145,91.111\n\t\tc52.439,22.18,108.127,33.426,165.515,33.426s113.075-11.246,165.516-33.426c50.636-21.418,96.104-52.071,135.145-91.111\n\t\tc39.039-39.039,69.693-84.509,91.11-135.145c22.181-52.439,33.427-108.127,33.427-165.516\n\t\tC850.394,367.808,839.147,312.121,816.967,259.681z M425.196,790.394C223.826,790.394,60,626.566,60,425.196S223.826,60,425.196,60\n\t\ts365.197,163.826,365.197,365.196S626.566,790.394,425.196,790.394z"/>\n\t<path fill="currentColor" d="M630.194,258.198L362.882,527.866L219.263,382.981c-11.664-11.767-30.659-11.85-42.426-0.186\n\t\tc-11.767,11.665-11.85,30.659-0.186,42.426L341.576,591.6c5.634,5.683,13.304,8.88,21.306,8.88s15.672-3.197,21.306-8.88\n\t\tl288.618-291.161c11.665-11.767,11.581-30.762-0.186-42.426C660.854,246.349,641.858,246.432,630.194,258.198z"/>\n</g>\n</svg>\n';

    var warningICON = '<i>\n<?xml version="1.0" encoding="utf-8"?>\n<svg version="1.1" id="\u56fe\u5c42_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"\n\t viewBox="0 0 850.394 850.394" enable-background="new 0 0 850.394 850.394" xml:space="preserve">\n<g>\n\t<path fill="currentColor" d="M846.854,780.942L451.657,41.18c-5.217-9.766-15.389-15.864-26.46-15.864s-21.244,6.098-26.461,15.864\n\t\tL3.539,780.942c-4.967,9.298-4.689,20.521,0.731,29.562S19.458,825.078,30,825.078h790.394c10.542,0,20.31-5.533,25.73-14.574\n\t\tC851.544,801.463,851.821,790.24,846.854,780.942z M80.039,765.078l345.158-646.095l345.158,646.095H80.039z"/>\n\t<path fill="currentColor" d="M395.39,308.476v247c0,16.568,13.432,30,30,30c16.569,0,30-13.432,30-30v-247c0-16.568-13.432-30-30-30\n\t\tC408.822,278.476,395.39,291.907,395.39,308.476z"/>\n\t<path fill="currentColor" d="M425.39,646.476c-16.568,0-30,13.432-30,30v38c0,16.568,13.432,30,30,30c16.569,0,30-13.432,30-30v-38\n\t\tC455.391,659.907,441.959,646.476,425.39,646.476z"/>\n</g>\n</svg>\n</i>';

    var errorICON = '\n<svg version="1.1" id="\u56fe\u5c42_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"\n\t viewBox="0 0 850.394 850.394" enable-background="new 0 0 850.394 850.394" xml:space="preserve">\n<g>\n\t<path fill="currentColor" d="M819.239,265.205c-21.402-52.767-52.833-100.1-93.417-140.684c-40.576-40.576-87.9-71.998-140.659-93.391\n\t\tC534.218,10.471,480.395-0.002,425.188,0C369.98,0.003,316.155,10.481,265.207,31.145c-52.763,21.4-100.094,52.828-140.678,93.412\n\t\tc-40.567,40.567-71.985,87.888-93.381,140.648C10.488,316.151,0.008,369.976,0,425.185c-0.007,55.214,10.459,109.043,31.11,159.991\n\t\tc21.389,52.77,52.808,100.1,93.383,140.674c40.583,40.583,87.92,72.011,140.698,93.408c50.956,20.66,104.792,31.135,160.013,31.135\n\t\tc55.217,0,109.049-10.474,159.999-31.13c52.766-21.392,100.09-52.809,140.656-93.376c40.584-40.584,72.011-87.917,93.407-140.687\n\t\tc20.659-50.952,31.132-104.784,31.126-159.999C850.388,369.989,839.906,316.158,819.239,265.205z M683.434,683.461\n\t\tc-68.956,68.956-160.664,106.933-258.229,106.932c-97.577,0-189.304-37.989-258.284-106.969\n\t\tC97.958,614.462,59.987,522.755,60,425.193c0.013-97.551,37.997-189.252,106.955-258.21l0,0\n\t\tC235.94,97.999,327.65,60.005,425.191,60c97.537-0.004,189.235,37.977,258.206,106.947\n\t\tc68.988,68.989,106.987,160.708,106.996,258.26C790.402,522.762,752.416,614.479,683.434,683.461z"/>\n\t<path fill="currentColor" d="M606.762,243.632c-11.715-11.716-30.711-11.716-42.426,0L425.197,382.771L286.059,243.632\n\t\tc-11.716-11.716-30.711-11.716-42.427,0c-11.715,11.716-11.715,30.711,0,42.427l139.139,139.138L243.632,564.336\n\t\tc-11.715,11.716-11.715,30.71,0,42.426c5.858,5.858,13.536,8.787,21.213,8.787s15.355-2.929,21.213-8.787l139.138-139.138\n\t\tl139.139,139.138c5.857,5.858,13.535,8.787,21.213,8.787s15.355-2.929,21.213-8.787c11.716-11.716,11.716-30.71,0-42.426\n\t\tL467.623,425.197l139.138-139.138C618.478,274.343,618.478,255.348,606.762,243.632z"/>\n</g>\n</svg>\n';

    var deleteICON = '\n<svg version="1.1" id="\u56fe\u5c42_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"\n\t viewBox="0 0 850.394 850.394" enable-background="new 0 0 850.394 850.394" xml:space="preserve">\n<g>\n\t<path fill="currentColor" d="M814.887,72.207H700.737H561.039V44.433c0-2.701-0.255-5.341-0.719-7.911\n\t\tc0.466-2.101,0.719-4.281,0.719-6.522c0-16.568-13.432-30-30-30h-14.433H333.789h-14.434c-16.568,0-30,13.432-30,30\n\t\tc0,2.241,0.253,4.421,0.719,6.522c-0.464,2.569-0.719,5.21-0.719,7.911v27.774H149.659H35.507c-16.568,0-30,13.432-30,30\n\t\ts13.432,30,30,30h71.032v672.142c0,25.39,19.343,46.045,43.12,46.045h551.079c23.776,0,43.119-20.655,43.119-46.045V132.207h71.03\n\t\tc16.568,0,30-13.432,30-30S831.455,72.207,814.887,72.207z M349.355,60h151.684v12.207H349.355V60z M683.856,790.394H166.539\n\t\tV132.207h167.25h182.817h167.25V790.394z"/>\n\t<path fill="currentColor" d="M328.978,286.972c-16.568,0-30,13.432-30,30V605.63c0,16.568,13.432,30,30,30s30-13.432,30-30V316.972\n\t\tC358.978,300.403,345.546,286.972,328.978,286.972z"/>\n\t<path fill="currentColor" d="M491.417,316.972V605.63c0,16.568,13.432,30,30,30s30-13.432,30-30V316.972c0-16.568-13.432-30-30-30\n\t\tS491.417,300.403,491.417,316.972z"/>\n</g>\n</svg>\n';

    function Plugin$e () {
      global$1.add('cherry-panel', function plugin(editor) {
        var defaultType = 'tips';
        var defaultBubbleMenu = 'cherry-panel__tips cherry-panel__info cherry-panel__ok cherry-panel__warning cherry-panel__error | cherry-panel__delete';
        var panelList = {
          tips: {
            name: 'tips',
            icon: tipsICON,
            iconName: 'panel-block-icon-tips',
            color: '#3582FB',
            background: '#EBF3FE'
          },
          info: {
            name: 'info',
            icon: infoICON,
            iconName: 'panel-block-icon-info',
            color: '#8091A5',
            background: '#F8F8F8'
          },
          ok: {
            name: 'ok',
            icon: okICON,
            iconName: 'panel-block-icon-ok',
            color: '#56BD5B',
            background: '#EDF9EF'
          },
          warning: {
            name: 'warning',
            icon: warningICON,
            iconName: 'panel-block-icon-warning',
            color: '#FFBF4D',
            background: '#FFEED6'
          },
          error: {
            name: 'error',
            icon: errorICON,
            iconName: 'panel-block-icon-error',
            color: '#F85E5E',
            background: '#FFEFEF'
          },
          delete: {
            name: 'delete',
            icon: deleteICON,
            iconName: 'panel-block-icon-delete',
            color: 'rgb(222, 53, 11)',
            background: 'rgb(255, 235, 230)'
          }
        };
        var getPanelIconShowInIframe = function (type) {
          if (type === void 0) {
            type = defaultType;
          }
          var panel = panelList[type] ? panelList[type] : panelList[defaultType];
          return panel.icon.replace(/<svg version=/g, '<svg style="width:inherit;color:inherit;height:inherit;" version=');
        };
        var getPanelIconShowInToolbar = function (type) {
          if (type === void 0) {
            type = defaultType;
          }
          var panel = panelList[type] ? panelList[type] : panelList[defaultType];
          return panel.icon.replace(/<svg version=/g, '<svg style="width:16px;color:inherit;height:16px;" version=');
        };
        var panelTemplate = function (type, html) {
          if (type === void 0) {
            type = defaultType;
          }
          if (html === void 0) {
            html = null;
          }
          var panel = panelList[type] ? panelList[type] : panelList[defaultType];
          var selected = html ? html : editor.selection.getContent();
          var icon = getPanelIconShowInIframe(type);
          var htmlStr = '\n\t\t\t<div contenteditable="false" data-panel-type="' + type + '" class="cherry-panel-block"\n\t\t\t\tstyle="\n\t\t\t\t\tposition: relative;\n\t\t\t\t\tborder-radius: 3px;\n\t\t\t\t\tmargin: 0.75rem 0px 0px;\n\t\t\t\t\tpadding: 8px;\n\t\t\t\t\tword-break: break-word;\n\t\t\t\t\ttransition:all 0.3s ease 0s;\n\t\t\t\t\tbackground-color: ' + panel.background + ';\n\t\t\t\t\tcursor: pointer;\n\t\t\t\t"\n\t\t\t>\n\t\t\t\t<div contenteditable="true" class="cherry-panel-block__content"\n\t\t\t\t\tstyle="\n\t\t\t\t\t\tdisplay:inline-block;\n\t\t\t\t\t\twidth: calc(100% - 35px);\n\t\t\t\t\t\tpadding-left: 35px;\n\t\t\t\t\t\toutline:none;\n\t\t\t\t\t\tposition: relative;\n\t\t\t\t\t"\n\t\t\t\t>\n\t\t\t\t\t<div contenteditable="false"\n\t\t\t\t\tclass="cherry-panel-block__left"\n\t\t\t\t\t\tstyle="\n\t\t\t\t\t\t\tdisplay:inline-block;\n\t\t\t\t\t\t\twidth:20px;\n\t\t\t\t\t\t\tvertical-align: top;\n\t\t\t\t\t\t\toutline: none;\n\t\t\t\t\t\t\tcursor: pointer;\n\t\t\t\t\t\t\tposition: absolute;\n\t\t\t\t\t\t\ttop: 0;\n\t\t\t\t\t\t\tleft: 5px;\n\t\t\t\t\t\t"\n\t\t\t\t\t>\n\t\t\t\t\t\t<span contenteditable="false" class="cherry-panel-block__icon"  style="width:16px;vertical-align: middle;color:' + panel.color + '">' + icon + '</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t' + (selected ? selected : '<p><br></p>') + '\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t';
          console.log(832, htmlStr);
          return htmlStr;
        };
        var getCurrentPanelBlock = function () {
          var currentNode = editor.selection.getNode();
          var targetDom = null;
          if (editor.dom.is(currentNode, 'div') && editor.dom.hasClass(currentNode, 'cherry-panel-block')) {
            targetDom = currentNode;
          } else {
            var parentDom = editor.dom.getParent(currentNode, 'div.cherry-panel-block');
            if (parentDom) {
              targetDom = parentDom;
            }
          }
          if (!targetDom || !editor.dom.hasClass(targetDom, 'cherry-panel-block')) {
            return false;
          }
          return targetDom;
        };
        var getCurrentPanelBlockLeft = function () {
          var currentNode = editor.selection.getNode();
          var targetDom = null;
          if (editor.dom.is(currentNode, 'div') && editor.dom.hasClass(currentNode, 'cherry-panel-block__left')) {
            targetDom = currentNode;
          } else {
            var parentDom = editor.dom.getParent(currentNode, 'div.cherry-panel-block__left');
            if (parentDom) {
              targetDom = parentDom;
            }
          }
          if (!targetDom || !editor.dom.hasClass(targetDom, 'cherry-panel-block__left')) {
            return false;
          }
          return targetDom;
        };
        var getCurrentPanelBlockType = function (obj) {
          if (obj === void 0) {
            obj = null;
          }
          if (!obj) {
            obj = getCurrentPanelBlock();
          }
          return editor.dom.getAttrib(obj, 'data-panel-type', defaultType);
        };
        var insert = function (type) {
          if (type === void 0) {
            type = defaultType;
          }
          var isAlreadyPanelBlock = getCurrentPanelBlock();
          if (isAlreadyPanelBlock) {
            return false;
          }
          editor.undoManager.transact(function () {
            editor.insertContent(panelTemplate(type));
            var newNode = getCurrentPanelBlock();
            var targetNode = editor.dom.select('div.cherry-panel-block__content', newNode);
            editor.selection.select(targetNode[0], true);
            editor.nodeChanged();
          });
        };
        var highlight = function (isHighlight) {
          if (isHighlight === void 0) {
            isHighlight = true;
          }
          var targetDom = getCurrentPanelBlock();
          if (editor.dom.hasClass(targetDom, 'cherry-panel-block__highlight')) {
            if (!isHighlight) {
              editor.dom.removeClass(targetDom, 'cherry-panel-block__highlight');
            }
          } else {
            if (isHighlight) {
              editor.dom.addClass(targetDom, 'cherry-panel-block__highlight');
            }
          }
        };
        var change = function (type) {
          if (type === void 0) {
            type = defaultType;
          }
          var panel = panelList[type] ? panelList[type] : panelList[defaultType];
          var targetDom = getCurrentPanelBlock();
          var currentType = getCurrentPanelBlockType(targetDom);
          if (currentType == panel.name) {
            return false;
          }
          editor.dom.setAttrib(targetDom, 'data-panel-type', panel.name);
          editor.dom.setStyle(targetDom, 'background-color', panel.background);
          var spanDoms = editor.dom.select('span.cherry-panel-block__icon', targetDom);
          for (var _i = 0, spanDoms_1 = spanDoms; _i < spanDoms_1.length; _i++) {
            var oneSpanDom = spanDoms_1[_i];
            editor.dom.setStyle(oneSpanDom, 'color', panel.color);
            editor.dom.setHTML(oneSpanDom, getPanelIconShowInIframe(type));
          }
          editor.nodeChanged();
        };
        var remove = function (removeAll) {
          if (removeAll === void 0) {
            removeAll = true;
          }
          var targetDom = getCurrentPanelBlock();
          if (removeAll) {
            editor.dom.remove(targetDom);
          } else {
            var lefts = editor.dom.select('div.cherry-panel-block__left', targetDom);
            for (var _i = 0, lefts_1 = lefts; _i < lefts_1.length; _i++) {
              var left = lefts_1[_i];
              editor.dom.remove(left);
            }
            var contents = editor.dom.select('div.cherry-panel-block__content', targetDom);
            var content = contents[0] ? contents[0] : editor.dom.create('br');
            editor.dom.remove(targetDom);
            editor.insertContent(content.innerHTML);
          }
          editor.nodeChanged();
        };
        var resetCursor = function () {
          editor.dom.select('div.cherry-panel-block__content').forEach(function (dom) {
            if (editor.dom.getAttrib(dom, 'contenteditable') != 'true') {
              editor.dom.setAttrib(dom, 'contenteditable', 'true');
            }
          });
          var selected = getCurrentPanelBlock();
          if (selected === false) {
            return false;
          }
          var isSelectedContent = getCurrentPanelBlockLeft();
          if (isSelectedContent === false) {
            return false;
          }
          editor.selection.select(selected, false);
        };
        var listenEnter = function (e) {
          if (e.key == 'Enter' && !e.ctrlKey) {
            var isPanelBlock_1 = getCurrentPanelBlock();
            if (isPanelBlock_1 === false) {
              return true;
            }
            var currentNode = editor.selection.getNode();
            var prevNode = currentNode.previousSibling;
            var nextNode = currentNode.nextSibling;
            if (currentNode.tagName.toLowerCase() == 'p' && prevNode.tagName.toLowerCase() == 'p') {
              if (/^\n$/.test(currentNode.innerText) && /^\n$/.test(prevNode.innerText)) {
                if (nextNode) {
                  var type = getCurrentPanelBlockType();
                  var allNextNodeHtml = currentNode.outerHTML + nextNode.outerHTML;
                  editor.dom.remove(prevNode);
                  editor.dom.remove(currentNode);
                  while (nextNode.nextSibling) {
                    var tmpNode = nextNode;
                    nextNode = nextNode.nextSibling;
                    editor.dom.remove(tmpNode);
                    allNextNodeHtml += nextNode.outerHTML;
                  }
                  editor.dom.remove(nextNode);
                  var newPanel = panelTemplate(type, allNextNodeHtml);
                  var newLine = editor.dom.create('p', {}, '<br>');
                  editor.dom.insertAfter(newLine, isPanelBlock_1);
                  editor.selection.select(newLine, true);
                  editor.insertContent(newPanel);
                  var newPanelNode = getCurrentPanelBlock();
                  if (newPanelNode) {
                    var firstP = editor.dom.select('div.cherry-panel-block__content p:first', newPanelNode);
                    if (firstP) {
                      editor.selection.select(firstP[0], true);
                    }
                  }
                  editor.nodeChanged();
                } else {
                  editor.dom.remove(currentNode);
                  editor.dom.remove(prevNode);
                  var newLine = editor.dom.create('p', {}, '<br>');
                  editor.dom.insertAfter(newLine, isPanelBlock_1);
                  editor.selection.select(newLine, true);
                  editor.nodeChanged();
                }
              }
            } else if (isBrLine(currentNode) && isLastChild(currentNode) && isBrLine(prevNode)) {
              editor.dom.remove(currentNode);
              editor.dom.remove(prevNode);
              var newLine = editor.dom.create('p', {}, '<br>');
              editor.dom.insertAfter(newLine, isPanelBlock_1);
              editor.selection.select(newLine, true);
              editor.nodeChanged();
            }
          }
        };
        var isPanelBlock = function (dom) {
          if (editor.dom.is(dom, 'div') && editor.dom.hasClass(dom, 'cherry-panel-block')) {
            return true;
          }
          return false;
        };
        var isBrLine = function (element) {
          return element.childNodes.length === 1 && element.childNodes[0].tagName.toLowerCase() === 'br';
        };
        var isLastChild = function (element) {
          if (editor.dom.hasClass(element, 'cherry-panel-block__content')) {
            return true;
          }
          while (!element.nextSibling) {
            element = element.parentNode;
            if (editor.dom.hasClass(element, 'cherry-panel-block__content')) {
              return true;
            }
          }
          return !element.nextSibling;
        };
        editor.on('click', function (e) {
          resetCursor();
        });
        editor.on('keyup', function (e) {
          resetCursor();
          listenEnter(e);
        });
        editor.addCommand('insertCherryPanel', function () {
          insert(defaultType);
        });
        editor.addCommand('changeCherryPanel', function (ui, type) {
          if (type === void 0) {
            type = defaultType;
          }
          change(type);
        });
        editor.addCommand('removeCherryPanel', function () {
          remove(true);
        });
        editor.addCommand('cleanCherryPanel', function () {
          remove(false);
        });
        editor.ui.registry.addIcon(panelList[defaultType].iconName, getPanelIconShowInToolbar());
        editor.ui.registry.addToggleButton('ch-panel', {
          icon: panelList[defaultType].iconName,
          tooltip: 'Panel Block',
          onAction: function (api) {
            if (api.isActive()) {
              editor.execCommand('cleanCherryPanel');
            } else {
              editor.execCommand('insertCherryPanel');
            }
          },
          onSetup: function (api) {
            editor.on('nodeChange', function () {
              var isActive = getCurrentPanelBlock() !== false;
              api.setActive(isActive);
            });
          }
        });
        editor.ui.registry.addContextToolbar('panelblock_toolbar', {
          predicate: function (node) {
            return isPanelBlock(node);
          },
          items: editor.getParam('panelblock_toolbar', defaultBubbleMenu),
          position: 'node',
          scope: 'node'
        });
        Object.keys(panelList).forEach(function (key) {
          editor.ui.registry.addIcon(panelList[key].iconName, getPanelIconShowInToolbar(key));
          if (key != 'delete') {
            editor.ui.registry.addToggleButton('ch-panel__' + key, {
              icon: panelList[key].iconName,
              tooltip: 'Panel Block ' + key,
              onAction: function () {
                editor.execCommand('changeCherryPanel', false, key);
              },
              onSetup: function (api) {
                var type = getCurrentPanelBlockType();
                api.setActive(type == key);
              }
            });
          }
        });
        editor.ui.registry.addToggleButton('ch-panel__delete', {
          icon: panelList.delete.iconName,
          tooltip: 'Panel Block delete',
          onAction: function () {
            editor.execCommand('removeCherryPanel');
          },
          onSetup: function (api) {
            var dom = document.querySelector('.tox-tbtn[aria-label="Panel Block delete"]');
            dom = dom ? dom : document.querySelector('.tox-tbtn[aria-label="\u5220\u9664"]');
            if (!dom) {
              return true;
            }
            dom.onmouseenter = function () {
              highlight(true);
            };
            dom.onmouseleave = function () {
              highlight(false);
            };
            return function (api) {
              dom.onmouseenter = null;
              dom.onmouseleave = null;
            };
          }
        });
      });
    }

    Plugin$e();

    var docIcon = '<?xml version="1.0" encoding="utf-8"?>\n<!-- Generator: Adobe Illustrator 22.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\n<svg width="32px" height="32px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n     viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;vertical-align: middle;" xml:space="preserve">\n\t<g transform="translate(-302.000000, -1351.000000)">\n\t\t<g transform="translate(194.000000, 930.000000)">\n\t\t\t<g transform="translate(108.000000, 421.000000)">\n\t\t\t\t<g>\n\t\t\t\t\t<g transform="translate(1.500000, 1.000000)">\n\t\t\t\t\t\t<linearGradient id="doc_masking_1" gradientUnits="userSpaceOnUse" x1="-2562.3193" y1="797.0652" x2="-2562.4832" y2="797.0652" gradientTransform="matrix(14.4 0 0 -13.5 36914.5 10771.6299)">\n\t\t\t\t\t\t\t<stop offset="0" style="stop-color:#4776FA"/>\n\t\t\t\t\t\t\t<stop offset="1" style="stop-color:#194CE9"/>\n\t\t\t\t\t\t</linearGradient>\n                        <path fill="url(#doc_masking_1)" d="M3.9,4.5h12.1c0.6,0,1.2,0.5,1.2,1.1v11.2c0,0.6-0.5,1.1-1.2,1.1H3.9c-0.6,0-1.2-0.5-1.2-1.1V5.6C2.7,5,3.2,4.5,3.9,4.5z"/>\n                        <radialGradient id="doc_masking_2" cx="-2727.3647" cy="1035.4854" r="1.491" gradientTransform="matrix(-2.3715 16.0255 16.0255 2.3715 -23050.3574 41251.7266)" gradientUnits="userSpaceOnUse">\n\t\t\t\t\t\t\t<stop offset="0" style="stop-color:#359FFF"/>\n                            <stop offset="0.9992" style="stop-color:#0D75FF"/>\n\t\t\t\t\t\t</radialGradient>\n                        <path fill="url(#doc_masking_2)" d="M13.8,0C14.5,0,15,0.5,15,1.2v15.6l0,0c0,0.7,0.5,1.2,1.2,1.2h-15C0.5,18,0,17.5,0,16.8V1.2C0,0.5,0.5,0,1.2,0H13.8z"/>\n                        <g transform="translate(2.700000, 12.600000)">\n\t\t\t\t\t\t\t<g><polygon points="0.8,0.1 9.7,0.1 9.7,2 0.8,2"/></g>\n                            <g><polygon fill="#98D3FF" points="0.8,0.1 9.7,0.1 9.7,2 0.8,2"/></g>\n\t\t\t\t\t\t</g>\n                        <g transform="translate(2.700000, 9.000000)">\n\t\t\t\t\t\t\t<g><polygon points="0.8,0.8 9.7,0.8 9.7,2.5 0.8,2.5"/></g>\n                            <g><polygon fill="#D3F3FF" points="0.8,0.8 9.7,0.8 9.7,2.5 0.8,2.5"/></g>\n\t\t\t\t\t\t</g>\n\t\t\t\t\t</g>\n\t\t\t\t</g>\n\t\t\t</g>\n\t\t</g>\n\t</g>\n</svg>\n';

    var excelIcon = '<?xml version="1.0" encoding="utf-8"?>\n<!-- Generator: Adobe Illustrator 22.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\n<svg width="32px" height="32px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n     viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;vertical-align: middle;" xml:space="preserve">\n    <g transform="translate(-302.000000, -1183.000000)">\n\t\t<g transform="translate(194.000000, 930.000000)">\n\t\t\t<g transform="translate(103.000000, 244.000000)">\n\t\t\t\t<g transform="translate(5.000000, 9.000000)">\n\t\t\t\t\t<g>\n\t\t\t\t\t\t<g transform="translate(1.500000, 1.000000)">\n\t\t\t\t\t\t\t<linearGradient id="excel_masking_1" gradientUnits="userSpaceOnUse" x1="-2562.3193" y1="797.0652" x2="-2562.5557" y2="797.0652" gradientTransform="matrix(14.4 0 0 -13.5 36914.5 10771.6299)">\n\t\t\t\t\t\t\t\t<stop offset="0" style="stop-color:#009F57"/>\n                                <stop offset="1" style="stop-color:#00732E"/>\n\t\t\t\t\t\t\t</linearGradient>\n                            <path fill="url(#excel_masking_1)" d="M3.9,4.5h12.1c0.6,0,1.2,0.5,1.2,1.1v11.2c0,0.6-0.5,1.1-1.2,1.1H3.9 c-0.6,0-1.2-0.5-1.2-1.1V5.6C2.7,5,3.2,4.5,3.9,4.5z"/>\n                            <g>\n\t\t\t\t\t\t\t\t<g>\n\t\t\t\t\t\t\t\t\t<linearGradient id="excel_masking_2" gradientUnits="userSpaceOnUse" x1="-2585.9617" y1="813.3266" x2="-2586.3711" y2="812.3436" gradientTransform="matrix(16.4129 0 0 -18 42456.4609 14636.1729)">\n\t\t\t\t\t\t\t\t\t\t<stop offset="2.903294e-04" style="stop-color:#00CEAE"/>\n                                        <stop offset="1" style="stop-color:#00A558"/>\n\t\t\t\t\t\t\t\t\t</linearGradient>\n                                    <path fill="url(#excel_masking_2)" d="M14,0c0.6,0,1.2,0.5,1.2,1.2v15.6l0,0c0,0.7,0.5,1.2,1.2,1.2H1.2C0.5,18,0,17.5,0,16.8 V1.2C0,0.5,0.5,0,1.2,0H14z"/>\n\t\t\t\t\t\t\t\t</g>\n\t\t\t\t\t\t\t</g>\n                            <g transform="translate(8.100000, 12.600000)">\n\t\t\t\t\t\t\t\t<g><rect x="0" y="0.1" width="4.5" height="1.9"/></g>\n                                <g><rect x="0" y="0.1" fill="#9BF7C1" width="4.5" height="1.9"/></g>\n\t\t\t\t\t\t\t</g>\n                            <g transform="translate(2.700000, 12.600000)">\n\t\t\t\t\t\t\t\t<g id="path-7-link"><rect x="0.2" y="0.1" width="4.9" height="1.9"/></g>\n                                <g><rect x="0.2" y="0.1" fill="#B2F8EA" width="4.9" height="1.9"/></g>\n\t\t\t\t\t\t\t</g>\n                            <g transform="translate(8.100000, 9.000000)">\n\t\t\t\t\t\t\t\t<g><rect y="0.8" width="4.5" height="1.7"/></g>\n                                <g><rect x="0" y="0.8" fill="#B2F8EA" width="4.5" height="1.7"/></g>\n\t\t\t\t\t\t\t</g>\n                            <g transform="translate(2.700000, 9.000000)">\n\t\t\t\t\t\t\t\t<g><rect x="0.2" y="0.8" width="4.9" height="1.7"/></g>\n                                <g><rect x="0.2" y="0.8" fill="#E0FFF9" width="4.9" height="1.7"/></g>\n\t\t\t\t\t\t\t</g>\n\t\t\t\t\t\t</g>\n\t\t\t\t\t</g>\n\t\t\t\t</g>\n\t\t\t</g>\n\t\t</g>\n\t</g>\n</svg>\n';

    var pptIcon = '<?xml version="1.0" encoding="utf-8"?>\n<!-- Generator: Adobe Illustrator 22.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\n<svg width="32px" height="32px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n\t viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;vertical-align: middle;" xml:space="preserve">\n\t<g transform="translate(-302.000000, -1225.000000)">\n\t\t<g transform="translate(194.000000, 930.000000)">\n\t\t\t<g transform="translate(108.000000, 295.000000)">\n\t\t\t\t<g>\n\t\t\t\t\t<g transform="translate(1.500000, 1.000000)">\n\t\t\t\t\t\t<linearGradient id="ppt_masking_1" gradientUnits="userSpaceOnUse" x1="-2562.3193" y1="797.0652" x2="-2562.4883" y2="797.0652" gradientTransform="matrix(14.4 0 0 -13.5 36914.5 10771.6299)">\n\t\t\t\t\t\t\t<stop  offset="0" style="stop-color:#F7501C"/>\n\t\t\t\t\t\t\t<stop  offset="1" style="stop-color:#D93213"/>\n\t\t\t\t\t\t</linearGradient>\n\t\t\t\t\t\t<path fill="url(#ppt_masking_1)" d="M3.9,4.5h12.1c0.6,0,1.2,0.5,1.2,1.1v11.2c0,0.6-0.5,1.1-1.2,1.1H3.9 c-0.6,0-1.2-0.5-1.2-1.1V5.6C2.7,5,3.2,4.5,3.9,4.5z"/>\n\t\t\t\t\t\t<linearGradient id="ppt_masking_2" gradientUnits="userSpaceOnUse" x1="-2583.6975" y1="813.0947" x2="-2584.4312" y2="812.0947" gradientTransform="matrix(16.2 0 0 -18 41869.9023 14636.1729)">\n\t\t\t\t\t\t\t<stop  offset="0" style="stop-color:#FF8759"/>\n\t\t\t\t\t\t\t<stop  offset="1" style="stop-color:#FF5B0F"/>\n\t\t\t\t\t\t</linearGradient>\n\t\t\t\t\t\t<path fill="url(#ppt_masking_2)" d="M13.8,0C14.5,0,15,0.5,15,1.2v15.6c0,0.7,0.5,1.2,1.2,1.2h-15C0.5,18,0,17.5,0,16.8V1.2 C0,0.5,0.5,0,1.2,0H13.8z"/>\n\t\t\t\t\t\t<g transform="translate(2.700000, 5.400000)">\n\t\t\t\t\t\t\t<g>\n\t\t\t\t\t\t\t\t<g><path d="M4.1,0l0,4.7l4.7,0l0,0.2C8.6,7.1,6.7,8.8,4.4,8.8C2,8.8,0,6.8,0,4.4C0,2.1,1.8,0.2,4.1,0z"/></g>\n\t\t\t\t\t\t\t\t<g><path fill="#FFCFC0" d="M4.1,0l0,4.7l4.7,0l0,0.2C8.6,7.1,6.7,8.8,4.4,8.8C2,8.8,0,6.8,0,4.4 C0,2.1,1.8,0.2,4.1,0z"/></g>\n\t\t\t\t\t\t\t</g>\n\t\t\t\t\t\t\t<g transform="translate(4.950000, 0.000000)">\n\t\t\t\t\t\t\t\t<g><path d="M0.2,0c2,0.1,3.7,1.8,3.7,3.8l0-0.1H0.2L0.2,0z"/></g>\n\t\t\t\t\t\t\t\t<g><path fill="#FFFFFF" d="M0.2,0c2,0.1,3.7,1.8,3.7,3.8l0-0.1H0.2L0.2,0z"/></g>\n\t\t\t\t\t\t\t</g>\n\t\t\t\t\t\t</g>\n\t\t\t\t\t</g>\n\t\t\t\t</g>\n\t\t\t</g>\n\t\t</g>\n\t</g>\n</svg>\n';

    var tencentDocLogo = '<?xml version="1.0" encoding="utf-8"?>\n<!-- Generator: Adobe Illustrator 22.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\n<svg width="20px" height="20px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve">\n\t<g transform="translate(-140.000000, -391.000000)">\n\t\t<g transform="translate(140.000000, 391.000000)">\n\t\t\t<path fill="#1E6FFF" d="M5.3,1C5.1,1,4.8,1.2,4.8,1.5L0,29.3C-0.1,29.7,0.2,30,0.6,30h11.3l0.9-0.3h5.3l0.7,0.3h8.7\n\t\t\t\tc0.3,0,0.5-0.2,0.6-0.5L32,7l-6.1-6H5.3z"/>\n            <path fill="#00DCFF" d="M32,7l-6.1-6L25,6.2C24.9,6.6,25.2,7,25.6,7H32z"/>\n            <polygon fill="#FFFFFF" points="17.1,2 15.9,8.8 5,8.8 9.8,14.3 15,14.3 12.4,30 19.2,30 21.8,14.3 29.7,14.3,30,14.3"/>\n\t\t</g>\n\t</g>\n</svg>\n';

    function composedPath(event) {
      if (event.path) {
        return event.path;
      }
      try {
        return event.composedPath();
      } catch (e) {
        var path = [];
        var el = event.target;
        while (el) {
          path.push(el);
          if (el.tagName === 'HTML') {
            path.push(document);
            path.push(window);
            return path;
          }
          el = el.parentElement;
        }
        return path;
      }
    }
    function Plugin$f () {
      global$1.add('cherry-tencent-docs', function plugin(editor) {
        editor.ui.registry.addIcon('tencent_doc_doc_icon', docIcon);
        editor.ui.registry.addIcon('tencent_doc_excel_icon', excelIcon);
        editor.ui.registry.addIcon('tencent_doc_ppt_icon', pptIcon);
        editor.ui.registry.addIcon('tencent_doc_logo', tencentDocLogo);
        editor.ui.registry.addMenuButton('ch-tencent-docs', {
          icon: 'tencent_doc_logo',
          tooltip: 'Tencent Doc',
          fetch: function (callback) {
            var items = [
              {
                icon: 'tencent_doc_logo',
                type: 'togglemenuitem',
                text: 'Insert Tencent Doc',
                onAction: function () {
                  editor.fire('createTencentMyDocDialogEvent', { editor: editor });
                }
              },
              {
                icon: 'tencent_doc_doc_icon',
                type: 'togglemenuitem',
                text: 'New Online Doc',
                onAction: function () {
                  editor.fire('createTencentDocDialogEvent', { editor: editor });
                }
              },
              {
                icon: 'tencent_doc_excel_icon',
                type: 'togglemenuitem',
                text: 'New Online Sheet',
                onAction: function () {
                  editor.fire('createTencentSheetDialogEvent', { editor: editor });
                }
              },
              {
                icon: 'tencent_doc_ppt_icon',
                type: 'togglemenuitem',
                text: 'New Online Slide',
                onAction: function () {
                  editor.fire('createTencentSlideDialogEvent', { editor: editor });
                }
              }
            ];
            callback(items);
          }
        });
        editor.on('click', function (event) {
          var value = function getCherryModuleEventInfo(event) {
            var fileid = '';
            var filetype = '';
            var filetitle = '';
            var fileurl = '';
            var eventflag = '';
            var path = composedPath(event);
            for (var index = path.length - 1; index >= 0; index--) {
              var element = path[index];
              if (!element.getAttribute) {
                continue;
              }
              if (element.getAttribute('fileid')) {
                fileid = element.getAttribute('fileid');
              }
              if (element.getAttribute('filetype')) {
                filetype = element.getAttribute('filetype');
              }
              if (element.getAttribute('filetitle')) {
                filetitle = element.getAttribute('filetitle');
              }
              if (element.getAttribute('fileurl')) {
                fileurl = element.getAttribute('fileurl');
              }
              if (element.getAttribute('cm-eventflag')) {
                eventflag = element.getAttribute('cm-eventflag');
              }
            }
            return {
              fileid: fileid,
              filetype: filetype,
              filetitle: filetitle,
              fileurl: fileurl,
              eventflag: eventflag
            };
          }(event);
          if (value.eventflag === 'editTxDoc') {
            editor.fire('editTencentDocDialogEvent', {
              editor: editor,
              id: value.fileid,
              type: value.filetype,
              title: value.filetitle
            });
          }
          if (value.eventflag === 'deleteTxDoc') {
            editor.fire('deleteTencentDocDialogEvent', {
              editor: editor,
              id: value.fileid
            });
          }
        });
        editor.on('mouseover', function (event) {
          var path = composedPath(event);
          for (var index = path.length - 1; index >= 0; index--) {
            var element = path[index];
            if (!element.getAttribute) {
              continue;
            }
            if (element.getAttribute('class') === 'edit-btn-icon') {
              element.setAttribute('fill', '#5d9bfc');
            }
            if (element.getAttribute('class') === 'remove-btn-icon') {
              element.setAttribute('fill', '#5d9bfc');
            }
          }
        });
        editor.on('mouseout', function (event) {
          var path = composedPath(event);
          for (var index = path.length - 1; index >= 0; index--) {
            var element = path[index];
            if (!element.getAttribute) {
              continue;
            }
            if (element.getAttribute('class') === 'edit-btn-icon') {
              element.setAttribute('fill', '#8091a5');
            }
            if (element.getAttribute('class') === 'remove-btn-icon') {
              element.setAttribute('fill', '#8091a5');
            }
          }
        });
      });
    }

    Plugin$f();

    var storyIcon = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18" class="design-iconfont">\n  <path d="M3 2.25C2.58582 2.25 2.25 2.58577 2.25 3V15C2.25 15.4142 2.58582 15.75 3 15.75H15C15.4142 15.75 15.75 15.4142 15.75 15V3C15.75 2.58577 15.4142 2.25 15 2.25H3ZM7.125 5.4375H10.875C11.1857 5.4375 11.4375 5.68936 11.4375 6C11.4375 6.31064 11.1857 6.5625 10.875 6.5625H7.6875V8.4375H10.875C11.1857 8.4375 11.4375 8.68936 11.4375 9V12C11.4375 12.3106 11.1857 12.5625 10.875 12.5625H7.125C6.81427 12.5625 6.5625 12.3106 6.5625 12C6.5625 11.6894 6.81427 11.4375 7.125 11.4375H10.3125V9.5625H7.125C6.81427 9.5625 6.5625 9.31064 6.5625 9V6C6.5625 5.68936 6.81427 5.4375 7.125 5.4375Z" fill="#3582FB"/>\n</svg>\n';

    var bugIcon = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18" class="design-iconfont">\n  <path d="M7.6875 8.4375H10.3125V7.5C10.3125 6.98223 9.89277 6.5625 9.375 6.5625H7.6875V8.4375Z" fill="#F85E5E"/>\n  <path d="M7.6875 9.5625H10.3125V10.5C10.3125 11.0178 9.89277 11.4375 9.375 11.4375H7.6875V9.5625Z" fill="#F85E5E"/>\n  <path d="M3 2.25C2.58579 2.25 2.25 2.58579 2.25 3V15C2.25 15.4142 2.58579 15.75 3 15.75H15C15.4142 15.75 15.75 15.4142 15.75 15V3C15.75 2.58579 15.4142 2.25 15 2.25H3ZM7.125 5.4375H9.375C10.5141 5.4375 11.4375 6.36091 11.4375 7.5V10.5C11.4375 11.6391 10.5141 12.5625 9.375 12.5625H7.125C6.81434 12.5625 6.5625 12.3107 6.5625 12V6C6.5625 5.68934 6.81434 5.4375 7.125 5.4375Z" fill="#F85E5E"/>\n</svg>\n';

    var taskIcon = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18" class="design-iconfont">\n  <path d="M3 2.25C2.58579 2.25 2.25 2.58579 2.25 3V15C2.25 15.4142 2.58579 15.75 3 15.75H15C15.4142 15.75 15.75 15.4142 15.75 15V3C15.75 2.58579 15.4142 2.25 15 2.25H3ZM6 5.4375H12C12.3107 5.4375 12.5625 5.68934 12.5625 6C12.5625 6.31066 12.3107 6.5625 12 6.5625H9.5625V12C9.5625 12.3107 9.31066 12.5625 9 12.5625C8.68934 12.5625 8.4375 12.3107 8.4375 12V6.5625H6C5.68934 6.5625 5.4375 6.31066 5.4375 6C5.4375 5.68934 5.68934 5.4375 6 5.4375Z" fill="#3F4A56"/>\n</svg>\n';

    var chooseWorkItemLogo = '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18" class="design-iconfont">\n  <path d="M3 2.25C2.58582 2.25 2.25 2.58577 2.25 3V15C2.25 15.4142 2.58582 15.75 3 15.75H15C15.4142 15.75 15.75 15.4142 15.75 15V3C15.75 2.58577 15.4142 2.25 15 2.25H3ZM7.125 5.4375H10.875C11.1857 5.4375 11.4375 5.68936 11.4375 6C11.4375 6.31064 11.1857 6.5625 10.875 6.5625H7.6875V8.4375H10.875C11.1857 8.4375 11.4375 8.68936 11.4375 9V12C11.4375 12.3106 11.1857 12.5625 10.875 12.5625H7.125C6.81427 12.5625 6.5625 12.3106 6.5625 12C6.5625 11.6894 6.81427 11.4375 7.125 11.4375H10.3125V9.5625H7.125C6.81427 9.5625 6.5625 9.31064 6.5625 9V6C6.5625 5.68936 6.81427 5.4375 7.125 5.4375Z" fill="#3582FB"/>\n</svg>\n';

    var deleteICON$1 = '<?xml version="1.0" encoding="utf-8"?>\n <!-- Generator: Adobe Illustrator 23.0.2, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\n <svg  width="16" height="16"  version="1.1" id="\u56fe\u5c42_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n\t\tviewBox="0 0 850.394 850.394" enable-background="new 0 0 850.394 850.394" xml:space="preserve">\n <g>\n\t <path fill="currentColor" d="M814.887,72.207H700.737H561.039V44.433c0-2.701-0.255-5.341-0.719-7.911\n\t\t c0.466-2.101,0.719-4.281,0.719-6.522c0-16.568-13.432-30-30-30h-14.433H333.789h-14.434c-16.568,0-30,13.432-30,30\n\t\t c0,2.241,0.253,4.421,0.719,6.522c-0.464,2.569-0.719,5.21-0.719,7.911v27.774H149.659H35.507c-16.568,0-30,13.432-30,30\n\t\t s13.432,30,30,30h71.032v672.142c0,25.39,19.343,46.045,43.12,46.045h551.079c23.776,0,43.119-20.655,43.119-46.045V132.207h71.03\n\t\t c16.568,0,30-13.432,30-30S831.455,72.207,814.887,72.207z M349.355,60h151.684v12.207H349.355V60z M683.856,790.394H166.539\n\t\t V132.207h167.25h182.817h167.25V790.394z"/>\n\t <path fill="currentColor" d="M328.978,286.972c-16.568,0-30,13.432-30,30V605.63c0,16.568,13.432,30,30,30s30-13.432,30-30V316.972\n\t\t C358.978,300.403,345.546,286.972,328.978,286.972z"/>\n\t <path fill="currentColor" d="M491.417,316.972V605.63c0,16.568,13.432,30,30,30s30-13.432,30-30V316.972c0-16.568-13.432-30-30-30\n\t\t S491.417,300.403,491.417,316.972z"/>\n </g>\n </svg>\n ';

    function composedPath$1(event) {
      if (event.path) {
        return event.path;
      }
      try {
        return event.composedPath();
      } catch (e) {
        var path = [];
        var el = event.target;
        while (el) {
          path.push(el);
          if (el.tagName === 'HTML') {
            path.push(document);
            path.push(window);
            return path;
          }
          el = el.parentElement;
        }
        return path;
      }
    }
    function Plugin$g () {
      global$1.add('cherry-choose-workitem', function plugin(editor) {
        editor.ui.registry.addIcon('workitem_story_icon', storyIcon);
        editor.ui.registry.addIcon('workitem_bug_icon', bugIcon);
        editor.ui.registry.addIcon('workitem_task_icon', taskIcon);
        editor.ui.registry.addIcon('choose_workitem_logo', chooseWorkItemLogo);
        editor.ui.registry.addIcon('workitem_delete_icon', deleteICON$1);
        var defaultList = {
          choose: { name: 'Choose story' },
          change: { name: 'Again insert' },
          show: { name: 'Show field' }
        };
        var defaultBubbleMenu = 'ch-workitem__change | ch-workitem__show | ch-workitem__delete';
        var workitemList = {
          delete: {
            name: 'delete',
            icon: deleteICON$1,
            iconName: 'workitem_delete_icon',
            color: 'rgb(222, 53, 11)',
            background: 'rgb(255, 235, 230)'
          }
        };
        editor.on('click', function (event) {
          function getCherryModuleEventInfo(event) {
            var eventflag = '';
            var path = composedPath$1(event);
            for (var index = path.length - 1; index >= 0; index--) {
              var element = path[index];
              if (!element.getAttribute) {
                continue;
              }
              if (element.getAttribute('cm-eventflag')) {
                eventflag = element.getAttribute('cm-eventflag');
              }
            }
            return { eventflag: eventflag };
          }
          var value = getCherryModuleEventInfo(event);
          var targetDom = getCurrentChooseWorkItemTable();
          if (value.eventflag === 'refreshWorkItemBlock') {
            editor.fire('refreshWorkItemBlockEvent', {
              editor: editor,
              workitemBlockNode: targetDom
            });
          }
        });
        editor.ui.registry.addMenuButton('ch-choose-workitem', {
          icon: 'choose_workitem_logo',
          tooltip: 'WorkItem',
          fetch: function (callback) {
            var items = [
              {
                icon: 'workitem_story_icon',
                type: 'togglemenuitem',
                text: 'Story',
                onAction: function () {
                  editor.fire('createChooseWorkItemStoryEvent', { editor: editor });
                }
              },
              {
                icon: 'workitem_bug_icon',
                type: 'togglemenuitem',
                text: 'Bug',
                onAction: function () {
                  editor.fire('createChooseWorkItemBugEvent', { editor: editor });
                }
              },
              {
                icon: 'workitem_task_icon',
                type: 'togglemenuitem',
                text: 'Task',
                onAction: function () {
                  editor.fire('createChooseWorkItemTaskEvent', { editor: editor });
                }
              }
            ];
            callback(items);
          }
        });
        var isWorkItemBlock = function (dom) {
          if (editor.dom.is(dom, 'div') && editor.dom.hasClass(dom, 'cherry-choose-workitem')) {
            return true;
          }
          return false;
        };
        var getCurrentChooseWorkItemTable = function () {
          var currentNode = editor.selection.getNode();
          var targetDom = null;
          if (editor.dom.is(currentNode, 'div') && editor.dom.hasClass(currentNode, 'cherry-choose-workitem')) {
            targetDom = currentNode;
          } else {
            var parentDom = editor.dom.getParent(currentNode, 'div.cherry-choose-workitem');
            if (parentDom) {
              targetDom = parentDom;
            }
          }
          if (!targetDom || !editor.dom.hasClass(targetDom, 'cherry-choose-workitem')) {
            return false;
          }
          return targetDom;
        };
        var remove = function () {
          var targetDom = getCurrentChooseWorkItemTable();
          editor.dom.remove(targetDom);
        };
        editor.addCommand('changeWorkItemBlock', function (ui, type) {
        });
        editor.addCommand('showWorkItemBlock', function (ui, _a) {
          var key = _a.key, targetDom = _a.targetDom;
          if (key == 'show') {
            editor.fire('createWorkItemShowFileds', {
              editor: editor,
              workitemBlockNode: targetDom
            });
          } else if (key == 'change') {
            editor.fire('changeWorkItemShowFileds', {
              editor: editor,
              workitemBlockNode: targetDom
            });
          }
        });
        editor.addCommand('removeWorkItemBlock', function () {
          remove();
        });
        editor.ui.registry.addContextToolbar('chooseworkitem_toolbar', {
          predicate: function (node) {
            return isWorkItemBlock(node);
          },
          items: editor.getParam('chooseworkitem_toolbar', defaultBubbleMenu),
          position: 'node',
          scope: 'node'
        });
        Object.keys(defaultList).forEach(function (key) {
          editor.ui.registry.addToggleButton('ch-workitem__' + key, {
            text: defaultList[key].name,
            tooltip: '' + defaultList[key].name,
            onAction: function () {
              var targetDom = getCurrentChooseWorkItemTable();
              editor.execCommand('showWorkItemBlock', true, {
                key: key,
                targetDom: targetDom
              });
            }
          });
        });
        editor.ui.registry.addToggleButton('ch-workitem__delete', {
          icon: workitemList.delete.iconName,
          tooltip: 'Delete workitem block',
          onAction: function () {
            editor.execCommand('removeWorkItemBlock');
          }
        });
      });
    }

    Plugin$g();

    function registryPlugin (editor) {
      var defaultTable = 10;
      var removeGrid = function () {
        var grid = editor.editorContainer.getElementsByClassName('tox-collection--list');
        if (!grid.length) {
          return;
        }
        grid[0].parentNode.removeChild(grid[0]);
        gridWidth = 0;
        left = 0;
        top = 0;
        tablePicker = null;
      };
      var top;
      var left;
      function onSetup(editor) {
        editor.editorContainer.getElementsByClassName('tox-editor-header')[0].addEventListener('click', function (e) {
          removeGrid();
          var bar = editor.editorContainer;
          var parent = e.target.closest('.tox-tbtn');
          if (parent) {
            left = parent.offsetLeft;
            var current = parent.offsetParent;
            while (current !== bar && parent !== bar) {
              left += current.offsetLeft;
              current = current.offsetParent;
            }
            top = parent.offsetTop;
            current = parent.offsetParent;
            while (current !== bar && parent !== bar) {
              top += current.offsetTop + current.clientTop;
              current = current.offsetParent;
            }
            top += parent.getBoundingClientRect().height;
          }
        });
        editor.on('click', function () {
          removeGrid();
        });
        editor.on('mousemove', function (e) {
          mouseMoveEvent(e, true);
        });
      }
      var tablePicker;
      var gridWidth;
      var offsetLeft = 0;
      var offsetTop = 0;
      var mouseMoveEvent = function (e, isEditor) {
        if (isEditor === void 0) {
          isEditor = false;
        }
        if (!editor.editorContainer || !document.body.contains(editor.editorContainer) || !editor.editorContainer.getElementsByClassName('tox-collection--list').length) {
          return;
        }
        if (!left || !top) {
          return;
        }
        var bar = editor.editorContainer;
        var parent = e.target;
        if (parent && !isEditor) {
          var left1 = void 0;
          var left2 = 0;
          var top1 = void 0;
          var top2 = 0;
          left1 = parent.offsetLeft;
          var current = parent.offsetParent;
          while (current) {
            if (current == bar) {
              left2 = left1;
            }
            left1 += current.offsetLeft;
            current = current.offsetParent;
          }
          top1 = parent.getBoundingClientRect().top;
          current = parent.offsetParent;
          while (current) {
            if (current == bar) {
              top2 = top1;
              top1 += current.getBoundingClientRect().top;
            }
            current = current.offsetParent;
          }
          offsetTop = top1 - top2;
          offsetLeft = left1 - left2;
        }
        var row;
        var col;
        if (isEditor) {
          row = Math.ceil((e.clientX - left + 5 + parseInt(window.getComputedStyle(document.body, null).marginLeft.replace('px', ''))) / 17);
          col = Math.ceil((e.clientY - top + 10) / 17);
        } else {
          row = Math.ceil((e.clientX - offsetLeft - left + 5 + parseInt(window.getComputedStyle(document.body, null).marginLeft.replace('px', ''))) / 17);
          col = Math.ceil((e.clientY - offsetTop - top + 10) / 17);
        }
        row = row >= 20 ? 20 : row;
        col = col >= 20 ? 20 : col;
        var selectRow = row > 0 ? row : 0;
        var selectCol = col > 0 ? col : 0;
        row = row >= defaultTable ? row : defaultTable;
        col = col >= defaultTable ? col : defaultTable;
        gridWidth = row * 17;
        var picker = editor.editorContainer.getElementsByClassName('tox-insert-table-picker');
        if (picker.length) {
          picker[0].style.width = gridWidth + 'px';
        }
        var inner = getGrid(row, col, selectRow, selectCol);
        tablePicker = tablePicker ? tablePicker : editor.editorContainer.getElementsByClassName('tox-insert-table-picker')[0];
        if (tablePicker) {
          tablePicker.innerHTML = inner;
        }
      };
      var adjustEdge = function () {
        var editorWrap = editor.editorContainer.getElementsByClassName('tox-sidebar-wrap')[0];
        var editorWidth = editorWrap.offsetWidth;
        var cellWidth = 17;
        var maxAmount = 20;
        var tableWrapMaxWidth = cellWidth * maxAmount;
        if (left + tableWrapMaxWidth > editorWidth) {
          left = editorWidth - tableWrapMaxWidth;
        }
      };
      document.addEventListener('mousemove', mouseMoveEvent);
      editor.on('destroy', function () {
        document.removeEventListener('mousemove', mouseMoveEvent);
      });
      var insertTableEvent = function () {
        editor.editorContainer.getElementsByClassName('tox-insert-table-picker')[0].addEventListener('mouseup', function (e) {
          if (e.target.nodeName !== 'DIV') {
            return;
          }
          var span = e.target.parentNode.lastElementChild;
          var row = parseInt(span.getAttribute('row'));
          var col = parseInt(span.getAttribute('col'));
          if (row && col) {
            var table = editor.plugins.table.insertTable(row, col);
            table.setAttribute('cellpadding', 8);
            table.style.setProperty('width', '75%');
            table.style.setProperty('background-color', '#FFFFFF');
            table.style.setProperty('border-color', '#CED4D9');
            table.setAttribute('border', '2');
            var emptyLine = document.createElement('p');
            emptyLine.innerHTML = '&nbsp;';
            var temp = document.createElement('div');
            temp.classList.add('tox-clear-float');
            temp.innerHTML = table.outerHTML;
            editor.dom.insertAfter(emptyLine, table);
            editor.dom.insertAfter(temp, table);
            table.remove();
          }
          removeGrid();
        });
      };
      var getGrid = function (row, col, selectRow, selectCol) {
        var button = '';
        if (!selectCol || !selectRow) {
          selectCol = 0;
          selectRow = 0;
        }
        for (var i = 0; i < row * col; i++) {
          if ((i + 1) % row <= selectRow && (selectRow === row || (i + 1) % row !== 0) && Math.ceil((i + 1) / row) <= selectCol) {
            button += '<div role="button" style="border-width: 0 0 1px 1px;" class="tox-insert-table-picker__selected" tabindex="-1"></div>';
          } else {
            button += '<div role="button" style="border-width: 0 0 1px 1px;" tabindex="-1"></div>';
          }
        }
        button += '<span class="tox-insert-table-picker__label" row="' + selectRow + '" col="' + selectCol + '">' + selectRow + '\xD7' + selectCol + '</span>';
        return button;
      };
      var openGrid = function (api, simulatedEvent) {
        var targetElement = simulatedEvent && simulatedEvent.event ? simulatedEvent.event.target.dom : null;
        if (targetElement) {
          var targetRect = targetElement.getBoundingClientRect();
          var editorRect = editor.editorContainer.getBoundingClientRect();
          left = targetRect.left - editorRect.left;
          top = targetRect.top + targetRect.height - editorRect.top + 4;
        }
        var inner = getGrid(defaultTable, defaultTable, 0, 0);
        gridWidth = defaultTable * 17;
        adjustEdge();
        var grid = '<div role="menu" class="tox-menu tox-collection tox-collection--list" style="position: absolute; left: ' + left + 'px; top: ' + top + 'px; overflow: hidden auto!important;z-index: 2000;">\n                 <div class="tox-collection__group">\n                     <div class="tox-fancymenuitem tox-menu-nav__js">\n                         <div class="tox-insert-table-picker" style="width: ' + gridWidth + 'px">\n                            ' + inner + '\n                         </div>\n                     </div>\n                 </div>\n            </div>';
        editor.editorContainer.appendChild(new DOMParser().parseFromString(grid, 'text/html').getElementsByClassName('tox-collection--list')[0]);
        insertTableEvent();
      };
      editor.ui.registry.addButton('ch-table', {
        tooltip: 'Table',
        icon: 'table-cell',
        onAction: openGrid,
        onSetup: function () {
          onSetup(editor);
        }
      });
    }

    function Plugin$h () {
      global$1.add('cherry-table', registryPlugin);
    }

    Plugin$h();

    var jsBeautify = function webpackUniversalModuleDefinition(root, factory) {
      return factory();
    }(typeof self !== 'undefined' ? self : typeof windows !== 'undefined' ? window : typeof global !== 'undefined' ? global : undefined, function () {
      return function () {
        var __webpack_modules__ = [
          function (module, __unused_webpack_exports, __webpack_require__) {
            var js_beautify = __webpack_require__(1);
            var css_beautify = __webpack_require__(16);
            var html_beautify = __webpack_require__(19);
            function style_html(html_source, options, js, css) {
              js = js || js_beautify;
              css = css || css_beautify;
              return html_beautify(html_source, options, js, css);
            }
            style_html.defaultOptions = html_beautify.defaultOptions;
            module.exports.js = js_beautify;
            module.exports.css = css_beautify;
            module.exports.html = style_html;
          },
          function (module, __unused_webpack_exports, __webpack_require__) {
            var Beautifier = __webpack_require__(2).Beautifier, Options = __webpack_require__(6).Options;
            function js_beautify(js_source_text, options) {
              var beautifier = new Beautifier(js_source_text, options);
              return beautifier.beautify();
            }
            module.exports = js_beautify;
            module.exports.defaultOptions = function () {
              return new Options();
            };
          },
          function (module, __unused_webpack_exports, __webpack_require__) {
            var Output = __webpack_require__(3).Output;
            var Token = __webpack_require__(4).Token;
            var acorn = __webpack_require__(5);
            var Options = __webpack_require__(6).Options;
            var Tokenizer = __webpack_require__(8).Tokenizer;
            var line_starters = __webpack_require__(8).line_starters;
            var positionable_operators = __webpack_require__(8).positionable_operators;
            var TOKEN = __webpack_require__(8).TOKEN;
            function in_array(what, arr) {
              return arr.indexOf(what) !== -1;
            }
            function ltrim(s) {
              return s.replace(/^\s+/g, '');
            }
            function generateMapFromStrings(list) {
              var result = {};
              for (var x = 0; x < list.length; x++) {
                result[list[x].replace(/-/g, '_')] = list[x];
              }
              return result;
            }
            function reserved_word(token, word) {
              return token && token.type === TOKEN.RESERVED && token.text === word;
            }
            function reserved_array(token, words) {
              return token && token.type === TOKEN.RESERVED && in_array(token.text, words);
            }
            var special_words = [
              'case',
              'return',
              'do',
              'if',
              'throw',
              'else',
              'await',
              'break',
              'continue',
              'async'
            ];
            var validPositionValues = [
              'before-newline',
              'after-newline',
              'preserve-newline'
            ];
            var OPERATOR_POSITION = generateMapFromStrings(validPositionValues);
            var OPERATOR_POSITION_BEFORE_OR_PRESERVE = [
              OPERATOR_POSITION.before_newline,
              OPERATOR_POSITION.preserve_newline
            ];
            var MODE = {
              BlockStatement: 'BlockStatement',
              Statement: 'Statement',
              ObjectLiteral: 'ObjectLiteral',
              ArrayLiteral: 'ArrayLiteral',
              ForInitializer: 'ForInitializer',
              Conditional: 'Conditional',
              Expression: 'Expression'
            };
            function remove_redundant_indentation(output, frame) {
              if (frame.multiline_frame || frame.mode === MODE.ForInitializer || frame.mode === MODE.Conditional) {
                return;
              }
              output.remove_indent(frame.start_line_index);
            }
            function split_linebreaks(s) {
              s = s.replace(acorn.allLineBreaks, '\n');
              var out = [], idx = s.indexOf('\n');
              while (idx !== -1) {
                out.push(s.substring(0, idx));
                s = s.substring(idx + 1);
                idx = s.indexOf('\n');
              }
              if (s.length) {
                out.push(s);
              }
              return out;
            }
            function is_array(mode) {
              return mode === MODE.ArrayLiteral;
            }
            function is_expression(mode) {
              return in_array(mode, [
                MODE.Expression,
                MODE.ForInitializer,
                MODE.Conditional
              ]);
            }
            function all_lines_start_with(lines, c) {
              for (var i = 0; i < lines.length; i++) {
                var line = lines[i].trim();
                if (line.charAt(0) !== c) {
                  return false;
                }
              }
              return true;
            }
            function each_line_matches_indent(lines, indent) {
              var i = 0, len = lines.length, line;
              for (; i < len; i++) {
                line = lines[i];
                if (line && line.indexOf(indent) !== 0) {
                  return false;
                }
              }
              return true;
            }
            function Beautifier(source_text, options) {
              options = options || {};
              this._source_text = source_text || '';
              this._output = null;
              this._tokens = null;
              this._last_last_text = null;
              this._flags = null;
              this._previous_flags = null;
              this._flag_store = null;
              this._options = new Options(options);
            }
            Beautifier.prototype.create_flags = function (flags_base, mode) {
              var next_indent_level = 0;
              if (flags_base) {
                next_indent_level = flags_base.indentation_level;
                if (!this._output.just_added_newline() && flags_base.line_indent_level > next_indent_level) {
                  next_indent_level = flags_base.line_indent_level;
                }
              }
              var next_flags = {
                mode: mode,
                parent: flags_base,
                last_token: flags_base ? flags_base.last_token : new Token(TOKEN.START_BLOCK, ''),
                last_word: flags_base ? flags_base.last_word : '',
                declaration_statement: false,
                declaration_assignment: false,
                multiline_frame: false,
                inline_frame: false,
                if_block: false,
                else_block: false,
                do_block: false,
                do_while: false,
                import_block: false,
                in_case_statement: false,
                in_case: false,
                case_body: false,
                indentation_level: next_indent_level,
                alignment: 0,
                line_indent_level: flags_base ? flags_base.line_indent_level : next_indent_level,
                start_line_index: this._output.get_line_number(),
                ternary_depth: 0
              };
              return next_flags;
            };
            Beautifier.prototype._reset = function (source_text) {
              var baseIndentString = source_text.match(/^[\t ]*/)[0];
              this._last_last_text = '';
              this._output = new Output(this._options, baseIndentString);
              this._output.raw = this._options.test_output_raw;
              this._flag_store = [];
              this.set_mode(MODE.BlockStatement);
              var tokenizer = new Tokenizer(source_text, this._options);
              this._tokens = tokenizer.tokenize();
              return source_text;
            };
            Beautifier.prototype.beautify = function () {
              if (this._options.disabled) {
                return this._source_text;
              }
              var sweet_code;
              var source_text = this._reset(this._source_text);
              var eol = this._options.eol;
              if (this._options.eol === 'auto') {
                eol = '\n';
                if (source_text && acorn.lineBreak.test(source_text || '')) {
                  eol = source_text.match(acorn.lineBreak)[0];
                }
              }
              var current_token = this._tokens.next();
              while (current_token) {
                this.handle_token(current_token);
                this._last_last_text = this._flags.last_token.text;
                this._flags.last_token = current_token;
                current_token = this._tokens.next();
              }
              sweet_code = this._output.get_code(eol);
              return sweet_code;
            };
            Beautifier.prototype.handle_token = function (current_token, preserve_statement_flags) {
              if (current_token.type === TOKEN.START_EXPR) {
                this.handle_start_expr(current_token);
              } else if (current_token.type === TOKEN.END_EXPR) {
                this.handle_end_expr(current_token);
              } else if (current_token.type === TOKEN.START_BLOCK) {
                this.handle_start_block(current_token);
              } else if (current_token.type === TOKEN.END_BLOCK) {
                this.handle_end_block(current_token);
              } else if (current_token.type === TOKEN.WORD) {
                this.handle_word(current_token);
              } else if (current_token.type === TOKEN.RESERVED) {
                this.handle_word(current_token);
              } else if (current_token.type === TOKEN.SEMICOLON) {
                this.handle_semicolon(current_token);
              } else if (current_token.type === TOKEN.STRING) {
                this.handle_string(current_token);
              } else if (current_token.type === TOKEN.EQUALS) {
                this.handle_equals(current_token);
              } else if (current_token.type === TOKEN.OPERATOR) {
                this.handle_operator(current_token);
              } else if (current_token.type === TOKEN.COMMA) {
                this.handle_comma(current_token);
              } else if (current_token.type === TOKEN.BLOCK_COMMENT) {
                this.handle_block_comment(current_token, preserve_statement_flags);
              } else if (current_token.type === TOKEN.COMMENT) {
                this.handle_comment(current_token, preserve_statement_flags);
              } else if (current_token.type === TOKEN.DOT) {
                this.handle_dot(current_token);
              } else if (current_token.type === TOKEN.EOF) {
                this.handle_eof(current_token);
              } else if (current_token.type === TOKEN.UNKNOWN) {
                this.handle_unknown(current_token, preserve_statement_flags);
              } else {
                this.handle_unknown(current_token, preserve_statement_flags);
              }
            };
            Beautifier.prototype.handle_whitespace_and_comments = function (current_token, preserve_statement_flags) {
              var newlines = current_token.newlines;
              var keep_whitespace = this._options.keep_array_indentation && is_array(this._flags.mode);
              if (current_token.comments_before) {
                var comment_token = current_token.comments_before.next();
                while (comment_token) {
                  this.handle_whitespace_and_comments(comment_token, preserve_statement_flags);
                  this.handle_token(comment_token, preserve_statement_flags);
                  comment_token = current_token.comments_before.next();
                }
              }
              if (keep_whitespace) {
                for (var i = 0; i < newlines; i += 1) {
                  this.print_newline(i > 0, preserve_statement_flags);
                }
              } else {
                if (this._options.max_preserve_newlines && newlines > this._options.max_preserve_newlines) {
                  newlines = this._options.max_preserve_newlines;
                }
                if (this._options.preserve_newlines) {
                  if (newlines > 1) {
                    this.print_newline(false, preserve_statement_flags);
                    for (var j = 1; j < newlines; j += 1) {
                      this.print_newline(true, preserve_statement_flags);
                    }
                  }
                }
              }
            };
            var newline_restricted_tokens = [
              'async',
              'break',
              'continue',
              'return',
              'throw',
              'yield'
            ];
            Beautifier.prototype.allow_wrap_or_preserved_newline = function (current_token, force_linewrap) {
              force_linewrap = force_linewrap === undefined ? false : force_linewrap;
              if (this._output.just_added_newline()) {
                return;
              }
              var shouldPreserveOrForce = this._options.preserve_newlines && current_token.newlines || force_linewrap;
              var operatorLogicApplies = in_array(this._flags.last_token.text, positionable_operators) || in_array(current_token.text, positionable_operators);
              if (operatorLogicApplies) {
                var shouldPrintOperatorNewline = in_array(this._flags.last_token.text, positionable_operators) && in_array(this._options.operator_position, OPERATOR_POSITION_BEFORE_OR_PRESERVE) || in_array(current_token.text, positionable_operators);
                shouldPreserveOrForce = shouldPreserveOrForce && shouldPrintOperatorNewline;
              }
              if (shouldPreserveOrForce) {
                this.print_newline(false, true);
              } else if (this._options.wrap_line_length) {
                if (reserved_array(this._flags.last_token, newline_restricted_tokens)) {
                  return;
                }
                this._output.set_wrap_point();
              }
            };
            Beautifier.prototype.print_newline = function (force_newline, preserve_statement_flags) {
              if (!preserve_statement_flags) {
                if (this._flags.last_token.text !== ';' && this._flags.last_token.text !== ',' && this._flags.last_token.text !== '=' && (this._flags.last_token.type !== TOKEN.OPERATOR || this._flags.last_token.text === '--' || this._flags.last_token.text === '++')) {
                  var next_token = this._tokens.peek();
                  while (this._flags.mode === MODE.Statement && !(this._flags.if_block && reserved_word(next_token, 'else')) && !this._flags.do_block) {
                    this.restore_mode();
                  }
                }
              }
              if (this._output.add_new_line(force_newline)) {
                this._flags.multiline_frame = true;
              }
            };
            Beautifier.prototype.print_token_line_indentation = function (current_token) {
              if (this._output.just_added_newline()) {
                if (this._options.keep_array_indentation && current_token.newlines && (current_token.text === '[' || is_array(this._flags.mode))) {
                  this._output.current_line.set_indent(-1);
                  this._output.current_line.push(current_token.whitespace_before);
                  this._output.space_before_token = false;
                } else if (this._output.set_indent(this._flags.indentation_level, this._flags.alignment)) {
                  this._flags.line_indent_level = this._flags.indentation_level;
                }
              }
            };
            Beautifier.prototype.print_token = function (current_token) {
              if (this._output.raw) {
                this._output.add_raw_token(current_token);
                return;
              }
              if (this._options.comma_first && current_token.previous && current_token.previous.type === TOKEN.COMMA && this._output.just_added_newline()) {
                if (this._output.previous_line.last() === ',') {
                  var popped = this._output.previous_line.pop();
                  if (this._output.previous_line.is_empty()) {
                    this._output.previous_line.push(popped);
                    this._output.trim(true);
                    this._output.current_line.pop();
                    this._output.trim();
                  }
                  this.print_token_line_indentation(current_token);
                  this._output.add_token(',');
                  this._output.space_before_token = true;
                }
              }
              this.print_token_line_indentation(current_token);
              this._output.non_breaking_space = true;
              this._output.add_token(current_token.text);
              if (this._output.previous_token_wrapped) {
                this._flags.multiline_frame = true;
              }
            };
            Beautifier.prototype.indent = function () {
              this._flags.indentation_level += 1;
              this._output.set_indent(this._flags.indentation_level, this._flags.alignment);
            };
            Beautifier.prototype.deindent = function () {
              if (this._flags.indentation_level > 0 && (!this._flags.parent || this._flags.indentation_level > this._flags.parent.indentation_level)) {
                this._flags.indentation_level -= 1;
                this._output.set_indent(this._flags.indentation_level, this._flags.alignment);
              }
            };
            Beautifier.prototype.set_mode = function (mode) {
              if (this._flags) {
                this._flag_store.push(this._flags);
                this._previous_flags = this._flags;
              } else {
                this._previous_flags = this.create_flags(null, mode);
              }
              this._flags = this.create_flags(this._previous_flags, mode);
              this._output.set_indent(this._flags.indentation_level, this._flags.alignment);
            };
            Beautifier.prototype.restore_mode = function () {
              if (this._flag_store.length > 0) {
                this._previous_flags = this._flags;
                this._flags = this._flag_store.pop();
                if (this._previous_flags.mode === MODE.Statement) {
                  remove_redundant_indentation(this._output, this._previous_flags);
                }
                this._output.set_indent(this._flags.indentation_level, this._flags.alignment);
              }
            };
            Beautifier.prototype.start_of_object_property = function () {
              return this._flags.parent.mode === MODE.ObjectLiteral && this._flags.mode === MODE.Statement && (this._flags.last_token.text === ':' && this._flags.ternary_depth === 0 || reserved_array(this._flags.last_token, [
                'get',
                'set'
              ]));
            };
            Beautifier.prototype.start_of_statement = function (current_token) {
              var start = false;
              start = start || reserved_array(this._flags.last_token, [
                'var',
                'let',
                'const'
              ]) && current_token.type === TOKEN.WORD;
              start = start || reserved_word(this._flags.last_token, 'do');
              start = start || !(this._flags.parent.mode === MODE.ObjectLiteral && this._flags.mode === MODE.Statement) && reserved_array(this._flags.last_token, newline_restricted_tokens) && !current_token.newlines;
              start = start || reserved_word(this._flags.last_token, 'else') && !(reserved_word(current_token, 'if') && !current_token.comments_before);
              start = start || this._flags.last_token.type === TOKEN.END_EXPR && (this._previous_flags.mode === MODE.ForInitializer || this._previous_flags.mode === MODE.Conditional);
              start = start || this._flags.last_token.type === TOKEN.WORD && this._flags.mode === MODE.BlockStatement && !this._flags.in_case && !(current_token.text === '--' || current_token.text === '++') && this._last_last_text !== 'function' && current_token.type !== TOKEN.WORD && current_token.type !== TOKEN.RESERVED;
              start = start || this._flags.mode === MODE.ObjectLiteral && (this._flags.last_token.text === ':' && this._flags.ternary_depth === 0 || reserved_array(this._flags.last_token, [
                'get',
                'set'
              ]));
              if (start) {
                this.set_mode(MODE.Statement);
                this.indent();
                this.handle_whitespace_and_comments(current_token, true);
                if (!this.start_of_object_property()) {
                  this.allow_wrap_or_preserved_newline(current_token, reserved_array(current_token, [
                    'do',
                    'for',
                    'if',
                    'while'
                  ]));
                }
                return true;
              }
              return false;
            };
            Beautifier.prototype.handle_start_expr = function (current_token) {
              if (!this.start_of_statement(current_token)) {
                this.handle_whitespace_and_comments(current_token);
              }
              var next_mode = MODE.Expression;
              if (current_token.text === '[') {
                if (this._flags.last_token.type === TOKEN.WORD || this._flags.last_token.text === ')') {
                  if (reserved_array(this._flags.last_token, line_starters)) {
                    this._output.space_before_token = true;
                  }
                  this.print_token(current_token);
                  this.set_mode(next_mode);
                  this.indent();
                  if (this._options.space_in_paren) {
                    this._output.space_before_token = true;
                  }
                  return;
                }
                next_mode = MODE.ArrayLiteral;
                if (is_array(this._flags.mode)) {
                  if (this._flags.last_token.text === '[' || this._flags.last_token.text === ',' && (this._last_last_text === ']' || this._last_last_text === '}')) {
                    if (!this._options.keep_array_indentation) {
                      this.print_newline();
                    }
                  }
                }
                if (!in_array(this._flags.last_token.type, [
                    TOKEN.START_EXPR,
                    TOKEN.END_EXPR,
                    TOKEN.WORD,
                    TOKEN.OPERATOR,
                    TOKEN.DOT
                  ])) {
                  this._output.space_before_token = true;
                }
              } else {
                if (this._flags.last_token.type === TOKEN.RESERVED) {
                  if (this._flags.last_token.text === 'for') {
                    this._output.space_before_token = this._options.space_before_conditional;
                    next_mode = MODE.ForInitializer;
                  } else if (in_array(this._flags.last_token.text, [
                      'if',
                      'while',
                      'switch'
                    ])) {
                    this._output.space_before_token = this._options.space_before_conditional;
                    next_mode = MODE.Conditional;
                  } else if (in_array(this._flags.last_word, [
                      'await',
                      'async'
                    ])) {
                    this._output.space_before_token = true;
                  } else if (this._flags.last_token.text === 'import' && current_token.whitespace_before === '') {
                    this._output.space_before_token = false;
                  } else if (in_array(this._flags.last_token.text, line_starters) || this._flags.last_token.text === 'catch') {
                    this._output.space_before_token = true;
                  }
                } else if (this._flags.last_token.type === TOKEN.EQUALS || this._flags.last_token.type === TOKEN.OPERATOR) {
                  if (!this.start_of_object_property()) {
                    this.allow_wrap_or_preserved_newline(current_token);
                  }
                } else if (this._flags.last_token.type === TOKEN.WORD) {
                  this._output.space_before_token = false;
                  var peek_back_two = this._tokens.peek(-3);
                  if (this._options.space_after_named_function && peek_back_two) {
                    var peek_back_three = this._tokens.peek(-4);
                    if (reserved_array(peek_back_two, [
                        'async',
                        'function'
                      ]) || peek_back_two.text === '*' && reserved_array(peek_back_three, [
                        'async',
                        'function'
                      ])) {
                      this._output.space_before_token = true;
                    } else if (this._flags.mode === MODE.ObjectLiteral) {
                      if (peek_back_two.text === '{' || peek_back_two.text === ',' || peek_back_two.text === '*' && (peek_back_three.text === '{' || peek_back_three.text === ',')) {
                        this._output.space_before_token = true;
                      }
                    }
                  }
                } else {
                  this.allow_wrap_or_preserved_newline(current_token);
                }
                if (this._flags.last_token.type === TOKEN.RESERVED && (this._flags.last_word === 'function' || this._flags.last_word === 'typeof') || this._flags.last_token.text === '*' && (in_array(this._last_last_text, [
                    'function',
                    'yield'
                  ]) || this._flags.mode === MODE.ObjectLiteral && in_array(this._last_last_text, [
                    '{',
                    ','
                  ]))) {
                  this._output.space_before_token = this._options.space_after_anon_function;
                }
              }
              if (this._flags.last_token.text === ';' || this._flags.last_token.type === TOKEN.START_BLOCK) {
                this.print_newline();
              } else if (this._flags.last_token.type === TOKEN.END_EXPR || this._flags.last_token.type === TOKEN.START_EXPR || this._flags.last_token.type === TOKEN.END_BLOCK || this._flags.last_token.text === '.' || this._flags.last_token.type === TOKEN.COMMA) {
                this.allow_wrap_or_preserved_newline(current_token, current_token.newlines);
              }
              this.print_token(current_token);
              this.set_mode(next_mode);
              if (this._options.space_in_paren) {
                this._output.space_before_token = true;
              }
              this.indent();
            };
            Beautifier.prototype.handle_end_expr = function (current_token) {
              while (this._flags.mode === MODE.Statement) {
                this.restore_mode();
              }
              this.handle_whitespace_and_comments(current_token);
              if (this._flags.multiline_frame) {
                this.allow_wrap_or_preserved_newline(current_token, current_token.text === ']' && is_array(this._flags.mode) && !this._options.keep_array_indentation);
              }
              if (this._options.space_in_paren) {
                if (this._flags.last_token.type === TOKEN.START_EXPR && !this._options.space_in_empty_paren) {
                  this._output.trim();
                  this._output.space_before_token = false;
                } else {
                  this._output.space_before_token = true;
                }
              }
              this.deindent();
              this.print_token(current_token);
              this.restore_mode();
              remove_redundant_indentation(this._output, this._previous_flags);
              if (this._flags.do_while && this._previous_flags.mode === MODE.Conditional) {
                this._previous_flags.mode = MODE.Expression;
                this._flags.do_block = false;
                this._flags.do_while = false;
              }
            };
            Beautifier.prototype.handle_start_block = function (current_token) {
              this.handle_whitespace_and_comments(current_token);
              var next_token = this._tokens.peek();
              var second_token = this._tokens.peek(1);
              if (this._flags.last_word === 'switch' && this._flags.last_token.type === TOKEN.END_EXPR) {
                this.set_mode(MODE.BlockStatement);
                this._flags.in_case_statement = true;
              } else if (this._flags.case_body) {
                this.set_mode(MODE.BlockStatement);
              } else if (second_token && (in_array(second_token.text, [
                  ':',
                  ','
                ]) && in_array(next_token.type, [
                  TOKEN.STRING,
                  TOKEN.WORD,
                  TOKEN.RESERVED
                ]) || in_array(next_token.text, [
                  'get',
                  'set',
                  '...'
                ]) && in_array(second_token.type, [
                  TOKEN.WORD,
                  TOKEN.RESERVED
                ]))) {
                if (!in_array(this._last_last_text, [
                    'class',
                    'interface'
                  ])) {
                  this.set_mode(MODE.ObjectLiteral);
                } else {
                  this.set_mode(MODE.BlockStatement);
                }
              } else if (this._flags.last_token.type === TOKEN.OPERATOR && this._flags.last_token.text === '=>') {
                this.set_mode(MODE.BlockStatement);
              } else if (in_array(this._flags.last_token.type, [
                  TOKEN.EQUALS,
                  TOKEN.START_EXPR,
                  TOKEN.COMMA,
                  TOKEN.OPERATOR
                ]) || reserved_array(this._flags.last_token, [
                  'return',
                  'throw',
                  'import',
                  'default'
                ])) {
                this.set_mode(MODE.ObjectLiteral);
              } else {
                this.set_mode(MODE.BlockStatement);
              }
              var empty_braces = !next_token.comments_before && next_token.text === '}';
              var empty_anonymous_function = empty_braces && this._flags.last_word === 'function' && this._flags.last_token.type === TOKEN.END_EXPR;
              if (this._options.brace_preserve_inline) {
                var index = 0;
                var check_token = null;
                this._flags.inline_frame = true;
                do {
                  index += 1;
                  check_token = this._tokens.peek(index - 1);
                  if (check_token.newlines) {
                    this._flags.inline_frame = false;
                    break;
                  }
                } while (check_token.type !== TOKEN.EOF && !(check_token.type === TOKEN.END_BLOCK && check_token.opened === current_token));
              }
              if ((this._options.brace_style === 'expand' || this._options.brace_style === 'none' && current_token.newlines) && !this._flags.inline_frame) {
                if (this._flags.last_token.type !== TOKEN.OPERATOR && (empty_anonymous_function || this._flags.last_token.type === TOKEN.EQUALS || reserved_array(this._flags.last_token, special_words) && this._flags.last_token.text !== 'else')) {
                  this._output.space_before_token = true;
                } else {
                  this.print_newline(false, true);
                }
              } else {
                if (is_array(this._previous_flags.mode) && (this._flags.last_token.type === TOKEN.START_EXPR || this._flags.last_token.type === TOKEN.COMMA)) {
                  if (this._flags.last_token.type === TOKEN.COMMA || this._options.space_in_paren) {
                    this._output.space_before_token = true;
                  }
                  if (this._flags.last_token.type === TOKEN.COMMA || this._flags.last_token.type === TOKEN.START_EXPR && this._flags.inline_frame) {
                    this.allow_wrap_or_preserved_newline(current_token);
                    this._previous_flags.multiline_frame = this._previous_flags.multiline_frame || this._flags.multiline_frame;
                    this._flags.multiline_frame = false;
                  }
                }
                if (this._flags.last_token.type !== TOKEN.OPERATOR && this._flags.last_token.type !== TOKEN.START_EXPR) {
                  if (this._flags.last_token.type === TOKEN.START_BLOCK && !this._flags.inline_frame) {
                    this.print_newline();
                  } else {
                    this._output.space_before_token = true;
                  }
                }
              }
              this.print_token(current_token);
              this.indent();
              if (!empty_braces && !(this._options.brace_preserve_inline && this._flags.inline_frame)) {
                this.print_newline();
              }
            };
            Beautifier.prototype.handle_end_block = function (current_token) {
              this.handle_whitespace_and_comments(current_token);
              while (this._flags.mode === MODE.Statement) {
                this.restore_mode();
              }
              var empty_braces = this._flags.last_token.type === TOKEN.START_BLOCK;
              if (this._flags.inline_frame && !empty_braces) {
                this._output.space_before_token = true;
              } else if (this._options.brace_style === 'expand') {
                if (!empty_braces) {
                  this.print_newline();
                }
              } else {
                if (!empty_braces) {
                  if (is_array(this._flags.mode) && this._options.keep_array_indentation) {
                    this._options.keep_array_indentation = false;
                    this.print_newline();
                    this._options.keep_array_indentation = true;
                  } else {
                    this.print_newline();
                  }
                }
              }
              this.restore_mode();
              this.print_token(current_token);
            };
            Beautifier.prototype.handle_word = function (current_token) {
              if (current_token.type === TOKEN.RESERVED) {
                if (in_array(current_token.text, [
                    'set',
                    'get'
                  ]) && this._flags.mode !== MODE.ObjectLiteral) {
                  current_token.type = TOKEN.WORD;
                } else if (current_token.text === 'import' && this._tokens.peek().text === '(') {
                  current_token.type = TOKEN.WORD;
                } else if (in_array(current_token.text, [
                    'as',
                    'from'
                  ]) && !this._flags.import_block) {
                  current_token.type = TOKEN.WORD;
                } else if (this._flags.mode === MODE.ObjectLiteral) {
                  var next_token = this._tokens.peek();
                  if (next_token.text === ':') {
                    current_token.type = TOKEN.WORD;
                  }
                }
              }
              if (this.start_of_statement(current_token)) {
                if (reserved_array(this._flags.last_token, [
                    'var',
                    'let',
                    'const'
                  ]) && current_token.type === TOKEN.WORD) {
                  this._flags.declaration_statement = true;
                }
              } else if (current_token.newlines && !is_expression(this._flags.mode) && (this._flags.last_token.type !== TOKEN.OPERATOR || (this._flags.last_token.text === '--' || this._flags.last_token.text === '++')) && this._flags.last_token.type !== TOKEN.EQUALS && (this._options.preserve_newlines || !reserved_array(this._flags.last_token, [
                  'var',
                  'let',
                  'const',
                  'set',
                  'get'
                ]))) {
                this.handle_whitespace_and_comments(current_token);
                this.print_newline();
              } else {
                this.handle_whitespace_and_comments(current_token);
              }
              if (this._flags.do_block && !this._flags.do_while) {
                if (reserved_word(current_token, 'while')) {
                  this._output.space_before_token = true;
                  this.print_token(current_token);
                  this._output.space_before_token = true;
                  this._flags.do_while = true;
                  return;
                } else {
                  this.print_newline();
                  this._flags.do_block = false;
                }
              }
              if (this._flags.if_block) {
                if (!this._flags.else_block && reserved_word(current_token, 'else')) {
                  this._flags.else_block = true;
                } else {
                  while (this._flags.mode === MODE.Statement) {
                    this.restore_mode();
                  }
                  this._flags.if_block = false;
                  this._flags.else_block = false;
                }
              }
              if (this._flags.in_case_statement && reserved_array(current_token, [
                  'case',
                  'default'
                ])) {
                this.print_newline();
                if (this._flags.last_token.type !== TOKEN.END_BLOCK && (this._flags.case_body || this._options.jslint_happy)) {
                  this.deindent();
                }
                this._flags.case_body = false;
                this.print_token(current_token);
                this._flags.in_case = true;
                return;
              }
              if (this._flags.last_token.type === TOKEN.COMMA || this._flags.last_token.type === TOKEN.START_EXPR || this._flags.last_token.type === TOKEN.EQUALS || this._flags.last_token.type === TOKEN.OPERATOR) {
                if (!this.start_of_object_property()) {
                  this.allow_wrap_or_preserved_newline(current_token);
                }
              }
              if (reserved_word(current_token, 'function')) {
                if (in_array(this._flags.last_token.text, [
                    '}',
                    ';'
                  ]) || this._output.just_added_newline() && !(in_array(this._flags.last_token.text, [
                    '(',
                    '[',
                    '{',
                    ':',
                    '=',
                    ','
                  ]) || this._flags.last_token.type === TOKEN.OPERATOR)) {
                  if (!this._output.just_added_blankline() && !current_token.comments_before) {
                    this.print_newline();
                    this.print_newline(true);
                  }
                }
                if (this._flags.last_token.type === TOKEN.RESERVED || this._flags.last_token.type === TOKEN.WORD) {
                  if (reserved_array(this._flags.last_token, [
                      'get',
                      'set',
                      'new',
                      'export'
                    ]) || reserved_array(this._flags.last_token, newline_restricted_tokens)) {
                    this._output.space_before_token = true;
                  } else if (reserved_word(this._flags.last_token, 'default') && this._last_last_text === 'export') {
                    this._output.space_before_token = true;
                  } else if (this._flags.last_token.text === 'declare') {
                    this._output.space_before_token = true;
                  } else {
                    this.print_newline();
                  }
                } else if (this._flags.last_token.type === TOKEN.OPERATOR || this._flags.last_token.text === '=') {
                  this._output.space_before_token = true;
                } else if (!this._flags.multiline_frame && (is_expression(this._flags.mode) || is_array(this._flags.mode))) ; else {
                  this.print_newline();
                }
                this.print_token(current_token);
                this._flags.last_word = current_token.text;
                return;
              }
              var prefix = 'NONE';
              if (this._flags.last_token.type === TOKEN.END_BLOCK) {
                if (this._previous_flags.inline_frame) {
                  prefix = 'SPACE';
                } else if (!reserved_array(current_token, [
                    'else',
                    'catch',
                    'finally',
                    'from'
                  ])) {
                  prefix = 'NEWLINE';
                } else {
                  if (this._options.brace_style === 'expand' || this._options.brace_style === 'end-expand' || this._options.brace_style === 'none' && current_token.newlines) {
                    prefix = 'NEWLINE';
                  } else {
                    prefix = 'SPACE';
                    this._output.space_before_token = true;
                  }
                }
              } else if (this._flags.last_token.type === TOKEN.SEMICOLON && this._flags.mode === MODE.BlockStatement) {
                prefix = 'NEWLINE';
              } else if (this._flags.last_token.type === TOKEN.SEMICOLON && is_expression(this._flags.mode)) {
                prefix = 'SPACE';
              } else if (this._flags.last_token.type === TOKEN.STRING) {
                prefix = 'NEWLINE';
              } else if (this._flags.last_token.type === TOKEN.RESERVED || this._flags.last_token.type === TOKEN.WORD || this._flags.last_token.text === '*' && (in_array(this._last_last_text, [
                  'function',
                  'yield'
                ]) || this._flags.mode === MODE.ObjectLiteral && in_array(this._last_last_text, [
                  '{',
                  ','
                ]))) {
                prefix = 'SPACE';
              } else if (this._flags.last_token.type === TOKEN.START_BLOCK) {
                if (this._flags.inline_frame) {
                  prefix = 'SPACE';
                } else {
                  prefix = 'NEWLINE';
                }
              } else if (this._flags.last_token.type === TOKEN.END_EXPR) {
                this._output.space_before_token = true;
                prefix = 'NEWLINE';
              }
              if (reserved_array(current_token, line_starters) && this._flags.last_token.text !== ')') {
                if (this._flags.inline_frame || this._flags.last_token.text === 'else' || this._flags.last_token.text === 'export') {
                  prefix = 'SPACE';
                } else {
                  prefix = 'NEWLINE';
                }
              }
              if (reserved_array(current_token, [
                  'else',
                  'catch',
                  'finally'
                ])) {
                if ((!(this._flags.last_token.type === TOKEN.END_BLOCK && this._previous_flags.mode === MODE.BlockStatement) || this._options.brace_style === 'expand' || this._options.brace_style === 'end-expand' || this._options.brace_style === 'none' && current_token.newlines) && !this._flags.inline_frame) {
                  this.print_newline();
                } else {
                  this._output.trim(true);
                  var line = this._output.current_line;
                  if (line.last() !== '}') {
                    this.print_newline();
                  }
                  this._output.space_before_token = true;
                }
              } else if (prefix === 'NEWLINE') {
                if (reserved_array(this._flags.last_token, special_words)) {
                  this._output.space_before_token = true;
                } else if (this._flags.last_token.text === 'declare' && reserved_array(current_token, [
                    'var',
                    'let',
                    'const'
                  ])) {
                  this._output.space_before_token = true;
                } else if (this._flags.last_token.type !== TOKEN.END_EXPR) {
                  if ((this._flags.last_token.type !== TOKEN.START_EXPR || !reserved_array(current_token, [
                      'var',
                      'let',
                      'const'
                    ])) && this._flags.last_token.text !== ':') {
                    if (reserved_word(current_token, 'if') && reserved_word(current_token.previous, 'else')) {
                      this._output.space_before_token = true;
                    } else {
                      this.print_newline();
                    }
                  }
                } else if (reserved_array(current_token, line_starters) && this._flags.last_token.text !== ')') {
                  this.print_newline();
                }
              } else if (this._flags.multiline_frame && is_array(this._flags.mode) && this._flags.last_token.text === ',' && this._last_last_text === '}') {
                this.print_newline();
              } else if (prefix === 'SPACE') {
                this._output.space_before_token = true;
              }
              if (current_token.previous && (current_token.previous.type === TOKEN.WORD || current_token.previous.type === TOKEN.RESERVED)) {
                this._output.space_before_token = true;
              }
              this.print_token(current_token);
              this._flags.last_word = current_token.text;
              if (current_token.type === TOKEN.RESERVED) {
                if (current_token.text === 'do') {
                  this._flags.do_block = true;
                } else if (current_token.text === 'if') {
                  this._flags.if_block = true;
                } else if (current_token.text === 'import') {
                  this._flags.import_block = true;
                } else if (this._flags.import_block && reserved_word(current_token, 'from')) {
                  this._flags.import_block = false;
                }
              }
            };
            Beautifier.prototype.handle_semicolon = function (current_token) {
              if (this.start_of_statement(current_token)) {
                this._output.space_before_token = false;
              } else {
                this.handle_whitespace_and_comments(current_token);
              }
              var next_token = this._tokens.peek();
              while (this._flags.mode === MODE.Statement && !(this._flags.if_block && reserved_word(next_token, 'else')) && !this._flags.do_block) {
                this.restore_mode();
              }
              if (this._flags.import_block) {
                this._flags.import_block = false;
              }
              this.print_token(current_token);
            };
            Beautifier.prototype.handle_string = function (current_token) {
              if (current_token.text.startsWith('`') && current_token.newlines === 0 && current_token.whitespace_before === '' && (current_token.previous.text === ')' || this._flags.last_token.type === TOKEN.WORD)) ; else if (this.start_of_statement(current_token)) {
                this._output.space_before_token = true;
              } else {
                this.handle_whitespace_and_comments(current_token);
                if (this._flags.last_token.type === TOKEN.RESERVED || this._flags.last_token.type === TOKEN.WORD || this._flags.inline_frame) {
                  this._output.space_before_token = true;
                } else if (this._flags.last_token.type === TOKEN.COMMA || this._flags.last_token.type === TOKEN.START_EXPR || this._flags.last_token.type === TOKEN.EQUALS || this._flags.last_token.type === TOKEN.OPERATOR) {
                  if (!this.start_of_object_property()) {
                    this.allow_wrap_or_preserved_newline(current_token);
                  }
                } else if (current_token.text.startsWith('`') && this._flags.last_token.type === TOKEN.END_EXPR && (current_token.previous.text === ']' || current_token.previous.text === ')') && current_token.newlines === 0) {
                  this._output.space_before_token = true;
                } else {
                  this.print_newline();
                }
              }
              this.print_token(current_token);
            };
            Beautifier.prototype.handle_equals = function (current_token) {
              if (this.start_of_statement(current_token)) ; else {
                this.handle_whitespace_and_comments(current_token);
              }
              if (this._flags.declaration_statement) {
                this._flags.declaration_assignment = true;
              }
              this._output.space_before_token = true;
              this.print_token(current_token);
              this._output.space_before_token = true;
            };
            Beautifier.prototype.handle_comma = function (current_token) {
              this.handle_whitespace_and_comments(current_token, true);
              this.print_token(current_token);
              this._output.space_before_token = true;
              if (this._flags.declaration_statement) {
                if (is_expression(this._flags.parent.mode)) {
                  this._flags.declaration_assignment = false;
                }
                if (this._flags.declaration_assignment) {
                  this._flags.declaration_assignment = false;
                  this.print_newline(false, true);
                } else if (this._options.comma_first) {
                  this.allow_wrap_or_preserved_newline(current_token);
                }
              } else if (this._flags.mode === MODE.ObjectLiteral || this._flags.mode === MODE.Statement && this._flags.parent.mode === MODE.ObjectLiteral) {
                if (this._flags.mode === MODE.Statement) {
                  this.restore_mode();
                }
                if (!this._flags.inline_frame) {
                  this.print_newline();
                }
              } else if (this._options.comma_first) {
                this.allow_wrap_or_preserved_newline(current_token);
              }
            };
            Beautifier.prototype.handle_operator = function (current_token) {
              var isGeneratorAsterisk = current_token.text === '*' && (reserved_array(this._flags.last_token, [
                'function',
                'yield'
              ]) || in_array(this._flags.last_token.type, [
                TOKEN.START_BLOCK,
                TOKEN.COMMA,
                TOKEN.END_BLOCK,
                TOKEN.SEMICOLON
              ]));
              var isUnary = in_array(current_token.text, [
                '-',
                '+'
              ]) && (in_array(this._flags.last_token.type, [
                TOKEN.START_BLOCK,
                TOKEN.START_EXPR,
                TOKEN.EQUALS,
                TOKEN.OPERATOR
              ]) || in_array(this._flags.last_token.text, line_starters) || this._flags.last_token.text === ',');
              if (this.start_of_statement(current_token)) ; else {
                var preserve_statement_flags = !isGeneratorAsterisk;
                this.handle_whitespace_and_comments(current_token, preserve_statement_flags);
              }
              if (reserved_array(this._flags.last_token, special_words)) {
                this._output.space_before_token = true;
                this.print_token(current_token);
                return;
              }
              if (current_token.text === '*' && this._flags.last_token.type === TOKEN.DOT) {
                this.print_token(current_token);
                return;
              }
              if (current_token.text === '::') {
                this.print_token(current_token);
                return;
              }
              if (this._flags.last_token.type === TOKEN.OPERATOR && in_array(this._options.operator_position, OPERATOR_POSITION_BEFORE_OR_PRESERVE)) {
                this.allow_wrap_or_preserved_newline(current_token);
              }
              if (current_token.text === ':' && this._flags.in_case) {
                this.print_token(current_token);
                this._flags.in_case = false;
                this._flags.case_body = true;
                if (this._tokens.peek().type !== TOKEN.START_BLOCK) {
                  this.indent();
                  this.print_newline();
                } else {
                  this._output.space_before_token = true;
                }
                return;
              }
              var space_before = true;
              var space_after = true;
              var in_ternary = false;
              if (current_token.text === ':') {
                if (this._flags.ternary_depth === 0) {
                  space_before = false;
                } else {
                  this._flags.ternary_depth -= 1;
                  in_ternary = true;
                }
              } else if (current_token.text === '?') {
                this._flags.ternary_depth += 1;
              }
              if (!isUnary && !isGeneratorAsterisk && this._options.preserve_newlines && in_array(current_token.text, positionable_operators)) {
                var isColon = current_token.text === ':';
                var isTernaryColon = isColon && in_ternary;
                var isOtherColon = isColon && !in_ternary;
                switch (this._options.operator_position) {
                case OPERATOR_POSITION.before_newline:
                  this._output.space_before_token = !isOtherColon;
                  this.print_token(current_token);
                  if (!isColon || isTernaryColon) {
                    this.allow_wrap_or_preserved_newline(current_token);
                  }
                  this._output.space_before_token = true;
                  return;
                case OPERATOR_POSITION.after_newline:
                  this._output.space_before_token = true;
                  if (!isColon || isTernaryColon) {
                    if (this._tokens.peek().newlines) {
                      this.print_newline(false, true);
                    } else {
                      this.allow_wrap_or_preserved_newline(current_token);
                    }
                  } else {
                    this._output.space_before_token = false;
                  }
                  this.print_token(current_token);
                  this._output.space_before_token = true;
                  return;
                case OPERATOR_POSITION.preserve_newline:
                  if (!isOtherColon) {
                    this.allow_wrap_or_preserved_newline(current_token);
                  }
                  space_before = !(this._output.just_added_newline() || isOtherColon);
                  this._output.space_before_token = space_before;
                  this.print_token(current_token);
                  this._output.space_before_token = true;
                  return;
                }
              }
              if (isGeneratorAsterisk) {
                this.allow_wrap_or_preserved_newline(current_token);
                space_before = false;
                var next_token = this._tokens.peek();
                space_after = next_token && in_array(next_token.type, [
                  TOKEN.WORD,
                  TOKEN.RESERVED
                ]);
              } else if (current_token.text === '...') {
                this.allow_wrap_or_preserved_newline(current_token);
                space_before = this._flags.last_token.type === TOKEN.START_BLOCK;
                space_after = false;
              } else if (in_array(current_token.text, [
                  '--',
                  '++',
                  '!',
                  '~'
                ]) || isUnary) {
                if (this._flags.last_token.type === TOKEN.COMMA || this._flags.last_token.type === TOKEN.START_EXPR) {
                  this.allow_wrap_or_preserved_newline(current_token);
                }
                space_before = false;
                space_after = false;
                if (current_token.newlines && (current_token.text === '--' || current_token.text === '++')) {
                  this.print_newline(false, true);
                }
                if (this._flags.last_token.text === ';' && is_expression(this._flags.mode)) {
                  space_before = true;
                }
                if (this._flags.last_token.type === TOKEN.RESERVED) {
                  space_before = true;
                } else if (this._flags.last_token.type === TOKEN.END_EXPR) {
                  space_before = !(this._flags.last_token.text === ']' && (current_token.text === '--' || current_token.text === '++'));
                } else if (this._flags.last_token.type === TOKEN.OPERATOR) {
                  space_before = in_array(current_token.text, [
                    '--',
                    '-',
                    '++',
                    '+'
                  ]) && in_array(this._flags.last_token.text, [
                    '--',
                    '-',
                    '++',
                    '+'
                  ]);
                  if (in_array(current_token.text, [
                      '+',
                      '-'
                    ]) && in_array(this._flags.last_token.text, [
                      '--',
                      '++'
                    ])) {
                    space_after = true;
                  }
                }
                if ((this._flags.mode === MODE.BlockStatement && !this._flags.inline_frame || this._flags.mode === MODE.Statement) && (this._flags.last_token.text === '{' || this._flags.last_token.text === ';')) {
                  this.print_newline();
                }
              }
              this._output.space_before_token = this._output.space_before_token || space_before;
              this.print_token(current_token);
              this._output.space_before_token = space_after;
            };
            Beautifier.prototype.handle_block_comment = function (current_token, preserve_statement_flags) {
              if (this._output.raw) {
                this._output.add_raw_token(current_token);
                if (current_token.directives && current_token.directives.preserve === 'end') {
                  this._output.raw = this._options.test_output_raw;
                }
                return;
              }
              if (current_token.directives) {
                this.print_newline(false, preserve_statement_flags);
                this.print_token(current_token);
                if (current_token.directives.preserve === 'start') {
                  this._output.raw = true;
                }
                this.print_newline(false, true);
                return;
              }
              if (!acorn.newline.test(current_token.text) && !current_token.newlines) {
                this._output.space_before_token = true;
                this.print_token(current_token);
                this._output.space_before_token = true;
                return;
              } else {
                this.print_block_commment(current_token, preserve_statement_flags);
              }
            };
            Beautifier.prototype.print_block_commment = function (current_token, preserve_statement_flags) {
              var lines = split_linebreaks(current_token.text);
              var j;
              var javadoc = false;
              var starless = false;
              var lastIndent = current_token.whitespace_before;
              var lastIndentLength = lastIndent.length;
              this.print_newline(false, preserve_statement_flags);
              this.print_token_line_indentation(current_token);
              this._output.add_token(lines[0]);
              this.print_newline(false, preserve_statement_flags);
              if (lines.length > 1) {
                lines = lines.slice(1);
                javadoc = all_lines_start_with(lines, '*');
                starless = each_line_matches_indent(lines, lastIndent);
                if (javadoc) {
                  this._flags.alignment = 1;
                }
                for (j = 0; j < lines.length; j++) {
                  if (javadoc) {
                    this.print_token_line_indentation(current_token);
                    this._output.add_token(ltrim(lines[j]));
                  } else if (starless && lines[j]) {
                    this.print_token_line_indentation(current_token);
                    this._output.add_token(lines[j].substring(lastIndentLength));
                  } else {
                    this._output.current_line.set_indent(-1);
                    this._output.add_token(lines[j]);
                  }
                  this.print_newline(false, preserve_statement_flags);
                }
                this._flags.alignment = 0;
              }
            };
            Beautifier.prototype.handle_comment = function (current_token, preserve_statement_flags) {
              if (current_token.newlines) {
                this.print_newline(false, preserve_statement_flags);
              } else {
                this._output.trim(true);
              }
              this._output.space_before_token = true;
              this.print_token(current_token);
              this.print_newline(false, preserve_statement_flags);
            };
            Beautifier.prototype.handle_dot = function (current_token) {
              if (this.start_of_statement(current_token)) ; else {
                this.handle_whitespace_and_comments(current_token, true);
              }
              if (reserved_array(this._flags.last_token, special_words)) {
                this._output.space_before_token = false;
              } else {
                this.allow_wrap_or_preserved_newline(current_token, this._flags.last_token.text === ')' && this._options.break_chained_methods);
              }
              if (this._options.unindent_chained_methods && this._output.just_added_newline()) {
                this.deindent();
              }
              this.print_token(current_token);
            };
            Beautifier.prototype.handle_unknown = function (current_token, preserve_statement_flags) {
              this.print_token(current_token);
              if (current_token.text[current_token.text.length - 1] === '\n') {
                this.print_newline(false, preserve_statement_flags);
              }
            };
            Beautifier.prototype.handle_eof = function (current_token) {
              while (this._flags.mode === MODE.Statement) {
                this.restore_mode();
              }
              this.handle_whitespace_and_comments(current_token);
            };
            module.exports.Beautifier = Beautifier;
          },
          function (module) {
            function OutputLine(parent) {
              this.__parent = parent;
              this.__character_count = 0;
              this.__indent_count = -1;
              this.__alignment_count = 0;
              this.__wrap_point_index = 0;
              this.__wrap_point_character_count = 0;
              this.__wrap_point_indent_count = -1;
              this.__wrap_point_alignment_count = 0;
              this.__items = [];
            }
            OutputLine.prototype.clone_empty = function () {
              var line = new OutputLine(this.__parent);
              line.set_indent(this.__indent_count, this.__alignment_count);
              return line;
            };
            OutputLine.prototype.item = function (index) {
              if (index < 0) {
                return this.__items[this.__items.length + index];
              } else {
                return this.__items[index];
              }
            };
            OutputLine.prototype.has_match = function (pattern) {
              for (var lastCheckedOutput = this.__items.length - 1; lastCheckedOutput >= 0; lastCheckedOutput--) {
                if (this.__items[lastCheckedOutput].match(pattern)) {
                  return true;
                }
              }
              return false;
            };
            OutputLine.prototype.set_indent = function (indent, alignment) {
              if (this.is_empty()) {
                this.__indent_count = indent || 0;
                this.__alignment_count = alignment || 0;
                this.__character_count = this.__parent.get_indent_size(this.__indent_count, this.__alignment_count);
              }
            };
            OutputLine.prototype._set_wrap_point = function () {
              if (this.__parent.wrap_line_length) {
                this.__wrap_point_index = this.__items.length;
                this.__wrap_point_character_count = this.__character_count;
                this.__wrap_point_indent_count = this.__parent.next_line.__indent_count;
                this.__wrap_point_alignment_count = this.__parent.next_line.__alignment_count;
              }
            };
            OutputLine.prototype._should_wrap = function () {
              return this.__wrap_point_index && this.__character_count > this.__parent.wrap_line_length && this.__wrap_point_character_count > this.__parent.next_line.__character_count;
            };
            OutputLine.prototype._allow_wrap = function () {
              if (this._should_wrap()) {
                this.__parent.add_new_line();
                var next = this.__parent.current_line;
                next.set_indent(this.__wrap_point_indent_count, this.__wrap_point_alignment_count);
                next.__items = this.__items.slice(this.__wrap_point_index);
                this.__items = this.__items.slice(0, this.__wrap_point_index);
                next.__character_count += this.__character_count - this.__wrap_point_character_count;
                this.__character_count = this.__wrap_point_character_count;
                if (next.__items[0] === ' ') {
                  next.__items.splice(0, 1);
                  next.__character_count -= 1;
                }
                return true;
              }
              return false;
            };
            OutputLine.prototype.is_empty = function () {
              return this.__items.length === 0;
            };
            OutputLine.prototype.last = function () {
              if (!this.is_empty()) {
                return this.__items[this.__items.length - 1];
              } else {
                return null;
              }
            };
            OutputLine.prototype.push = function (item) {
              this.__items.push(item);
              var last_newline_index = item.lastIndexOf('\n');
              if (last_newline_index !== -1) {
                this.__character_count = item.length - last_newline_index;
              } else {
                this.__character_count += item.length;
              }
            };
            OutputLine.prototype.pop = function () {
              var item = null;
              if (!this.is_empty()) {
                item = this.__items.pop();
                this.__character_count -= item.length;
              }
              return item;
            };
            OutputLine.prototype._remove_indent = function () {
              if (this.__indent_count > 0) {
                this.__indent_count -= 1;
                this.__character_count -= this.__parent.indent_size;
              }
            };
            OutputLine.prototype._remove_wrap_indent = function () {
              if (this.__wrap_point_indent_count > 0) {
                this.__wrap_point_indent_count -= 1;
              }
            };
            OutputLine.prototype.trim = function () {
              while (this.last() === ' ') {
                this.__items.pop();
                this.__character_count -= 1;
              }
            };
            OutputLine.prototype.toString = function () {
              var result = '';
              if (this.is_empty()) {
                if (this.__parent.indent_empty_lines) {
                  result = this.__parent.get_indent_string(this.__indent_count);
                }
              } else {
                result = this.__parent.get_indent_string(this.__indent_count, this.__alignment_count);
                result += this.__items.join('');
              }
              return result;
            };
            function IndentStringCache(options, baseIndentString) {
              this.__cache = [''];
              this.__indent_size = options.indent_size;
              this.__indent_string = options.indent_char;
              if (!options.indent_with_tabs) {
                this.__indent_string = new Array(options.indent_size + 1).join(options.indent_char);
              }
              baseIndentString = baseIndentString || '';
              if (options.indent_level > 0) {
                baseIndentString = new Array(options.indent_level + 1).join(this.__indent_string);
              }
              this.__base_string = baseIndentString;
              this.__base_string_length = baseIndentString.length;
            }
            IndentStringCache.prototype.get_indent_size = function (indent, column) {
              var result = this.__base_string_length;
              column = column || 0;
              if (indent < 0) {
                result = 0;
              }
              result += indent * this.__indent_size;
              result += column;
              return result;
            };
            IndentStringCache.prototype.get_indent_string = function (indent_level, column) {
              var result = this.__base_string;
              column = column || 0;
              if (indent_level < 0) {
                indent_level = 0;
                result = '';
              }
              column += indent_level * this.__indent_size;
              this.__ensure_cache(column);
              result += this.__cache[column];
              return result;
            };
            IndentStringCache.prototype.__ensure_cache = function (column) {
              while (column >= this.__cache.length) {
                this.__add_column();
              }
            };
            IndentStringCache.prototype.__add_column = function () {
              var column = this.__cache.length;
              var indent = 0;
              var result = '';
              if (this.__indent_size && column >= this.__indent_size) {
                indent = Math.floor(column / this.__indent_size);
                column -= indent * this.__indent_size;
                result = new Array(indent + 1).join(this.__indent_string);
              }
              if (column) {
                result += new Array(column + 1).join(' ');
              }
              this.__cache.push(result);
            };
            function Output(options, baseIndentString) {
              this.__indent_cache = new IndentStringCache(options, baseIndentString);
              this.raw = false;
              this._end_with_newline = options.end_with_newline;
              this.indent_size = options.indent_size;
              this.wrap_line_length = options.wrap_line_length;
              this.indent_empty_lines = options.indent_empty_lines;
              this.__lines = [];
              this.previous_line = null;
              this.current_line = null;
              this.next_line = new OutputLine(this);
              this.space_before_token = false;
              this.non_breaking_space = false;
              this.previous_token_wrapped = false;
              this.__add_outputline();
            }
            Output.prototype.__add_outputline = function () {
              this.previous_line = this.current_line;
              this.current_line = this.next_line.clone_empty();
              this.__lines.push(this.current_line);
            };
            Output.prototype.get_line_number = function () {
              return this.__lines.length;
            };
            Output.prototype.get_indent_string = function (indent, column) {
              return this.__indent_cache.get_indent_string(indent, column);
            };
            Output.prototype.get_indent_size = function (indent, column) {
              return this.__indent_cache.get_indent_size(indent, column);
            };
            Output.prototype.is_empty = function () {
              return !this.previous_line && this.current_line.is_empty();
            };
            Output.prototype.add_new_line = function (force_newline) {
              if (this.is_empty() || !force_newline && this.just_added_newline()) {
                return false;
              }
              if (!this.raw) {
                this.__add_outputline();
              }
              return true;
            };
            Output.prototype.get_code = function (eol) {
              this.trim(true);
              var last_item = this.current_line.pop();
              if (last_item) {
                if (last_item[last_item.length - 1] === '\n') {
                  last_item = last_item.replace(/\n+$/g, '');
                }
                this.current_line.push(last_item);
              }
              if (this._end_with_newline) {
                this.__add_outputline();
              }
              var sweet_code = this.__lines.join('\n');
              if (eol !== '\n') {
                sweet_code = sweet_code.replace(/[\n]/g, eol);
              }
              return sweet_code;
            };
            Output.prototype.set_wrap_point = function () {
              this.current_line._set_wrap_point();
            };
            Output.prototype.set_indent = function (indent, alignment) {
              indent = indent || 0;
              alignment = alignment || 0;
              this.next_line.set_indent(indent, alignment);
              if (this.__lines.length > 1) {
                this.current_line.set_indent(indent, alignment);
                return true;
              }
              this.current_line.set_indent();
              return false;
            };
            Output.prototype.add_raw_token = function (token) {
              for (var x = 0; x < token.newlines; x++) {
                this.__add_outputline();
              }
              this.current_line.set_indent(-1);
              this.current_line.push(token.whitespace_before);
              this.current_line.push(token.text);
              this.space_before_token = false;
              this.non_breaking_space = false;
              this.previous_token_wrapped = false;
            };
            Output.prototype.add_token = function (printable_token) {
              this.__add_space_before_token();
              this.current_line.push(printable_token);
              this.space_before_token = false;
              this.non_breaking_space = false;
              this.previous_token_wrapped = this.current_line._allow_wrap();
            };
            Output.prototype.__add_space_before_token = function () {
              if (this.space_before_token && !this.just_added_newline()) {
                if (!this.non_breaking_space) {
                  this.set_wrap_point();
                }
                this.current_line.push(' ');
              }
            };
            Output.prototype.remove_indent = function (index) {
              var output_length = this.__lines.length;
              while (index < output_length) {
                this.__lines[index]._remove_indent();
                index++;
              }
              this.current_line._remove_wrap_indent();
            };
            Output.prototype.trim = function (eat_newlines) {
              eat_newlines = eat_newlines === undefined ? false : eat_newlines;
              this.current_line.trim();
              while (eat_newlines && this.__lines.length > 1 && this.current_line.is_empty()) {
                this.__lines.pop();
                this.current_line = this.__lines[this.__lines.length - 1];
                this.current_line.trim();
              }
              this.previous_line = this.__lines.length > 1 ? this.__lines[this.__lines.length - 2] : null;
            };
            Output.prototype.just_added_newline = function () {
              return this.current_line.is_empty();
            };
            Output.prototype.just_added_blankline = function () {
              return this.is_empty() || this.current_line.is_empty() && this.previous_line.is_empty();
            };
            Output.prototype.ensure_empty_line_above = function (starts_with, ends_with) {
              var index = this.__lines.length - 2;
              while (index >= 0) {
                var potentialEmptyLine = this.__lines[index];
                if (potentialEmptyLine.is_empty()) {
                  break;
                } else if (potentialEmptyLine.item(0).indexOf(starts_with) !== 0 && potentialEmptyLine.item(-1) !== ends_with) {
                  this.__lines.splice(index + 1, 0, new OutputLine(this));
                  this.previous_line = this.__lines[this.__lines.length - 2];
                  break;
                }
                index--;
              }
            };
            module.exports.Output = Output;
          },
          function (module) {
            function Token(type, text, newlines, whitespace_before) {
              this.type = type;
              this.text = text;
              this.comments_before = null;
              this.newlines = newlines || 0;
              this.whitespace_before = whitespace_before || '';
              this.parent = null;
              this.next = null;
              this.previous = null;
              this.opened = null;
              this.closed = null;
              this.directives = null;
            }
            module.exports.Token = Token;
          },
          function (__unused_webpack_module, exports) {
            var baseASCIIidentifierStartChars = '\\x23\\x24\\x40\\x41-\\x5a\\x5f\\x61-\\x7a';
            var baseASCIIidentifierChars = '\\x24\\x30-\\x39\\x41-\\x5a\\x5f\\x61-\\x7a';
            var nonASCIIidentifierStartChars = '\\xaa\\xb5\\xba\\xc0-\\xd6\\xd8-\\xf6\\xf8-\\u02c1\\u02c6-\\u02d1\\u02e0-\\u02e4\\u02ec\\u02ee\\u0370-\\u0374\\u0376\\u0377\\u037a-\\u037d\\u0386\\u0388-\\u038a\\u038c\\u038e-\\u03a1\\u03a3-\\u03f5\\u03f7-\\u0481\\u048a-\\u0527\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05d0-\\u05ea\\u05f0-\\u05f2\\u0620-\\u064a\\u066e\\u066f\\u0671-\\u06d3\\u06d5\\u06e5\\u06e6\\u06ee\\u06ef\\u06fa-\\u06fc\\u06ff\\u0710\\u0712-\\u072f\\u074d-\\u07a5\\u07b1\\u07ca-\\u07ea\\u07f4\\u07f5\\u07fa\\u0800-\\u0815\\u081a\\u0824\\u0828\\u0840-\\u0858\\u08a0\\u08a2-\\u08ac\\u0904-\\u0939\\u093d\\u0950\\u0958-\\u0961\\u0971-\\u0977\\u0979-\\u097f\\u0985-\\u098c\\u098f\\u0990\\u0993-\\u09a8\\u09aa-\\u09b0\\u09b2\\u09b6-\\u09b9\\u09bd\\u09ce\\u09dc\\u09dd\\u09df-\\u09e1\\u09f0\\u09f1\\u0a05-\\u0a0a\\u0a0f\\u0a10\\u0a13-\\u0a28\\u0a2a-\\u0a30\\u0a32\\u0a33\\u0a35\\u0a36\\u0a38\\u0a39\\u0a59-\\u0a5c\\u0a5e\\u0a72-\\u0a74\\u0a85-\\u0a8d\\u0a8f-\\u0a91\\u0a93-\\u0aa8\\u0aaa-\\u0ab0\\u0ab2\\u0ab3\\u0ab5-\\u0ab9\\u0abd\\u0ad0\\u0ae0\\u0ae1\\u0b05-\\u0b0c\\u0b0f\\u0b10\\u0b13-\\u0b28\\u0b2a-\\u0b30\\u0b32\\u0b33\\u0b35-\\u0b39\\u0b3d\\u0b5c\\u0b5d\\u0b5f-\\u0b61\\u0b71\\u0b83\\u0b85-\\u0b8a\\u0b8e-\\u0b90\\u0b92-\\u0b95\\u0b99\\u0b9a\\u0b9c\\u0b9e\\u0b9f\\u0ba3\\u0ba4\\u0ba8-\\u0baa\\u0bae-\\u0bb9\\u0bd0\\u0c05-\\u0c0c\\u0c0e-\\u0c10\\u0c12-\\u0c28\\u0c2a-\\u0c33\\u0c35-\\u0c39\\u0c3d\\u0c58\\u0c59\\u0c60\\u0c61\\u0c85-\\u0c8c\\u0c8e-\\u0c90\\u0c92-\\u0ca8\\u0caa-\\u0cb3\\u0cb5-\\u0cb9\\u0cbd\\u0cde\\u0ce0\\u0ce1\\u0cf1\\u0cf2\\u0d05-\\u0d0c\\u0d0e-\\u0d10\\u0d12-\\u0d3a\\u0d3d\\u0d4e\\u0d60\\u0d61\\u0d7a-\\u0d7f\\u0d85-\\u0d96\\u0d9a-\\u0db1\\u0db3-\\u0dbb\\u0dbd\\u0dc0-\\u0dc6\\u0e01-\\u0e30\\u0e32\\u0e33\\u0e40-\\u0e46\\u0e81\\u0e82\\u0e84\\u0e87\\u0e88\\u0e8a\\u0e8d\\u0e94-\\u0e97\\u0e99-\\u0e9f\\u0ea1-\\u0ea3\\u0ea5\\u0ea7\\u0eaa\\u0eab\\u0ead-\\u0eb0\\u0eb2\\u0eb3\\u0ebd\\u0ec0-\\u0ec4\\u0ec6\\u0edc-\\u0edf\\u0f00\\u0f40-\\u0f47\\u0f49-\\u0f6c\\u0f88-\\u0f8c\\u1000-\\u102a\\u103f\\u1050-\\u1055\\u105a-\\u105d\\u1061\\u1065\\u1066\\u106e-\\u1070\\u1075-\\u1081\\u108e\\u10a0-\\u10c5\\u10c7\\u10cd\\u10d0-\\u10fa\\u10fc-\\u1248\\u124a-\\u124d\\u1250-\\u1256\\u1258\\u125a-\\u125d\\u1260-\\u1288\\u128a-\\u128d\\u1290-\\u12b0\\u12b2-\\u12b5\\u12b8-\\u12be\\u12c0\\u12c2-\\u12c5\\u12c8-\\u12d6\\u12d8-\\u1310\\u1312-\\u1315\\u1318-\\u135a\\u1380-\\u138f\\u13a0-\\u13f4\\u1401-\\u166c\\u166f-\\u167f\\u1681-\\u169a\\u16a0-\\u16ea\\u16ee-\\u16f0\\u1700-\\u170c\\u170e-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176c\\u176e-\\u1770\\u1780-\\u17b3\\u17d7\\u17dc\\u1820-\\u1877\\u1880-\\u18a8\\u18aa\\u18b0-\\u18f5\\u1900-\\u191c\\u1950-\\u196d\\u1970-\\u1974\\u1980-\\u19ab\\u19c1-\\u19c7\\u1a00-\\u1a16\\u1a20-\\u1a54\\u1aa7\\u1b05-\\u1b33\\u1b45-\\u1b4b\\u1b83-\\u1ba0\\u1bae\\u1baf\\u1bba-\\u1be5\\u1c00-\\u1c23\\u1c4d-\\u1c4f\\u1c5a-\\u1c7d\\u1ce9-\\u1cec\\u1cee-\\u1cf1\\u1cf5\\u1cf6\\u1d00-\\u1dbf\\u1e00-\\u1f15\\u1f18-\\u1f1d\\u1f20-\\u1f45\\u1f48-\\u1f4d\\u1f50-\\u1f57\\u1f59\\u1f5b\\u1f5d\\u1f5f-\\u1f7d\\u1f80-\\u1fb4\\u1fb6-\\u1fbc\\u1fbe\\u1fc2-\\u1fc4\\u1fc6-\\u1fcc\\u1fd0-\\u1fd3\\u1fd6-\\u1fdb\\u1fe0-\\u1fec\\u1ff2-\\u1ff4\\u1ff6-\\u1ffc\\u2071\\u207f\\u2090-\\u209c\\u2102\\u2107\\u210a-\\u2113\\u2115\\u2119-\\u211d\\u2124\\u2126\\u2128\\u212a-\\u212d\\u212f-\\u2139\\u213c-\\u213f\\u2145-\\u2149\\u214e\\u2160-\\u2188\\u2c00-\\u2c2e\\u2c30-\\u2c5e\\u2c60-\\u2ce4\\u2ceb-\\u2cee\\u2cf2\\u2cf3\\u2d00-\\u2d25\\u2d27\\u2d2d\\u2d30-\\u2d67\\u2d6f\\u2d80-\\u2d96\\u2da0-\\u2da6\\u2da8-\\u2dae\\u2db0-\\u2db6\\u2db8-\\u2dbe\\u2dc0-\\u2dc6\\u2dc8-\\u2dce\\u2dd0-\\u2dd6\\u2dd8-\\u2dde\\u2e2f\\u3005-\\u3007\\u3021-\\u3029\\u3031-\\u3035\\u3038-\\u303c\\u3041-\\u3096\\u309d-\\u309f\\u30a1-\\u30fa\\u30fc-\\u30ff\\u3105-\\u312d\\u3131-\\u318e\\u31a0-\\u31ba\\u31f0-\\u31ff\\u3400-\\u4db5\\u4e00-\\u9fcc\\ua000-\\ua48c\\ua4d0-\\ua4fd\\ua500-\\ua60c\\ua610-\\ua61f\\ua62a\\ua62b\\ua640-\\ua66e\\ua67f-\\ua697\\ua6a0-\\ua6ef\\ua717-\\ua71f\\ua722-\\ua788\\ua78b-\\ua78e\\ua790-\\ua793\\ua7a0-\\ua7aa\\ua7f8-\\ua801\\ua803-\\ua805\\ua807-\\ua80a\\ua80c-\\ua822\\ua840-\\ua873\\ua882-\\ua8b3\\ua8f2-\\ua8f7\\ua8fb\\ua90a-\\ua925\\ua930-\\ua946\\ua960-\\ua97c\\ua984-\\ua9b2\\ua9cf\\uaa00-\\uaa28\\uaa40-\\uaa42\\uaa44-\\uaa4b\\uaa60-\\uaa76\\uaa7a\\uaa80-\\uaaaf\\uaab1\\uaab5\\uaab6\\uaab9-\\uaabd\\uaac0\\uaac2\\uaadb-\\uaadd\\uaae0-\\uaaea\\uaaf2-\\uaaf4\\uab01-\\uab06\\uab09-\\uab0e\\uab11-\\uab16\\uab20-\\uab26\\uab28-\\uab2e\\uabc0-\\uabe2\\uac00-\\ud7a3\\ud7b0-\\ud7c6\\ud7cb-\\ud7fb\\uf900-\\ufa6d\\ufa70-\\ufad9\\ufb00-\\ufb06\\ufb13-\\ufb17\\ufb1d\\ufb1f-\\ufb28\\ufb2a-\\ufb36\\ufb38-\\ufb3c\\ufb3e\\ufb40\\ufb41\\ufb43\\ufb44\\ufb46-\\ufbb1\\ufbd3-\\ufd3d\\ufd50-\\ufd8f\\ufd92-\\ufdc7\\ufdf0-\\ufdfb\\ufe70-\\ufe74\\ufe76-\\ufefc\\uff21-\\uff3a\\uff41-\\uff5a\\uff66-\\uffbe\\uffc2-\\uffc7\\uffca-\\uffcf\\uffd2-\\uffd7\\uffda-\\uffdc';
            var nonASCIIidentifierChars = '\\u0300-\\u036f\\u0483-\\u0487\\u0591-\\u05bd\\u05bf\\u05c1\\u05c2\\u05c4\\u05c5\\u05c7\\u0610-\\u061a\\u0620-\\u0649\\u0672-\\u06d3\\u06e7-\\u06e8\\u06fb-\\u06fc\\u0730-\\u074a\\u0800-\\u0814\\u081b-\\u0823\\u0825-\\u0827\\u0829-\\u082d\\u0840-\\u0857\\u08e4-\\u08fe\\u0900-\\u0903\\u093a-\\u093c\\u093e-\\u094f\\u0951-\\u0957\\u0962-\\u0963\\u0966-\\u096f\\u0981-\\u0983\\u09bc\\u09be-\\u09c4\\u09c7\\u09c8\\u09d7\\u09df-\\u09e0\\u0a01-\\u0a03\\u0a3c\\u0a3e-\\u0a42\\u0a47\\u0a48\\u0a4b-\\u0a4d\\u0a51\\u0a66-\\u0a71\\u0a75\\u0a81-\\u0a83\\u0abc\\u0abe-\\u0ac5\\u0ac7-\\u0ac9\\u0acb-\\u0acd\\u0ae2-\\u0ae3\\u0ae6-\\u0aef\\u0b01-\\u0b03\\u0b3c\\u0b3e-\\u0b44\\u0b47\\u0b48\\u0b4b-\\u0b4d\\u0b56\\u0b57\\u0b5f-\\u0b60\\u0b66-\\u0b6f\\u0b82\\u0bbe-\\u0bc2\\u0bc6-\\u0bc8\\u0bca-\\u0bcd\\u0bd7\\u0be6-\\u0bef\\u0c01-\\u0c03\\u0c46-\\u0c48\\u0c4a-\\u0c4d\\u0c55\\u0c56\\u0c62-\\u0c63\\u0c66-\\u0c6f\\u0c82\\u0c83\\u0cbc\\u0cbe-\\u0cc4\\u0cc6-\\u0cc8\\u0cca-\\u0ccd\\u0cd5\\u0cd6\\u0ce2-\\u0ce3\\u0ce6-\\u0cef\\u0d02\\u0d03\\u0d46-\\u0d48\\u0d57\\u0d62-\\u0d63\\u0d66-\\u0d6f\\u0d82\\u0d83\\u0dca\\u0dcf-\\u0dd4\\u0dd6\\u0dd8-\\u0ddf\\u0df2\\u0df3\\u0e34-\\u0e3a\\u0e40-\\u0e45\\u0e50-\\u0e59\\u0eb4-\\u0eb9\\u0ec8-\\u0ecd\\u0ed0-\\u0ed9\\u0f18\\u0f19\\u0f20-\\u0f29\\u0f35\\u0f37\\u0f39\\u0f41-\\u0f47\\u0f71-\\u0f84\\u0f86-\\u0f87\\u0f8d-\\u0f97\\u0f99-\\u0fbc\\u0fc6\\u1000-\\u1029\\u1040-\\u1049\\u1067-\\u106d\\u1071-\\u1074\\u1082-\\u108d\\u108f-\\u109d\\u135d-\\u135f\\u170e-\\u1710\\u1720-\\u1730\\u1740-\\u1750\\u1772\\u1773\\u1780-\\u17b2\\u17dd\\u17e0-\\u17e9\\u180b-\\u180d\\u1810-\\u1819\\u1920-\\u192b\\u1930-\\u193b\\u1951-\\u196d\\u19b0-\\u19c0\\u19c8-\\u19c9\\u19d0-\\u19d9\\u1a00-\\u1a15\\u1a20-\\u1a53\\u1a60-\\u1a7c\\u1a7f-\\u1a89\\u1a90-\\u1a99\\u1b46-\\u1b4b\\u1b50-\\u1b59\\u1b6b-\\u1b73\\u1bb0-\\u1bb9\\u1be6-\\u1bf3\\u1c00-\\u1c22\\u1c40-\\u1c49\\u1c5b-\\u1c7d\\u1cd0-\\u1cd2\\u1d00-\\u1dbe\\u1e01-\\u1f15\\u200c\\u200d\\u203f\\u2040\\u2054\\u20d0-\\u20dc\\u20e1\\u20e5-\\u20f0\\u2d81-\\u2d96\\u2de0-\\u2dff\\u3021-\\u3028\\u3099\\u309a\\ua640-\\ua66d\\ua674-\\ua67d\\ua69f\\ua6f0-\\ua6f1\\ua7f8-\\ua800\\ua806\\ua80b\\ua823-\\ua827\\ua880-\\ua881\\ua8b4-\\ua8c4\\ua8d0-\\ua8d9\\ua8f3-\\ua8f7\\ua900-\\ua909\\ua926-\\ua92d\\ua930-\\ua945\\ua980-\\ua983\\ua9b3-\\ua9c0\\uaa00-\\uaa27\\uaa40-\\uaa41\\uaa4c-\\uaa4d\\uaa50-\\uaa59\\uaa7b\\uaae0-\\uaae9\\uaaf2-\\uaaf3\\uabc0-\\uabe1\\uabec\\uabed\\uabf0-\\uabf9\\ufb20-\\ufb28\\ufe00-\\ufe0f\\ufe20-\\ufe26\\ufe33\\ufe34\\ufe4d-\\ufe4f\\uff10-\\uff19\\uff3f';
            var identifierStart = '(?:\\\\u[0-9a-fA-F]{4}|[' + baseASCIIidentifierStartChars + nonASCIIidentifierStartChars + '])';
            var identifierChars = '(?:\\\\u[0-9a-fA-F]{4}|[' + baseASCIIidentifierChars + nonASCIIidentifierStartChars + nonASCIIidentifierChars + '])*';
            exports.identifier = new RegExp(identifierStart + identifierChars, 'g');
            exports.identifierStart = new RegExp(identifierStart);
            exports.identifierMatch = new RegExp('(?:\\\\u[0-9a-fA-F]{4}|[' + baseASCIIidentifierChars + nonASCIIidentifierStartChars + nonASCIIidentifierChars + '])+');
            exports.newline = /[\n\r\u2028\u2029]/;
            exports.lineBreak = new RegExp('\r\n|' + exports.newline.source);
            exports.allLineBreaks = new RegExp(exports.lineBreak.source, 'g');
          },
          function (module, __unused_webpack_exports, __webpack_require__) {
            var BaseOptions = __webpack_require__(7).Options;
            var validPositionValues = [
              'before-newline',
              'after-newline',
              'preserve-newline'
            ];
            function Options(options) {
              BaseOptions.call(this, options, 'js');
              var raw_brace_style = this.raw_options.brace_style || null;
              if (raw_brace_style === 'expand-strict') {
                this.raw_options.brace_style = 'expand';
              } else if (raw_brace_style === 'collapse-preserve-inline') {
                this.raw_options.brace_style = 'collapse,preserve-inline';
              } else if (this.raw_options.braces_on_own_line !== undefined) {
                this.raw_options.brace_style = this.raw_options.braces_on_own_line ? 'expand' : 'collapse';
              }
              var brace_style_split = this._get_selection_list('brace_style', [
                'collapse',
                'expand',
                'end-expand',
                'none',
                'preserve-inline'
              ]);
              this.brace_preserve_inline = false;
              this.brace_style = 'collapse';
              for (var bs = 0; bs < brace_style_split.length; bs++) {
                if (brace_style_split[bs] === 'preserve-inline') {
                  this.brace_preserve_inline = true;
                } else {
                  this.brace_style = brace_style_split[bs];
                }
              }
              this.unindent_chained_methods = this._get_boolean('unindent_chained_methods');
              this.break_chained_methods = this._get_boolean('break_chained_methods');
              this.space_in_paren = this._get_boolean('space_in_paren');
              this.space_in_empty_paren = this._get_boolean('space_in_empty_paren');
              this.jslint_happy = this._get_boolean('jslint_happy');
              this.space_after_anon_function = this._get_boolean('space_after_anon_function');
              this.space_after_named_function = this._get_boolean('space_after_named_function');
              this.keep_array_indentation = this._get_boolean('keep_array_indentation');
              this.space_before_conditional = this._get_boolean('space_before_conditional', true);
              this.unescape_strings = this._get_boolean('unescape_strings');
              this.e4x = this._get_boolean('e4x');
              this.comma_first = this._get_boolean('comma_first');
              this.operator_position = this._get_selection('operator_position', validPositionValues);
              this.test_output_raw = this._get_boolean('test_output_raw');
              if (this.jslint_happy) {
                this.space_after_anon_function = true;
              }
            }
            Options.prototype = new BaseOptions();
            module.exports.Options = Options;
          },
          function (module) {
            function Options(options, merge_child_field) {
              this.raw_options = _mergeOpts(options, merge_child_field);
              this.disabled = this._get_boolean('disabled');
              this.eol = this._get_characters('eol', 'auto');
              this.end_with_newline = this._get_boolean('end_with_newline');
              this.indent_size = this._get_number('indent_size', 4);
              this.indent_char = this._get_characters('indent_char', ' ');
              this.indent_level = this._get_number('indent_level');
              this.preserve_newlines = this._get_boolean('preserve_newlines', true);
              this.max_preserve_newlines = this._get_number('max_preserve_newlines', 32786);
              if (!this.preserve_newlines) {
                this.max_preserve_newlines = 0;
              }
              this.indent_with_tabs = this._get_boolean('indent_with_tabs', this.indent_char === '\t');
              if (this.indent_with_tabs) {
                this.indent_char = '\t';
                if (this.indent_size === 1) {
                  this.indent_size = 4;
                }
              }
              this.wrap_line_length = this._get_number('wrap_line_length', this._get_number('max_char'));
              this.indent_empty_lines = this._get_boolean('indent_empty_lines');
              this.templating = this._get_selection_list('templating', [
                'auto',
                'none',
                'django',
                'erb',
                'handlebars',
                'php',
                'smarty'
              ], ['auto']);
            }
            Options.prototype._get_array = function (name, default_value) {
              var option_value = this.raw_options[name];
              var result = default_value || [];
              if (typeof option_value === 'object') {
                if (option_value !== null && typeof option_value.concat === 'function') {
                  result = option_value.concat();
                }
              } else if (typeof option_value === 'string') {
                result = option_value.split(/[^a-zA-Z0-9_\/\-]+/);
              }
              return result;
            };
            Options.prototype._get_boolean = function (name, default_value) {
              var option_value = this.raw_options[name];
              var result = option_value === undefined ? !!default_value : !!option_value;
              return result;
            };
            Options.prototype._get_characters = function (name, default_value) {
              var option_value = this.raw_options[name];
              var result = default_value || '';
              if (typeof option_value === 'string') {
                result = option_value.replace(/\\r/, '\r').replace(/\\n/, '\n').replace(/\\t/, '\t');
              }
              return result;
            };
            Options.prototype._get_number = function (name, default_value) {
              var option_value = this.raw_options[name];
              default_value = parseInt(default_value, 10);
              if (isNaN(default_value)) {
                default_value = 0;
              }
              var result = parseInt(option_value, 10);
              if (isNaN(result)) {
                result = default_value;
              }
              return result;
            };
            Options.prototype._get_selection = function (name, selection_list, default_value) {
              var result = this._get_selection_list(name, selection_list, default_value);
              if (result.length !== 1) {
                throw new Error('Invalid Option Value: The option \'' + name + '\' can only be one of the following values:\n' + selection_list + '\nYou passed in: \'' + this.raw_options[name] + '\'');
              }
              return result[0];
            };
            Options.prototype._get_selection_list = function (name, selection_list, default_value) {
              if (!selection_list || selection_list.length === 0) {
                throw new Error('Selection list cannot be empty.');
              }
              default_value = default_value || [selection_list[0]];
              if (!this._is_valid_selection(default_value, selection_list)) {
                throw new Error('Invalid Default Value!');
              }
              var result = this._get_array(name, default_value);
              if (!this._is_valid_selection(result, selection_list)) {
                throw new Error('Invalid Option Value: The option \'' + name + '\' can contain only the following values:\n' + selection_list + '\nYou passed in: \'' + this.raw_options[name] + '\'');
              }
              return result;
            };
            Options.prototype._is_valid_selection = function (result, selection_list) {
              return result.length && selection_list.length && !result.some(function (item) {
                return selection_list.indexOf(item) === -1;
              });
            };
            function _mergeOpts(allOptions, childFieldName) {
              var finalOpts = {};
              allOptions = _normalizeOpts(allOptions);
              var name;
              for (name in allOptions) {
                if (name !== childFieldName) {
                  finalOpts[name] = allOptions[name];
                }
              }
              if (childFieldName && allOptions[childFieldName]) {
                for (name in allOptions[childFieldName]) {
                  finalOpts[name] = allOptions[childFieldName][name];
                }
              }
              return finalOpts;
            }
            function _normalizeOpts(options) {
              var convertedOpts = {};
              var key;
              for (key in options) {
                var newKey = key.replace(/-/g, '_');
                convertedOpts[newKey] = options[key];
              }
              return convertedOpts;
            }
            module.exports.Options = Options;
            module.exports.normalizeOpts = _normalizeOpts;
            module.exports.mergeOpts = _mergeOpts;
          },
          function (module, __unused_webpack_exports, __webpack_require__) {
            var InputScanner = __webpack_require__(9).InputScanner;
            var BaseTokenizer = __webpack_require__(10).Tokenizer;
            var BASETOKEN = __webpack_require__(10).TOKEN;
            var Directives = __webpack_require__(14).Directives;
            var acorn = __webpack_require__(5);
            var Pattern = __webpack_require__(13).Pattern;
            var TemplatablePattern = __webpack_require__(15).TemplatablePattern;
            function in_array(what, arr) {
              return arr.indexOf(what) !== -1;
            }
            var TOKEN = {
              START_EXPR: 'TK_START_EXPR',
              END_EXPR: 'TK_END_EXPR',
              START_BLOCK: 'TK_START_BLOCK',
              END_BLOCK: 'TK_END_BLOCK',
              WORD: 'TK_WORD',
              RESERVED: 'TK_RESERVED',
              SEMICOLON: 'TK_SEMICOLON',
              STRING: 'TK_STRING',
              EQUALS: 'TK_EQUALS',
              OPERATOR: 'TK_OPERATOR',
              COMMA: 'TK_COMMA',
              BLOCK_COMMENT: 'TK_BLOCK_COMMENT',
              COMMENT: 'TK_COMMENT',
              DOT: 'TK_DOT',
              UNKNOWN: 'TK_UNKNOWN',
              START: BASETOKEN.START,
              RAW: BASETOKEN.RAW,
              EOF: BASETOKEN.EOF
            };
            var directives_core = new Directives(/\/\*/, /\*\//);
            var number_pattern = /0[xX][0123456789abcdefABCDEF]*|0[oO][01234567]*|0[bB][01]*|\d+n|(?:\.\d+|\d+\.?\d*)(?:[eE][+-]?\d+)?/;
            var digit = /[0-9]/;
            var dot_pattern = /[^\d\.]/;
            var positionable_operators = ('>>> === !== ' + '<< && >= ** != == <= >> || ?? |> ' + '< / - + > : & % ? ^ | *').split(' ');
            var punct = '>>>= ' + '... >>= <<= === >>> !== **= ' + '=> ^= :: /= << <= == && -= >= >> != -- += ** || ?? ++ %= &= *= |= |> ' + '= ! ? > < : / ^ - + * & % ~ |';
            punct = punct.replace(/[-[\]{}()*+?.,\\^$|#]/g, '\\$&');
            punct = '\\?\\.(?!\\d) ' + punct;
            punct = punct.replace(/ /g, '|');
            var punct_pattern = new RegExp(punct);
            var line_starters = 'continue,try,throw,return,var,let,const,if,switch,case,default,for,while,break,function,import,export'.split(',');
            var reserved_words = line_starters.concat([
              'do',
              'in',
              'of',
              'else',
              'get',
              'set',
              'new',
              'catch',
              'finally',
              'typeof',
              'yield',
              'async',
              'await',
              'from',
              'as'
            ]);
            var reserved_word_pattern = new RegExp('^(?:' + reserved_words.join('|') + ')$');
            var in_html_comment;
            var Tokenizer = function (input_string, options) {
              BaseTokenizer.call(this, input_string, options);
              this._patterns.whitespace = this._patterns.whitespace.matching(/\u00A0\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff/.source, /\u2028\u2029/.source);
              var pattern_reader = new Pattern(this._input);
              var templatable = new TemplatablePattern(this._input).read_options(this._options);
              this.__patterns = {
                template: templatable,
                identifier: templatable.starting_with(acorn.identifier).matching(acorn.identifierMatch),
                number: pattern_reader.matching(number_pattern),
                punct: pattern_reader.matching(punct_pattern),
                comment: pattern_reader.starting_with(/\/\//).until(/[\n\r\u2028\u2029]/),
                block_comment: pattern_reader.starting_with(/\/\*/).until_after(/\*\//),
                html_comment_start: pattern_reader.matching(/<!--/),
                html_comment_end: pattern_reader.matching(/-->/),
                include: pattern_reader.starting_with(/#include/).until_after(acorn.lineBreak),
                shebang: pattern_reader.starting_with(/#!/).until_after(acorn.lineBreak),
                xml: pattern_reader.matching(/[\s\S]*?<(\/?)([-a-zA-Z:0-9_.]+|{[\s\S]+?}|!\[CDATA\[[\s\S]*?\]\]|)(\s+{[\s\S]+?}|\s+[-a-zA-Z:0-9_.]+|\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{[\s\S]+?}))*\s*(\/?)\s*>/),
                single_quote: templatable.until(/['\\\n\r\u2028\u2029]/),
                double_quote: templatable.until(/["\\\n\r\u2028\u2029]/),
                template_text: templatable.until(/[`\\$]/),
                template_expression: templatable.until(/[`}\\]/)
              };
            };
            Tokenizer.prototype = new BaseTokenizer();
            Tokenizer.prototype._is_comment = function (current_token) {
              return current_token.type === TOKEN.COMMENT || current_token.type === TOKEN.BLOCK_COMMENT || current_token.type === TOKEN.UNKNOWN;
            };
            Tokenizer.prototype._is_opening = function (current_token) {
              return current_token.type === TOKEN.START_BLOCK || current_token.type === TOKEN.START_EXPR;
            };
            Tokenizer.prototype._is_closing = function (current_token, open_token) {
              return (current_token.type === TOKEN.END_BLOCK || current_token.type === TOKEN.END_EXPR) && (open_token && (current_token.text === ']' && open_token.text === '[' || current_token.text === ')' && open_token.text === '(' || current_token.text === '}' && open_token.text === '{'));
            };
            Tokenizer.prototype._reset = function () {
              in_html_comment = false;
            };
            Tokenizer.prototype._get_next_token = function (previous_token, open_token) {
              var token = null;
              this._readWhitespace();
              var c = this._input.peek();
              if (c === null) {
                return this._create_token(TOKEN.EOF, '');
              }
              token = token || this._read_non_javascript(c);
              token = token || this._read_string(c);
              token = token || this._read_word(previous_token);
              token = token || this._read_singles(c);
              token = token || this._read_comment(c);
              token = token || this._read_regexp(c, previous_token);
              token = token || this._read_xml(c, previous_token);
              token = token || this._read_punctuation();
              token = token || this._create_token(TOKEN.UNKNOWN, this._input.next());
              return token;
            };
            Tokenizer.prototype._read_word = function (previous_token) {
              var resulting_string;
              resulting_string = this.__patterns.identifier.read();
              if (resulting_string !== '') {
                resulting_string = resulting_string.replace(acorn.allLineBreaks, '\n');
                if (!(previous_token.type === TOKEN.DOT || previous_token.type === TOKEN.RESERVED && (previous_token.text === 'set' || previous_token.text === 'get')) && reserved_word_pattern.test(resulting_string)) {
                  if (resulting_string === 'in' || resulting_string === 'of') {
                    return this._create_token(TOKEN.OPERATOR, resulting_string);
                  }
                  return this._create_token(TOKEN.RESERVED, resulting_string);
                }
                return this._create_token(TOKEN.WORD, resulting_string);
              }
              resulting_string = this.__patterns.number.read();
              if (resulting_string !== '') {
                return this._create_token(TOKEN.WORD, resulting_string);
              }
            };
            Tokenizer.prototype._read_singles = function (c) {
              var token = null;
              if (c === '(' || c === '[') {
                token = this._create_token(TOKEN.START_EXPR, c);
              } else if (c === ')' || c === ']') {
                token = this._create_token(TOKEN.END_EXPR, c);
              } else if (c === '{') {
                token = this._create_token(TOKEN.START_BLOCK, c);
              } else if (c === '}') {
                token = this._create_token(TOKEN.END_BLOCK, c);
              } else if (c === ';') {
                token = this._create_token(TOKEN.SEMICOLON, c);
              } else if (c === '.' && dot_pattern.test(this._input.peek(1))) {
                token = this._create_token(TOKEN.DOT, c);
              } else if (c === ',') {
                token = this._create_token(TOKEN.COMMA, c);
              }
              if (token) {
                this._input.next();
              }
              return token;
            };
            Tokenizer.prototype._read_punctuation = function () {
              var resulting_string = this.__patterns.punct.read();
              if (resulting_string !== '') {
                if (resulting_string === '=') {
                  return this._create_token(TOKEN.EQUALS, resulting_string);
                } else if (resulting_string === '?.') {
                  return this._create_token(TOKEN.DOT, resulting_string);
                } else {
                  return this._create_token(TOKEN.OPERATOR, resulting_string);
                }
              }
            };
            Tokenizer.prototype._read_non_javascript = function (c) {
              var resulting_string = '';
              if (c === '#') {
                if (this._is_first_token()) {
                  resulting_string = this.__patterns.shebang.read();
                  if (resulting_string) {
                    return this._create_token(TOKEN.UNKNOWN, resulting_string.trim() + '\n');
                  }
                }
                resulting_string = this.__patterns.include.read();
                if (resulting_string) {
                  return this._create_token(TOKEN.UNKNOWN, resulting_string.trim() + '\n');
                }
                c = this._input.next();
                var sharp = '#';
                if (this._input.hasNext() && this._input.testChar(digit)) {
                  do {
                    c = this._input.next();
                    sharp += c;
                  } while (this._input.hasNext() && c !== '#' && c !== '=');
                  if (c === '#') ; else if (this._input.peek() === '[' && this._input.peek(1) === ']') {
                    sharp += '[]';
                    this._input.next();
                    this._input.next();
                  } else if (this._input.peek() === '{' && this._input.peek(1) === '}') {
                    sharp += '{}';
                    this._input.next();
                    this._input.next();
                  }
                  return this._create_token(TOKEN.WORD, sharp);
                }
                this._input.back();
              } else if (c === '<' && this._is_first_token()) {
                resulting_string = this.__patterns.html_comment_start.read();
                if (resulting_string) {
                  while (this._input.hasNext() && !this._input.testChar(acorn.newline)) {
                    resulting_string += this._input.next();
                  }
                  in_html_comment = true;
                  return this._create_token(TOKEN.COMMENT, resulting_string);
                }
              } else if (in_html_comment && c === '-') {
                resulting_string = this.__patterns.html_comment_end.read();
                if (resulting_string) {
                  in_html_comment = false;
                  return this._create_token(TOKEN.COMMENT, resulting_string);
                }
              }
              return null;
            };
            Tokenizer.prototype._read_comment = function (c) {
              var token = null;
              if (c === '/') {
                var comment = '';
                if (this._input.peek(1) === '*') {
                  comment = this.__patterns.block_comment.read();
                  var directives = directives_core.get_directives(comment);
                  if (directives && directives.ignore === 'start') {
                    comment += directives_core.readIgnored(this._input);
                  }
                  comment = comment.replace(acorn.allLineBreaks, '\n');
                  token = this._create_token(TOKEN.BLOCK_COMMENT, comment);
                  token.directives = directives;
                } else if (this._input.peek(1) === '/') {
                  comment = this.__patterns.comment.read();
                  token = this._create_token(TOKEN.COMMENT, comment);
                }
              }
              return token;
            };
            Tokenizer.prototype._read_string = function (c) {
              if (c === '`' || c === '\'' || c === '"') {
                var resulting_string = this._input.next();
                this.has_char_escapes = false;
                if (c === '`') {
                  resulting_string += this._read_string_recursive('`', true, '${');
                } else {
                  resulting_string += this._read_string_recursive(c);
                }
                if (this.has_char_escapes && this._options.unescape_strings) {
                  resulting_string = unescape_string(resulting_string);
                }
                if (this._input.peek() === c) {
                  resulting_string += this._input.next();
                }
                resulting_string = resulting_string.replace(acorn.allLineBreaks, '\n');
                return this._create_token(TOKEN.STRING, resulting_string);
              }
              return null;
            };
            Tokenizer.prototype._allow_regexp_or_xml = function (previous_token) {
              return previous_token.type === TOKEN.RESERVED && in_array(previous_token.text, [
                'return',
                'case',
                'throw',
                'else',
                'do',
                'typeof',
                'yield'
              ]) || previous_token.type === TOKEN.END_EXPR && previous_token.text === ')' && previous_token.opened.previous.type === TOKEN.RESERVED && in_array(previous_token.opened.previous.text, [
                'if',
                'while',
                'for'
              ]) || in_array(previous_token.type, [
                TOKEN.COMMENT,
                TOKEN.START_EXPR,
                TOKEN.START_BLOCK,
                TOKEN.START,
                TOKEN.END_BLOCK,
                TOKEN.OPERATOR,
                TOKEN.EQUALS,
                TOKEN.EOF,
                TOKEN.SEMICOLON,
                TOKEN.COMMA
              ]);
            };
            Tokenizer.prototype._read_regexp = function (c, previous_token) {
              if (c === '/' && this._allow_regexp_or_xml(previous_token)) {
                var resulting_string = this._input.next();
                var esc = false;
                var in_char_class = false;
                while (this._input.hasNext() && ((esc || in_char_class || this._input.peek() !== c) && !this._input.testChar(acorn.newline))) {
                  resulting_string += this._input.peek();
                  if (!esc) {
                    esc = this._input.peek() === '\\';
                    if (this._input.peek() === '[') {
                      in_char_class = true;
                    } else if (this._input.peek() === ']') {
                      in_char_class = false;
                    }
                  } else {
                    esc = false;
                  }
                  this._input.next();
                }
                if (this._input.peek() === c) {
                  resulting_string += this._input.next();
                  resulting_string += this._input.read(acorn.identifier);
                }
                return this._create_token(TOKEN.STRING, resulting_string);
              }
              return null;
            };
            Tokenizer.prototype._read_xml = function (c, previous_token) {
              if (this._options.e4x && c === '<' && this._allow_regexp_or_xml(previous_token)) {
                var xmlStr = '';
                var match = this.__patterns.xml.read_match();
                if (match) {
                  var rootTag = match[2].replace(/^{\s+/, '{').replace(/\s+}$/, '}');
                  var isCurlyRoot = rootTag.indexOf('{') === 0;
                  var depth = 0;
                  while (match) {
                    var isEndTag = !!match[1];
                    var tagName = match[2];
                    var isSingletonTag = !!match[match.length - 1] || tagName.slice(0, 8) === '![CDATA[';
                    if (!isSingletonTag && (tagName === rootTag || isCurlyRoot && tagName.replace(/^{\s+/, '{').replace(/\s+}$/, '}'))) {
                      if (isEndTag) {
                        --depth;
                      } else {
                        ++depth;
                      }
                    }
                    xmlStr += match[0];
                    if (depth <= 0) {
                      break;
                    }
                    match = this.__patterns.xml.read_match();
                  }
                  if (!match) {
                    xmlStr += this._input.match(/[\s\S]*/g)[0];
                  }
                  xmlStr = xmlStr.replace(acorn.allLineBreaks, '\n');
                  return this._create_token(TOKEN.STRING, xmlStr);
                }
              }
              return null;
            };
            function unescape_string(s) {
              var out = '', escaped = 0;
              var input_scan = new InputScanner(s);
              var matched = null;
              while (input_scan.hasNext()) {
                matched = input_scan.match(/([\s]|[^\\]|\\\\)+/g);
                if (matched) {
                  out += matched[0];
                }
                if (input_scan.peek() === '\\') {
                  input_scan.next();
                  if (input_scan.peek() === 'x') {
                    matched = input_scan.match(/x([0-9A-Fa-f]{2})/g);
                  } else if (input_scan.peek() === 'u') {
                    matched = input_scan.match(/u([0-9A-Fa-f]{4})/g);
                  } else {
                    out += '\\';
                    if (input_scan.hasNext()) {
                      out += input_scan.next();
                    }
                    continue;
                  }
                  if (!matched) {
                    return s;
                  }
                  escaped = parseInt(matched[1], 16);
                  if (escaped > 126 && escaped <= 255 && matched[0].indexOf('x') === 0) {
                    return s;
                  } else if (escaped >= 0 && escaped < 32) {
                    out += '\\' + matched[0];
                    continue;
                  } else if (escaped === 34 || escaped === 39 || escaped === 92) {
                    out += '\\' + String.fromCharCode(escaped);
                  } else {
                    out += String.fromCharCode(escaped);
                  }
                }
              }
              return out;
            }
            Tokenizer.prototype._read_string_recursive = function (delimiter, allow_unescaped_newlines, start_sub) {
              var current_char;
              var pattern;
              if (delimiter === '\'') {
                pattern = this.__patterns.single_quote;
              } else if (delimiter === '"') {
                pattern = this.__patterns.double_quote;
              } else if (delimiter === '`') {
                pattern = this.__patterns.template_text;
              } else if (delimiter === '}') {
                pattern = this.__patterns.template_expression;
              }
              var resulting_string = pattern.read();
              var next = '';
              while (this._input.hasNext()) {
                next = this._input.next();
                if (next === delimiter || !allow_unescaped_newlines && acorn.newline.test(next)) {
                  this._input.back();
                  break;
                } else if (next === '\\' && this._input.hasNext()) {
                  current_char = this._input.peek();
                  if (current_char === 'x' || current_char === 'u') {
                    this.has_char_escapes = true;
                  } else if (current_char === '\r' && this._input.peek(1) === '\n') {
                    this._input.next();
                  }
                  next += this._input.next();
                } else if (start_sub) {
                  if (start_sub === '${' && next === '$' && this._input.peek() === '{') {
                    next += this._input.next();
                  }
                  if (start_sub === next) {
                    if (delimiter === '`') {
                      next += this._read_string_recursive('}', allow_unescaped_newlines, '`');
                    } else {
                      next += this._read_string_recursive('`', allow_unescaped_newlines, '${');
                    }
                    if (this._input.hasNext()) {
                      next += this._input.next();
                    }
                  }
                }
                next += pattern.read();
                resulting_string += next;
              }
              return resulting_string;
            };
            module.exports.Tokenizer = Tokenizer;
            module.exports.TOKEN = TOKEN;
            module.exports.positionable_operators = positionable_operators.slice();
            module.exports.line_starters = line_starters.slice();
          },
          function (module) {
            var regexp_has_sticky = RegExp.prototype.hasOwnProperty('sticky');
            function InputScanner(input_string) {
              this.__input = input_string || '';
              this.__input_length = this.__input.length;
              this.__position = 0;
            }
            InputScanner.prototype.restart = function () {
              this.__position = 0;
            };
            InputScanner.prototype.back = function () {
              if (this.__position > 0) {
                this.__position -= 1;
              }
            };
            InputScanner.prototype.hasNext = function () {
              return this.__position < this.__input_length;
            };
            InputScanner.prototype.next = function () {
              var val = null;
              if (this.hasNext()) {
                val = this.__input.charAt(this.__position);
                this.__position += 1;
              }
              return val;
            };
            InputScanner.prototype.peek = function (index) {
              var val = null;
              index = index || 0;
              index += this.__position;
              if (index >= 0 && index < this.__input_length) {
                val = this.__input.charAt(index);
              }
              return val;
            };
            InputScanner.prototype.__match = function (pattern, index) {
              pattern.lastIndex = index;
              var pattern_match = pattern.exec(this.__input);
              if (pattern_match && !(regexp_has_sticky && pattern.sticky)) {
                if (pattern_match.index !== index) {
                  pattern_match = null;
                }
              }
              return pattern_match;
            };
            InputScanner.prototype.test = function (pattern, index) {
              index = index || 0;
              index += this.__position;
              if (index >= 0 && index < this.__input_length) {
                return !!this.__match(pattern, index);
              } else {
                return false;
              }
            };
            InputScanner.prototype.testChar = function (pattern, index) {
              var val = this.peek(index);
              pattern.lastIndex = 0;
              return val !== null && pattern.test(val);
            };
            InputScanner.prototype.match = function (pattern) {
              var pattern_match = this.__match(pattern, this.__position);
              if (pattern_match) {
                this.__position += pattern_match[0].length;
              } else {
                pattern_match = null;
              }
              return pattern_match;
            };
            InputScanner.prototype.read = function (starting_pattern, until_pattern, until_after) {
              var val = '';
              var match;
              if (starting_pattern) {
                match = this.match(starting_pattern);
                if (match) {
                  val += match[0];
                }
              }
              if (until_pattern && (match || !starting_pattern)) {
                val += this.readUntil(until_pattern, until_after);
              }
              return val;
            };
            InputScanner.prototype.readUntil = function (pattern, until_after) {
              var val = '';
              var match_index = this.__position;
              pattern.lastIndex = this.__position;
              var pattern_match = pattern.exec(this.__input);
              if (pattern_match) {
                match_index = pattern_match.index;
                if (until_after) {
                  match_index += pattern_match[0].length;
                }
              } else {
                match_index = this.__input_length;
              }
              val = this.__input.substring(this.__position, match_index);
              this.__position = match_index;
              return val;
            };
            InputScanner.prototype.readUntilAfter = function (pattern) {
              return this.readUntil(pattern, true);
            };
            InputScanner.prototype.get_regexp = function (pattern, match_from) {
              var result = null;
              var flags = 'g';
              if (match_from && regexp_has_sticky) {
                flags = 'y';
              }
              if (typeof pattern === 'string' && pattern !== '') {
                result = new RegExp(pattern, flags);
              } else if (pattern) {
                result = new RegExp(pattern.source, flags);
              }
              return result;
            };
            InputScanner.prototype.get_literal_regexp = function (literal_string) {
              return RegExp(literal_string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
            };
            InputScanner.prototype.peekUntilAfter = function (pattern) {
              var start = this.__position;
              var val = this.readUntilAfter(pattern);
              this.__position = start;
              return val;
            };
            InputScanner.prototype.lookBack = function (testVal) {
              var start = this.__position - 1;
              return start >= testVal.length && this.__input.substring(start - testVal.length, start).toLowerCase() === testVal;
            };
            module.exports.InputScanner = InputScanner;
          },
          function (module, __unused_webpack_exports, __webpack_require__) {
            var InputScanner = __webpack_require__(9).InputScanner;
            var Token = __webpack_require__(4).Token;
            var TokenStream = __webpack_require__(11).TokenStream;
            var WhitespacePattern = __webpack_require__(12).WhitespacePattern;
            var TOKEN = {
              START: 'TK_START',
              RAW: 'TK_RAW',
              EOF: 'TK_EOF'
            };
            var Tokenizer = function (input_string, options) {
              this._input = new InputScanner(input_string);
              this._options = options || {};
              this.__tokens = null;
              this._patterns = {};
              this._patterns.whitespace = new WhitespacePattern(this._input);
            };
            Tokenizer.prototype.tokenize = function () {
              this._input.restart();
              this.__tokens = new TokenStream();
              this._reset();
              var current;
              var previous = new Token(TOKEN.START, '');
              var open_token = null;
              var open_stack = [];
              var comments = new TokenStream();
              while (previous.type !== TOKEN.EOF) {
                current = this._get_next_token(previous, open_token);
                while (this._is_comment(current)) {
                  comments.add(current);
                  current = this._get_next_token(previous, open_token);
                }
                if (!comments.isEmpty()) {
                  current.comments_before = comments;
                  comments = new TokenStream();
                }
                current.parent = open_token;
                if (this._is_opening(current)) {
                  open_stack.push(open_token);
                  open_token = current;
                } else if (open_token && this._is_closing(current, open_token)) {
                  current.opened = open_token;
                  open_token.closed = current;
                  open_token = open_stack.pop();
                  current.parent = open_token;
                }
                current.previous = previous;
                previous.next = current;
                this.__tokens.add(current);
                previous = current;
              }
              return this.__tokens;
            };
            Tokenizer.prototype._is_first_token = function () {
              return this.__tokens.isEmpty();
            };
            Tokenizer.prototype._reset = function () {
            };
            Tokenizer.prototype._get_next_token = function (previous_token, open_token) {
              this._readWhitespace();
              var resulting_string = this._input.read(/.+/g);
              if (resulting_string) {
                return this._create_token(TOKEN.RAW, resulting_string);
              } else {
                return this._create_token(TOKEN.EOF, '');
              }
            };
            Tokenizer.prototype._is_comment = function (current_token) {
              return false;
            };
            Tokenizer.prototype._is_opening = function (current_token) {
              return false;
            };
            Tokenizer.prototype._is_closing = function (current_token, open_token) {
              return false;
            };
            Tokenizer.prototype._create_token = function (type, text) {
              var token = new Token(type, text, this._patterns.whitespace.newline_count, this._patterns.whitespace.whitespace_before_token);
              return token;
            };
            Tokenizer.prototype._readWhitespace = function () {
              return this._patterns.whitespace.read();
            };
            module.exports.Tokenizer = Tokenizer;
            module.exports.TOKEN = TOKEN;
          },
          function (module) {
            function TokenStream(parent_token) {
              this.__tokens = [];
              this.__tokens_length = this.__tokens.length;
              this.__position = 0;
              this.__parent_token = parent_token;
            }
            TokenStream.prototype.restart = function () {
              this.__position = 0;
            };
            TokenStream.prototype.isEmpty = function () {
              return this.__tokens_length === 0;
            };
            TokenStream.prototype.hasNext = function () {
              return this.__position < this.__tokens_length;
            };
            TokenStream.prototype.next = function () {
              var val = null;
              if (this.hasNext()) {
                val = this.__tokens[this.__position];
                this.__position += 1;
              }
              return val;
            };
            TokenStream.prototype.peek = function (index) {
              var val = null;
              index = index || 0;
              index += this.__position;
              if (index >= 0 && index < this.__tokens_length) {
                val = this.__tokens[index];
              }
              return val;
            };
            TokenStream.prototype.add = function (token) {
              if (this.__parent_token) {
                token.parent = this.__parent_token;
              }
              this.__tokens.push(token);
              this.__tokens_length += 1;
            };
            module.exports.TokenStream = TokenStream;
          },
          function (module, __unused_webpack_exports, __webpack_require__) {
            var Pattern = __webpack_require__(13).Pattern;
            function WhitespacePattern(input_scanner, parent) {
              Pattern.call(this, input_scanner, parent);
              if (parent) {
                this._line_regexp = this._input.get_regexp(parent._line_regexp);
              } else {
                this.__set_whitespace_patterns('', '');
              }
              this.newline_count = 0;
              this.whitespace_before_token = '';
            }
            WhitespacePattern.prototype = new Pattern();
            WhitespacePattern.prototype.__set_whitespace_patterns = function (whitespace_chars, newline_chars) {
              whitespace_chars += '\\t ';
              newline_chars += '\\n\\r';
              this._match_pattern = this._input.get_regexp('[' + whitespace_chars + newline_chars + ']+', true);
              this._newline_regexp = this._input.get_regexp('\\r\\n|[' + newline_chars + ']');
            };
            WhitespacePattern.prototype.read = function () {
              this.newline_count = 0;
              this.whitespace_before_token = '';
              var resulting_string = this._input.read(this._match_pattern);
              if (resulting_string === ' ') {
                this.whitespace_before_token = ' ';
              } else if (resulting_string) {
                var matches = this.__split(this._newline_regexp, resulting_string);
                this.newline_count = matches.length - 1;
                this.whitespace_before_token = matches[this.newline_count];
              }
              return resulting_string;
            };
            WhitespacePattern.prototype.matching = function (whitespace_chars, newline_chars) {
              var result = this._create();
              result.__set_whitespace_patterns(whitespace_chars, newline_chars);
              result._update();
              return result;
            };
            WhitespacePattern.prototype._create = function () {
              return new WhitespacePattern(this._input, this);
            };
            WhitespacePattern.prototype.__split = function (regexp, input_string) {
              regexp.lastIndex = 0;
              var start_index = 0;
              var result = [];
              var next_match = regexp.exec(input_string);
              while (next_match) {
                result.push(input_string.substring(start_index, next_match.index));
                start_index = next_match.index + next_match[0].length;
                next_match = regexp.exec(input_string);
              }
              if (start_index < input_string.length) {
                result.push(input_string.substring(start_index, input_string.length));
              } else {
                result.push('');
              }
              return result;
            };
            module.exports.WhitespacePattern = WhitespacePattern;
          },
          function (module) {
            function Pattern(input_scanner, parent) {
              this._input = input_scanner;
              this._starting_pattern = null;
              this._match_pattern = null;
              this._until_pattern = null;
              this._until_after = false;
              if (parent) {
                this._starting_pattern = this._input.get_regexp(parent._starting_pattern, true);
                this._match_pattern = this._input.get_regexp(parent._match_pattern, true);
                this._until_pattern = this._input.get_regexp(parent._until_pattern);
                this._until_after = parent._until_after;
              }
            }
            Pattern.prototype.read = function () {
              var result = this._input.read(this._starting_pattern);
              if (!this._starting_pattern || result) {
                result += this._input.read(this._match_pattern, this._until_pattern, this._until_after);
              }
              return result;
            };
            Pattern.prototype.read_match = function () {
              return this._input.match(this._match_pattern);
            };
            Pattern.prototype.until_after = function (pattern) {
              var result = this._create();
              result._until_after = true;
              result._until_pattern = this._input.get_regexp(pattern);
              result._update();
              return result;
            };
            Pattern.prototype.until = function (pattern) {
              var result = this._create();
              result._until_after = false;
              result._until_pattern = this._input.get_regexp(pattern);
              result._update();
              return result;
            };
            Pattern.prototype.starting_with = function (pattern) {
              var result = this._create();
              result._starting_pattern = this._input.get_regexp(pattern, true);
              result._update();
              return result;
            };
            Pattern.prototype.matching = function (pattern) {
              var result = this._create();
              result._match_pattern = this._input.get_regexp(pattern, true);
              result._update();
              return result;
            };
            Pattern.prototype._create = function () {
              return new Pattern(this._input, this);
            };
            Pattern.prototype._update = function () {
            };
            module.exports.Pattern = Pattern;
          },
          function (module) {
            function Directives(start_block_pattern, end_block_pattern) {
              start_block_pattern = typeof start_block_pattern === 'string' ? start_block_pattern : start_block_pattern.source;
              end_block_pattern = typeof end_block_pattern === 'string' ? end_block_pattern : end_block_pattern.source;
              this.__directives_block_pattern = new RegExp(start_block_pattern + / beautify( \w+[:]\w+)+ /.source + end_block_pattern, 'g');
              this.__directive_pattern = / (\w+)[:](\w+)/g;
              this.__directives_end_ignore_pattern = new RegExp(start_block_pattern + /\sbeautify\signore:end\s/.source + end_block_pattern, 'g');
            }
            Directives.prototype.get_directives = function (text) {
              if (!text.match(this.__directives_block_pattern)) {
                return null;
              }
              var directives = {};
              this.__directive_pattern.lastIndex = 0;
              var directive_match = this.__directive_pattern.exec(text);
              while (directive_match) {
                directives[directive_match[1]] = directive_match[2];
                directive_match = this.__directive_pattern.exec(text);
              }
              return directives;
            };
            Directives.prototype.readIgnored = function (input) {
              return input.readUntilAfter(this.__directives_end_ignore_pattern);
            };
            module.exports.Directives = Directives;
          },
          function (module, __unused_webpack_exports, __webpack_require__) {
            var Pattern = __webpack_require__(13).Pattern;
            var template_names = {
              django: false,
              erb: false,
              handlebars: false,
              php: false,
              smarty: false
            };
            function TemplatablePattern(input_scanner, parent) {
              Pattern.call(this, input_scanner, parent);
              this.__template_pattern = null;
              this._disabled = Object.assign({}, template_names);
              this._excluded = Object.assign({}, template_names);
              if (parent) {
                this.__template_pattern = this._input.get_regexp(parent.__template_pattern);
                this._excluded = Object.assign(this._excluded, parent._excluded);
                this._disabled = Object.assign(this._disabled, parent._disabled);
              }
              var pattern = new Pattern(input_scanner);
              this.__patterns = {
                handlebars_comment: pattern.starting_with(/{{!--/).until_after(/--}}/),
                handlebars_unescaped: pattern.starting_with(/{{{/).until_after(/}}}/),
                handlebars: pattern.starting_with(/{{/).until_after(/}}/),
                php: pattern.starting_with(/<\?(?:[= ]|php)/).until_after(/\?>/),
                erb: pattern.starting_with(/<%[^%]/).until_after(/[^%]%>/),
                django: pattern.starting_with(/{%/).until_after(/%}/),
                django_value: pattern.starting_with(/{{/).until_after(/}}/),
                django_comment: pattern.starting_with(/{#/).until_after(/#}/),
                smarty: pattern.starting_with(/{(?=[^}{\s\n])/).until_after(/[^\s\n]}/),
                smarty_comment: pattern.starting_with(/{\*/).until_after(/\*}/),
                smarty_literal: pattern.starting_with(/{literal}/).until_after(/{\/literal}/)
              };
            }
            TemplatablePattern.prototype = new Pattern();
            TemplatablePattern.prototype._create = function () {
              return new TemplatablePattern(this._input, this);
            };
            TemplatablePattern.prototype._update = function () {
              this.__set_templated_pattern();
            };
            TemplatablePattern.prototype.disable = function (language) {
              var result = this._create();
              result._disabled[language] = true;
              result._update();
              return result;
            };
            TemplatablePattern.prototype.read_options = function (options) {
              var result = this._create();
              for (var language in template_names) {
                result._disabled[language] = options.templating.indexOf(language) === -1;
              }
              result._update();
              return result;
            };
            TemplatablePattern.prototype.exclude = function (language) {
              var result = this._create();
              result._excluded[language] = true;
              result._update();
              return result;
            };
            TemplatablePattern.prototype.read = function () {
              var result = '';
              if (this._match_pattern) {
                result = this._input.read(this._starting_pattern);
              } else {
                result = this._input.read(this._starting_pattern, this.__template_pattern);
              }
              var next = this._read_template();
              while (next) {
                if (this._match_pattern) {
                  next += this._input.read(this._match_pattern);
                } else {
                  next += this._input.readUntil(this.__template_pattern);
                }
                result += next;
                next = this._read_template();
              }
              if (this._until_after) {
                result += this._input.readUntilAfter(this._until_pattern);
              }
              return result;
            };
            TemplatablePattern.prototype.__set_templated_pattern = function () {
              var items = [];
              if (!this._disabled.php) {
                items.push(this.__patterns.php._starting_pattern.source);
              }
              if (!this._disabled.handlebars) {
                items.push(this.__patterns.handlebars._starting_pattern.source);
              }
              if (!this._disabled.erb) {
                items.push(this.__patterns.erb._starting_pattern.source);
              }
              if (!this._disabled.django) {
                items.push(this.__patterns.django._starting_pattern.source);
                items.push(this.__patterns.django_value._starting_pattern.source);
                items.push(this.__patterns.django_comment._starting_pattern.source);
              }
              if (!this._disabled.smarty) {
                items.push(this.__patterns.smarty._starting_pattern.source);
              }
              if (this._until_pattern) {
                items.push(this._until_pattern.source);
              }
              this.__template_pattern = this._input.get_regexp('(?:' + items.join('|') + ')');
            };
            TemplatablePattern.prototype._read_template = function () {
              var resulting_string = '';
              var c = this._input.peek();
              if (c === '<') {
                var peek1 = this._input.peek(1);
                if (!this._disabled.php && !this._excluded.php && peek1 === '?') {
                  resulting_string = resulting_string || this.__patterns.php.read();
                }
                if (!this._disabled.erb && !this._excluded.erb && peek1 === '%') {
                  resulting_string = resulting_string || this.__patterns.erb.read();
                }
              } else if (c === '{') {
                if (!this._disabled.handlebars && !this._excluded.handlebars) {
                  resulting_string = resulting_string || this.__patterns.handlebars_comment.read();
                  resulting_string = resulting_string || this.__patterns.handlebars_unescaped.read();
                  resulting_string = resulting_string || this.__patterns.handlebars.read();
                }
                if (!this._disabled.django) {
                  if (!this._excluded.django && !this._excluded.handlebars) {
                    resulting_string = resulting_string || this.__patterns.django_value.read();
                  }
                  if (!this._excluded.django) {
                    resulting_string = resulting_string || this.__patterns.django_comment.read();
                    resulting_string = resulting_string || this.__patterns.django.read();
                  }
                }
                if (!this._disabled.smarty) {
                  if (this._disabled.django && this._disabled.handlebars) {
                    resulting_string = resulting_string || this.__patterns.smarty_comment.read();
                    resulting_string = resulting_string || this.__patterns.smarty_literal.read();
                    resulting_string = resulting_string || this.__patterns.smarty.read();
                  }
                }
              }
              return resulting_string;
            };
            module.exports.TemplatablePattern = TemplatablePattern;
          },
          function (module, __unused_webpack_exports, __webpack_require__) {
            var Beautifier = __webpack_require__(17).Beautifier, Options = __webpack_require__(18).Options;
            function css_beautify(source_text, options) {
              var beautifier = new Beautifier(source_text, options);
              return beautifier.beautify();
            }
            module.exports = css_beautify;
            module.exports.defaultOptions = function () {
              return new Options();
            };
          },
          function (module, __unused_webpack_exports, __webpack_require__) {
            var Options = __webpack_require__(18).Options;
            var Output = __webpack_require__(3).Output;
            var InputScanner = __webpack_require__(9).InputScanner;
            var Directives = __webpack_require__(14).Directives;
            var directives_core = new Directives(/\/\*/, /\*\//);
            var lineBreak = /\r\n|[\r\n]/;
            var allLineBreaks = /\r\n|[\r\n]/g;
            var whitespaceChar = /\s/;
            var whitespacePattern = /(?:\s|\n)+/g;
            var block_comment_pattern = /\/\*(?:[\s\S]*?)((?:\*\/)|$)/g;
            var comment_pattern = /\/\/(?:[^\n\r\u2028\u2029]*)/g;
            function Beautifier(source_text, options) {
              this._source_text = source_text || '';
              this._options = new Options(options);
              this._ch = null;
              this._input = null;
              this.NESTED_AT_RULE = {
                '@page': true,
                '@font-face': true,
                '@keyframes': true,
                '@media': true,
                '@supports': true,
                '@document': true
              };
              this.CONDITIONAL_GROUP_RULE = {
                '@media': true,
                '@supports': true,
                '@document': true
              };
            }
            Beautifier.prototype.eatString = function (endChars) {
              var result = '';
              this._ch = this._input.next();
              while (this._ch) {
                result += this._ch;
                if (this._ch === '\\') {
                  result += this._input.next();
                } else if (endChars.indexOf(this._ch) !== -1 || this._ch === '\n') {
                  break;
                }
                this._ch = this._input.next();
              }
              return result;
            };
            Beautifier.prototype.eatWhitespace = function (allowAtLeastOneNewLine) {
              var result = whitespaceChar.test(this._input.peek());
              var newline_count = 0;
              while (whitespaceChar.test(this._input.peek())) {
                this._ch = this._input.next();
                if (allowAtLeastOneNewLine && this._ch === '\n') {
                  if (newline_count === 0 || newline_count < this._options.max_preserve_newlines) {
                    newline_count++;
                    this._output.add_new_line(true);
                  }
                }
              }
              return result;
            };
            Beautifier.prototype.foundNestedPseudoClass = function () {
              var openParen = 0;
              var i = 1;
              var ch = this._input.peek(i);
              while (ch) {
                if (ch === '{') {
                  return true;
                } else if (ch === '(') {
                  openParen += 1;
                } else if (ch === ')') {
                  if (openParen === 0) {
                    return false;
                  }
                  openParen -= 1;
                } else if (ch === ';' || ch === '}') {
                  return false;
                }
                i++;
                ch = this._input.peek(i);
              }
              return false;
            };
            Beautifier.prototype.print_string = function (output_string) {
              this._output.set_indent(this._indentLevel);
              this._output.non_breaking_space = true;
              this._output.add_token(output_string);
            };
            Beautifier.prototype.preserveSingleSpace = function (isAfterSpace) {
              if (isAfterSpace) {
                this._output.space_before_token = true;
              }
            };
            Beautifier.prototype.indent = function () {
              this._indentLevel++;
            };
            Beautifier.prototype.outdent = function () {
              if (this._indentLevel > 0) {
                this._indentLevel--;
              }
            };
            Beautifier.prototype.beautify = function () {
              if (this._options.disabled) {
                return this._source_text;
              }
              var source_text = this._source_text;
              var eol = this._options.eol;
              if (eol === 'auto') {
                eol = '\n';
                if (source_text && lineBreak.test(source_text || '')) {
                  eol = source_text.match(lineBreak)[0];
                }
              }
              source_text = source_text.replace(allLineBreaks, '\n');
              var baseIndentString = source_text.match(/^[\t ]*/)[0];
              this._output = new Output(this._options, baseIndentString);
              this._input = new InputScanner(source_text);
              this._indentLevel = 0;
              this._nestedLevel = 0;
              this._ch = null;
              var parenLevel = 0;
              var insideRule = false;
              var insidePropertyValue = false;
              var enteringConditionalGroup = false;
              var insideAtExtend = false;
              var insideAtImport = false;
              var topCharacter = this._ch;
              var whitespace;
              var isAfterSpace;
              var previous_ch;
              while (true) {
                whitespace = this._input.read(whitespacePattern);
                isAfterSpace = whitespace !== '';
                previous_ch = topCharacter;
                this._ch = this._input.next();
                if (this._ch === '\\' && this._input.hasNext()) {
                  this._ch += this._input.next();
                }
                topCharacter = this._ch;
                if (!this._ch) {
                  break;
                } else if (this._ch === '/' && this._input.peek() === '*') {
                  this._output.add_new_line();
                  this._input.back();
                  var comment = this._input.read(block_comment_pattern);
                  var directives = directives_core.get_directives(comment);
                  if (directives && directives.ignore === 'start') {
                    comment += directives_core.readIgnored(this._input);
                  }
                  this.print_string(comment);
                  this.eatWhitespace(true);
                  this._output.add_new_line();
                } else if (this._ch === '/' && this._input.peek() === '/') {
                  this._output.space_before_token = true;
                  this._input.back();
                  this.print_string(this._input.read(comment_pattern));
                  this.eatWhitespace(true);
                } else if (this._ch === '@') {
                  this.preserveSingleSpace(isAfterSpace);
                  if (this._input.peek() === '{') {
                    this.print_string(this._ch + this.eatString('}'));
                  } else {
                    this.print_string(this._ch);
                    var variableOrRule = this._input.peekUntilAfter(/[: ,;{}()[\]\/='"]/g);
                    if (variableOrRule.match(/[ :]$/)) {
                      variableOrRule = this.eatString(': ').replace(/\s$/, '');
                      this.print_string(variableOrRule);
                      this._output.space_before_token = true;
                    }
                    variableOrRule = variableOrRule.replace(/\s$/, '');
                    if (variableOrRule === 'extend') {
                      insideAtExtend = true;
                    } else if (variableOrRule === 'import') {
                      insideAtImport = true;
                    }
                    if (variableOrRule in this.NESTED_AT_RULE) {
                      this._nestedLevel += 1;
                      if (variableOrRule in this.CONDITIONAL_GROUP_RULE) {
                        enteringConditionalGroup = true;
                      }
                    } else if (!insideRule && parenLevel === 0 && variableOrRule.indexOf(':') !== -1) {
                      insidePropertyValue = true;
                      this.indent();
                    }
                  }
                } else if (this._ch === '#' && this._input.peek() === '{') {
                  this.preserveSingleSpace(isAfterSpace);
                  this.print_string(this._ch + this.eatString('}'));
                } else if (this._ch === '{') {
                  if (insidePropertyValue) {
                    insidePropertyValue = false;
                    this.outdent();
                  }
                  if (enteringConditionalGroup) {
                    enteringConditionalGroup = false;
                    insideRule = this._indentLevel >= this._nestedLevel;
                  } else {
                    insideRule = this._indentLevel >= this._nestedLevel - 1;
                  }
                  if (this._options.newline_between_rules && insideRule) {
                    if (this._output.previous_line && this._output.previous_line.item(-1) !== '{') {
                      this._output.ensure_empty_line_above('/', ',');
                    }
                  }
                  this._output.space_before_token = true;
                  if (this._options.brace_style === 'expand') {
                    this._output.add_new_line();
                    this.print_string(this._ch);
                    this.indent();
                    this._output.set_indent(this._indentLevel);
                  } else {
                    this.indent();
                    this.print_string(this._ch);
                  }
                  this.eatWhitespace(true);
                  this._output.add_new_line();
                } else if (this._ch === '}') {
                  this.outdent();
                  this._output.add_new_line();
                  if (previous_ch === '{') {
                    this._output.trim(true);
                  }
                  insideAtImport = false;
                  insideAtExtend = false;
                  if (insidePropertyValue) {
                    this.outdent();
                    insidePropertyValue = false;
                  }
                  this.print_string(this._ch);
                  insideRule = false;
                  if (this._nestedLevel) {
                    this._nestedLevel--;
                  }
                  this.eatWhitespace(true);
                  this._output.add_new_line();
                  if (this._options.newline_between_rules && !this._output.just_added_blankline()) {
                    if (this._input.peek() !== '}') {
                      this._output.add_new_line(true);
                    }
                  }
                } else if (this._ch === ':') {
                  if ((insideRule || enteringConditionalGroup) && !(this._input.lookBack('&') || this.foundNestedPseudoClass()) && !this._input.lookBack('(') && !insideAtExtend && parenLevel === 0) {
                    this.print_string(':');
                    if (!insidePropertyValue) {
                      insidePropertyValue = true;
                      this._output.space_before_token = true;
                      this.eatWhitespace(true);
                      this.indent();
                    }
                  } else {
                    if (this._input.lookBack(' ')) {
                      this._output.space_before_token = true;
                    }
                    if (this._input.peek() === ':') {
                      this._ch = this._input.next();
                      this.print_string('::');
                    } else {
                      this.print_string(':');
                    }
                  }
                } else if (this._ch === '"' || this._ch === '\'') {
                  this.preserveSingleSpace(isAfterSpace);
                  this.print_string(this._ch + this.eatString(this._ch));
                  this.eatWhitespace(true);
                } else if (this._ch === ';') {
                  if (parenLevel === 0) {
                    if (insidePropertyValue) {
                      this.outdent();
                      insidePropertyValue = false;
                    }
                    insideAtExtend = false;
                    insideAtImport = false;
                    this.print_string(this._ch);
                    this.eatWhitespace(true);
                    if (this._input.peek() !== '/') {
                      this._output.add_new_line();
                    }
                  } else {
                    this.print_string(this._ch);
                    this.eatWhitespace(true);
                    this._output.space_before_token = true;
                  }
                } else if (this._ch === '(') {
                  if (this._input.lookBack('url')) {
                    this.print_string(this._ch);
                    this.eatWhitespace();
                    parenLevel++;
                    this.indent();
                    this._ch = this._input.next();
                    if (this._ch === ')' || this._ch === '"' || this._ch === '\'') {
                      this._input.back();
                    } else if (this._ch) {
                      this.print_string(this._ch + this.eatString(')'));
                      if (parenLevel) {
                        parenLevel--;
                        this.outdent();
                      }
                    }
                  } else {
                    this.preserveSingleSpace(isAfterSpace);
                    this.print_string(this._ch);
                    this.eatWhitespace();
                    parenLevel++;
                    this.indent();
                  }
                } else if (this._ch === ')') {
                  if (parenLevel) {
                    parenLevel--;
                    this.outdent();
                  }
                  this.print_string(this._ch);
                } else if (this._ch === ',') {
                  this.print_string(this._ch);
                  this.eatWhitespace(true);
                  if (this._options.selector_separator_newline && !insidePropertyValue && parenLevel === 0 && !insideAtImport) {
                    this._output.add_new_line();
                  } else {
                    this._output.space_before_token = true;
                  }
                } else if ((this._ch === '>' || this._ch === '+' || this._ch === '~') && !insidePropertyValue && parenLevel === 0) {
                  if (this._options.space_around_combinator) {
                    this._output.space_before_token = true;
                    this.print_string(this._ch);
                    this._output.space_before_token = true;
                  } else {
                    this.print_string(this._ch);
                    this.eatWhitespace();
                    if (this._ch && whitespaceChar.test(this._ch)) {
                      this._ch = '';
                    }
                  }
                } else if (this._ch === ']') {
                  this.print_string(this._ch);
                } else if (this._ch === '[') {
                  this.preserveSingleSpace(isAfterSpace);
                  this.print_string(this._ch);
                } else if (this._ch === '=') {
                  this.eatWhitespace();
                  this.print_string('=');
                  if (whitespaceChar.test(this._ch)) {
                    this._ch = '';
                  }
                } else if (this._ch === '!' && !this._input.lookBack('\\')) {
                  this.print_string(' ');
                  this.print_string(this._ch);
                } else {
                  this.preserveSingleSpace(isAfterSpace);
                  this.print_string(this._ch);
                }
              }
              var sweetCode = this._output.get_code(eol);
              return sweetCode;
            };
            module.exports.Beautifier = Beautifier;
          },
          function (module, __unused_webpack_exports, __webpack_require__) {
            var BaseOptions = __webpack_require__(7).Options;
            function Options(options) {
              BaseOptions.call(this, options, 'css');
              this.selector_separator_newline = this._get_boolean('selector_separator_newline', true);
              this.newline_between_rules = this._get_boolean('newline_between_rules', true);
              var space_around_selector_separator = this._get_boolean('space_around_selector_separator');
              this.space_around_combinator = this._get_boolean('space_around_combinator') || space_around_selector_separator;
              var brace_style_split = this._get_selection_list('brace_style', [
                'collapse',
                'expand',
                'end-expand',
                'none',
                'preserve-inline'
              ]);
              this.brace_style = 'collapse';
              for (var bs = 0; bs < brace_style_split.length; bs++) {
                if (brace_style_split[bs] !== 'expand') {
                  this.brace_style = 'collapse';
                } else {
                  this.brace_style = brace_style_split[bs];
                }
              }
            }
            Options.prototype = new BaseOptions();
            module.exports.Options = Options;
          },
          function (module, __unused_webpack_exports, __webpack_require__) {
            var Beautifier = __webpack_require__(20).Beautifier, Options = __webpack_require__(21).Options;
            function style_html(html_source, options, js_beautify, css_beautify) {
              var beautifier = new Beautifier(html_source, options, js_beautify, css_beautify);
              return beautifier.beautify();
            }
            module.exports = style_html;
            module.exports.defaultOptions = function () {
              return new Options();
            };
          },
          function (module, __unused_webpack_exports, __webpack_require__) {
            var Options = __webpack_require__(21).Options;
            var Output = __webpack_require__(3).Output;
            var Tokenizer = __webpack_require__(22).Tokenizer;
            var TOKEN = __webpack_require__(22).TOKEN;
            var lineBreak = /\r\n|[\r\n]/;
            var allLineBreaks = /\r\n|[\r\n]/g;
            var Printer = function (options, base_indent_string) {
              this.indent_level = 0;
              this.alignment_size = 0;
              this.max_preserve_newlines = options.max_preserve_newlines;
              this.preserve_newlines = options.preserve_newlines;
              this._output = new Output(options, base_indent_string);
            };
            Printer.prototype.current_line_has_match = function (pattern) {
              return this._output.current_line.has_match(pattern);
            };
            Printer.prototype.set_space_before_token = function (value, non_breaking) {
              this._output.space_before_token = value;
              this._output.non_breaking_space = non_breaking;
            };
            Printer.prototype.set_wrap_point = function () {
              this._output.set_indent(this.indent_level, this.alignment_size);
              this._output.set_wrap_point();
            };
            Printer.prototype.add_raw_token = function (token) {
              this._output.add_raw_token(token);
            };
            Printer.prototype.print_preserved_newlines = function (raw_token) {
              var newlines = 0;
              if (raw_token.type !== TOKEN.TEXT && raw_token.previous.type !== TOKEN.TEXT) {
                newlines = raw_token.newlines ? 1 : 0;
              }
              if (this.preserve_newlines) {
                newlines = raw_token.newlines < this.max_preserve_newlines + 1 ? raw_token.newlines : this.max_preserve_newlines + 1;
              }
              for (var n = 0; n < newlines; n++) {
                this.print_newline(n > 0);
              }
              return newlines !== 0;
            };
            Printer.prototype.traverse_whitespace = function (raw_token) {
              if (raw_token.whitespace_before || raw_token.newlines) {
                if (!this.print_preserved_newlines(raw_token)) {
                  this._output.space_before_token = true;
                }
                return true;
              }
              return false;
            };
            Printer.prototype.previous_token_wrapped = function () {
              return this._output.previous_token_wrapped;
            };
            Printer.prototype.print_newline = function (force) {
              this._output.add_new_line(force);
            };
            Printer.prototype.print_token = function (token) {
              if (token.text) {
                this._output.set_indent(this.indent_level, this.alignment_size);
                this._output.add_token(token.text);
              }
            };
            Printer.prototype.indent = function () {
              this.indent_level++;
            };
            Printer.prototype.get_full_indent = function (level) {
              level = this.indent_level + (level || 0);
              if (level < 1) {
                return '';
              }
              return this._output.get_indent_string(level);
            };
            var get_type_attribute = function (start_token) {
              var result = null;
              var raw_token = start_token.next;
              while (raw_token.type !== TOKEN.EOF && start_token.closed !== raw_token) {
                if (raw_token.type === TOKEN.ATTRIBUTE && raw_token.text === 'type') {
                  if (raw_token.next && raw_token.next.type === TOKEN.EQUALS && raw_token.next.next && raw_token.next.next.type === TOKEN.VALUE) {
                    result = raw_token.next.next.text;
                  }
                  break;
                }
                raw_token = raw_token.next;
              }
              return result;
            };
            var get_custom_beautifier_name = function (tag_check, raw_token) {
              var typeAttribute = null;
              var result = null;
              if (!raw_token.closed) {
                return null;
              }
              if (tag_check === 'script') {
                typeAttribute = 'text/javascript';
              } else if (tag_check === 'style') {
                typeAttribute = 'text/css';
              }
              typeAttribute = get_type_attribute(raw_token) || typeAttribute;
              if (typeAttribute.search('text/css') > -1) {
                result = 'css';
              } else if (typeAttribute.search(/module|((text|application|dojo)\/(x-)?(javascript|ecmascript|jscript|livescript|(ld\+)?json|method|aspect))/) > -1) {
                result = 'javascript';
              } else if (typeAttribute.search(/(text|application|dojo)\/(x-)?(html)/) > -1) {
                result = 'html';
              } else if (typeAttribute.search(/test\/null/) > -1) {
                result = 'null';
              }
              return result;
            };
            function in_array(what, arr) {
              return arr.indexOf(what) !== -1;
            }
            function TagFrame(parent, parser_token, indent_level) {
              this.parent = parent || null;
              this.tag = parser_token ? parser_token.tag_name : '';
              this.indent_level = indent_level || 0;
              this.parser_token = parser_token || null;
            }
            function TagStack(printer) {
              this._printer = printer;
              this._current_frame = null;
            }
            TagStack.prototype.get_parser_token = function () {
              return this._current_frame ? this._current_frame.parser_token : null;
            };
            TagStack.prototype.record_tag = function (parser_token) {
              var new_frame = new TagFrame(this._current_frame, parser_token, this._printer.indent_level);
              this._current_frame = new_frame;
            };
            TagStack.prototype._try_pop_frame = function (frame) {
              var parser_token = null;
              if (frame) {
                parser_token = frame.parser_token;
                this._printer.indent_level = frame.indent_level;
                this._current_frame = frame.parent;
              }
              return parser_token;
            };
            TagStack.prototype._get_frame = function (tag_list, stop_list) {
              var frame = this._current_frame;
              while (frame) {
                if (tag_list.indexOf(frame.tag) !== -1) {
                  break;
                } else if (stop_list && stop_list.indexOf(frame.tag) !== -1) {
                  frame = null;
                  break;
                }
                frame = frame.parent;
              }
              return frame;
            };
            TagStack.prototype.try_pop = function (tag, stop_list) {
              var frame = this._get_frame([tag], stop_list);
              return this._try_pop_frame(frame);
            };
            TagStack.prototype.indent_to_tag = function (tag_list) {
              var frame = this._get_frame(tag_list);
              if (frame) {
                this._printer.indent_level = frame.indent_level;
              }
            };
            function Beautifier(source_text, options, js_beautify, css_beautify) {
              this._source_text = source_text || '';
              options = options || {};
              this._js_beautify = js_beautify;
              this._css_beautify = css_beautify;
              this._tag_stack = null;
              var optionHtml = new Options(options, 'html');
              this._options = optionHtml;
              this._is_wrap_attributes_force = this._options.wrap_attributes.substr(0, 'force'.length) === 'force';
              this._is_wrap_attributes_force_expand_multiline = this._options.wrap_attributes === 'force-expand-multiline';
              this._is_wrap_attributes_force_aligned = this._options.wrap_attributes === 'force-aligned';
              this._is_wrap_attributes_aligned_multiple = this._options.wrap_attributes === 'aligned-multiple';
              this._is_wrap_attributes_preserve = this._options.wrap_attributes.substr(0, 'preserve'.length) === 'preserve';
              this._is_wrap_attributes_preserve_aligned = this._options.wrap_attributes === 'preserve-aligned';
            }
            Beautifier.prototype.beautify = function () {
              if (this._options.disabled) {
                return this._source_text;
              }
              var source_text = this._source_text;
              var eol = this._options.eol;
              if (this._options.eol === 'auto') {
                eol = '\n';
                if (source_text && lineBreak.test(source_text)) {
                  eol = source_text.match(lineBreak)[0];
                }
              }
              source_text = source_text.replace(allLineBreaks, '\n');
              var baseIndentString = source_text.match(/^[\t ]*/)[0];
              var last_token = {
                text: '',
                type: ''
              };
              var last_tag_token = new TagOpenParserToken();
              var printer = new Printer(this._options, baseIndentString);
              var tokens = new Tokenizer(source_text, this._options).tokenize();
              this._tag_stack = new TagStack(printer);
              var parser_token = null;
              var raw_token = tokens.next();
              while (raw_token.type !== TOKEN.EOF) {
                if (raw_token.type === TOKEN.TAG_OPEN || raw_token.type === TOKEN.COMMENT) {
                  parser_token = this._handle_tag_open(printer, raw_token, last_tag_token, last_token);
                  last_tag_token = parser_token;
                } else if (raw_token.type === TOKEN.ATTRIBUTE || raw_token.type === TOKEN.EQUALS || raw_token.type === TOKEN.VALUE || raw_token.type === TOKEN.TEXT && !last_tag_token.tag_complete) {
                  parser_token = this._handle_inside_tag(printer, raw_token, last_tag_token, tokens);
                } else if (raw_token.type === TOKEN.TAG_CLOSE) {
                  parser_token = this._handle_tag_close(printer, raw_token, last_tag_token);
                } else if (raw_token.type === TOKEN.TEXT) {
                  parser_token = this._handle_text(printer, raw_token, last_tag_token);
                } else {
                  printer.add_raw_token(raw_token);
                }
                last_token = parser_token;
                raw_token = tokens.next();
              }
              var sweet_code = printer._output.get_code(eol);
              return sweet_code;
            };
            Beautifier.prototype._handle_tag_close = function (printer, raw_token, last_tag_token) {
              var parser_token = {
                text: raw_token.text,
                type: raw_token.type
              };
              printer.alignment_size = 0;
              last_tag_token.tag_complete = true;
              printer.set_space_before_token(raw_token.newlines || raw_token.whitespace_before !== '', true);
              if (last_tag_token.is_unformatted) {
                printer.add_raw_token(raw_token);
              } else {
                if (last_tag_token.tag_start_char === '<') {
                  printer.set_space_before_token(raw_token.text[0] === '/', true);
                  if (this._is_wrap_attributes_force_expand_multiline && last_tag_token.has_wrapped_attrs) {
                    printer.print_newline(false);
                  }
                }
                printer.print_token(raw_token);
              }
              if (last_tag_token.indent_content && !(last_tag_token.is_unformatted || last_tag_token.is_content_unformatted)) {
                printer.indent();
                last_tag_token.indent_content = false;
              }
              if (!last_tag_token.is_inline_element && !(last_tag_token.is_unformatted || last_tag_token.is_content_unformatted)) {
                printer.set_wrap_point();
              }
              return parser_token;
            };
            Beautifier.prototype._handle_inside_tag = function (printer, raw_token, last_tag_token, tokens) {
              var wrapped = last_tag_token.has_wrapped_attrs;
              var parser_token = {
                text: raw_token.text,
                type: raw_token.type
              };
              printer.set_space_before_token(raw_token.newlines || raw_token.whitespace_before !== '', true);
              if (last_tag_token.is_unformatted) {
                printer.add_raw_token(raw_token);
              } else if (last_tag_token.tag_start_char === '{' && raw_token.type === TOKEN.TEXT) {
                if (printer.print_preserved_newlines(raw_token)) {
                  raw_token.newlines = 0;
                  printer.add_raw_token(raw_token);
                } else {
                  printer.print_token(raw_token);
                }
              } else {
                if (raw_token.type === TOKEN.ATTRIBUTE) {
                  printer.set_space_before_token(true);
                  last_tag_token.attr_count += 1;
                } else if (raw_token.type === TOKEN.EQUALS) {
                  printer.set_space_before_token(false);
                } else if (raw_token.type === TOKEN.VALUE && raw_token.previous.type === TOKEN.EQUALS) {
                  printer.set_space_before_token(false);
                }
                if (raw_token.type === TOKEN.ATTRIBUTE && last_tag_token.tag_start_char === '<') {
                  if (this._is_wrap_attributes_preserve || this._is_wrap_attributes_preserve_aligned) {
                    printer.traverse_whitespace(raw_token);
                    wrapped = wrapped || raw_token.newlines !== 0;
                  }
                  if (this._is_wrap_attributes_force) {
                    var force_attr_wrap = last_tag_token.attr_count > 1;
                    if (this._is_wrap_attributes_force_expand_multiline && last_tag_token.attr_count === 1) {
                      var is_only_attribute = true;
                      var peek_index = 0;
                      var peek_token;
                      do {
                        peek_token = tokens.peek(peek_index);
                        if (peek_token.type === TOKEN.ATTRIBUTE) {
                          is_only_attribute = false;
                          break;
                        }
                        peek_index += 1;
                      } while (peek_index < 4 && peek_token.type !== TOKEN.EOF && peek_token.type !== TOKEN.TAG_CLOSE);
                      force_attr_wrap = !is_only_attribute;
                    }
                    if (force_attr_wrap) {
                      printer.print_newline(false);
                      wrapped = true;
                    }
                  }
                }
                printer.print_token(raw_token);
                wrapped = wrapped || printer.previous_token_wrapped();
                last_tag_token.has_wrapped_attrs = wrapped;
              }
              return parser_token;
            };
            Beautifier.prototype._handle_text = function (printer, raw_token, last_tag_token) {
              var parser_token = {
                text: raw_token.text,
                type: 'TK_CONTENT'
              };
              if (last_tag_token.custom_beautifier_name) {
                this._print_custom_beatifier_text(printer, raw_token, last_tag_token);
              } else if (last_tag_token.is_unformatted || last_tag_token.is_content_unformatted) {
                printer.add_raw_token(raw_token);
              } else {
                printer.traverse_whitespace(raw_token);
                printer.print_token(raw_token);
              }
              return parser_token;
            };
            Beautifier.prototype._print_custom_beatifier_text = function (printer, raw_token, last_tag_token) {
              var local = this;
              if (raw_token.text !== '') {
                var text = raw_token.text, _beautifier, script_indent_level = 1, pre = '', post = '';
                if (last_tag_token.custom_beautifier_name === 'javascript' && typeof this._js_beautify === 'function') {
                  _beautifier = this._js_beautify;
                } else if (last_tag_token.custom_beautifier_name === 'css' && typeof this._css_beautify === 'function') {
                  _beautifier = this._css_beautify;
                } else if (last_tag_token.custom_beautifier_name === 'html') {
                  _beautifier = function (html_source, options) {
                    var beautifier = new Beautifier(html_source, options, local._js_beautify, local._css_beautify);
                    return beautifier.beautify();
                  };
                }
                if (this._options.indent_scripts === 'keep') {
                  script_indent_level = 0;
                } else if (this._options.indent_scripts === 'separate') {
                  script_indent_level = -printer.indent_level;
                }
                var indentation = printer.get_full_indent(script_indent_level);
                text = text.replace(/\n[ \t]*$/, '');
                if (last_tag_token.custom_beautifier_name !== 'html' && text[0] === '<' && text.match(/^(<!--|<!\[CDATA\[)/)) {
                  var matched = /^(<!--[^\n]*|<!\[CDATA\[)(\n?)([ \t\n]*)([\s\S]*)(-->|]]>)$/.exec(text);
                  if (!matched) {
                    printer.add_raw_token(raw_token);
                    return;
                  }
                  pre = indentation + matched[1] + '\n';
                  text = matched[4];
                  if (matched[5]) {
                    post = indentation + matched[5];
                  }
                  text = text.replace(/\n[ \t]*$/, '');
                  if (matched[2] || matched[3].indexOf('\n') !== -1) {
                    matched = matched[3].match(/[ \t]+$/);
                    if (matched) {
                      raw_token.whitespace_before = matched[0];
                    }
                  }
                }
                if (text) {
                  if (_beautifier) {
                    var Child_options = function () {
                      this.eol = '\n';
                    };
                    Child_options.prototype = this._options.raw_options;
                    var child_options = new Child_options();
                    text = _beautifier(indentation + text, child_options);
                  } else {
                    var white = raw_token.whitespace_before;
                    if (white) {
                      text = text.replace(new RegExp('\n(' + white + ')?', 'g'), '\n');
                    }
                    text = indentation + text.replace(/\n/g, '\n' + indentation);
                  }
                }
                if (pre) {
                  if (!text) {
                    text = pre + post;
                  } else {
                    text = pre + text + '\n' + post;
                  }
                }
                printer.print_newline(false);
                if (text) {
                  raw_token.text = text;
                  raw_token.whitespace_before = '';
                  raw_token.newlines = 0;
                  printer.add_raw_token(raw_token);
                  printer.print_newline(true);
                }
              }
            };
            Beautifier.prototype._handle_tag_open = function (printer, raw_token, last_tag_token, last_token) {
              var parser_token = this._get_tag_open_token(raw_token);
              if ((last_tag_token.is_unformatted || last_tag_token.is_content_unformatted) && !last_tag_token.is_empty_element && raw_token.type === TOKEN.TAG_OPEN && raw_token.text.indexOf('</') === 0) {
                printer.add_raw_token(raw_token);
                parser_token.start_tag_token = this._tag_stack.try_pop(parser_token.tag_name);
              } else {
                printer.traverse_whitespace(raw_token);
                this._set_tag_position(printer, raw_token, parser_token, last_tag_token, last_token);
                if (!parser_token.is_inline_element) {
                  printer.set_wrap_point();
                }
                printer.print_token(raw_token);
              }
              if (this._is_wrap_attributes_force_aligned || this._is_wrap_attributes_aligned_multiple || this._is_wrap_attributes_preserve_aligned) {
                parser_token.alignment_size = raw_token.text.length + 1;
              }
              if (!parser_token.tag_complete && !parser_token.is_unformatted) {
                printer.alignment_size = parser_token.alignment_size;
              }
              return parser_token;
            };
            var TagOpenParserToken = function (parent, raw_token) {
              this.parent = parent || null;
              this.text = '';
              this.type = 'TK_TAG_OPEN';
              this.tag_name = '';
              this.is_inline_element = false;
              this.is_unformatted = false;
              this.is_content_unformatted = false;
              this.is_empty_element = false;
              this.is_start_tag = false;
              this.is_end_tag = false;
              this.indent_content = false;
              this.multiline_content = false;
              this.custom_beautifier_name = null;
              this.start_tag_token = null;
              this.attr_count = 0;
              this.has_wrapped_attrs = false;
              this.alignment_size = 0;
              this.tag_complete = false;
              this.tag_start_char = '';
              this.tag_check = '';
              if (!raw_token) {
                this.tag_complete = true;
              } else {
                var tag_check_match;
                this.tag_start_char = raw_token.text[0];
                this.text = raw_token.text;
                if (this.tag_start_char === '<') {
                  tag_check_match = raw_token.text.match(/^<([^\s>]*)/);
                  this.tag_check = tag_check_match ? tag_check_match[1] : '';
                } else {
                  tag_check_match = raw_token.text.match(/^{{(?:[\^]|#\*?)?([^\s}]+)/);
                  this.tag_check = tag_check_match ? tag_check_match[1] : '';
                  if (raw_token.text === '{{#>' && this.tag_check === '>' && raw_token.next !== null) {
                    this.tag_check = raw_token.next.text;
                  }
                }
                this.tag_check = this.tag_check.toLowerCase();
                if (raw_token.type === TOKEN.COMMENT) {
                  this.tag_complete = true;
                }
                this.is_start_tag = this.tag_check.charAt(0) !== '/';
                this.tag_name = !this.is_start_tag ? this.tag_check.substr(1) : this.tag_check;
                this.is_end_tag = !this.is_start_tag || raw_token.closed && raw_token.closed.text === '/>';
                this.is_end_tag = this.is_end_tag || this.tag_start_char === '{' && (this.text.length < 3 || /[^#\^]/.test(this.text.charAt(2)));
              }
            };
            Beautifier.prototype._get_tag_open_token = function (raw_token) {
              var parser_token = new TagOpenParserToken(this._tag_stack.get_parser_token(), raw_token);
              parser_token.alignment_size = this._options.wrap_attributes_indent_size;
              parser_token.is_end_tag = parser_token.is_end_tag || in_array(parser_token.tag_check, this._options.void_elements);
              parser_token.is_empty_element = parser_token.tag_complete || parser_token.is_start_tag && parser_token.is_end_tag;
              parser_token.is_unformatted = !parser_token.tag_complete && in_array(parser_token.tag_check, this._options.unformatted);
              parser_token.is_content_unformatted = !parser_token.is_empty_element && in_array(parser_token.tag_check, this._options.content_unformatted);
              parser_token.is_inline_element = in_array(parser_token.tag_name, this._options.inline) || parser_token.tag_start_char === '{';
              return parser_token;
            };
            Beautifier.prototype._set_tag_position = function (printer, raw_token, parser_token, last_tag_token, last_token) {
              if (!parser_token.is_empty_element) {
                if (parser_token.is_end_tag) {
                  parser_token.start_tag_token = this._tag_stack.try_pop(parser_token.tag_name);
                } else {
                  if (this._do_optional_end_element(parser_token)) {
                    if (!parser_token.is_inline_element) {
                      printer.print_newline(false);
                    }
                  }
                  this._tag_stack.record_tag(parser_token);
                  if ((parser_token.tag_name === 'script' || parser_token.tag_name === 'style') && !(parser_token.is_unformatted || parser_token.is_content_unformatted)) {
                    parser_token.custom_beautifier_name = get_custom_beautifier_name(parser_token.tag_check, raw_token);
                  }
                }
              }
              if (in_array(parser_token.tag_check, this._options.extra_liners)) {
                printer.print_newline(false);
                if (!printer._output.just_added_blankline()) {
                  printer.print_newline(true);
                }
              }
              if (parser_token.is_empty_element) {
                if (parser_token.tag_start_char === '{' && parser_token.tag_check === 'else') {
                  this._tag_stack.indent_to_tag([
                    'if',
                    'unless',
                    'each'
                  ]);
                  parser_token.indent_content = true;
                  var foundIfOnCurrentLine = printer.current_line_has_match(/{{#if/);
                  if (!foundIfOnCurrentLine) {
                    printer.print_newline(false);
                  }
                }
                if (parser_token.tag_name === '!--' && last_token.type === TOKEN.TAG_CLOSE && last_tag_token.is_end_tag && parser_token.text.indexOf('\n') === -1) ; else {
                  if (!(parser_token.is_inline_element || parser_token.is_unformatted)) {
                    printer.print_newline(false);
                  }
                  this._calcluate_parent_multiline(printer, parser_token);
                }
              } else if (parser_token.is_end_tag) {
                var do_end_expand = false;
                do_end_expand = parser_token.start_tag_token && parser_token.start_tag_token.multiline_content;
                do_end_expand = do_end_expand || !parser_token.is_inline_element && !(last_tag_token.is_inline_element || last_tag_token.is_unformatted) && !(last_token.type === TOKEN.TAG_CLOSE && parser_token.start_tag_token === last_tag_token) && last_token.type !== 'TK_CONTENT';
                if (parser_token.is_content_unformatted || parser_token.is_unformatted) {
                  do_end_expand = false;
                }
                if (do_end_expand) {
                  printer.print_newline(false);
                }
              } else {
                parser_token.indent_content = !parser_token.custom_beautifier_name;
                if (parser_token.tag_start_char === '<') {
                  if (parser_token.tag_name === 'html') {
                    parser_token.indent_content = this._options.indent_inner_html;
                  } else if (parser_token.tag_name === 'head') {
                    parser_token.indent_content = this._options.indent_head_inner_html;
                  } else if (parser_token.tag_name === 'body') {
                    parser_token.indent_content = this._options.indent_body_inner_html;
                  }
                }
                if (!(parser_token.is_inline_element || parser_token.is_unformatted) && (last_token.type !== 'TK_CONTENT' || parser_token.is_content_unformatted)) {
                  printer.print_newline(false);
                }
                this._calcluate_parent_multiline(printer, parser_token);
              }
            };
            Beautifier.prototype._calcluate_parent_multiline = function (printer, parser_token) {
              if (parser_token.parent && printer._output.just_added_newline() && !((parser_token.is_inline_element || parser_token.is_unformatted) && parser_token.parent.is_inline_element)) {
                parser_token.parent.multiline_content = true;
              }
            };
            var p_closers = [
              'address',
              'article',
              'aside',
              'blockquote',
              'details',
              'div',
              'dl',
              'fieldset',
              'figcaption',
              'figure',
              'footer',
              'form',
              'h1',
              'h2',
              'h3',
              'h4',
              'h5',
              'h6',
              'header',
              'hr',
              'main',
              'nav',
              'ol',
              'p',
              'pre',
              'section',
              'table',
              'ul'
            ];
            var p_parent_excludes = [
              'a',
              'audio',
              'del',
              'ins',
              'map',
              'noscript',
              'video'
            ];
            Beautifier.prototype._do_optional_end_element = function (parser_token) {
              var result = null;
              if (parser_token.is_empty_element || !parser_token.is_start_tag || !parser_token.parent) {
                return;
              }
              if (parser_token.tag_name === 'body') {
                result = result || this._tag_stack.try_pop('head');
              } else if (parser_token.tag_name === 'li') {
                result = result || this._tag_stack.try_pop('li', [
                  'ol',
                  'ul'
                ]);
              } else if (parser_token.tag_name === 'dd' || parser_token.tag_name === 'dt') {
                result = result || this._tag_stack.try_pop('dt', ['dl']);
                result = result || this._tag_stack.try_pop('dd', ['dl']);
              } else if (parser_token.parent.tag_name === 'p' && p_closers.indexOf(parser_token.tag_name) !== -1) {
                var p_parent = parser_token.parent.parent;
                if (!p_parent || p_parent_excludes.indexOf(p_parent.tag_name) === -1) {
                  result = result || this._tag_stack.try_pop('p');
                }
              } else if (parser_token.tag_name === 'rp' || parser_token.tag_name === 'rt') {
                result = result || this._tag_stack.try_pop('rt', [
                  'ruby',
                  'rtc'
                ]);
                result = result || this._tag_stack.try_pop('rp', [
                  'ruby',
                  'rtc'
                ]);
              } else if (parser_token.tag_name === 'optgroup') {
                result = result || this._tag_stack.try_pop('optgroup', ['select']);
              } else if (parser_token.tag_name === 'option') {
                result = result || this._tag_stack.try_pop('option', [
                  'select',
                  'datalist',
                  'optgroup'
                ]);
              } else if (parser_token.tag_name === 'colgroup') {
                result = result || this._tag_stack.try_pop('caption', ['table']);
              } else if (parser_token.tag_name === 'thead') {
                result = result || this._tag_stack.try_pop('caption', ['table']);
                result = result || this._tag_stack.try_pop('colgroup', ['table']);
              } else if (parser_token.tag_name === 'tbody' || parser_token.tag_name === 'tfoot') {
                result = result || this._tag_stack.try_pop('caption', ['table']);
                result = result || this._tag_stack.try_pop('colgroup', ['table']);
                result = result || this._tag_stack.try_pop('thead', ['table']);
                result = result || this._tag_stack.try_pop('tbody', ['table']);
              } else if (parser_token.tag_name === 'tr') {
                result = result || this._tag_stack.try_pop('caption', ['table']);
                result = result || this._tag_stack.try_pop('colgroup', ['table']);
                result = result || this._tag_stack.try_pop('tr', [
                  'table',
                  'thead',
                  'tbody',
                  'tfoot'
                ]);
              } else if (parser_token.tag_name === 'th' || parser_token.tag_name === 'td') {
                result = result || this._tag_stack.try_pop('td', [
                  'table',
                  'thead',
                  'tbody',
                  'tfoot',
                  'tr'
                ]);
                result = result || this._tag_stack.try_pop('th', [
                  'table',
                  'thead',
                  'tbody',
                  'tfoot',
                  'tr'
                ]);
              }
              parser_token.parent = this._tag_stack.get_parser_token();
              return result;
            };
            module.exports.Beautifier = Beautifier;
          },
          function (module, __unused_webpack_exports, __webpack_require__) {
            var BaseOptions = __webpack_require__(7).Options;
            function Options(options) {
              BaseOptions.call(this, options, 'html');
              if (this.templating.length === 1 && this.templating[0] === 'auto') {
                this.templating = [
                  'django',
                  'erb',
                  'handlebars',
                  'php'
                ];
              }
              this.indent_inner_html = this._get_boolean('indent_inner_html');
              this.indent_body_inner_html = this._get_boolean('indent_body_inner_html', true);
              this.indent_head_inner_html = this._get_boolean('indent_head_inner_html', true);
              this.indent_handlebars = this._get_boolean('indent_handlebars', true);
              this.wrap_attributes = this._get_selection('wrap_attributes', [
                'auto',
                'force',
                'force-aligned',
                'force-expand-multiline',
                'aligned-multiple',
                'preserve',
                'preserve-aligned'
              ]);
              this.wrap_attributes_indent_size = this._get_number('wrap_attributes_indent_size', this.indent_size);
              this.extra_liners = this._get_array('extra_liners', [
                'head',
                'body',
                '/html'
              ]);
              this.inline = this._get_array('inline', [
                'a',
                'abbr',
                'area',
                'audio',
                'b',
                'bdi',
                'bdo',
                'br',
                'button',
                'canvas',
                'cite',
                'code',
                'data',
                'datalist',
                'del',
                'dfn',
                'em',
                'embed',
                'i',
                'iframe',
                'img',
                'input',
                'ins',
                'kbd',
                'keygen',
                'label',
                'map',
                'mark',
                'math',
                'meter',
                'noscript',
                'object',
                'output',
                'progress',
                'q',
                'ruby',
                's',
                'samp',
                'select',
                'small',
                'span',
                'strong',
                'sub',
                'sup',
                'svg',
                'template',
                'textarea',
                'time',
                'u',
                'var',
                'video',
                'wbr',
                'text',
                'acronym',
                'big',
                'strike',
                'tt'
              ]);
              this.void_elements = this._get_array('void_elements', [
                'area',
                'base',
                'br',
                'col',
                'embed',
                'hr',
                'img',
                'input',
                'keygen',
                'link',
                'menuitem',
                'meta',
                'param',
                'source',
                'track',
                'wbr',
                '!doctype',
                '?xml',
                'basefont',
                'isindex'
              ]);
              this.unformatted = this._get_array('unformatted', []);
              this.content_unformatted = this._get_array('content_unformatted', [
                'pre',
                'textarea'
              ]);
              this.unformatted_content_delimiter = this._get_characters('unformatted_content_delimiter');
              this.indent_scripts = this._get_selection('indent_scripts', [
                'normal',
                'keep',
                'separate'
              ]);
            }
            Options.prototype = new BaseOptions();
            module.exports.Options = Options;
          },
          function (module, __unused_webpack_exports, __webpack_require__) {
            var BaseTokenizer = __webpack_require__(10).Tokenizer;
            var BASETOKEN = __webpack_require__(10).TOKEN;
            var Directives = __webpack_require__(14).Directives;
            var TemplatablePattern = __webpack_require__(15).TemplatablePattern;
            var Pattern = __webpack_require__(13).Pattern;
            var TOKEN = {
              TAG_OPEN: 'TK_TAG_OPEN',
              TAG_CLOSE: 'TK_TAG_CLOSE',
              ATTRIBUTE: 'TK_ATTRIBUTE',
              EQUALS: 'TK_EQUALS',
              VALUE: 'TK_VALUE',
              COMMENT: 'TK_COMMENT',
              TEXT: 'TK_TEXT',
              UNKNOWN: 'TK_UNKNOWN',
              START: BASETOKEN.START,
              RAW: BASETOKEN.RAW,
              EOF: BASETOKEN.EOF
            };
            var directives_core = new Directives(/<\!--/, /-->/);
            var Tokenizer = function (input_string, options) {
              BaseTokenizer.call(this, input_string, options);
              this._current_tag_name = '';
              var templatable_reader = new TemplatablePattern(this._input).read_options(this._options);
              var pattern_reader = new Pattern(this._input);
              this.__patterns = {
                word: templatable_reader.until(/[\n\r\t <]/),
                single_quote: templatable_reader.until_after(/'/),
                double_quote: templatable_reader.until_after(/"/),
                attribute: templatable_reader.until(/[\n\r\t =>]|\/>/),
                element_name: templatable_reader.until(/[\n\r\t >\/]/),
                handlebars_comment: pattern_reader.starting_with(/{{!--/).until_after(/--}}/),
                handlebars: pattern_reader.starting_with(/{{/).until_after(/}}/),
                handlebars_open: pattern_reader.until(/[\n\r\t }]/),
                handlebars_raw_close: pattern_reader.until(/}}/),
                comment: pattern_reader.starting_with(/<!--/).until_after(/-->/),
                cdata: pattern_reader.starting_with(/<!\[CDATA\[/).until_after(/]]>/),
                conditional_comment: pattern_reader.starting_with(/<!\[/).until_after(/]>/),
                processing: pattern_reader.starting_with(/<\?/).until_after(/\?>/)
              };
              if (this._options.indent_handlebars) {
                this.__patterns.word = this.__patterns.word.exclude('handlebars');
              }
              this._unformatted_content_delimiter = null;
              if (this._options.unformatted_content_delimiter) {
                var literal_regexp = this._input.get_literal_regexp(this._options.unformatted_content_delimiter);
                this.__patterns.unformatted_content_delimiter = pattern_reader.matching(literal_regexp).until_after(literal_regexp);
              }
            };
            Tokenizer.prototype = new BaseTokenizer();
            Tokenizer.prototype._is_comment = function (current_token) {
              return false;
            };
            Tokenizer.prototype._is_opening = function (current_token) {
              return current_token.type === TOKEN.TAG_OPEN;
            };
            Tokenizer.prototype._is_closing = function (current_token, open_token) {
              return current_token.type === TOKEN.TAG_CLOSE && (open_token && ((current_token.text === '>' || current_token.text === '/>') && open_token.text[0] === '<' || current_token.text === '}}' && open_token.text[0] === '{' && open_token.text[1] === '{'));
            };
            Tokenizer.prototype._reset = function () {
              this._current_tag_name = '';
            };
            Tokenizer.prototype._get_next_token = function (previous_token, open_token) {
              var token = null;
              this._readWhitespace();
              var c = this._input.peek();
              if (c === null) {
                return this._create_token(TOKEN.EOF, '');
              }
              token = token || this._read_open_handlebars(c, open_token);
              token = token || this._read_attribute(c, previous_token, open_token);
              token = token || this._read_close(c, open_token);
              token = token || this._read_raw_content(c, previous_token, open_token);
              token = token || this._read_content_word(c);
              token = token || this._read_comment_or_cdata(c);
              token = token || this._read_processing(c);
              token = token || this._read_open(c, open_token);
              token = token || this._create_token(TOKEN.UNKNOWN, this._input.next());
              return token;
            };
            Tokenizer.prototype._read_comment_or_cdata = function (c) {
              var token = null;
              var resulting_string = null;
              var directives = null;
              if (c === '<') {
                var peek1 = this._input.peek(1);
                if (peek1 === '!') {
                  resulting_string = this.__patterns.comment.read();
                  if (resulting_string) {
                    directives = directives_core.get_directives(resulting_string);
                    if (directives && directives.ignore === 'start') {
                      resulting_string += directives_core.readIgnored(this._input);
                    }
                  } else {
                    resulting_string = this.__patterns.cdata.read();
                  }
                }
                if (resulting_string) {
                  token = this._create_token(TOKEN.COMMENT, resulting_string);
                  token.directives = directives;
                }
              }
              return token;
            };
            Tokenizer.prototype._read_processing = function (c) {
              var token = null;
              var resulting_string = null;
              var directives = null;
              if (c === '<') {
                var peek1 = this._input.peek(1);
                if (peek1 === '!' || peek1 === '?') {
                  resulting_string = this.__patterns.conditional_comment.read();
                  resulting_string = resulting_string || this.__patterns.processing.read();
                }
                if (resulting_string) {
                  token = this._create_token(TOKEN.COMMENT, resulting_string);
                  token.directives = directives;
                }
              }
              return token;
            };
            Tokenizer.prototype._read_open = function (c, open_token) {
              var resulting_string = null;
              var token = null;
              if (!open_token) {
                if (c === '<') {
                  resulting_string = this._input.next();
                  if (this._input.peek() === '/') {
                    resulting_string += this._input.next();
                  }
                  resulting_string += this.__patterns.element_name.read();
                  token = this._create_token(TOKEN.TAG_OPEN, resulting_string);
                }
              }
              return token;
            };
            Tokenizer.prototype._read_open_handlebars = function (c, open_token) {
              var resulting_string = null;
              var token = null;
              if (!open_token) {
                if (this._options.indent_handlebars && c === '{' && this._input.peek(1) === '{') {
                  if (this._input.peek(2) === '!') {
                    resulting_string = this.__patterns.handlebars_comment.read();
                    resulting_string = resulting_string || this.__patterns.handlebars.read();
                    token = this._create_token(TOKEN.COMMENT, resulting_string);
                  } else {
                    resulting_string = this.__patterns.handlebars_open.read();
                    token = this._create_token(TOKEN.TAG_OPEN, resulting_string);
                  }
                }
              }
              return token;
            };
            Tokenizer.prototype._read_close = function (c, open_token) {
              var resulting_string = null;
              var token = null;
              if (open_token) {
                if (open_token.text[0] === '<' && (c === '>' || c === '/' && this._input.peek(1) === '>')) {
                  resulting_string = this._input.next();
                  if (c === '/') {
                    resulting_string += this._input.next();
                  }
                  token = this._create_token(TOKEN.TAG_CLOSE, resulting_string);
                } else if (open_token.text[0] === '{' && c === '}' && this._input.peek(1) === '}') {
                  this._input.next();
                  this._input.next();
                  token = this._create_token(TOKEN.TAG_CLOSE, '}}');
                }
              }
              return token;
            };
            Tokenizer.prototype._read_attribute = function (c, previous_token, open_token) {
              var token = null;
              var resulting_string = '';
              if (open_token && open_token.text[0] === '<') {
                if (c === '=') {
                  token = this._create_token(TOKEN.EQUALS, this._input.next());
                } else if (c === '"' || c === '\'') {
                  var content = this._input.next();
                  if (c === '"') {
                    content += this.__patterns.double_quote.read();
                  } else {
                    content += this.__patterns.single_quote.read();
                  }
                  token = this._create_token(TOKEN.VALUE, content);
                } else {
                  resulting_string = this.__patterns.attribute.read();
                  if (resulting_string) {
                    if (previous_token.type === TOKEN.EQUALS) {
                      token = this._create_token(TOKEN.VALUE, resulting_string);
                    } else {
                      token = this._create_token(TOKEN.ATTRIBUTE, resulting_string);
                    }
                  }
                }
              }
              return token;
            };
            Tokenizer.prototype._is_content_unformatted = function (tag_name) {
              return this._options.void_elements.indexOf(tag_name) === -1 && (this._options.content_unformatted.indexOf(tag_name) !== -1 || this._options.unformatted.indexOf(tag_name) !== -1);
            };
            Tokenizer.prototype._read_raw_content = function (c, previous_token, open_token) {
              var resulting_string = '';
              if (open_token && open_token.text[0] === '{') {
                resulting_string = this.__patterns.handlebars_raw_close.read();
              } else if (previous_token.type === TOKEN.TAG_CLOSE && previous_token.opened.text[0] === '<' && previous_token.text[0] !== '/') {
                var tag_name = previous_token.opened.text.substr(1).toLowerCase();
                if (tag_name === 'script' || tag_name === 'style') {
                  var token = this._read_comment_or_cdata(c);
                  if (token) {
                    token.type = TOKEN.TEXT;
                    return token;
                  }
                  resulting_string = this._input.readUntil(new RegExp('</' + tag_name + '[\\n\\r\\t ]*?>', 'ig'));
                } else if (this._is_content_unformatted(tag_name)) {
                  resulting_string = this._input.readUntil(new RegExp('</' + tag_name + '[\\n\\r\\t ]*?>', 'ig'));
                }
              }
              if (resulting_string) {
                return this._create_token(TOKEN.TEXT, resulting_string);
              }
              return null;
            };
            Tokenizer.prototype._read_content_word = function (c) {
              var resulting_string = '';
              if (this._options.unformatted_content_delimiter) {
                if (c === this._options.unformatted_content_delimiter[0]) {
                  resulting_string = this.__patterns.unformatted_content_delimiter.read();
                }
              }
              if (!resulting_string) {
                resulting_string = this.__patterns.word.read();
              }
              if (resulting_string) {
                return this._create_token(TOKEN.TEXT, resulting_string);
              }
            };
            module.exports.Tokenizer = Tokenizer;
            module.exports.TOKEN = TOKEN;
          }
        ];
        var __webpack_module_cache__ = {};
        function __webpack_require__(moduleId) {
          var cachedModule = __webpack_module_cache__[moduleId];
          if (cachedModule !== undefined) {
            return cachedModule.exports;
          }
          var module = __webpack_module_cache__[moduleId] = { exports: {} };
          __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
          return module.exports;
        }
        var __webpack_exports__ = __webpack_require__(0);
        return __webpack_exports__;
      }();
    });

    function _toConsumableArray(arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
          arr2[i] = arr[i];
        }
        return arr2;
      } else {
        return Array.from(arr);
      }
    }
    var hasOwnProperty = Object.hasOwnProperty, setPrototypeOf = Object.setPrototypeOf, isFrozen = Object.isFrozen;
    var freeze = Object.freeze, seal = Object.seal, create = Object.create;
    var _ref = typeof Reflect !== 'undefined' && Reflect, apply = _ref.apply, construct = _ref.construct;
    if (!apply) {
      apply = function apply(fun, thisValue, args) {
        return fun.apply(thisValue, args);
      };
    }
    if (!freeze) {
      freeze = function freeze(x) {
        return x;
      };
    }
    if (!seal) {
      seal = function seal(x) {
        return x;
      };
    }
    if (!construct) {
      construct = function construct(Func, args) {
        return new (Function.prototype.bind.apply(Func, [null].concat(_toConsumableArray(args))))();
      };
    }
    var arrayForEach = unapply(Array.prototype.forEach);
    var arrayPop = unapply(Array.prototype.pop);
    var arrayPush = unapply(Array.prototype.push);
    var stringToLowerCase = unapply(String.prototype.toLowerCase);
    var stringMatch = unapply(String.prototype.match);
    var stringReplace = unapply(String.prototype.replace);
    var stringIndexOf = unapply(String.prototype.indexOf);
    var stringTrim = unapply(String.prototype.trim);
    var regExpTest = unapply(RegExp.prototype.test);
    var typeErrorCreate = unconstruct(TypeError);
    function unapply(func) {
      return function (thisArg) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        return apply(func, thisArg, args);
      };
    }
    function unconstruct(func) {
      return function () {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }
        return construct(func, args);
      };
    }
    function addToSet(set, array) {
      if (setPrototypeOf) {
        setPrototypeOf(set, null);
      }
      var l = array.length;
      while (l--) {
        var element = array[l];
        if (typeof element === 'string') {
          var lcElement = stringToLowerCase(element);
          if (lcElement !== element) {
            if (!isFrozen(array)) {
              array[l] = lcElement;
            }
            element = lcElement;
          }
        }
        set[element] = true;
      }
      return set;
    }
    function clone(object) {
      var newObject = create(null);
      var property = void 0;
      for (property in object) {
        if (apply(hasOwnProperty, object, [property])) {
          newObject[property] = object[property];
        }
      }
      return newObject;
    }
    var html = freeze([
      'a',
      'abbr',
      'acronym',
      'address',
      'area',
      'article',
      'aside',
      'audio',
      'b',
      'bdi',
      'bdo',
      'big',
      'blink',
      'blockquote',
      'body',
      'br',
      'button',
      'canvas',
      'caption',
      'center',
      'cite',
      'code',
      'col',
      'colgroup',
      'content',
      'data',
      'datalist',
      'dd',
      'decorator',
      'del',
      'details',
      'dfn',
      'dialog',
      'dir',
      'div',
      'dl',
      'dt',
      'element',
      'em',
      'fieldset',
      'figcaption',
      'figure',
      'font',
      'footer',
      'form',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'head',
      'header',
      'hgroup',
      'hr',
      'html',
      'i',
      'img',
      'input',
      'ins',
      'kbd',
      'label',
      'legend',
      'li',
      'main',
      'map',
      'mark',
      'marquee',
      'menu',
      'menuitem',
      'meter',
      'nav',
      'nobr',
      'ol',
      'optgroup',
      'option',
      'output',
      'p',
      'picture',
      'pre',
      'progress',
      'q',
      'rp',
      'rt',
      'ruby',
      's',
      'samp',
      'section',
      'select',
      'shadow',
      'small',
      'source',
      'spacer',
      'span',
      'strike',
      'strong',
      'style',
      'sub',
      'summary',
      'sup',
      'table',
      'tbody',
      'td',
      'template',
      'textarea',
      'tfoot',
      'th',
      'thead',
      'time',
      'tr',
      'track',
      'tt',
      'u',
      'ul',
      'var',
      'video',
      'wbr'
    ]);
    var svg = freeze([
      'svg',
      'a',
      'altglyph',
      'altglyphdef',
      'altglyphitem',
      'animatecolor',
      'animatemotion',
      'animatetransform',
      'audio',
      'canvas',
      'circle',
      'clippath',
      'defs',
      'desc',
      'ellipse',
      'filter',
      'font',
      'g',
      'glyph',
      'glyphref',
      'hkern',
      'image',
      'line',
      'lineargradient',
      'marker',
      'mask',
      'metadata',
      'mpath',
      'path',
      'pattern',
      'polygon',
      'polyline',
      'radialgradient',
      'rect',
      'stop',
      'style',
      'switch',
      'symbol',
      'text',
      'textpath',
      'title',
      'tref',
      'tspan',
      'video',
      'view',
      'vkern'
    ]);
    var svgFilters = freeze([
      'feBlend',
      'feColorMatrix',
      'feComponentTransfer',
      'feComposite',
      'feConvolveMatrix',
      'feDiffuseLighting',
      'feDisplacementMap',
      'feDistantLight',
      'feFlood',
      'feFuncA',
      'feFuncB',
      'feFuncG',
      'feFuncR',
      'feGaussianBlur',
      'feMerge',
      'feMergeNode',
      'feMorphology',
      'feOffset',
      'fePointLight',
      'feSpecularLighting',
      'feSpotLight',
      'feTile',
      'feTurbulence'
    ]);
    var mathMl = freeze([
      'math',
      'menclose',
      'merror',
      'mfenced',
      'mfrac',
      'mglyph',
      'mi',
      'mlabeledtr',
      'mmultiscripts',
      'mn',
      'mo',
      'mover',
      'mpadded',
      'mphantom',
      'mroot',
      'mrow',
      'ms',
      'mspace',
      'msqrt',
      'mstyle',
      'msub',
      'msup',
      'msubsup',
      'mtable',
      'mtd',
      'mtext',
      'mtr',
      'munder',
      'munderover'
    ]);
    var text = freeze(['#text']);
    var html$1 = freeze([
      'accept',
      'action',
      'align',
      'alt',
      'autocapitalize',
      'autocomplete',
      'autopictureinpicture',
      'autoplay',
      'background',
      'bgcolor',
      'border',
      'capture',
      'cellpadding',
      'cellspacing',
      'checked',
      'cite',
      'class',
      'clear',
      'color',
      'cols',
      'colspan',
      'controls',
      'controlslist',
      'coords',
      'crossorigin',
      'datetime',
      'decoding',
      'default',
      'dir',
      'disabled',
      'disablepictureinpicture',
      'disableremoteplayback',
      'download',
      'draggable',
      'enctype',
      'enterkeyhint',
      'face',
      'for',
      'headers',
      'height',
      'hidden',
      'high',
      'href',
      'hreflang',
      'id',
      'inputmode',
      'integrity',
      'ismap',
      'kind',
      'label',
      'lang',
      'list',
      'loading',
      'loop',
      'low',
      'max',
      'maxlength',
      'media',
      'method',
      'min',
      'minlength',
      'multiple',
      'muted',
      'name',
      'noshade',
      'novalidate',
      'nowrap',
      'open',
      'optimum',
      'pattern',
      'placeholder',
      'playsinline',
      'poster',
      'preload',
      'pubdate',
      'radiogroup',
      'readonly',
      'rel',
      'required',
      'rev',
      'reversed',
      'role',
      'rows',
      'rowspan',
      'spellcheck',
      'scope',
      'selected',
      'shape',
      'size',
      'sizes',
      'span',
      'srclang',
      'start',
      'src',
      'srcset',
      'step',
      'style',
      'summary',
      'tabindex',
      'title',
      'translate',
      'type',
      'usemap',
      'valign',
      'value',
      'width',
      'xmlns'
    ]);
    var svg$1 = freeze([
      'accent-height',
      'accumulate',
      'additive',
      'alignment-baseline',
      'ascent',
      'attributename',
      'attributetype',
      'azimuth',
      'basefrequency',
      'baseline-shift',
      'begin',
      'bias',
      'by',
      'class',
      'clip',
      'clippathunits',
      'clip-path',
      'clip-rule',
      'color',
      'color-interpolation',
      'color-interpolation-filters',
      'color-profile',
      'color-rendering',
      'cx',
      'cy',
      'd',
      'dx',
      'dy',
      'diffuseconstant',
      'direction',
      'display',
      'divisor',
      'dur',
      'edgemode',
      'elevation',
      'end',
      'fill',
      'fill-opacity',
      'fill-rule',
      'filter',
      'filterunits',
      'flood-color',
      'flood-opacity',
      'font-family',
      'font-size',
      'font-size-adjust',
      'font-stretch',
      'font-style',
      'font-variant',
      'font-weight',
      'fx',
      'fy',
      'g1',
      'g2',
      'glyph-name',
      'glyphref',
      'gradientunits',
      'gradienttransform',
      'height',
      'href',
      'id',
      'image-rendering',
      'in',
      'in2',
      'k',
      'k1',
      'k2',
      'k3',
      'k4',
      'kerning',
      'keypoints',
      'keysplines',
      'keytimes',
      'lang',
      'lengthadjust',
      'letter-spacing',
      'kernelmatrix',
      'kernelunitlength',
      'lighting-color',
      'local',
      'marker-end',
      'marker-mid',
      'marker-start',
      'markerheight',
      'markerunits',
      'markerwidth',
      'maskcontentunits',
      'maskunits',
      'max',
      'mask',
      'media',
      'method',
      'mode',
      'min',
      'name',
      'numoctaves',
      'offset',
      'operator',
      'opacity',
      'order',
      'orient',
      'orientation',
      'origin',
      'overflow',
      'paint-order',
      'path',
      'pathlength',
      'patterncontentunits',
      'patterntransform',
      'patternunits',
      'points',
      'preservealpha',
      'preserveaspectratio',
      'primitiveunits',
      'r',
      'rx',
      'ry',
      'radius',
      'refx',
      'refy',
      'repeatcount',
      'repeatdur',
      'restart',
      'result',
      'rotate',
      'scale',
      'seed',
      'shape-rendering',
      'specularconstant',
      'specularexponent',
      'spreadmethod',
      'startoffset',
      'stddeviation',
      'stitchtiles',
      'stop-color',
      'stop-opacity',
      'stroke-dasharray',
      'stroke-dashoffset',
      'stroke-linecap',
      'stroke-linejoin',
      'stroke-miterlimit',
      'stroke-opacity',
      'stroke',
      'stroke-width',
      'style',
      'surfacescale',
      'systemlanguage',
      'tabindex',
      'targetx',
      'targety',
      'transform',
      'text-anchor',
      'text-decoration',
      'text-rendering',
      'textlength',
      'type',
      'u1',
      'u2',
      'unicode',
      'values',
      'viewbox',
      'visibility',
      'version',
      'vert-adv-y',
      'vert-origin-x',
      'vert-origin-y',
      'width',
      'word-spacing',
      'wrap',
      'writing-mode',
      'xchannelselector',
      'ychannelselector',
      'x',
      'x1',
      'x2',
      'xmlns',
      'y',
      'y1',
      'y2',
      'z',
      'zoomandpan'
    ]);
    var mathMl$1 = freeze([
      'accent',
      'accentunder',
      'align',
      'bevelled',
      'close',
      'columnsalign',
      'columnlines',
      'columnspan',
      'denomalign',
      'depth',
      'dir',
      'display',
      'displaystyle',
      'encoding',
      'fence',
      'frame',
      'height',
      'href',
      'id',
      'largeop',
      'length',
      'linethickness',
      'lspace',
      'lquote',
      'mathbackground',
      'mathcolor',
      'mathsize',
      'mathvariant',
      'maxsize',
      'minsize',
      'movablelimits',
      'notation',
      'numalign',
      'open',
      'rowalign',
      'rowlines',
      'rowspacing',
      'rowspan',
      'rspace',
      'rquote',
      'scriptlevel',
      'scriptminsize',
      'scriptsizemultiplier',
      'selection',
      'separator',
      'separators',
      'stretchy',
      'subscriptshift',
      'supscriptshift',
      'symmetric',
      'voffset',
      'width',
      'xmlns'
    ]);
    var xml = freeze([
      'xlink:href',
      'xml:id',
      'xlink:title',
      'xml:space',
      'xmlns:xlink'
    ]);
    var MUSTACHE_EXPR = seal(/\{\{[\s\S]*|[\s\S]*\}\}/gm);
    var ERB_EXPR = seal(/<%[\s\S]*|[\s\S]*%>/gm);
    var DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]/);
    var ARIA_ATTR = seal(/^aria-[\-\w]+$/);
    var IS_ALLOWED_URI = seal(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i);
    var IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
    var ATTR_WHITESPACE = seal(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g);
    var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
    };
    function _toConsumableArray$1(arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
          arr2[i] = arr[i];
        }
        return arr2;
      } else {
        return Array.from(arr);
      }
    }
    var getGlobal = function getGlobal() {
      return typeof window === 'undefined' ? null : window;
    };
    var _createTrustedTypesPolicy = function _createTrustedTypesPolicy(trustedTypes, document) {
      if ((typeof trustedTypes === 'undefined' ? 'undefined' : _typeof(trustedTypes)) !== 'object' || typeof trustedTypes.createPolicy !== 'function') {
        return null;
      }
      var suffix = null;
      var ATTR_NAME = 'data-tt-policy-suffix';
      if (document.currentScript && document.currentScript.hasAttribute(ATTR_NAME)) {
        suffix = document.currentScript.getAttribute(ATTR_NAME);
      }
      var policyName = 'dompurify' + (suffix ? '#' + suffix : '');
      try {
        return trustedTypes.createPolicy(policyName, {
          createHTML: function createHTML(html$$1) {
            return html$$1;
          }
        });
      } catch (_) {
        console.warn('TrustedTypes policy ' + policyName + ' could not be created.');
        return null;
      }
    };
    function createDOMPurify() {
      var window = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getGlobal();
      var DOMPurify = function DOMPurify(root) {
        return createDOMPurify(root);
      };
      DOMPurify.version = '2.2.2';
      DOMPurify.removed = [];
      if (!window || !window.document || window.document.nodeType !== 9) {
        DOMPurify.isSupported = false;
        return DOMPurify;
      }
      var originalDocument = window.document;
      var document = window.document;
      var DocumentFragment = window.DocumentFragment, HTMLTemplateElement = window.HTMLTemplateElement, Node = window.Node, NodeFilter = window.NodeFilter, _window$NamedNodeMap = window.NamedNodeMap, NamedNodeMap = _window$NamedNodeMap === undefined ? window.NamedNodeMap || window.MozNamedAttrMap : _window$NamedNodeMap, Text = window.Text, Comment = window.Comment, DOMParser = window.DOMParser, trustedTypes = window.trustedTypes;
      if (typeof HTMLTemplateElement === 'function') {
        var template = document.createElement('template');
        if (template.content && template.content.ownerDocument) {
          document = template.content.ownerDocument;
        }
      }
      var trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, originalDocument);
      var emptyHTML = trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML('') : '';
      var _document = document, implementation = _document.implementation, createNodeIterator = _document.createNodeIterator, getElementsByTagName = _document.getElementsByTagName, createDocumentFragment = _document.createDocumentFragment;
      var importNode = originalDocument.importNode;
      var documentMode = {};
      try {
        documentMode = clone(document).documentMode ? document.documentMode : {};
      } catch (_) {
      }
      var hooks = {};
      DOMPurify.isSupported = implementation && typeof implementation.createHTMLDocument !== 'undefined' && documentMode !== 9;
      var MUSTACHE_EXPR$$1 = MUSTACHE_EXPR, ERB_EXPR$$1 = ERB_EXPR, DATA_ATTR$$1 = DATA_ATTR, ARIA_ATTR$$1 = ARIA_ATTR, IS_SCRIPT_OR_DATA$$1 = IS_SCRIPT_OR_DATA, ATTR_WHITESPACE$$1 = ATTR_WHITESPACE;
      var IS_ALLOWED_URI$$1 = IS_ALLOWED_URI;
      var ALLOWED_TAGS = null;
      var DEFAULT_ALLOWED_TAGS = addToSet({}, [].concat(_toConsumableArray$1(html), _toConsumableArray$1(svg), _toConsumableArray$1(svgFilters), _toConsumableArray$1(mathMl), _toConsumableArray$1(text)));
      var ALLOWED_ATTR = null;
      var DEFAULT_ALLOWED_ATTR = addToSet({}, [].concat(_toConsumableArray$1(html$1), _toConsumableArray$1(svg$1), _toConsumableArray$1(mathMl$1), _toConsumableArray$1(xml)));
      var FORBID_TAGS = null;
      var FORBID_ATTR = null;
      var ALLOW_ARIA_ATTR = true;
      var ALLOW_DATA_ATTR = true;
      var ALLOW_UNKNOWN_PROTOCOLS = false;
      var SAFE_FOR_TEMPLATES = false;
      var WHOLE_DOCUMENT = false;
      var SET_CONFIG = false;
      var FORCE_BODY = false;
      var RETURN_DOM = false;
      var RETURN_DOM_FRAGMENT = false;
      var RETURN_DOM_IMPORT = true;
      var RETURN_TRUSTED_TYPE = false;
      var SANITIZE_DOM = true;
      var KEEP_CONTENT = true;
      var IN_PLACE = false;
      var USE_PROFILES = {};
      var FORBID_CONTENTS = addToSet({}, [
        'annotation-xml',
        'audio',
        'colgroup',
        'desc',
        'foreignobject',
        'head',
        'iframe',
        'math',
        'mi',
        'mn',
        'mo',
        'ms',
        'mtext',
        'noembed',
        'noframes',
        'plaintext',
        'script',
        'style',
        'svg',
        'template',
        'thead',
        'title',
        'video',
        'xmp'
      ]);
      var DATA_URI_TAGS = null;
      var DEFAULT_DATA_URI_TAGS = addToSet({}, [
        'audio',
        'video',
        'img',
        'source',
        'image',
        'track'
      ]);
      var URI_SAFE_ATTRIBUTES = null;
      var DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, [
        'alt',
        'class',
        'for',
        'id',
        'label',
        'name',
        'pattern',
        'placeholder',
        'summary',
        'title',
        'value',
        'style',
        'xmlns'
      ]);
      var CONFIG = null;
      var formElement = document.createElement('form');
      var _parseConfig = function _parseConfig(cfg) {
        if (CONFIG && CONFIG === cfg) {
          return;
        }
        if (!cfg || (typeof cfg === 'undefined' ? 'undefined' : _typeof(cfg)) !== 'object') {
          cfg = {};
        }
        cfg = clone(cfg);
        ALLOWED_TAGS = 'ALLOWED_TAGS' in cfg ? addToSet({}, cfg.ALLOWED_TAGS) : DEFAULT_ALLOWED_TAGS;
        ALLOWED_ATTR = 'ALLOWED_ATTR' in cfg ? addToSet({}, cfg.ALLOWED_ATTR) : DEFAULT_ALLOWED_ATTR;
        URI_SAFE_ATTRIBUTES = 'ADD_URI_SAFE_ATTR' in cfg ? addToSet(clone(DEFAULT_URI_SAFE_ATTRIBUTES), cfg.ADD_URI_SAFE_ATTR) : DEFAULT_URI_SAFE_ATTRIBUTES;
        DATA_URI_TAGS = 'ADD_DATA_URI_TAGS' in cfg ? addToSet(clone(DEFAULT_DATA_URI_TAGS), cfg.ADD_DATA_URI_TAGS) : DEFAULT_DATA_URI_TAGS;
        FORBID_TAGS = 'FORBID_TAGS' in cfg ? addToSet({}, cfg.FORBID_TAGS) : {};
        FORBID_ATTR = 'FORBID_ATTR' in cfg ? addToSet({}, cfg.FORBID_ATTR) : {};
        USE_PROFILES = 'USE_PROFILES' in cfg ? cfg.USE_PROFILES : false;
        ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false;
        ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false;
        ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false;
        SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false;
        WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false;
        RETURN_DOM = cfg.RETURN_DOM || false;
        RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false;
        RETURN_DOM_IMPORT = cfg.RETURN_DOM_IMPORT !== false;
        RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false;
        FORCE_BODY = cfg.FORCE_BODY || false;
        SANITIZE_DOM = cfg.SANITIZE_DOM !== false;
        KEEP_CONTENT = cfg.KEEP_CONTENT !== false;
        IN_PLACE = cfg.IN_PLACE || false;
        IS_ALLOWED_URI$$1 = cfg.ALLOWED_URI_REGEXP || IS_ALLOWED_URI$$1;
        if (SAFE_FOR_TEMPLATES) {
          ALLOW_DATA_ATTR = false;
        }
        if (RETURN_DOM_FRAGMENT) {
          RETURN_DOM = true;
        }
        if (USE_PROFILES) {
          ALLOWED_TAGS = addToSet({}, [].concat(_toConsumableArray$1(text)));
          ALLOWED_ATTR = [];
          if (USE_PROFILES.html === true) {
            addToSet(ALLOWED_TAGS, html);
            addToSet(ALLOWED_ATTR, html$1);
          }
          if (USE_PROFILES.svg === true) {
            addToSet(ALLOWED_TAGS, svg);
            addToSet(ALLOWED_ATTR, svg$1);
            addToSet(ALLOWED_ATTR, xml);
          }
          if (USE_PROFILES.svgFilters === true) {
            addToSet(ALLOWED_TAGS, svgFilters);
            addToSet(ALLOWED_ATTR, svg$1);
            addToSet(ALLOWED_ATTR, xml);
          }
          if (USE_PROFILES.mathMl === true) {
            addToSet(ALLOWED_TAGS, mathMl);
            addToSet(ALLOWED_ATTR, mathMl$1);
            addToSet(ALLOWED_ATTR, xml);
          }
        }
        if (cfg.ADD_TAGS) {
          if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
            ALLOWED_TAGS = clone(ALLOWED_TAGS);
          }
          addToSet(ALLOWED_TAGS, cfg.ADD_TAGS);
        }
        if (cfg.ADD_ATTR) {
          if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
            ALLOWED_ATTR = clone(ALLOWED_ATTR);
          }
          addToSet(ALLOWED_ATTR, cfg.ADD_ATTR);
        }
        if (cfg.ADD_URI_SAFE_ATTR) {
          addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR);
        }
        if (KEEP_CONTENT) {
          ALLOWED_TAGS['#text'] = true;
        }
        if (WHOLE_DOCUMENT) {
          addToSet(ALLOWED_TAGS, [
            'html',
            'head',
            'body'
          ]);
        }
        if (ALLOWED_TAGS.table) {
          addToSet(ALLOWED_TAGS, ['tbody']);
          delete FORBID_TAGS.tbody;
        }
        if (freeze) {
          freeze(cfg);
        }
        CONFIG = cfg;
      };
      var _forceRemove = function _forceRemove(node) {
        arrayPush(DOMPurify.removed, { element: node });
        try {
          node.parentNode.removeChild(node);
        } catch (_) {
          node.outerHTML = emptyHTML;
        }
      };
      var _removeAttribute = function _removeAttribute(name, node) {
        try {
          arrayPush(DOMPurify.removed, {
            attribute: node.getAttributeNode(name),
            from: node
          });
        } catch (_) {
          arrayPush(DOMPurify.removed, {
            attribute: null,
            from: node
          });
        }
        node.removeAttribute(name);
      };
      var _initDocument = function _initDocument(dirty) {
        var doc = void 0;
        var leadingWhitespace = void 0;
        if (FORCE_BODY) {
          dirty = '<remove></remove>' + dirty;
        } else {
          var matches = stringMatch(dirty, /^[\r\n\t ]+/);
          leadingWhitespace = matches && matches[0];
        }
        var dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
        try {
          doc = new DOMParser().parseFromString(dirtyPayload, 'text/html');
        } catch (_) {
        }
        if (!doc || !doc.documentElement) {
          doc = implementation.createHTMLDocument('');
          var _doc = doc, body = _doc.body;
          body.parentNode.removeChild(body.parentNode.firstElementChild);
          body.outerHTML = dirtyPayload;
        }
        if (dirty && leadingWhitespace) {
          doc.body.insertBefore(document.createTextNode(leadingWhitespace), doc.body.childNodes[0] || null);
        }
        return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? 'html' : 'body')[0];
      };
      var _createIterator = function _createIterator(root) {
        return createNodeIterator.call(root.ownerDocument || root, root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT, function () {
          return NodeFilter.FILTER_ACCEPT;
        }, false);
      };
      var _isClobbered = function _isClobbered(elm) {
        if (elm instanceof Text || elm instanceof Comment) {
          return false;
        }
        if (typeof elm.nodeName !== 'string' || typeof elm.textContent !== 'string' || typeof elm.removeChild !== 'function' || !(elm.attributes instanceof NamedNodeMap) || typeof elm.removeAttribute !== 'function' || typeof elm.setAttribute !== 'function' || typeof elm.namespaceURI !== 'string') {
          return true;
        }
        return false;
      };
      var _isNode = function _isNode(object) {
        return (typeof Node === 'undefined' ? 'undefined' : _typeof(Node)) === 'object' ? object instanceof Node : object && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string';
      };
      var _executeHook = function _executeHook(entryPoint, currentNode, data) {
        if (!hooks[entryPoint]) {
          return;
        }
        arrayForEach(hooks[entryPoint], function (hook) {
          hook.call(DOMPurify, currentNode, data, CONFIG);
        });
      };
      var _sanitizeElements = function _sanitizeElements(currentNode) {
        var content = void 0;
        _executeHook('beforeSanitizeElements', currentNode, null);
        if (_isClobbered(currentNode)) {
          _forceRemove(currentNode);
          return true;
        }
        if (stringMatch(currentNode.nodeName, /[\u0080-\uFFFF]/)) {
          _forceRemove(currentNode);
          return true;
        }
        var tagName = stringToLowerCase(currentNode.nodeName);
        _executeHook('uponSanitizeElement', currentNode, {
          tagName: tagName,
          allowedTags: ALLOWED_TAGS
        });
        if ((tagName === 'svg' || tagName === 'math') && currentNode.querySelectorAll('p, br, form, table').length !== 0) {
          _forceRemove(currentNode);
          return true;
        }
        if (!_isNode(currentNode.firstElementChild) && (!_isNode(currentNode.content) || !_isNode(currentNode.content.firstElementChild)) && regExpTest(/<[!/\w]/g, currentNode.innerHTML) && regExpTest(/<[!/\w]/g, currentNode.textContent)) {
          _forceRemove(currentNode);
          return true;
        }
        if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
          if (KEEP_CONTENT && !FORBID_CONTENTS[tagName] && typeof currentNode.insertAdjacentHTML === 'function') {
            try {
              var htmlToInsert = currentNode.innerHTML;
              currentNode.insertAdjacentHTML('AfterEnd', trustedTypesPolicy ? trustedTypesPolicy.createHTML(htmlToInsert) : htmlToInsert);
            } catch (_) {
            }
          }
          _forceRemove(currentNode);
          return true;
        }
        if ((tagName === 'noscript' || tagName === 'noembed') && regExpTest(/<\/no(script|embed)/i, currentNode.innerHTML)) {
          _forceRemove(currentNode);
          return true;
        }
        if (SAFE_FOR_TEMPLATES && currentNode.nodeType === 3) {
          content = currentNode.textContent;
          content = stringReplace(content, MUSTACHE_EXPR$$1, ' ');
          content = stringReplace(content, ERB_EXPR$$1, ' ');
          if (currentNode.textContent !== content) {
            arrayPush(DOMPurify.removed, { element: currentNode.cloneNode() });
            currentNode.textContent = content;
          }
        }
        _executeHook('afterSanitizeElements', currentNode, null);
        return false;
      };
      var _isValidAttribute = function _isValidAttribute(lcTag, lcName, value) {
        if (SANITIZE_DOM && (lcName === 'id' || lcName === 'name') && (value in document || value in formElement)) {
          return false;
        }
        if (ALLOW_DATA_ATTR && regExpTest(DATA_ATTR$$1, lcName));
        else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR$$1, lcName));
        else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
          return false;
        } else if (URI_SAFE_ATTRIBUTES[lcName]);
        else if (regExpTest(IS_ALLOWED_URI$$1, stringReplace(value, ATTR_WHITESPACE$$1, '')));
        else if ((lcName === 'src' || lcName === 'xlink:href' || lcName === 'href') && lcTag !== 'script' && stringIndexOf(value, 'data:') === 0 && DATA_URI_TAGS[lcTag]);
        else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA$$1, stringReplace(value, ATTR_WHITESPACE$$1, '')));
        else if (!value);
        else {
          return false;
        }
        return true;
      };
      var _sanitizeAttributes = function _sanitizeAttributes(currentNode) {
        var attr = void 0;
        var value = void 0;
        var lcName = void 0;
        var l = void 0;
        _executeHook('beforeSanitizeAttributes', currentNode, null);
        var attributes = currentNode.attributes;
        if (!attributes) {
          return;
        }
        var hookEvent = {
          attrName: '',
          attrValue: '',
          keepAttr: true,
          allowedAttributes: ALLOWED_ATTR
        };
        l = attributes.length;
        while (l--) {
          attr = attributes[l];
          var _attr = attr, name = _attr.name, namespaceURI = _attr.namespaceURI;
          value = stringTrim(attr.value);
          lcName = stringToLowerCase(name);
          hookEvent.attrName = lcName;
          hookEvent.attrValue = value;
          hookEvent.keepAttr = true;
          hookEvent.forceKeepAttr = undefined;
          _executeHook('uponSanitizeAttribute', currentNode, hookEvent);
          value = hookEvent.attrValue;
          if (hookEvent.forceKeepAttr) {
            continue;
          }
          _removeAttribute(name, currentNode);
          if (!hookEvent.keepAttr) {
            continue;
          }
          if (regExpTest(/\/>/i, value)) {
            _removeAttribute(name, currentNode);
            continue;
          }
          if (SAFE_FOR_TEMPLATES) {
            value = stringReplace(value, MUSTACHE_EXPR$$1, ' ');
            value = stringReplace(value, ERB_EXPR$$1, ' ');
          }
          var lcTag = currentNode.nodeName.toLowerCase();
          if (!_isValidAttribute(lcTag, lcName, value)) {
            continue;
          }
          try {
            if (namespaceURI) {
              currentNode.setAttributeNS(namespaceURI, name, value);
            } else {
              currentNode.setAttribute(name, value);
            }
            arrayPop(DOMPurify.removed);
          } catch (_) {
          }
        }
        _executeHook('afterSanitizeAttributes', currentNode, null);
      };
      var _sanitizeShadowDOM = function _sanitizeShadowDOM(fragment) {
        var shadowNode = void 0;
        var shadowIterator = _createIterator(fragment);
        _executeHook('beforeSanitizeShadowDOM', fragment, null);
        while (shadowNode = shadowIterator.nextNode()) {
          _executeHook('uponSanitizeShadowNode', shadowNode, null);
          if (_sanitizeElements(shadowNode)) {
            continue;
          }
          if (shadowNode.content instanceof DocumentFragment) {
            _sanitizeShadowDOM(shadowNode.content);
          }
          _sanitizeAttributes(shadowNode);
        }
        _executeHook('afterSanitizeShadowDOM', fragment, null);
      };
      DOMPurify.sanitize = function (dirty, cfg) {
        var body = void 0;
        var importedNode = void 0;
        var currentNode = void 0;
        var oldNode = void 0;
        var returnNode = void 0;
        if (!dirty) {
          dirty = '<!-->';
        }
        if (typeof dirty !== 'string' && !_isNode(dirty)) {
          if (typeof dirty.toString !== 'function') {
            throw typeErrorCreate('toString is not a function');
          } else {
            dirty = dirty.toString();
            if (typeof dirty !== 'string') {
              throw typeErrorCreate('dirty is not a string, aborting');
            }
          }
        }
        if (!DOMPurify.isSupported) {
          if (_typeof(window.toStaticHTML) === 'object' || typeof window.toStaticHTML === 'function') {
            if (typeof dirty === 'string') {
              return window.toStaticHTML(dirty);
            }
            if (_isNode(dirty)) {
              return window.toStaticHTML(dirty.outerHTML);
            }
          }
          return dirty;
        }
        if (!SET_CONFIG) {
          _parseConfig(cfg);
        }
        DOMPurify.removed = [];
        if (typeof dirty === 'string') {
          IN_PLACE = false;
        }
        if (IN_PLACE);
        else if (dirty instanceof Node) {
          body = _initDocument('<!---->');
          importedNode = body.ownerDocument.importNode(dirty, true);
          if (importedNode.nodeType === 1 && importedNode.nodeName === 'BODY') {
            body = importedNode;
          } else if (importedNode.nodeName === 'HTML') {
            body = importedNode;
          } else {
            body.appendChild(importedNode);
          }
        } else {
          if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT && dirty.indexOf('<') === -1) {
            return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty;
          }
          body = _initDocument(dirty);
          if (!body) {
            return RETURN_DOM ? null : emptyHTML;
          }
        }
        if (body && FORCE_BODY) {
          _forceRemove(body.firstChild);
        }
        var nodeIterator = _createIterator(IN_PLACE ? dirty : body);
        while (currentNode = nodeIterator.nextNode()) {
          if (currentNode.nodeType === 3 && currentNode === oldNode) {
            continue;
          }
          if (_sanitizeElements(currentNode)) {
            continue;
          }
          if (currentNode.content instanceof DocumentFragment) {
            _sanitizeShadowDOM(currentNode.content);
          }
          _sanitizeAttributes(currentNode);
          oldNode = currentNode;
        }
        oldNode = null;
        if (IN_PLACE) {
          return dirty;
        }
        if (RETURN_DOM) {
          if (RETURN_DOM_FRAGMENT) {
            returnNode = createDocumentFragment.call(body.ownerDocument);
            while (body.firstChild) {
              returnNode.appendChild(body.firstChild);
            }
          } else {
            returnNode = body;
          }
          if (RETURN_DOM_IMPORT) {
            returnNode = importNode.call(originalDocument, returnNode, true);
          }
          return returnNode;
        }
        var serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
        if (SAFE_FOR_TEMPLATES) {
          serializedHTML = stringReplace(serializedHTML, MUSTACHE_EXPR$$1, ' ');
          serializedHTML = stringReplace(serializedHTML, ERB_EXPR$$1, ' ');
        }
        return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
      };
      DOMPurify.setConfig = function (cfg) {
        _parseConfig(cfg);
        SET_CONFIG = true;
      };
      DOMPurify.clearConfig = function () {
        CONFIG = null;
        SET_CONFIG = false;
      };
      DOMPurify.isValidAttribute = function (tag, attr, value) {
        if (!CONFIG) {
          _parseConfig({});
        }
        var lcTag = stringToLowerCase(tag);
        var lcName = stringToLowerCase(attr);
        return _isValidAttribute(lcTag, lcName, value);
      };
      DOMPurify.addHook = function (entryPoint, hookFunction) {
        if (typeof hookFunction !== 'function') {
          return;
        }
        hooks[entryPoint] = hooks[entryPoint] || [];
        arrayPush(hooks[entryPoint], hookFunction);
      };
      DOMPurify.removeHook = function (entryPoint) {
        if (hooks[entryPoint]) {
          arrayPop(hooks[entryPoint]);
        }
      };
      DOMPurify.removeHooks = function (entryPoint) {
        if (hooks[entryPoint]) {
          hooks[entryPoint] = [];
        }
      };
      DOMPurify.removeAllHooks = function () {
        hooks = {};
      };
      return DOMPurify;
    }
    var purify = createDOMPurify();

    function Plugin$i () {
      global$1.add('cherry-code', function plugin(editor) {
        var addAttr = [
          'contenteditable',
          'fileid',
          'filetype',
          'filetitle',
          'fileurl',
          'cm-eventflag'
        ];
        var setContent = function (editor, html) {
          html = DOMPurify.sanitize(html, {
            ALLOW_UNKNOWN_PROTOCOLS: true,
            ADD_ATTR: addAttr
          });
          editor.undoManager.transact(function () {
            editor.setContent(html);
          });
          editor.nodeChanged();
        };
        var getContent = function (editor) {
          return formatHTML(editor.getContent({ source_view: true }));
        };
        var formatHTML = function (html) {
          html = html.replace(/<!--[^>\n]*?-->/g, '');
          html = DOMPurify.sanitize(html, {
            ALLOW_UNKNOWN_PROTOCOLS: true,
            ADD_ATTR: addAttr
          });
          html = jsBeautify.html(html, {
            preserve_newlines: true,
            indent_inner_html: true
          });
          var nNumbers = html.match(/\n/g) ? html.match(/\n/g).length : 0;
          if (nNumbers < 30) {
            for (var i = nNumbers; i < 30; i++) {
              html += '\n';
            }
          }
          return html;
        };
        var open = function (editor) {
          var editorContent = getContent(editor);
          var container = editor.getContainer();
          var toxPopup = document.querySelector('.tox-tinymce-aux');
          var codeToolBar = document.createElement('div');
          codeToolBar.className = 'cherry-code-toolbar tox-toolbar__primary';
          var codeBackBtn = document.createElement('a');
          codeBackBtn.className = 'j-cherry-code-back cherry-code-back';
          codeBackBtn.innerHTML = '<< \u8fd4\u56de';
          codeToolBar.appendChild(codeBackBtn);
          var codeContainer = document.createElement('div');
          codeContainer.className = 'cherry-code-model j-cherry-code-model';
          var codemirrorContainer = document.createElement('div');
          codemirrorContainer.className = 'cherry-codemirror-container';
          var codeText = document.createElement('textarea');
          codeText.value = editorContent;
          codeText.className = 'cherry-codemirror j-cherry-codemirror';
          codemirrorContainer.appendChild(codeText);
          codeContainer.appendChild(codeToolBar);
          codeContainer.appendChild(codemirrorContainer);
          container.appendChild(codeContainer);
          container.className = container.className.replace(/tox /, 'cherry-code-model ');
          if (toxPopup) {
            toxPopup.style.display = 'none';
          }
          var codeEditor = CodeMirror.fromTextArea(codeText, {
            lineNumbers: true,
            indentUnit: 4,
            styleActiveLine: true,
            matchBrackets: true,
            mode: 'htmlmixed',
            lineWrapping: true,
            autoFocus: true,
            theme: 'default',
            foldGutter: true,
            cursorHeight: 0.85,
            height: '200px',
            gutters: [
              'CodeMirror-linenumbers',
              'CodeMirror-foldgutter'
            ]
          });
          codeEditor.on('change', function (codemirror, evt) {
            var newHtml = codeEditor.getValue();
            setContent(editor, newHtml);
          });
          codeBackBtn.addEventListener('click', function () {
            var newHtml = codeEditor.getValue();
            setContent(editor, newHtml);
            container.className = container.className.replace(/cherry-code-model /, 'tox ');
            var toxPopup = document.querySelector('.tox-tinymce-aux');
            if (toxPopup) {
              toxPopup.style.display = 'block';
            }
            codeContainer.remove();
          }, false);
        };
        editor.addCommand('mceCodeEditor', function () {
          open(editor);
        });
        editor.ui.registry.addButton('ch-code', {
          icon: 'sourcecode',
          tooltip: 'Source code',
          onAction: function () {
            return open(editor);
          }
        });
        editor.ui.registry.addMenuItem('ch-code', {
          icon: 'sourcecode',
          text: 'Source code',
          onAction: function () {
            return open(editor);
          }
        });
      });
    }

    Plugin$i();

    var global$7 = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');

    var create$1 = function (prefix) {
      var counter = 0;
      return function () {
        var guid = new Date().getTime().toString(32);
        return prefix + guid + (counter++).toString(32);
      };
    };

    var tocId = create$1('chtoc_');
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
      var html = '<p class="toc-title">' + global$7.DOM.encode(global$2.translate('Table of Contents')) + '</p>';
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

    function Plugin$j () {
      global$1.add('cherry-toc', function (editor) {
        register(editor);
        register$1(editor);
      });
    }

    Plugin$j();

    function isCodeBlock(elm) {
      return elm && elm.nodeName === 'PRE' && elm.className.indexOf('language-') !== -1 || elm.parentElement && elm.parentElement.nodeName === 'PRE' && elm.parentElement.className.indexOf('language-') !== -1;
    }
    function trimArg(predicateFn) {
      return function (arg1, arg2) {
        return predicateFn(arg2);
      };
    }

    var Global = typeof window !== 'undefined' ? window : Function('return this;')();

    var exports$1 = {}, module = { exports: exports$1 }, global$8 = {};
    (function (define, exports, module, require) {
      var oldprism = window.Prism;
      window.Prism = { manual: true };
      (function (f) {
        if (typeof exports === 'object' && typeof module !== 'undefined') {
          module.exports = f();
        } else if (typeof define === 'function' && define.amd) {
          define([], f);
        } else {
          var g;
          if (typeof window !== 'undefined') {
            g = window;
          } else if (typeof global$8 !== 'undefined') {
            g = global$8;
          } else if (typeof self !== 'undefined') {
            g = self;
          } else {
            g = this;
          }
          g.EphoxContactWrapper = f();
        }
      }(function () {
        return function () {
          function r(e, n, t) {
            function o(i, f) {
              if (!n[i]) {
                if (!e[i]) {
                  var c = 'function' == typeof require && require;
                  if (!f && c)
                    return c(i, !0);
                  if (u)
                    return u(i, !0);
                  var a = new Error('Cannot find module \'' + i + '\'');
                  throw a.code = 'MODULE_NOT_FOUND', a;
                }
                var p = n[i] = { exports: {} };
                e[i][0].call(p.exports, function (r) {
                  var n = e[i][1][r];
                  return o(n || r);
                }, p, p.exports, r, e, n, t);
              }
              return n[i].exports;
            }
            for (var u = 'function' == typeof require && require, i = 0; i < t.length; i++)
              o(t[i]);
            return o;
          }
          return r;
        }()({
          1: [
            function (require, module, exports) {
              Prism.languages.c = Prism.languages.extend('clike', {
                'comment': {
                  pattern: /\/\/(?:[^\r\n\\]|\\(?:\r\n?|\n|(?![\r\n])))*|\/\*[\s\S]*?(?:\*\/|$)/,
                  greedy: true
                },
                'class-name': {
                  pattern: /(\b(?:enum|struct)\s+(?:__attribute__\s*\(\([\s\S]*?\)\)\s*)?)\w+/,
                  lookbehind: true
                },
                'keyword': /\b(?:__attribute__|_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/,
                'function': /[a-z_]\w*(?=\s*\()/i,
                'operator': />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/,
                'number': /(?:\b0x(?:[\da-f]+\.?[\da-f]*|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?)[ful]*/i
              });
              Prism.languages.insertBefore('c', 'string', {
                'macro': {
                  pattern: /(^\s*)#\s*[a-z]+(?:[^\r\n\\/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|\\(?:\r\n|[\s\S]))*/im,
                  lookbehind: true,
                  greedy: true,
                  alias: 'property',
                  inside: {
                    'string': [
                      {
                        pattern: /^(#\s*include\s*)<[^>]+>/,
                        lookbehind: true
                      },
                      Prism.languages.c['string']
                    ],
                    'comment': Prism.languages.c['comment'],
                    'directive': {
                      pattern: /^(#\s*)[a-z]+/,
                      lookbehind: true,
                      alias: 'keyword'
                    },
                    'directive-hash': /^#/,
                    'punctuation': /##|\\(?=[\r\n])/,
                    'expression': {
                      pattern: /\S[\s\S]*/,
                      inside: Prism.languages.c
                    }
                  }
                },
                'constant': /\b(?:__FILE__|__LINE__|__DATE__|__TIME__|__TIMESTAMP__|__func__|EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|stdin|stdout|stderr)\b/
              });
              delete Prism.languages.c['boolean'];
            },
            {}
          ],
          2: [
            function (require, module, exports) {
              Prism.languages.clike = {
                'comment': [
                  {
                    pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
                    lookbehind: true
                  },
                  {
                    pattern: /(^|[^\\:])\/\/.*/,
                    lookbehind: true,
                    greedy: true
                  }
                ],
                'string': {
                  pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
                  greedy: true
                },
                'class-name': {
                  pattern: /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
                  lookbehind: true,
                  inside: { 'punctuation': /[.\\]/ }
                },
                'keyword': /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
                'boolean': /\b(?:true|false)\b/,
                'function': /\w+(?=\()/,
                'number': /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
                'operator': /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
                'punctuation': /[{}[\];(),.:]/
              };
            },
            {}
          ],
          3: [
            function (require, module, exports) {
              (function (global) {
                (function () {
                  var _self = typeof window !== 'undefined' ? window : typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope ? self : {};
                  var Prism = function (_self) {
                    var lang = /\blang(?:uage)?-([\w-]+)\b/i;
                    var uniqueId = 0;
                    var _ = {
                      manual: _self.Prism && _self.Prism.manual,
                      disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,
                      util: {
                        encode: function encode(tokens) {
                          if (tokens instanceof Token) {
                            return new Token(tokens.type, encode(tokens.content), tokens.alias);
                          } else if (Array.isArray(tokens)) {
                            return tokens.map(encode);
                          } else {
                            return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
                          }
                        },
                        type: function (o) {
                          return Object.prototype.toString.call(o).slice(8, -1);
                        },
                        objId: function (obj) {
                          if (!obj['__id']) {
                            Object.defineProperty(obj, '__id', { value: ++uniqueId });
                          }
                          return obj['__id'];
                        },
                        clone: function deepClone(o, visited) {
                          visited = visited || {};
                          var clone, id;
                          switch (_.util.type(o)) {
                          case 'Object':
                            id = _.util.objId(o);
                            if (visited[id]) {
                              return visited[id];
                            }
                            clone = {};
                            visited[id] = clone;
                            for (var key in o) {
                              if (o.hasOwnProperty(key)) {
                                clone[key] = deepClone(o[key], visited);
                              }
                            }
                            return clone;
                          case 'Array':
                            id = _.util.objId(o);
                            if (visited[id]) {
                              return visited[id];
                            }
                            clone = [];
                            visited[id] = clone;
                            o.forEach(function (v, i) {
                              clone[i] = deepClone(v, visited);
                            });
                            return clone;
                          default:
                            return o;
                          }
                        },
                        getLanguage: function (element) {
                          while (element && !lang.test(element.className)) {
                            element = element.parentElement;
                          }
                          if (element) {
                            return (element.className.match(lang) || [
                              ,
                              'none'
                            ])[1].toLowerCase();
                          }
                          return 'none';
                        },
                        currentScript: function () {
                          if (typeof document === 'undefined') {
                            return null;
                          }
                          if ('currentScript' in document && 1 < 2) {
                            return document.currentScript;
                          }
                          try {
                            throw new Error();
                          } catch (err) {
                            var src = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(err.stack) || [])[1];
                            if (src) {
                              var scripts = document.getElementsByTagName('script');
                              for (var i in scripts) {
                                if (scripts[i].src == src) {
                                  return scripts[i];
                                }
                              }
                            }
                            return null;
                          }
                        },
                        isActive: function (element, className, defaultActivation) {
                          var no = 'no-' + className;
                          while (element) {
                            var classList = element.classList;
                            if (classList.contains(className)) {
                              return true;
                            }
                            if (classList.contains(no)) {
                              return false;
                            }
                            element = element.parentElement;
                          }
                          return !!defaultActivation;
                        }
                      },
                      languages: {
                        extend: function (id, redef) {
                          var lang = _.util.clone(_.languages[id]);
                          for (var key in redef) {
                            lang[key] = redef[key];
                          }
                          return lang;
                        },
                        insertBefore: function (inside, before, insert, root) {
                          root = root || _.languages;
                          var grammar = root[inside];
                          var ret = {};
                          for (var token in grammar) {
                            if (grammar.hasOwnProperty(token)) {
                              if (token == before) {
                                for (var newToken in insert) {
                                  if (insert.hasOwnProperty(newToken)) {
                                    ret[newToken] = insert[newToken];
                                  }
                                }
                              }
                              if (!insert.hasOwnProperty(token)) {
                                ret[token] = grammar[token];
                              }
                            }
                          }
                          var old = root[inside];
                          root[inside] = ret;
                          _.languages.DFS(_.languages, function (key, value) {
                            if (value === old && key != inside) {
                              this[key] = ret;
                            }
                          });
                          return ret;
                        },
                        DFS: function DFS(o, callback, type, visited) {
                          visited = visited || {};
                          var objId = _.util.objId;
                          for (var i in o) {
                            if (o.hasOwnProperty(i)) {
                              callback.call(o, i, o[i], type || i);
                              var property = o[i], propertyType = _.util.type(property);
                              if (propertyType === 'Object' && !visited[objId(property)]) {
                                visited[objId(property)] = true;
                                DFS(property, callback, null, visited);
                              } else if (propertyType === 'Array' && !visited[objId(property)]) {
                                visited[objId(property)] = true;
                                DFS(property, callback, i, visited);
                              }
                            }
                          }
                        }
                      },
                      plugins: {},
                      highlightAll: function (async, callback) {
                        _.highlightAllUnder(document, async, callback);
                      },
                      highlightAllUnder: function (container, async, callback) {
                        var env = {
                          callback: callback,
                          container: container,
                          selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
                        };
                        _.hooks.run('before-highlightall', env);
                        env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));
                        _.hooks.run('before-all-elements-highlight', env);
                        for (var i = 0, element; element = env.elements[i++];) {
                          _.highlightElement(element, async === true, env.callback);
                        }
                      },
                      highlightElement: function (element, async, callback) {
                        var language = _.util.getLanguage(element);
                        var grammar = _.languages[language];
                        element.className = element.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
                        var parent = element.parentElement;
                        if (parent && parent.nodeName.toLowerCase() === 'pre') {
                          parent.className = parent.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
                        }
                        var code = element.textContent;
                        var env = {
                          element: element,
                          language: language,
                          grammar: grammar,
                          code: code
                        };
                        function insertHighlightedCode(highlightedCode) {
                          env.highlightedCode = highlightedCode;
                          _.hooks.run('before-insert', env);
                          env.element.innerHTML = env.highlightedCode;
                          _.hooks.run('after-highlight', env);
                          _.hooks.run('complete', env);
                          callback && callback.call(env.element);
                        }
                        _.hooks.run('before-sanity-check', env);
                        if (!env.code) {
                          _.hooks.run('complete', env);
                          callback && callback.call(env.element);
                          return;
                        }
                        _.hooks.run('before-highlight', env);
                        if (!env.grammar) {
                          insertHighlightedCode(_.util.encode(env.code));
                          return;
                        }
                        if (async && _self.Worker) {
                          var worker = new Worker(_.filename);
                          worker.onmessage = function (evt) {
                            insertHighlightedCode(evt.data);
                          };
                          worker.postMessage(JSON.stringify({
                            language: env.language,
                            code: env.code,
                            immediateClose: true
                          }));
                        } else {
                          insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
                        }
                      },
                      highlight: function (text, grammar, language) {
                        var env = {
                          code: text,
                          grammar: grammar,
                          language: language
                        };
                        _.hooks.run('before-tokenize', env);
                        env.tokens = _.tokenize(env.code, env.grammar);
                        _.hooks.run('after-tokenize', env);
                        return Token.stringify(_.util.encode(env.tokens), env.language);
                      },
                      tokenize: function (text, grammar) {
                        var rest = grammar.rest;
                        if (rest) {
                          for (var token in rest) {
                            grammar[token] = rest[token];
                          }
                          delete grammar.rest;
                        }
                        var tokenList = new LinkedList();
                        addAfter(tokenList, tokenList.head, text);
                        matchGrammar(text, tokenList, grammar, tokenList.head, 0);
                        return toArray(tokenList);
                      },
                      hooks: {
                        all: {},
                        add: function (name, callback) {
                          var hooks = _.hooks.all;
                          hooks[name] = hooks[name] || [];
                          hooks[name].push(callback);
                        },
                        run: function (name, env) {
                          var callbacks = _.hooks.all[name];
                          if (!callbacks || !callbacks.length) {
                            return;
                          }
                          for (var i = 0, callback; callback = callbacks[i++];) {
                            callback(env);
                          }
                        }
                      },
                      Token: Token
                    };
                    _self.Prism = _;
                    function Token(type, content, alias, matchedStr) {
                      this.type = type;
                      this.content = content;
                      this.alias = alias;
                      this.length = (matchedStr || '').length | 0;
                    }
                    Token.stringify = function stringify(o, language) {
                      if (typeof o == 'string') {
                        return o;
                      }
                      if (Array.isArray(o)) {
                        var s = '';
                        o.forEach(function (e) {
                          s += stringify(e, language);
                        });
                        return s;
                      }
                      var env = {
                        type: o.type,
                        content: stringify(o.content, language),
                        tag: 'span',
                        classes: [
                          'token',
                          o.type
                        ],
                        attributes: {},
                        language: language
                      };
                      var aliases = o.alias;
                      if (aliases) {
                        if (Array.isArray(aliases)) {
                          Array.prototype.push.apply(env.classes, aliases);
                        } else {
                          env.classes.push(aliases);
                        }
                      }
                      _.hooks.run('wrap', env);
                      var attributes = '';
                      for (var name in env.attributes) {
                        attributes += ' ' + name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
                      }
                      return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + attributes + '>' + env.content + '</' + env.tag + '>';
                    };
                    function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
                      for (var token in grammar) {
                        if (!grammar.hasOwnProperty(token) || !grammar[token]) {
                          continue;
                        }
                        var patterns = grammar[token];
                        patterns = Array.isArray(patterns) ? patterns : [patterns];
                        for (var j = 0; j < patterns.length; ++j) {
                          if (rematch && rematch.cause == token + ',' + j) {
                            return;
                          }
                          var patternObj = patterns[j], inside = patternObj.inside, lookbehind = !!patternObj.lookbehind, greedy = !!patternObj.greedy, lookbehindLength = 0, alias = patternObj.alias;
                          if (greedy && !patternObj.pattern.global) {
                            var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
                            patternObj.pattern = RegExp(patternObj.pattern.source, flags + 'g');
                          }
                          var pattern = patternObj.pattern || patternObj;
                          for (var currentNode = startNode.next, pos = startPos; currentNode !== tokenList.tail; pos += currentNode.value.length, currentNode = currentNode.next) {
                            if (rematch && pos >= rematch.reach) {
                              break;
                            }
                            var str = currentNode.value;
                            if (tokenList.length > text.length) {
                              return;
                            }
                            if (str instanceof Token) {
                              continue;
                            }
                            var removeCount = 1;
                            if (greedy && currentNode != tokenList.tail.prev) {
                              pattern.lastIndex = pos;
                              var match = pattern.exec(text);
                              if (!match) {
                                break;
                              }
                              var from = match.index + (lookbehind && match[1] ? match[1].length : 0);
                              var to = match.index + match[0].length;
                              var p = pos;
                              p += currentNode.value.length;
                              while (from >= p) {
                                currentNode = currentNode.next;
                                p += currentNode.value.length;
                              }
                              p -= currentNode.value.length;
                              pos = p;
                              if (currentNode.value instanceof Token) {
                                continue;
                              }
                              for (var k = currentNode; k !== tokenList.tail && (p < to || typeof k.value === 'string'); k = k.next) {
                                removeCount++;
                                p += k.value.length;
                              }
                              removeCount--;
                              str = text.slice(pos, p);
                              match.index -= pos;
                            } else {
                              pattern.lastIndex = 0;
                              var match = pattern.exec(str);
                            }
                            if (!match) {
                              continue;
                            }
                            if (lookbehind) {
                              lookbehindLength = match[1] ? match[1].length : 0;
                            }
                            var from = match.index + lookbehindLength, matchStr = match[0].slice(lookbehindLength), to = from + matchStr.length, before = str.slice(0, from), after = str.slice(to);
                            var reach = pos + str.length;
                            if (rematch && reach > rematch.reach) {
                              rematch.reach = reach;
                            }
                            var removeFrom = currentNode.prev;
                            if (before) {
                              removeFrom = addAfter(tokenList, removeFrom, before);
                              pos += before.length;
                            }
                            removeRange(tokenList, removeFrom, removeCount);
                            var wrapped = new Token(token, inside ? _.tokenize(matchStr, inside) : matchStr, alias, matchStr);
                            currentNode = addAfter(tokenList, removeFrom, wrapped);
                            if (after) {
                              addAfter(tokenList, currentNode, after);
                            }
                            if (removeCount > 1) {
                              matchGrammar(text, tokenList, grammar, currentNode.prev, pos, {
                                cause: token + ',' + j,
                                reach: reach
                              });
                            }
                          }
                        }
                      }
                    }
                    function LinkedList() {
                      var head = {
                        value: null,
                        prev: null,
                        next: null
                      };
                      var tail = {
                        value: null,
                        prev: head,
                        next: null
                      };
                      head.next = tail;
                      this.head = head;
                      this.tail = tail;
                      this.length = 0;
                    }
                    function addAfter(list, node, value) {
                      var next = node.next;
                      var newNode = {
                        value: value,
                        prev: node,
                        next: next
                      };
                      node.next = newNode;
                      next.prev = newNode;
                      list.length++;
                      return newNode;
                    }
                    function removeRange(list, node, count) {
                      var next = node.next;
                      for (var i = 0; i < count && next !== list.tail; i++) {
                        next = next.next;
                      }
                      node.next = next;
                      next.prev = node;
                      list.length -= i;
                    }
                    function toArray(list) {
                      var array = [];
                      var node = list.head.next;
                      while (node !== list.tail) {
                        array.push(node.value);
                        node = node.next;
                      }
                      return array;
                    }
                    if (!_self.document) {
                      if (!_self.addEventListener) {
                        return _;
                      }
                      if (!_.disableWorkerMessageHandler) {
                        _self.addEventListener('message', function (evt) {
                          var message = JSON.parse(evt.data), lang = message.language, code = message.code, immediateClose = message.immediateClose;
                          _self.postMessage(_.highlight(code, _.languages[lang], lang));
                          if (immediateClose) {
                            _self.close();
                          }
                        }, false);
                      }
                      return _;
                    }
                    var script = _.util.currentScript();
                    if (script) {
                      _.filename = script.src;
                      if (script.hasAttribute('data-manual')) {
                        _.manual = true;
                      }
                    }
                    function highlightAutomaticallyCallback() {
                      if (!_.manual) {
                        _.highlightAll();
                      }
                    }
                    if (!_.manual) {
                      var readyState = document.readyState;
                      if (readyState === 'loading' || readyState === 'interactive' && script && script.defer) {
                        document.addEventListener('DOMContentLoaded', highlightAutomaticallyCallback);
                      } else {
                        if (window.requestAnimationFrame) {
                          window.requestAnimationFrame(highlightAutomaticallyCallback);
                        } else {
                          window.setTimeout(highlightAutomaticallyCallback, 16);
                        }
                      }
                    }
                    return _;
                  }(_self);
                  if (typeof module !== 'undefined' && module.exports) {
                    module.exports = Prism;
                  }
                  if (typeof global !== 'undefined') {
                    global.Prism = Prism;
                  }
                }.call(this));
              }.call(this, typeof global$8 !== 'undefined' ? global$8 : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {}));
            },
            {}
          ],
          4: [
            function (require, module, exports) {
              (function (Prism) {
                var keyword = /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char8_t|char16_t|char32_t|class|compl|concept|const|consteval|constexpr|constinit|const_cast|continue|co_await|co_return|co_yield|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|float|for|friend|goto|if|inline|int|int8_t|int16_t|int32_t|int64_t|uint8_t|uint16_t|uint32_t|uint64_t|long|mutable|namespace|new|noexcept|nullptr|operator|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/;
                Prism.languages.cpp = Prism.languages.extend('c', {
                  'class-name': [
                    {
                      pattern: RegExp(/(\b(?:class|concept|enum|struct|typename)\s+)(?!<keyword>)\w+/.source.replace(/<keyword>/g, function () {
                        return keyword.source;
                      })),
                      lookbehind: true
                    },
                    /\b[A-Z]\w*(?=\s*::\s*\w+\s*\()/,
                    /\b[A-Z_]\w*(?=\s*::\s*~\w+\s*\()/i,
                    /\w+(?=\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>\s*::\s*\w+\s*\()/
                  ],
                  'keyword': keyword,
                  'number': {
                    pattern: /(?:\b0b[01']+|\b0x(?:[\da-f']+\.?[\da-f']*|\.[\da-f']+)(?:p[+-]?[\d']+)?|(?:\b[\d']+\.?[\d']*|\B\.[\d']+)(?:e[+-]?[\d']+)?)[ful]*/i,
                    greedy: true
                  },
                  'operator': />>=?|<<=?|->|([-+&|:])\1|[?:~]|<=>|[-+*/%&|^!=<>]=?|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/,
                  'boolean': /\b(?:true|false)\b/
                });
                Prism.languages.insertBefore('cpp', 'string', {
                  'raw-string': {
                    pattern: /R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/,
                    alias: 'string',
                    greedy: true
                  }
                });
                Prism.languages.insertBefore('cpp', 'class-name', {
                  'base-clause': {
                    pattern: /(\b(?:class|struct)\s+\w+\s*:\s*)(?:[^;{}"'])+?(?=\s*[;{])/,
                    lookbehind: true,
                    greedy: true,
                    inside: Prism.languages.extend('cpp', {})
                  }
                });
                Prism.languages.insertBefore('inside', 'operator', { 'class-name': /\b[a-z_]\w*\b(?!\s*::)/i }, Prism.languages.cpp['base-clause']);
              }(Prism));
            },
            {}
          ],
          5: [
            function (require, module, exports) {
              (function (Prism) {
                function replace(pattern, replacements) {
                  return pattern.replace(/<<(\d+)>>/g, function (m, index) {
                    return '(?:' + replacements[+index] + ')';
                  });
                }
                function re(pattern, replacements, flags) {
                  return RegExp(replace(pattern, replacements), flags || '');
                }
                function nested(pattern, depthLog2) {
                  for (var i = 0; i < depthLog2; i++) {
                    pattern = pattern.replace(/<<self>>/g, function () {
                      return '(?:' + pattern + ')';
                    });
                  }
                  return pattern.replace(/<<self>>/g, '[^\\s\\S]');
                }
                var keywordKinds = {
                  type: 'bool byte char decimal double dynamic float int long object sbyte short string uint ulong ushort var void',
                  typeDeclaration: 'class enum interface struct',
                  contextual: 'add alias and ascending async await by descending from get global group into join let nameof not notnull on or orderby partial remove select set unmanaged value when where where',
                  other: 'abstract as base break case catch checked const continue default delegate do else event explicit extern finally fixed for foreach goto if implicit in internal is lock namespace new null operator out override params private protected public readonly ref return sealed sizeof stackalloc static switch this throw try typeof unchecked unsafe using virtual volatile while yield'
                };
                function keywordsToPattern(words) {
                  return '\\b(?:' + words.trim().replace(/ /g, '|') + ')\\b';
                }
                var typeDeclarationKeywords = keywordsToPattern(keywordKinds.typeDeclaration);
                var keywords = RegExp(keywordsToPattern(keywordKinds.type + ' ' + keywordKinds.typeDeclaration + ' ' + keywordKinds.contextual + ' ' + keywordKinds.other));
                var nonTypeKeywords = keywordsToPattern(keywordKinds.typeDeclaration + ' ' + keywordKinds.contextual + ' ' + keywordKinds.other);
                var nonContextualKeywords = keywordsToPattern(keywordKinds.type + ' ' + keywordKinds.typeDeclaration + ' ' + keywordKinds.other);
                var generic = nested(/<(?:[^<>;=+\-*/%&|^]|<<self>>)*>/.source, 2);
                var nestedRound = nested(/\((?:[^()]|<<self>>)*\)/.source, 2);
                var name = /@?\b[A-Za-z_]\w*\b/.source;
                var genericName = replace(/<<0>>(?:\s*<<1>>)?/.source, [
                  name,
                  generic
                ]);
                var identifier = replace(/(?!<<0>>)<<1>>(?:\s*\.\s*<<1>>)*/.source, [
                  nonTypeKeywords,
                  genericName
                ]);
                var array = /\[\s*(?:,\s*)*\]/.source;
                var typeExpressionWithoutTuple = replace(/<<0>>(?:\s*(?:\?\s*)?<<1>>)*(?:\s*\?)?/.source, [
                  identifier,
                  array
                ]);
                var tupleElement = replace(/[^,()<>[\];=+\-*/%&|^]|<<0>>|<<1>>|<<2>>/.source, [
                  generic,
                  nestedRound,
                  array
                ]);
                var tuple = replace(/\(<<0>>+(?:,<<0>>+)+\)/.source, [tupleElement]);
                var typeExpression = replace(/(?:<<0>>|<<1>>)(?:\s*(?:\?\s*)?<<2>>)*(?:\s*\?)?/.source, [
                  tuple,
                  identifier,
                  array
                ]);
                var typeInside = {
                  'keyword': keywords,
                  'punctuation': /[<>()?,.:[\]]/
                };
                var character = /'(?:[^\r\n'\\]|\\.|\\[Uux][\da-fA-F]{1,8})'/.source;
                var regularString = /"(?:\\.|[^\\"\r\n])*"/.source;
                var verbatimString = /@"(?:""|\\[\s\S]|[^\\"])*"(?!")/.source;
                Prism.languages.csharp = Prism.languages.extend('clike', {
                  'string': [
                    {
                      pattern: re(/(^|[^$\\])<<0>>/.source, [verbatimString]),
                      lookbehind: true,
                      greedy: true
                    },
                    {
                      pattern: re(/(^|[^@$\\])<<0>>/.source, [regularString]),
                      lookbehind: true,
                      greedy: true
                    },
                    {
                      pattern: RegExp(character),
                      greedy: true,
                      alias: 'character'
                    }
                  ],
                  'class-name': [
                    {
                      pattern: re(/(\busing\s+static\s+)<<0>>(?=\s*;)/.source, [identifier]),
                      lookbehind: true,
                      inside: typeInside
                    },
                    {
                      pattern: re(/(\busing\s+<<0>>\s*=\s*)<<1>>(?=\s*;)/.source, [
                        name,
                        typeExpression
                      ]),
                      lookbehind: true,
                      inside: typeInside
                    },
                    {
                      pattern: re(/(\busing\s+)<<0>>(?=\s*=)/.source, [name]),
                      lookbehind: true
                    },
                    {
                      pattern: re(/(\b<<0>>\s+)<<1>>/.source, [
                        typeDeclarationKeywords,
                        genericName
                      ]),
                      lookbehind: true,
                      inside: typeInside
                    },
                    {
                      pattern: re(/(\bcatch\s*\(\s*)<<0>>/.source, [identifier]),
                      lookbehind: true,
                      inside: typeInside
                    },
                    {
                      pattern: re(/(\bwhere\s+)<<0>>/.source, [name]),
                      lookbehind: true
                    },
                    {
                      pattern: re(/(\b(?:is(?:\s+not)?|as)\s+)<<0>>/.source, [typeExpressionWithoutTuple]),
                      lookbehind: true,
                      inside: typeInside
                    },
                    {
                      pattern: re(/\b<<0>>(?=\s+(?!<<1>>)<<2>>(?:\s*[=,;:{)\]]|\s+(?:in|when)\b))/.source, [
                        typeExpression,
                        nonContextualKeywords,
                        name
                      ]),
                      inside: typeInside
                    }
                  ],
                  'keyword': keywords,
                  'number': /(?:\b0(?:x[\da-f_]*[\da-f]|b[01_]*[01])|(?:\B\.\d+(?:_+\d+)*|\b\d+(?:_+\d+)*(?:\.\d+(?:_+\d+)*)?)(?:e[-+]?\d+(?:_+\d+)*)?)(?:ul|lu|[dflmu])?\b/i,
                  'operator': />>=?|<<=?|[-=]>|([-+&|])\1|~|\?\?=?|[-+*/%&|^!=<>]=?/,
                  'punctuation': /\?\.?|::|[{}[\];(),.:]/
                });
                Prism.languages.insertBefore('csharp', 'number', {
                  'range': {
                    pattern: /\.\./,
                    alias: 'operator'
                  }
                });
                Prism.languages.insertBefore('csharp', 'punctuation', {
                  'named-parameter': {
                    pattern: re(/([(,]\s*)<<0>>(?=\s*:)/.source, [name]),
                    lookbehind: true,
                    alias: 'punctuation'
                  }
                });
                Prism.languages.insertBefore('csharp', 'class-name', {
                  'namespace': {
                    pattern: re(/(\b(?:namespace|using)\s+)<<0>>(?:\s*\.\s*<<0>>)*(?=\s*[;{])/.source, [name]),
                    lookbehind: true,
                    inside: { 'punctuation': /\./ }
                  },
                  'type-expression': {
                    pattern: re(/(\b(?:default|typeof|sizeof)\s*\(\s*)(?:[^()\s]|\s(?!\s*\))|<<0>>)*(?=\s*\))/.source, [nestedRound]),
                    lookbehind: true,
                    alias: 'class-name',
                    inside: typeInside
                  },
                  'return-type': {
                    pattern: re(/<<0>>(?=\s+(?:<<1>>\s*(?:=>|[({]|\.\s*this\s*\[)|this\s*\[))/.source, [
                      typeExpression,
                      identifier
                    ]),
                    inside: typeInside,
                    alias: 'class-name'
                  },
                  'constructor-invocation': {
                    pattern: re(/(\bnew\s+)<<0>>(?=\s*[[({])/.source, [typeExpression]),
                    lookbehind: true,
                    inside: typeInside,
                    alias: 'class-name'
                  },
                  'generic-method': {
                    pattern: re(/<<0>>\s*<<1>>(?=\s*\()/.source, [
                      name,
                      generic
                    ]),
                    inside: {
                      'function': re(/^<<0>>/.source, [name]),
                      'generic': {
                        pattern: RegExp(generic),
                        alias: 'class-name',
                        inside: typeInside
                      }
                    }
                  },
                  'type-list': {
                    pattern: re(/\b((?:<<0>>\s+<<1>>|where\s+<<2>>)\s*:\s*)(?:<<3>>|<<4>>)(?:\s*,\s*(?:<<3>>|<<4>>))*(?=\s*(?:where|[{;]|=>|$))/.source, [
                      typeDeclarationKeywords,
                      genericName,
                      name,
                      typeExpression,
                      keywords.source
                    ]),
                    lookbehind: true,
                    inside: {
                      'keyword': keywords,
                      'class-name': {
                        pattern: RegExp(typeExpression),
                        greedy: true,
                        inside: typeInside
                      },
                      'punctuation': /,/
                    }
                  },
                  'preprocessor': {
                    pattern: /(^\s*)#.*/m,
                    lookbehind: true,
                    alias: 'property',
                    inside: {
                      'directive': {
                        pattern: /(\s*#)\b(?:define|elif|else|endif|endregion|error|if|line|pragma|region|undef|warning)\b/,
                        lookbehind: true,
                        alias: 'keyword'
                      }
                    }
                  }
                });
                var regularStringOrCharacter = regularString + '|' + character;
                var regularStringCharacterOrComment = replace(/\/(?![*/])|\/\/[^\r\n]*[\r\n]|\/\*(?:[^*]|\*(?!\/))*\*\/|<<0>>/.source, [regularStringOrCharacter]);
                var roundExpression = nested(replace(/[^"'/()]|<<0>>|\(<<self>>*\)/.source, [regularStringCharacterOrComment]), 2);
                var attrTarget = /\b(?:assembly|event|field|method|module|param|property|return|type)\b/.source;
                var attr = replace(/<<0>>(?:\s*\(<<1>>*\))?/.source, [
                  identifier,
                  roundExpression
                ]);
                Prism.languages.insertBefore('csharp', 'class-name', {
                  'attribute': {
                    pattern: re(/((?:^|[^\s\w>)?])\s*\[\s*)(?:<<0>>\s*:\s*)?<<1>>(?:\s*,\s*<<1>>)*(?=\s*\])/.source, [
                      attrTarget,
                      attr
                    ]),
                    lookbehind: true,
                    greedy: true,
                    inside: {
                      'target': {
                        pattern: re(/^<<0>>(?=\s*:)/.source, [attrTarget]),
                        alias: 'keyword'
                      },
                      'attribute-arguments': {
                        pattern: re(/\(<<0>>*\)/.source, [roundExpression]),
                        inside: Prism.languages.csharp
                      },
                      'class-name': {
                        pattern: RegExp(identifier),
                        inside: { 'punctuation': /\./ }
                      },
                      'punctuation': /[:,]/
                    }
                  }
                });
                var formatString = /:[^}\r\n]+/.source;
                var mInterpolationRound = nested(replace(/[^"'/()]|<<0>>|\(<<self>>*\)/.source, [regularStringCharacterOrComment]), 2);
                var mInterpolation = replace(/\{(?!\{)(?:(?![}:])<<0>>)*<<1>>?\}/.source, [
                  mInterpolationRound,
                  formatString
                ]);
                var sInterpolationRound = nested(replace(/[^"'/()]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|<<0>>|\(<<self>>*\)/.source, [regularStringOrCharacter]), 2);
                var sInterpolation = replace(/\{(?!\{)(?:(?![}:])<<0>>)*<<1>>?\}/.source, [
                  sInterpolationRound,
                  formatString
                ]);
                function createInterpolationInside(interpolation, interpolationRound) {
                  return {
                    'interpolation': {
                      pattern: re(/((?:^|[^{])(?:\{\{)*)<<0>>/.source, [interpolation]),
                      lookbehind: true,
                      inside: {
                        'format-string': {
                          pattern: re(/(^\{(?:(?![}:])<<0>>)*)<<1>>(?=\}$)/.source, [
                            interpolationRound,
                            formatString
                          ]),
                          lookbehind: true,
                          inside: { 'punctuation': /^:/ }
                        },
                        'punctuation': /^\{|\}$/,
                        'expression': {
                          pattern: /[\s\S]+/,
                          alias: 'language-csharp',
                          inside: Prism.languages.csharp
                        }
                      }
                    },
                    'string': /[\s\S]+/
                  };
                }
                Prism.languages.insertBefore('csharp', 'string', {
                  'interpolation-string': [
                    {
                      pattern: re(/(^|[^\\])(?:\$@|@\$)"(?:""|\\[\s\S]|\{\{|<<0>>|[^\\{"])*"/.source, [mInterpolation]),
                      lookbehind: true,
                      greedy: true,
                      inside: createInterpolationInside(mInterpolation, mInterpolationRound)
                    },
                    {
                      pattern: re(/(^|[^@\\])\$"(?:\\.|\{\{|<<0>>|[^\\"{])*"/.source, [sInterpolation]),
                      lookbehind: true,
                      greedy: true,
                      inside: createInterpolationInside(sInterpolation, sInterpolationRound)
                    }
                  ]
                });
              }(Prism));
              Prism.languages.dotnet = Prism.languages.cs = Prism.languages.csharp;
            },
            {}
          ],
          6: [
            function (require, module, exports) {
              (function (Prism) {
                var string = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
                Prism.languages.css = {
                  'comment': /\/\*[\s\S]*?\*\//,
                  'atrule': {
                    pattern: /@[\w-]+[\s\S]*?(?:;|(?=\s*\{))/,
                    inside: {
                      'rule': /^@[\w-]+/,
                      'selector-function-argument': {
                        pattern: /(\bselector\s*\((?!\s*\))\s*)(?:[^()]|\((?:[^()]|\([^()]*\))*\))+?(?=\s*\))/,
                        lookbehind: true,
                        alias: 'selector'
                      },
                      'keyword': {
                        pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
                        lookbehind: true
                      }
                    }
                  },
                  'url': {
                    pattern: RegExp('\\burl\\((?:' + string.source + '|' + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ')\\)', 'i'),
                    greedy: true,
                    inside: {
                      'function': /^url/i,
                      'punctuation': /^\(|\)$/,
                      'string': {
                        pattern: RegExp('^' + string.source + '$'),
                        alias: 'url'
                      }
                    }
                  },
                  'selector': RegExp('[^{}\\s](?:[^{};"\']|' + string.source + ')*?(?=\\s*\\{)'),
                  'string': {
                    pattern: string,
                    greedy: true
                  },
                  'property': /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
                  'important': /!important\b/i,
                  'function': /[-a-z0-9]+(?=\()/i,
                  'punctuation': /[(){};:,]/
                };
                Prism.languages.css['atrule'].inside.rest = Prism.languages.css;
                var markup = Prism.languages.markup;
                if (markup) {
                  markup.tag.addInlined('style', 'css');
                  Prism.languages.insertBefore('inside', 'attr-value', {
                    'style-attr': {
                      pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
                      inside: {
                        'attr-name': {
                          pattern: /^\s*style/i,
                          inside: markup.tag.inside
                        },
                        'punctuation': /^\s*=\s*['"]|['"]\s*$/,
                        'attr-value': {
                          pattern: /.+/i,
                          inside: Prism.languages.css
                        }
                      },
                      alias: 'language-css'
                    }
                  }, markup.tag);
                }
              }(Prism));
            },
            {}
          ],
          7: [
            function (require, module, exports) {
              (function (Prism) {
                var keywords = /\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|null|open|opens|package|private|protected|provides|public|record|requires|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|to|transient|transitive|try|uses|var|void|volatile|while|with|yield)\b/;
                var className = /\b[A-Z](?:\w*[a-z]\w*)?\b/;
                Prism.languages.java = Prism.languages.extend('clike', {
                  'class-name': [
                    className,
                    /\b[A-Z]\w*(?=\s+\w+\s*[;,=())])/
                  ],
                  'keyword': keywords,
                  'function': [
                    Prism.languages.clike.function,
                    {
                      pattern: /(\:\:)[a-z_]\w*/,
                      lookbehind: true
                    }
                  ],
                  'number': /\b0b[01][01_]*L?\b|\b0x[\da-f_]*\.?[\da-f_p+-]+\b|(?:\b\d[\d_]*\.?[\d_]*|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,
                  'operator': {
                    pattern: /(^|[^.])(?:<<=?|>>>?=?|->|--|\+\+|&&|\|\||::|[?:~]|[-+*/%&|^!=<>]=?)/m,
                    lookbehind: true
                  }
                });
                Prism.languages.insertBefore('java', 'string', {
                  'triple-quoted-string': {
                    pattern: /"""[ \t]*[\r\n](?:(?:"|"")?(?:\\.|[^"\\]))*"""/,
                    greedy: true,
                    alias: 'string'
                  }
                });
                Prism.languages.insertBefore('java', 'class-name', {
                  'annotation': {
                    alias: 'punctuation',
                    pattern: /(^|[^.])@\w+/,
                    lookbehind: true
                  },
                  'namespace': {
                    pattern: RegExp(/(\b(?:exports|import(?:\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\s+)(?!<keyword>)[a-z]\w*(?:\.[a-z]\w*)*\.?/.source.replace(/<keyword>/g, function () {
                      return keywords.source;
                    })),
                    lookbehind: true,
                    inside: { 'punctuation': /\./ }
                  },
                  'generics': {
                    pattern: /<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<[\w\s,.&?]*>)*>)*>)*>/,
                    inside: {
                      'class-name': className,
                      'keyword': keywords,
                      'punctuation': /[<>(),.:]/,
                      'operator': /[?&|]/
                    }
                  }
                });
              }(Prism));
            },
            {}
          ],
          8: [
            function (require, module, exports) {
              Prism.languages.javascript = Prism.languages.extend('clike', {
                'class-name': [
                  Prism.languages.clike['class-name'],
                  {
                    pattern: /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,
                    lookbehind: true
                  }
                ],
                'keyword': [
                  {
                    pattern: /((?:^|})\s*)(?:catch|finally)\b/,
                    lookbehind: true
                  },
                  {
                    pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|(?:get|set)(?=\s*[\[$\w\xA0-\uFFFF])|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
                    lookbehind: true
                  }
                ],
                'number': /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
                'function': /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
                'operator': /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
              });
              Prism.languages.javascript['class-name'][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/;
              Prism.languages.insertBefore('javascript', 'keyword', {
                'regex': {
                  pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
                  lookbehind: true,
                  greedy: true,
                  inside: {
                    'regex-source': {
                      pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
                      lookbehind: true,
                      alias: 'language-regex',
                      inside: Prism.languages.regex
                    },
                    'regex-flags': /[a-z]+$/,
                    'regex-delimiter': /^\/|\/$/
                  }
                },
                'function-variable': {
                  pattern: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,
                  alias: 'function'
                },
                'parameter': [
                  {
                    pattern: /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,
                    lookbehind: true,
                    inside: Prism.languages.javascript
                  },
                  {
                    pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i,
                    inside: Prism.languages.javascript
                  },
                  {
                    pattern: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,
                    lookbehind: true,
                    inside: Prism.languages.javascript
                  },
                  {
                    pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,
                    lookbehind: true,
                    inside: Prism.languages.javascript
                  }
                ],
                'constant': /\b[A-Z](?:[A-Z_]|\dx?)*\b/
              });
              Prism.languages.insertBefore('javascript', 'string', {
                'template-string': {
                  pattern: /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
                  greedy: true,
                  inside: {
                    'template-punctuation': {
                      pattern: /^`|`$/,
                      alias: 'string'
                    },
                    'interpolation': {
                      pattern: /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
                      lookbehind: true,
                      inside: {
                        'interpolation-punctuation': {
                          pattern: /^\${|}$/,
                          alias: 'punctuation'
                        },
                        rest: Prism.languages.javascript
                      }
                    },
                    'string': /[\s\S]+/
                  }
                }
              });
              if (Prism.languages.markup) {
                Prism.languages.markup.tag.addInlined('script', 'javascript');
              }
              Prism.languages.js = Prism.languages.javascript;
            },
            {}
          ],
          9: [
            function (require, module, exports) {
              (function (Prism) {
                function getPlaceholder(language, index) {
                  return '___' + language.toUpperCase() + index + '___';
                }
                Object.defineProperties(Prism.languages['markup-templating'] = {}, {
                  buildPlaceholders: {
                    value: function (env, language, placeholderPattern, replaceFilter) {
                      if (env.language !== language) {
                        return;
                      }
                      var tokenStack = env.tokenStack = [];
                      env.code = env.code.replace(placeholderPattern, function (match) {
                        if (typeof replaceFilter === 'function' && !replaceFilter(match)) {
                          return match;
                        }
                        var i = tokenStack.length;
                        var placeholder;
                        while (env.code.indexOf(placeholder = getPlaceholder(language, i)) !== -1)
                          ++i;
                        tokenStack[i] = match;
                        return placeholder;
                      });
                      env.grammar = Prism.languages.markup;
                    }
                  },
                  tokenizePlaceholders: {
                    value: function (env, language) {
                      if (env.language !== language || !env.tokenStack) {
                        return;
                      }
                      env.grammar = Prism.languages[language];
                      var j = 0;
                      var keys = Object.keys(env.tokenStack);
                      function walkTokens(tokens) {
                        for (var i = 0; i < tokens.length; i++) {
                          if (j >= keys.length) {
                            break;
                          }
                          var token = tokens[i];
                          if (typeof token === 'string' || token.content && typeof token.content === 'string') {
                            var k = keys[j];
                            var t = env.tokenStack[k];
                            var s = typeof token === 'string' ? token : token.content;
                            var placeholder = getPlaceholder(language, k);
                            var index = s.indexOf(placeholder);
                            if (index > -1) {
                              ++j;
                              var before = s.substring(0, index);
                              var middle = new Prism.Token(language, Prism.tokenize(t, env.grammar), 'language-' + language, t);
                              var after = s.substring(index + placeholder.length);
                              var replacement = [];
                              if (before) {
                                replacement.push.apply(replacement, walkTokens([before]));
                              }
                              replacement.push(middle);
                              if (after) {
                                replacement.push.apply(replacement, walkTokens([after]));
                              }
                              if (typeof token === 'string') {
                                tokens.splice.apply(tokens, [
                                  i,
                                  1
                                ].concat(replacement));
                              } else {
                                token.content = replacement;
                              }
                            }
                          } else if (token.content) {
                            walkTokens(token.content);
                          }
                        }
                        return tokens;
                      }
                      walkTokens(env.tokens);
                    }
                  }
                });
              }(Prism));
            },
            {}
          ],
          10: [
            function (require, module, exports) {
              Prism.languages.markup = {
                'comment': /<!--[\s\S]*?-->/,
                'prolog': /<\?[\s\S]+?\?>/,
                'doctype': {
                  pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
                  greedy: true,
                  inside: {
                    'internal-subset': {
                      pattern: /(\[)[\s\S]+(?=\]>$)/,
                      lookbehind: true,
                      greedy: true,
                      inside: null
                    },
                    'string': {
                      pattern: /"[^"]*"|'[^']*'/,
                      greedy: true
                    },
                    'punctuation': /^<!|>$|[[\]]/,
                    'doctype-tag': /^DOCTYPE/,
                    'name': /[^\s<>'"]+/
                  }
                },
                'cdata': /<!\[CDATA\[[\s\S]*?]]>/i,
                'tag': {
                  pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
                  greedy: true,
                  inside: {
                    'tag': {
                      pattern: /^<\/?[^\s>\/]+/,
                      inside: {
                        'punctuation': /^<\/?/,
                        'namespace': /^[^\s>\/:]+:/
                      }
                    },
                    'attr-value': {
                      pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
                      inside: {
                        'punctuation': [
                          {
                            pattern: /^=/,
                            alias: 'attr-equals'
                          },
                          /"|'/
                        ]
                      }
                    },
                    'punctuation': /\/?>/,
                    'attr-name': {
                      pattern: /[^\s>\/]+/,
                      inside: { 'namespace': /^[^\s>\/:]+:/ }
                    }
                  }
                },
                'entity': [
                  {
                    pattern: /&[\da-z]{1,8};/i,
                    alias: 'named-entity'
                  },
                  /&#x?[\da-f]{1,8};/i
                ]
              };
              Prism.languages.markup['tag'].inside['attr-value'].inside['entity'] = Prism.languages.markup['entity'];
              Prism.languages.markup['doctype'].inside['internal-subset'].inside = Prism.languages.markup;
              Prism.hooks.add('wrap', function (env) {
                if (env.type === 'entity') {
                  env.attributes['title'] = env.content.replace(/&amp;/, '&');
                }
              });
              Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
                value: function addInlined(tagName, lang) {
                  var includedCdataInside = {};
                  includedCdataInside['language-' + lang] = {
                    pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
                    lookbehind: true,
                    inside: Prism.languages[lang]
                  };
                  includedCdataInside['cdata'] = /^<!\[CDATA\[|\]\]>$/i;
                  var inside = {
                    'included-cdata': {
                      pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
                      inside: includedCdataInside
                    }
                  };
                  inside['language-' + lang] = {
                    pattern: /[\s\S]+/,
                    inside: Prism.languages[lang]
                  };
                  var def = {};
                  def[tagName] = {
                    pattern: RegExp(/(<__[\s\S]*?>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function () {
                      return tagName;
                    }), 'i'),
                    lookbehind: true,
                    greedy: true,
                    inside: inside
                  };
                  Prism.languages.insertBefore('markup', 'cdata', def);
                }
              });
              Prism.languages.html = Prism.languages.markup;
              Prism.languages.mathml = Prism.languages.markup;
              Prism.languages.svg = Prism.languages.markup;
              Prism.languages.xml = Prism.languages.extend('markup', {});
              Prism.languages.ssml = Prism.languages.xml;
              Prism.languages.atom = Prism.languages.xml;
              Prism.languages.rss = Prism.languages.xml;
            },
            {}
          ],
          11: [
            function (require, module, exports) {
              (function (Prism) {
                Prism.languages.php = Prism.languages.extend('clike', {
                  'keyword': /\b(?:__halt_compiler|abstract|and|array|as|break|callable|case|catch|class|clone|const|continue|declare|default|die|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|eval|exit|extends|final|finally|for|foreach|function|global|goto|if|implements|include|include_once|instanceof|insteadof|interface|isset|list|match|namespace|new|or|parent|print|private|protected|public|require|require_once|return|static|switch|throw|trait|try|unset|use|var|while|xor|yield)\b/i,
                  'boolean': {
                    pattern: /\b(?:false|true)\b/i,
                    alias: 'constant'
                  },
                  'constant': [
                    /\b[A-Z_][A-Z0-9_]*\b/,
                    /\b(?:null)\b/i
                  ],
                  'comment': {
                    pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
                    lookbehind: true
                  }
                });
                Prism.languages.insertBefore('php', 'string', {
                  'shell-comment': {
                    pattern: /(^|[^\\])#.*/,
                    lookbehind: true,
                    alias: 'comment'
                  }
                });
                Prism.languages.insertBefore('php', 'comment', {
                  'delimiter': {
                    pattern: /\?>$|^<\?(?:php(?=\s)|=)?/i,
                    alias: 'important'
                  }
                });
                Prism.languages.insertBefore('php', 'keyword', {
                  'variable': /\$+(?:\w+\b|(?={))/i,
                  'package': {
                    pattern: /(\\|namespace\s+|use\s+)[\w\\]+/,
                    lookbehind: true,
                    inside: { punctuation: /\\/ }
                  }
                });
                Prism.languages.insertBefore('php', 'operator', {
                  'property': {
                    pattern: /(->)[\w]+/,
                    lookbehind: true
                  }
                });
                var string_interpolation = {
                  pattern: /{\$(?:{(?:{[^{}]+}|[^{}]+)}|[^{}])+}|(^|[^\\{])\$+(?:\w+(?:\[[^\r\n\[\]]+\]|->\w+)*)/,
                  lookbehind: true,
                  inside: Prism.languages.php
                };
                Prism.languages.insertBefore('php', 'string', {
                  'nowdoc-string': {
                    pattern: /<<<'([^']+)'[\r\n](?:.*[\r\n])*?\1;/,
                    greedy: true,
                    alias: 'string',
                    inside: {
                      'delimiter': {
                        pattern: /^<<<'[^']+'|[a-z_]\w*;$/i,
                        alias: 'symbol',
                        inside: { 'punctuation': /^<<<'?|[';]$/ }
                      }
                    }
                  },
                  'heredoc-string': {
                    pattern: /<<<(?:"([^"]+)"[\r\n](?:.*[\r\n])*?\1;|([a-z_]\w*)[\r\n](?:.*[\r\n])*?\2;)/i,
                    greedy: true,
                    alias: 'string',
                    inside: {
                      'delimiter': {
                        pattern: /^<<<(?:"[^"]+"|[a-z_]\w*)|[a-z_]\w*;$/i,
                        alias: 'symbol',
                        inside: { 'punctuation': /^<<<"?|[";]$/ }
                      },
                      'interpolation': string_interpolation
                    }
                  },
                  'single-quoted-string': {
                    pattern: /'(?:\\[\s\S]|[^\\'])*'/,
                    greedy: true,
                    alias: 'string'
                  },
                  'double-quoted-string': {
                    pattern: /"(?:\\[\s\S]|[^\\"])*"/,
                    greedy: true,
                    alias: 'string',
                    inside: { 'interpolation': string_interpolation }
                  }
                });
                delete Prism.languages.php['string'];
                Prism.hooks.add('before-tokenize', function (env) {
                  if (!/<\?/.test(env.code)) {
                    return;
                  }
                  var phpPattern = /<\?(?:[^"'/#]|\/(?![*/])|("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|(?:\/\/|#)(?:[^?\n\r]|\?(?!>))*(?=$|\?>|[\r\n])|\/\*[\s\S]*?(?:\*\/|$))*?(?:\?>|$)/ig;
                  Prism.languages['markup-templating'].buildPlaceholders(env, 'php', phpPattern);
                });
                Prism.hooks.add('after-tokenize', function (env) {
                  Prism.languages['markup-templating'].tokenizePlaceholders(env, 'php');
                });
              }(Prism));
              (function (Prism) {
                if (typeof Prism === 'undefined' || typeof document === 'undefined') {
                  return;
                }
                var PLUGIN_NAME = 'line-numbers';
                var NEW_LINE_EXP = /\n(?!$)/g;
                var config = Prism.plugins.lineNumbers = {
                  getLine: function (element, number) {
                    if (element.tagName !== 'PRE' || !element.classList.contains(PLUGIN_NAME)) {
                      return;
                    }
                    var lineNumberRows = element.querySelector('.line-numbers-rows');
                    if (!lineNumberRows) {
                      return;
                    }
                    var lineNumberStart = parseInt(element.getAttribute('data-start'), 10) || 1;
                    var lineNumberEnd = lineNumberStart + (lineNumberRows.children.length - 1);
                    if (number < lineNumberStart) {
                      number = lineNumberStart;
                    }
                    if (number > lineNumberEnd) {
                      number = lineNumberEnd;
                    }
                    var lineIndex = number - lineNumberStart;
                    return lineNumberRows.children[lineIndex];
                  },
                  resize: function (element) {
                    resizeElements([element]);
                  },
                  assumeViewportIndependence: true
                };
                function resizeElements(elements) {
                  elements = elements.filter(function (e) {
                    var codeStyles = getStyles(e);
                    var whiteSpace = codeStyles['white-space'];
                    return whiteSpace === 'pre-wrap' || whiteSpace === 'pre-line';
                  });
                  if (elements.length == 0) {
                    return;
                  }
                  var infos = elements.map(function (element) {
                    var codeElement = element.querySelector('code');
                    var lineNumbersWrapper = element.querySelector('.line-numbers-rows');
                    if (!codeElement || !lineNumbersWrapper) {
                      return undefined;
                    }
                    var lineNumberSizer = element.querySelector('.line-numbers-sizer');
                    var codeLines = codeElement.textContent.split(NEW_LINE_EXP);
                    if (!lineNumberSizer) {
                      lineNumberSizer = document.createElement('span');
                      lineNumberSizer.className = 'line-numbers-sizer';
                      codeElement.appendChild(lineNumberSizer);
                    }
                    lineNumberSizer.innerHTML = '0';
                    lineNumberSizer.style.display = 'block';
                    var oneLinerHeight = lineNumberSizer.getBoundingClientRect().height;
                    lineNumberSizer.innerHTML = '';
                    return {
                      element: element,
                      lines: codeLines,
                      lineHeights: [],
                      oneLinerHeight: oneLinerHeight,
                      sizer: lineNumberSizer
                    };
                  }).filter(Boolean);
                  infos.forEach(function (info) {
                    var lineNumberSizer = info.sizer;
                    var lines = info.lines;
                    var lineHeights = info.lineHeights;
                    var oneLinerHeight = info.oneLinerHeight;
                    lineHeights[lines.length - 1] = undefined;
                    lines.forEach(function (line, index) {
                      if (line && line.length > 1) {
                        var e = lineNumberSizer.appendChild(document.createElement('span'));
                        e.style.display = 'block';
                        e.textContent = line;
                      } else {
                        lineHeights[index] = oneLinerHeight;
                      }
                    });
                  });
                  infos.forEach(function (info) {
                    var lineNumberSizer = info.sizer;
                    var lineHeights = info.lineHeights;
                    var childIndex = 0;
                    for (var i = 0; i < lineHeights.length; i++) {
                      if (lineHeights[i] === undefined) {
                        lineHeights[i] = lineNumberSizer.children[childIndex++].getBoundingClientRect().height;
                      }
                    }
                  });
                  infos.forEach(function (info) {
                    var lineNumberSizer = info.sizer;
                    var wrapper = info.element.querySelector('.line-numbers-rows');
                    lineNumberSizer.style.display = 'none';
                    lineNumberSizer.innerHTML = '';
                    info.lineHeights.forEach(function (height, lineNumber) {
                      wrapper.children[lineNumber].style.height = height + 'px';
                    });
                  });
                }
                function getStyles(element) {
                  if (!element) {
                    return null;
                  }
                  return window.getComputedStyle ? getComputedStyle(element) : element.currentStyle || null;
                }
                var lastWidth = undefined;
                window.addEventListener('resize', function () {
                  if (config.assumeViewportIndependence && lastWidth === window.innerWidth) {
                    return;
                  }
                  lastWidth = window.innerWidth;
                  resizeElements(Array.prototype.slice.call(document.querySelectorAll('pre.' + PLUGIN_NAME)));
                });
                Prism.hooks.add('complete', function (env) {
                  if (!env.code) {
                    return;
                  }
                  var code = env.element;
                  var pre = env.element;
                  if (!pre || !/pre/i.test(pre.nodeName)) {
                    return;
                  }
                  if (code.querySelector('.line-numbers-rows')) {
                    return;
                  }
                  if (!Prism.util.isActive(code, PLUGIN_NAME)) {
                    return;
                  }
                  var match = env.code.match(NEW_LINE_EXP);
                  var linesNum = match ? match.length + 1 : 1;
                  var lineNumbersWrapper;
                  var lines = new Array(linesNum + 1).join('<span></span>');
                  lineNumbersWrapper = document.createElement('span');
                  lineNumbersWrapper.setAttribute('aria-hidden', 'true');
                  lineNumbersWrapper.className = 'line-numbers-rows';
                  lineNumbersWrapper.innerHTML = lines;
                  if (pre.hasAttribute('data-start')) {
                    pre.style.counterReset = 'linenumber ' + (parseInt(pre.getAttribute('data-start'), 10) - 1);
                  }
                  env.element.appendChild(lineNumbersWrapper);
                  Prism.hooks.run('line-numbers', env);
                });
                Prism.hooks.add('line-numbers', function (env) {
                  env.plugins = env.plugins || {};
                  env.plugins.lineNumbers = true;
                });
              }(Prism));
            },
            {}
          ],
          12: [
            function (require, module, exports) {
              Prism.languages.python = {
                'comment': {
                  pattern: /(^|[^\\])#.*/,
                  lookbehind: true
                },
                'string-interpolation': {
                  pattern: /(?:f|rf|fr)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
                  greedy: true,
                  inside: {
                    'interpolation': {
                      pattern: /((?:^|[^{])(?:{{)*){(?!{)(?:[^{}]|{(?!{)(?:[^{}]|{(?!{)(?:[^{}])+})+})+}/,
                      lookbehind: true,
                      inside: {
                        'format-spec': {
                          pattern: /(:)[^:(){}]+(?=}$)/,
                          lookbehind: true
                        },
                        'conversion-option': {
                          pattern: /![sra](?=[:}]$)/,
                          alias: 'punctuation'
                        },
                        rest: null
                      }
                    },
                    'string': /[\s\S]+/
                  }
                },
                'triple-quoted-string': {
                  pattern: /(?:[rub]|rb|br)?("""|''')[\s\S]*?\1/i,
                  greedy: true,
                  alias: 'string'
                },
                'string': {
                  pattern: /(?:[rub]|rb|br)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,
                  greedy: true
                },
                'function': {
                  pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
                  lookbehind: true
                },
                'class-name': {
                  pattern: /(\bclass\s+)\w+/i,
                  lookbehind: true
                },
                'decorator': {
                  pattern: /(^\s*)@\w+(?:\.\w+)*/im,
                  lookbehind: true,
                  alias: [
                    'annotation',
                    'punctuation'
                  ],
                  inside: { 'punctuation': /\./ }
                },
                'keyword': /\b(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
                'builtin': /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
                'boolean': /\b(?:True|False|None)\b/,
                'number': /(?:\b(?=\d)|\B(?=\.))(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/i,
                'operator': /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
                'punctuation': /[{}[\];(),.:]/
              };
              Prism.languages.python['string-interpolation'].inside['interpolation'].inside.rest = Prism.languages.python;
              Prism.languages.py = Prism.languages.python;
            },
            {}
          ],
          13: [
            function (require, module, exports) {
              (function (Prism) {
                Prism.languages.ruby = Prism.languages.extend('clike', {
                  'comment': [
                    /#.*/,
                    {
                      pattern: /^=begin\s[\s\S]*?^=end/m,
                      greedy: true
                    }
                  ],
                  'class-name': {
                    pattern: /(\b(?:class)\s+|\bcatch\s+\()[\w.\\]+/i,
                    lookbehind: true,
                    inside: { 'punctuation': /[.\\]/ }
                  },
                  'keyword': /\b(?:alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|extend|for|if|in|include|module|new|next|nil|not|or|prepend|protected|private|public|raise|redo|require|rescue|retry|return|self|super|then|throw|undef|unless|until|when|while|yield)\b/
                });
                var interpolation = {
                  pattern: /#\{[^}]+\}/,
                  inside: {
                    'delimiter': {
                      pattern: /^#\{|\}$/,
                      alias: 'tag'
                    },
                    rest: Prism.languages.ruby
                  }
                };
                delete Prism.languages.ruby.function;
                Prism.languages.insertBefore('ruby', 'keyword', {
                  'regex': [
                    {
                      pattern: RegExp(/%r/.source + '(?:' + [
                        /([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1[gim]{0,3}/.source,
                        /\((?:[^()\\]|\\[\s\S])*\)[gim]{0,3}/.source,
                        /\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}[gim]{0,3}/.source,
                        /\[(?:[^\[\]\\]|\\[\s\S])*\][gim]{0,3}/.source,
                        /<(?:[^<>\\]|\\[\s\S])*>[gim]{0,3}/.source
                      ].join('|') + ')'),
                      greedy: true,
                      inside: { 'interpolation': interpolation }
                    },
                    {
                      pattern: /(^|[^/])\/(?!\/)(?:\[[^\r\n\]]+\]|\\.|[^[/\\\r\n])+\/[gim]{0,3}(?=\s*(?:$|[\r\n,.;})]))/,
                      lookbehind: true,
                      greedy: true
                    }
                  ],
                  'variable': /[@$]+[a-zA-Z_]\w*(?:[?!]|\b)/,
                  'symbol': {
                    pattern: /(^|[^:]):[a-zA-Z_]\w*(?:[?!]|\b)/,
                    lookbehind: true
                  },
                  'method-definition': {
                    pattern: /(\bdef\s+)[\w.]+/,
                    lookbehind: true,
                    inside: {
                      'function': /\w+$/,
                      rest: Prism.languages.ruby
                    }
                  }
                });
                Prism.languages.insertBefore('ruby', 'number', {
                  'builtin': /\b(?:Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|Fixnum|Float|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,
                  'constant': /\b[A-Z]\w*(?:[?!]|\b)/
                });
                Prism.languages.ruby.string = [
                  {
                    pattern: RegExp(/%[qQiIwWxs]?/.source + '(?:' + [
                      /([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1/.source,
                      /\((?:[^()\\]|\\[\s\S])*\)/.source,
                      /\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}/.source,
                      /\[(?:[^\[\]\\]|\\[\s\S])*\]/.source,
                      /<(?:[^<>\\]|\\[\s\S])*>/.source
                    ].join('|') + ')'),
                    greedy: true,
                    inside: { 'interpolation': interpolation }
                  },
                  {
                    pattern: /("|')(?:#\{[^}]+\}|\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
                    greedy: true,
                    inside: { 'interpolation': interpolation }
                  }
                ];
                Prism.languages.rb = Prism.languages.ruby;
              }(Prism));
            },
            {}
          ],
          14: [
            function (require, module, exports) {
              var Prism = require('prismjs/components/prism-core');
              require('prismjs/components/prism-clike');
              require('prismjs/components/prism-markup-templating');
              require('prismjs/components/prism-c');
              require('prismjs/components/prism-cpp');
              require('prismjs/components/prism-csharp');
              require('prismjs/components/prism-css');
              require('prismjs/components/prism-java');
              require('prismjs/components/prism-javascript');
              require('prismjs/components/prism-markup');
              require('prismjs/components/prism-php');
              require('prismjs/components/prism-python');
              require('prismjs/components/prism-ruby');
              module.exports = { boltExport: Prism };
            },
            {
              'prismjs/components/prism-c': 1,
              'prismjs/components/prism-clike': 2,
              'prismjs/components/prism-core': 3,
              'prismjs/components/prism-cpp': 4,
              'prismjs/components/prism-csharp': 5,
              'prismjs/components/prism-css': 6,
              'prismjs/components/prism-java': 7,
              'prismjs/components/prism-javascript': 8,
              'prismjs/components/prism-markup': 10,
              'prismjs/components/prism-markup-templating': 9,
              'prismjs/components/prism-php': 11,
              'prismjs/components/prism-python': 12,
              'prismjs/components/prism-ruby': 13
            }
          ]
        }, {}, [14])(14);
      }));
      var prism = window.Prism;
      window.Prism = oldprism;
      return prism;
    }(undefined, exports$1, module, undefined));
    var Prism$1 = module.exports.boltExport;

    var getLanguages = function (editor) {
      return editor.getParam('codeblock_languages');
    };
    var getThemes = function (editor) {
      return editor.getParam('codeblock_themes');
    };
    var useGlobalPrismJS = function (editor) {
      return editor.getParam('codeblock_global_prismjs', false, 'boolean');
    };

    var get$1 = function (editor) {
      return Global.Prism && useGlobalPrismJS(editor) ? Global.Prism : Prism$1;
    };

    var getSelectedCodeBlock = function (editor) {
      var node = editor.selection ? editor.selection.getNode() : null;
      if (isCodeBlock(node)) {
        return Optional.some(node);
      }
      return Optional.none();
    };
    var insertCodeBlock = function (editor, language, code, theme) {
      editor.undoManager.transact(function () {
        var node = getSelectedCodeBlock(editor);
        code = global$7.DOM.encode(code);
        return node.fold(function () {
          editor.insertContent('<pre id="__new" class="language-' + language + ' line-numbers theme-' + theme + '">' + code + '</pre>');
          editor.selection.select(editor.$('#__new').removeAttr('id')[0]);
        }, function (n) {
          editor.dom.setAttrib(n, 'class', 'language-' + language + ' line-numbers theme-' + theme);
          n.innerHTML = code;
          get$1(editor).highlightElement(n);
          editor.selection.select(n);
        });
      });
    };
    var getCurrentCode = function (editor) {
      var node = getSelectedCodeBlock(editor);
      return node.fold(function () {
        return '';
      }, function (n) {
        n.innerHTML = n.innerHTML.replace(/<br>/g, '\n');
        return n.textContent;
      });
    };

    var getLanguages$1 = function (editor) {
      var defaultLanguages = [
        {
          text: 'HTML/XML',
          value: 'markup'
        },
        {
          text: 'JavaScript',
          value: 'javascript'
        },
        {
          text: 'CSS',
          value: 'css'
        },
        {
          text: 'PHP',
          value: 'php'
        },
        {
          text: 'Ruby',
          value: 'ruby'
        },
        {
          text: 'Python',
          value: 'python'
        },
        {
          text: 'Java',
          value: 'java'
        },
        {
          text: 'C',
          value: 'c'
        },
        {
          text: 'C#',
          value: 'csharp'
        },
        {
          text: 'C++',
          value: 'cpp'
        }
      ];
      var customLanguages = getLanguages(editor);
      return customLanguages ? customLanguages : defaultLanguages;
    };
    var getCurrentLanguage = function (editor, fallback) {
      var node = getSelectedCodeBlock(editor);
      return node.fold(function () {
        return fallback;
      }, function (n) {
        var matches = n.className.match(/language-(\w+)/);
        return matches ? matches[1] : fallback;
      });
    };

    var getThemes$1 = function (editor) {
      var defaultThemes = [
        {
          text: 'default',
          value: 'solarizedlight'
        },
        {
          text: 'dark',
          value: 'tomorrow'
        }
      ];
      var customThemes = getThemes(editor);
      return customThemes ? customThemes : defaultThemes;
    };
    var getCurrentThemes = function (editor, fallback) {
      var node = getSelectedCodeBlock(editor);
      return node.fold(function () {
        return fallback;
      }, function (n) {
        var matches = n.className.match(/theme-(\w+)/);
        return matches ? matches[1] : fallback;
      });
    };

    var open = function (editor) {
      var languages = getLanguages$1(editor);
      var defaultLanguage = head(languages).fold(function () {
        return '';
      }, function (l) {
        return l.value;
      });
      var currentLanguage = getCurrentLanguage(editor, defaultLanguage);
      var themes = getThemes$1(editor);
      var defaultThemes = head(themes).fold(function () {
        return '';
      }, function (l) {
        return l.value;
      });
      var currentTheme = getCurrentThemes(editor, defaultThemes);
      var currentCode = getCurrentCode(editor);
      editor.windowManager.open({
        title: 'Insert/edit code block',
        size: 'large',
        body: {
          type: 'panel',
          items: [
            {
              type: 'selectbox',
              name: 'themes',
              label: '\u4ee3\u7801\u5757\u4e3b\u9898',
              items: themes
            },
            {
              type: 'selectbox',
              name: 'language',
              label: '\u7f16\u7a0b\u8bed\u8a00',
              items: languages
            },
            {
              type: 'textarea',
              name: 'code',
              label: '\u8f93\u5165\u4ee3\u7801',
              maximized: true
            }
          ]
        },
        buttons: [
          {
            type: 'cancel',
            name: 'closeButton',
            text: '\u53d6\u6d88'
          },
          {
            type: 'submit',
            name: 'submitButton',
            text: '\u786e\u8ba4',
            primary: true
          }
        ],
        initialData: {
          language: currentLanguage,
          code: currentCode,
          themes: currentTheme
        },
        onSubmit: function (api) {
          var data = api.getData();
          insertCodeBlock(editor, data.language, data.code, data.themes);
          api.close();
        }
      });
    };

    var register$2 = function (editor) {
      editor.addCommand('codeblock', function () {
        var node = editor.selection.getNode();
        if (editor.selection.isCollapsed() || isCodeBlock(node)) {
          open(editor);
        } else {
          editor.formatter.toggle('code');
        }
      });
    };

    var setup = function (editor) {
      var $ = editor.$;
      editor.on('PreProcess', function (e) {
        $('pre[contenteditable=false]', e.node).filter(trimArg(isCodeBlock)).each(function (idx, elm) {
          var $elm = $(elm), code = elm.textContent;
          $elm.attr('class', $.trim($elm.attr('class')));
          $elm.removeAttr('contentEditable');
          $elm.empty().append($('<code></code>').each(function () {
            this.textContent = code;
          }));
        });
      });
      editor.on('SetContent', function () {
        var unprocessedCodeSamples = $('pre').filter(trimArg(isCodeBlock)).filter(function (idx, elm) {
          return elm.contentEditable !== 'false';
        });
        if (unprocessedCodeSamples.length) {
          editor.undoManager.transact(function () {
            unprocessedCodeSamples.each(function (idx, elm) {
              $(elm).find('br').each(function (idx, elm) {
                elm.parentNode.replaceChild(editor.getDoc().createTextNode('\n'), elm);
              });
              elm.contentEditable = 'false';
              elm.innerHTML = editor.dom.encode(elm.textContent);
              get$1(editor).highlightElement(elm);
              elm.className = $.trim(elm.className);
            });
          });
        }
      });
    };

    var isCodeBlockSelection = function (editor) {
      var node = editor.selection.getStart();
      return editor.dom.is(node, 'pre[class*="language-"]');
    };
    var register$3 = function (editor) {
      editor.ui.registry.addToggleButton('cherry-codeblock', {
        icon: 'cherry-code-block',
        tooltip: 'Insert/edit code block',
        onAction: function () {
          return open(editor);
        },
        onSetup: function (api) {
          var nodeChangeHandler = function () {
            api.setActive(isCodeBlockSelection(editor));
          };
          editor.on('NodeChange', nodeChangeHandler);
          return function () {
            return editor.off('NodeChange', nodeChangeHandler);
          };
        }
      });
      editor.ui.registry.addMenuItem('cherry-codeblock', {
        text: 'codeblock',
        icon: 'cherry-code-block',
        onAction: function () {
          return open(editor);
        }
      });
    };

    function Plugin$k () {
      global$1.add('cherry-codeblock', function (editor) {
        setup(editor);
        register$3(editor);
        register$2(editor);
        editor.on('dblclick', function (ev) {
          if (isCodeBlock(ev.target)) {
            open(editor);
          }
        });
      });
    }

    Plugin$k();

}());
