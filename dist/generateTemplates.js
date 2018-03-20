"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateTemplates;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function generateTemplates(destination) {
  try {
    const source = `${__dirname}./../templates`;

    _fsExtra.default.ensureDirSync(_path.default.normalize(destination));

    _fsExtra.default.copySync(source, _path.default.normalize(destination));
  } catch (err) {
    throw err;
  }
}