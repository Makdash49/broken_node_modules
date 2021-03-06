/* @flow */
/* global BabelFileResult */
/* global BabelFileMetadata */

"use strict";

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

exports.__esModule = true;

var _helpersNormalizeAst = require("../helpers/normalize-ast");

var _helpersNormalizeAst2 = _interopRequireDefault(_helpersNormalizeAst);

var _plugin = require("./plugin");

var _plugin2 = _interopRequireDefault(_plugin);

var _file = require("./file");

var _file2 = _interopRequireDefault(_file);

var Pipeline = (function () {
  function Pipeline() {
    _classCallCheck(this, Pipeline);
  }

  Pipeline.prototype.lint = function lint(code /*: string*/) /*: BabelFileResult*/ {
    var opts /*:: ?: Object*/ = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    opts.code = false;
    opts.mode = "lint";
    return this.transform(code, opts);
  };

  Pipeline.prototype.pretransform = function pretransform(code /*: string*/, opts /*:: ?: Object*/) /*: BabelFileResult*/ {
    var file = new _file2["default"](opts, this);
    return file.wrap(code, function () {
      file.addCode(code);
      file.parseCode(code);
      return file;
    });
  };

  Pipeline.prototype.transform = function transform(code /*: string*/, opts /*:: ?: Object*/) /*: BabelFileResult*/ {
    var file = new _file2["default"](opts, this);
    return file.wrap(code, function () {
      file.addCode(code);
      file.parseCode(code);
      return file.transform();
    });
  };

  Pipeline.prototype.analyse = function analyse(code /*: string*/, opts /*: Object*/, visitor /*:: ?: Object*/) /*: ?BabelFileMetadata*/ {
    if (opts === undefined) opts = {};

    opts.code = false;
    if (visitor) {
      opts.plugins = opts.plugins || [];
      opts.plugins.push(new _plugin2["default"]({ visitor: visitor }));
    }
    return this.transform(code, opts).metadata;
  };

  Pipeline.prototype.transformFromAst = function transformFromAst(ast /*: Object*/, code /*: string*/, opts /*: Object*/) /*: BabelFileResult*/ {
    ast = _helpersNormalizeAst2["default"](ast);

    var file = new _file2["default"](opts, this);
    return file.wrap(code, function () {
      file.addCode(code);
      file.addAst(ast);
      return file.transform();
    });
  };

  return Pipeline;
})();

exports["default"] = Pipeline;
module.exports = exports["default"];