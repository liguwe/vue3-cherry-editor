(function () {
    'use strict';

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

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

    function Plugin () {
      global.add('cherry-table', registryPlugin);
    }

    Plugin();

}());
