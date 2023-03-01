(function () {
    'use strict';

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

    var global$1 = tinymce.util.Tools.resolve('tinymce.util.LocalStorage');

    var global$2 = tinymce.util.Tools.resolve('tinymce.util.I18n');

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
        global$1.setItem(format === 'forecolor' ? 'choose-colors' : 'back-colors', JSON.stringify(cache));
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
      var storageString = global$1.getItem(name);
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

    function Plugin () {
      var backCmdName = 'hilitecolor';
      var textCmdName = 'forecolor';
      global.add('cherry-colorpicker', function plugin(editor) {
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

    Plugin();

}());
