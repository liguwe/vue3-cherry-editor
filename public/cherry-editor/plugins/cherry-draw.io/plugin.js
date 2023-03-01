(function () {
    'use strict';

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

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
      global.add('cherry-draw.io', function plugin(editor) {
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

}());
