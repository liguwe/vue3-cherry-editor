(function () {
    'use strict';

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

    var tipsICON = '\n<svg version="1.1" id="\u56fe\u5c42_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"\n\t viewBox="0 0 850.394 850.394" enable-background="new 0 0 850.394 850.394" xml:space="preserve">\n<g>\n\t<path fill="currentColor" d="M817.124,260.161c-21.417-50.635-52.071-96.104-91.11-135.144c-39.04-39.04-84.509-69.694-135.145-91.111\n\t\tc-52.44-22.18-108.128-33.426-165.516-33.426c-57.388,0-113.075,11.246-165.515,33.426\n\t\tc-50.635,21.417-96.104,52.071-135.144,91.111S55,209.525,33.583,260.161c-22.18,52.44-33.426,108.127-33.426,165.515\n\t\tc0,57.389,11.246,113.076,33.426,165.516C55,641.827,85.655,687.297,124.694,726.336c39.04,39.04,84.509,69.693,135.144,91.111\n\t\tc52.44,22.18,108.127,33.426,165.515,33.426c57.388,0,113.075-11.246,165.516-33.426c50.636-21.418,96.104-52.071,135.145-91.111\n\t\tc39.039-39.039,69.693-84.509,91.11-135.145c22.181-52.439,33.427-108.127,33.427-165.516\n\t\tC850.551,368.288,839.305,312.601,817.124,260.161z M425.354,790.873c-201.37,0-365.196-163.827-365.196-365.197\n\t\tS223.983,60.479,425.354,60.479s365.197,163.826,365.197,365.196S626.724,790.873,425.354,790.873z"/>\n\t<path fill="currentColor" d="M424.885,277.948c31.312,0,56.693-25.383,56.693-56.692c0-31.312-25.381-56.692-56.693-56.692\n\t\tc-31.31,0-56.692,25.38-56.692,56.692C368.193,252.566,393.576,277.948,424.885,277.948z"/>\n\t<path fill="currentColor" d="M514.503,617.129h-58.617V363.414c0-16.568-13.431-30-30-30h-66.92c-16.568,0-30,13.432-30,30\n\t\ts13.432,30,30,30h36.92v223.715h-60.617c-16.568,0-30,13.432-30,30s13.432,30,30,30h179.234c16.568,0,30-13.432,30-30\n\t\tS531.071,617.129,514.503,617.129z"/>\n</g>\n</svg>\n';

    var infoICON = '\n<svg\n version="1.1" id="\u56fe\u5c42_1"\nxmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"\n\t viewBox="0 0 850.394 850.394" enable-background="new 0 0 850.394 850.394" xml:space="preserve">\n<g>\n\t<path fill="currentColor" d="M815.329,535.818c0.041-0.049,0.086-0.097,0.127-0.146c3.987-4.826,6.493-10.921,6.823-17.588\n\t\tc0.025-0.501,0.038-1.003,0.038-1.507V42.861C822.316,19.228,803.055,0,779.379,0H71.015C47.339,0,28.077,19.228,28.077,42.861\n\t\tv764.671c0,23.634,19.262,42.861,42.938,42.861h414.914c0.132,0,0.263-0.008,0.394-0.01c0.128,0.002,0.255,0.01,0.384,0.01\n\t\tc10.3,0,19.385-5.193,24.788-13.102L813.44,537.88c0.018-0.018,0.034-0.037,0.052-0.054c0.187-0.187,0.367-0.381,0.55-0.573\n\t\tc0.154-0.161,0.312-0.319,0.461-0.484C814.786,536.459,815.059,536.14,815.329,535.818z M88.077,60h674.239v426.577H503.397\n\t\tc-25.745,0-46.69,20.902-46.69,46.594v257.223H88.077V60z M719.456,546.577L516.707,747.625V546.577H719.456z"/>\n\t<path fill="currentColor" d="M253.41,252.283h343.573c11.046,0,20-8.954,20-20s-8.954-20-20-20H253.41c-11.045,0-20,8.954-20,20\n\t\tS242.365,252.283,253.41,252.283z"/>\n\t<path fill="currentColor" d="M328.302,414.976H253.41c-11.046,0-20,8.954-20,20s8.954,20,20,20h74.892c11.046,0,20-8.954,20-20\n\t\tS339.348,414.976,328.302,414.976z"/>\n</g>\n</svg>\n';

    var okICON = '\n<svg version="1.1" id="\u56fe\u5c42_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"\n\t viewBox="0 0 850.394 850.394" enable-background="new 0 0 850.394 850.394" xml:space="preserve">\n<g>\n\t<path fill="currentColor" d="M816.967,259.681c-21.417-50.635-52.071-96.104-91.11-135.144c-39.04-39.04-84.509-69.694-135.145-91.111\n\t\tC538.271,11.246,482.584,0,425.196,0S312.121,11.246,259.682,33.426c-50.636,21.417-96.105,52.071-135.145,91.111\n\t\ts-69.694,84.509-91.111,135.144C11.246,312.121,0,367.808,0,425.196c0,57.389,11.246,113.076,33.426,165.516\n\t\tc21.417,50.636,52.071,96.105,91.111,135.145c39.04,39.04,84.509,69.693,135.145,91.111\n\t\tc52.439,22.18,108.127,33.426,165.515,33.426s113.075-11.246,165.516-33.426c50.636-21.418,96.104-52.071,135.145-91.111\n\t\tc39.039-39.039,69.693-84.509,91.11-135.145c22.181-52.439,33.427-108.127,33.427-165.516\n\t\tC850.394,367.808,839.147,312.121,816.967,259.681z M425.196,790.394C223.826,790.394,60,626.566,60,425.196S223.826,60,425.196,60\n\t\ts365.197,163.826,365.197,365.196S626.566,790.394,425.196,790.394z"/>\n\t<path fill="currentColor" d="M630.194,258.198L362.882,527.866L219.263,382.981c-11.664-11.767-30.659-11.85-42.426-0.186\n\t\tc-11.767,11.665-11.85,30.659-0.186,42.426L341.576,591.6c5.634,5.683,13.304,8.88,21.306,8.88s15.672-3.197,21.306-8.88\n\t\tl288.618-291.161c11.665-11.767,11.581-30.762-0.186-42.426C660.854,246.349,641.858,246.432,630.194,258.198z"/>\n</g>\n</svg>\n';

    var warningICON = '<i>\n<?xml version="1.0" encoding="utf-8"?>\n<svg version="1.1" id="\u56fe\u5c42_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"\n\t viewBox="0 0 850.394 850.394" enable-background="new 0 0 850.394 850.394" xml:space="preserve">\n<g>\n\t<path fill="currentColor" d="M846.854,780.942L451.657,41.18c-5.217-9.766-15.389-15.864-26.46-15.864s-21.244,6.098-26.461,15.864\n\t\tL3.539,780.942c-4.967,9.298-4.689,20.521,0.731,29.562S19.458,825.078,30,825.078h790.394c10.542,0,20.31-5.533,25.73-14.574\n\t\tC851.544,801.463,851.821,790.24,846.854,780.942z M80.039,765.078l345.158-646.095l345.158,646.095H80.039z"/>\n\t<path fill="currentColor" d="M395.39,308.476v247c0,16.568,13.432,30,30,30c16.569,0,30-13.432,30-30v-247c0-16.568-13.432-30-30-30\n\t\tC408.822,278.476,395.39,291.907,395.39,308.476z"/>\n\t<path fill="currentColor" d="M425.39,646.476c-16.568,0-30,13.432-30,30v38c0,16.568,13.432,30,30,30c16.569,0,30-13.432,30-30v-38\n\t\tC455.391,659.907,441.959,646.476,425.39,646.476z"/>\n</g>\n</svg>\n</i>';

    var errorICON = '\n<svg version="1.1" id="\u56fe\u5c42_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"\n\t viewBox="0 0 850.394 850.394" enable-background="new 0 0 850.394 850.394" xml:space="preserve">\n<g>\n\t<path fill="currentColor" d="M819.239,265.205c-21.402-52.767-52.833-100.1-93.417-140.684c-40.576-40.576-87.9-71.998-140.659-93.391\n\t\tC534.218,10.471,480.395-0.002,425.188,0C369.98,0.003,316.155,10.481,265.207,31.145c-52.763,21.4-100.094,52.828-140.678,93.412\n\t\tc-40.567,40.567-71.985,87.888-93.381,140.648C10.488,316.151,0.008,369.976,0,425.185c-0.007,55.214,10.459,109.043,31.11,159.991\n\t\tc21.389,52.77,52.808,100.1,93.383,140.674c40.583,40.583,87.92,72.011,140.698,93.408c50.956,20.66,104.792,31.135,160.013,31.135\n\t\tc55.217,0,109.049-10.474,159.999-31.13c52.766-21.392,100.09-52.809,140.656-93.376c40.584-40.584,72.011-87.917,93.407-140.687\n\t\tc20.659-50.952,31.132-104.784,31.126-159.999C850.388,369.989,839.906,316.158,819.239,265.205z M683.434,683.461\n\t\tc-68.956,68.956-160.664,106.933-258.229,106.932c-97.577,0-189.304-37.989-258.284-106.969\n\t\tC97.958,614.462,59.987,522.755,60,425.193c0.013-97.551,37.997-189.252,106.955-258.21l0,0\n\t\tC235.94,97.999,327.65,60.005,425.191,60c97.537-0.004,189.235,37.977,258.206,106.947\n\t\tc68.988,68.989,106.987,160.708,106.996,258.26C790.402,522.762,752.416,614.479,683.434,683.461z"/>\n\t<path fill="currentColor" d="M606.762,243.632c-11.715-11.716-30.711-11.716-42.426,0L425.197,382.771L286.059,243.632\n\t\tc-11.716-11.716-30.711-11.716-42.427,0c-11.715,11.716-11.715,30.711,0,42.427l139.139,139.138L243.632,564.336\n\t\tc-11.715,11.716-11.715,30.71,0,42.426c5.858,5.858,13.536,8.787,21.213,8.787s15.355-2.929,21.213-8.787l139.138-139.138\n\t\tl139.139,139.138c5.857,5.858,13.535,8.787,21.213,8.787s15.355-2.929,21.213-8.787c11.716-11.716,11.716-30.71,0-42.426\n\t\tL467.623,425.197l139.138-139.138C618.478,274.343,618.478,255.348,606.762,243.632z"/>\n</g>\n</svg>\n';

    var deleteICON = '\n<svg version="1.1" id="\u56fe\u5c42_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"\n\t viewBox="0 0 850.394 850.394" enable-background="new 0 0 850.394 850.394" xml:space="preserve">\n<g>\n\t<path fill="currentColor" d="M814.887,72.207H700.737H561.039V44.433c0-2.701-0.255-5.341-0.719-7.911\n\t\tc0.466-2.101,0.719-4.281,0.719-6.522c0-16.568-13.432-30-30-30h-14.433H333.789h-14.434c-16.568,0-30,13.432-30,30\n\t\tc0,2.241,0.253,4.421,0.719,6.522c-0.464,2.569-0.719,5.21-0.719,7.911v27.774H149.659H35.507c-16.568,0-30,13.432-30,30\n\t\ts13.432,30,30,30h71.032v672.142c0,25.39,19.343,46.045,43.12,46.045h551.079c23.776,0,43.119-20.655,43.119-46.045V132.207h71.03\n\t\tc16.568,0,30-13.432,30-30S831.455,72.207,814.887,72.207z M349.355,60h151.684v12.207H349.355V60z M683.856,790.394H166.539\n\t\tV132.207h167.25h182.817h167.25V790.394z"/>\n\t<path fill="currentColor" d="M328.978,286.972c-16.568,0-30,13.432-30,30V605.63c0,16.568,13.432,30,30,30s30-13.432,30-30V316.972\n\t\tC358.978,300.403,345.546,286.972,328.978,286.972z"/>\n\t<path fill="currentColor" d="M491.417,316.972V605.63c0,16.568,13.432,30,30,30s30-13.432,30-30V316.972c0-16.568-13.432-30-30-30\n\t\tS491.417,300.403,491.417,316.972z"/>\n</g>\n</svg>\n';

    function Plugin () {
      global.add('cherry-panel', function plugin(editor) {
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

    Plugin();

}());
