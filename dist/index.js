#!/usr/bin/env node
"use strict";

var _colors = _interopRequireDefault(require("colors"));

var _yargonaut = _interopRequireDefault(require("yargonaut"));

var _yargs = _interopRequireDefault(require("yargs"));

var _package = _interopRequireDefault(require("../package.json"));

var _generateComponents = _interopRequireDefault(require("./generateComponents"));

var _generateTemplates = _interopRequireDefault(require("./generateTemplates"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_yargonaut.default.style('blue'); // Setup CLI


_yargs.default.usage(`${`arisa-templates\n\n`.blue.bold}Simple templates generator for the react component.`).command('templates', 'Generate template files', {
  destination: {
    alias: 'd',
    default: `${process.cwd()}/templates`,
    demandOption: true,
    describe: 'Where generate template files'
  }
}, async ({
  destination
}) => {
  console.log(`Copy templates to ${destination}`.green);
  await (0, _generateTemplates.default)(destination);
  console.log(`Generated templates files...`.green);
}).command('$0', false, () => {}, async () => {
  await (0, _generateComponents.default)();
}).version(_package.default.version).help().alias('h', 'help').parse();