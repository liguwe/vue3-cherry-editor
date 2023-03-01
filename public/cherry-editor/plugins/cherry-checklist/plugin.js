(function () {
    'use strict';

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

    var global$1 = tinymce.util.Tools.resolve('tinymce.dom.TreeWalker');

    var global$2 = tinymce.util.Tools.resolve('tinymce.util.Tools');

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

    function Plugin () {
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
      global.add('cherry-checklist', Wn);
    }

    Plugin();

}());
