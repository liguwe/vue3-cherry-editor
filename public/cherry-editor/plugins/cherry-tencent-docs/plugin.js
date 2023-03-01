(function () {
    'use strict';

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

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
    function Plugin () {
      global.add('cherry-tencent-docs', function plugin(editor) {
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

    Plugin();

}());
