"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _addCorporate = _interopRequireDefault(require("./add-corporate"));
var _getAllCorporate = _interopRequireDefault(require("./get-all-corporate"));
var _getCorporate = _interopRequireDefault(require("./get-corporate"));
var _deleteCorporate = _interopRequireDefault(require("./delete-corporate"));
var _updateCorporate = _interopRequireDefault(require("./update-corporate"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * @file: index.js
 * @description: It's combine all corporate routers.
 * @author: Manas Agrawal
 */
var _default = [_addCorporate.default, _getAllCorporate.default, _getCorporate.default, _deleteCorporate.default, _updateCorporate.default];
exports.default = _default;