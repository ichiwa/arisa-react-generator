"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generate = generate;
exports.default = generateTemplates;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

var _inquirer = require("inquirer");

var _hogan = _interopRequireDefault(require("hogan.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const templateDir = `${process.cwd()}/templates`;
const STATE_TYPE = {
  STATE_LESS: 'Stateless',
  STATE_FULL: 'Statefull'
};

async function generate({
  componentName,
  stateType,
  reduxConnect,
  exportDiretory
}) {
  let templateName = '';

  if (stateType === STATE_TYPE.STATE_FULL) {
    templateName = `${templateDir}/statefullComponent.js`;
  } else if (stateType === STATE_TYPE.STATE_LESS) {
    templateName = `${templateDir}/statelessComponent.js`;
  }

  const file = _fsExtra.default.readFileSync(templateName, {
    encoding: 'UTF-8'
  });

  const template = _hogan.default.compile(file);

  const output = template.render({
    componentName,
    reduxConnect
  });

  _fsExtra.default.ensureDirSync(exportDiretory);

  _fsExtra.default.writeFileSync(_path.default.normalize(`${exportDiretory}/${componentName}.js`), output);
}

async function generateTemplates() {
  const exists = _fsExtra.default.pathExistsSync(templateDir);

  if (!exists) {
    console.log(`Generate template files first by executing 'templates' command.`.yellow);
    process.exit(0);
  }

  const askComponentName = {
    type: 'input',
    name: 'componentName',
    message: "What's component name?",
    default: 'MyComponent'
  };
  const askStateType = {
    type: 'list',
    name: 'stateType',
    message: 'Stateless or Statefull?',
    choices: [{
      value: STATE_TYPE.STATE_LESS,
      name: 'Stateless'
    }, {
      value: STATE_TYPE.STATE_FULL,
      name: 'Statefull'
    }]
  };
  const askReduxConnect = {
    type: 'confirm',
    name: 'reduxConnect',
    message: 'Support redux connect?',
    default: true
  };
  const askExportToDirectory = {
    type: 'input',
    name: 'exportDiretory',
    message: 'Which diretory do you want to export?',
    default: process.cwd()
  };
  const askLastConfirm = {
    type: 'confirm',
    name: 'lastConfirm',
    message: 'Are you sure to generate component?',
    default: false
  };
  const {
    componentName,
    stateType,
    reduxConnect,
    exportDiretory,
    lastConfirm
  } = await (0, _inquirer.prompt)([askComponentName, askStateType, askReduxConnect, askExportToDirectory, askLastConfirm]);

  if (!lastConfirm) {
    console.log(`canceled`.blue);
    process.exit(0);
  }

  const normalizedDirectory = _path.default.normalize(exportDiretory);

  await generate({
    componentName,
    stateType,
    reduxConnect,
    exportDiretory: normalizedDirectory
  });
  console.log(_path.default.normalize(`${normalizedDirectory}/${componentName}.js`) + ' created.'.green);
}