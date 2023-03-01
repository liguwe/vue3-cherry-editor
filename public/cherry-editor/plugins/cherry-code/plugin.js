(function () {
    'use strict';

    var global$1 = tinymce.util.Tools.resolve('tinymce.PluginManager');

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

    function Plugin () {
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

    Plugin();

}());
