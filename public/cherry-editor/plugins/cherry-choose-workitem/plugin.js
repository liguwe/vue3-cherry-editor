(function () {
    'use strict';

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

    var storyIcon = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18" class="design-iconfont">\n  <path d="M3 2.25C2.58582 2.25 2.25 2.58577 2.25 3V15C2.25 15.4142 2.58582 15.75 3 15.75H15C15.4142 15.75 15.75 15.4142 15.75 15V3C15.75 2.58577 15.4142 2.25 15 2.25H3ZM7.125 5.4375H10.875C11.1857 5.4375 11.4375 5.68936 11.4375 6C11.4375 6.31064 11.1857 6.5625 10.875 6.5625H7.6875V8.4375H10.875C11.1857 8.4375 11.4375 8.68936 11.4375 9V12C11.4375 12.3106 11.1857 12.5625 10.875 12.5625H7.125C6.81427 12.5625 6.5625 12.3106 6.5625 12C6.5625 11.6894 6.81427 11.4375 7.125 11.4375H10.3125V9.5625H7.125C6.81427 9.5625 6.5625 9.31064 6.5625 9V6C6.5625 5.68936 6.81427 5.4375 7.125 5.4375Z" fill="#3582FB"/>\n</svg>\n';

    var bugIcon = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18" class="design-iconfont">\n  <path d="M7.6875 8.4375H10.3125V7.5C10.3125 6.98223 9.89277 6.5625 9.375 6.5625H7.6875V8.4375Z" fill="#F85E5E"/>\n  <path d="M7.6875 9.5625H10.3125V10.5C10.3125 11.0178 9.89277 11.4375 9.375 11.4375H7.6875V9.5625Z" fill="#F85E5E"/>\n  <path d="M3 2.25C2.58579 2.25 2.25 2.58579 2.25 3V15C2.25 15.4142 2.58579 15.75 3 15.75H15C15.4142 15.75 15.75 15.4142 15.75 15V3C15.75 2.58579 15.4142 2.25 15 2.25H3ZM7.125 5.4375H9.375C10.5141 5.4375 11.4375 6.36091 11.4375 7.5V10.5C11.4375 11.6391 10.5141 12.5625 9.375 12.5625H7.125C6.81434 12.5625 6.5625 12.3107 6.5625 12V6C6.5625 5.68934 6.81434 5.4375 7.125 5.4375Z" fill="#F85E5E"/>\n</svg>\n';

    var taskIcon = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18" class="design-iconfont">\n  <path d="M3 2.25C2.58579 2.25 2.25 2.58579 2.25 3V15C2.25 15.4142 2.58579 15.75 3 15.75H15C15.4142 15.75 15.75 15.4142 15.75 15V3C15.75 2.58579 15.4142 2.25 15 2.25H3ZM6 5.4375H12C12.3107 5.4375 12.5625 5.68934 12.5625 6C12.5625 6.31066 12.3107 6.5625 12 6.5625H9.5625V12C9.5625 12.3107 9.31066 12.5625 9 12.5625C8.68934 12.5625 8.4375 12.3107 8.4375 12V6.5625H6C5.68934 6.5625 5.4375 6.31066 5.4375 6C5.4375 5.68934 5.68934 5.4375 6 5.4375Z" fill="#3F4A56"/>\n</svg>\n';

    var chooseWorkItemLogo = '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18" class="design-iconfont">\n  <path d="M3 2.25C2.58582 2.25 2.25 2.58577 2.25 3V15C2.25 15.4142 2.58582 15.75 3 15.75H15C15.4142 15.75 15.75 15.4142 15.75 15V3C15.75 2.58577 15.4142 2.25 15 2.25H3ZM7.125 5.4375H10.875C11.1857 5.4375 11.4375 5.68936 11.4375 6C11.4375 6.31064 11.1857 6.5625 10.875 6.5625H7.6875V8.4375H10.875C11.1857 8.4375 11.4375 8.68936 11.4375 9V12C11.4375 12.3106 11.1857 12.5625 10.875 12.5625H7.125C6.81427 12.5625 6.5625 12.3106 6.5625 12C6.5625 11.6894 6.81427 11.4375 7.125 11.4375H10.3125V9.5625H7.125C6.81427 9.5625 6.5625 9.31064 6.5625 9V6C6.5625 5.68936 6.81427 5.4375 7.125 5.4375Z" fill="#3582FB"/>\n</svg>\n';

    var deleteICON = '<?xml version="1.0" encoding="utf-8"?>\n <!-- Generator: Adobe Illustrator 23.0.2, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\n <svg  width="16" height="16"  version="1.1" id="\u56fe\u5c42_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n\t\tviewBox="0 0 850.394 850.394" enable-background="new 0 0 850.394 850.394" xml:space="preserve">\n <g>\n\t <path fill="currentColor" d="M814.887,72.207H700.737H561.039V44.433c0-2.701-0.255-5.341-0.719-7.911\n\t\t c0.466-2.101,0.719-4.281,0.719-6.522c0-16.568-13.432-30-30-30h-14.433H333.789h-14.434c-16.568,0-30,13.432-30,30\n\t\t c0,2.241,0.253,4.421,0.719,6.522c-0.464,2.569-0.719,5.21-0.719,7.911v27.774H149.659H35.507c-16.568,0-30,13.432-30,30\n\t\t s13.432,30,30,30h71.032v672.142c0,25.39,19.343,46.045,43.12,46.045h551.079c23.776,0,43.119-20.655,43.119-46.045V132.207h71.03\n\t\t c16.568,0,30-13.432,30-30S831.455,72.207,814.887,72.207z M349.355,60h151.684v12.207H349.355V60z M683.856,790.394H166.539\n\t\t V132.207h167.25h182.817h167.25V790.394z"/>\n\t <path fill="currentColor" d="M328.978,286.972c-16.568,0-30,13.432-30,30V605.63c0,16.568,13.432,30,30,30s30-13.432,30-30V316.972\n\t\t C358.978,300.403,345.546,286.972,328.978,286.972z"/>\n\t <path fill="currentColor" d="M491.417,316.972V605.63c0,16.568,13.432,30,30,30s30-13.432,30-30V316.972c0-16.568-13.432-30-30-30\n\t\t S491.417,300.403,491.417,316.972z"/>\n </g>\n </svg>\n ';

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
    function Plugin () {
      global.add('cherry-choose-workitem', function plugin(editor) {
        editor.ui.registry.addIcon('workitem_story_icon', storyIcon);
        editor.ui.registry.addIcon('workitem_bug_icon', bugIcon);
        editor.ui.registry.addIcon('workitem_task_icon', taskIcon);
        editor.ui.registry.addIcon('choose_workitem_logo', chooseWorkItemLogo);
        editor.ui.registry.addIcon('workitem_delete_icon', deleteICON);
        var defaultList = {
          choose: { name: 'Choose story' },
          change: { name: 'Again insert' },
          show: { name: 'Show field' }
        };
        var defaultBubbleMenu = 'ch-workitem__change | ch-workitem__show | ch-workitem__delete';
        var workitemList = {
          delete: {
            name: 'delete',
            icon: deleteICON,
            iconName: 'workitem_delete_icon',
            color: 'rgb(222, 53, 11)',
            background: 'rgb(255, 235, 230)'
          }
        };
        editor.on('click', function (event) {
          function getCherryModuleEventInfo(event) {
            var eventflag = '';
            var path = composedPath(event);
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

    Plugin();

}());
