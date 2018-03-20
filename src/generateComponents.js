import fs from 'fs-extra';
import path from 'path';
import { prompt } from 'inquirer';
import Hogan from 'hogan.js';

const templateDir = `${process.cwd()}/templates`;

const STATE_TYPE = {
  STATE_LESS: 'Stateless',
  STATE_FULL: 'Statefull',
};

export async function generate({ componentName, stateType, reduxConnect, exportDiretory }) {
  let templateName = '';
  if (stateType === STATE_TYPE.STATE_FULL) {
    templateName = `${templateDir}/statefullComponent.js`;
  } else if (stateType === STATE_TYPE.STATE_LESS) {
    templateName = `${templateDir}/statelessComponent.js`;
  }
  const file = fs.readFileSync(templateName, { encoding: 'UTF-8' });
  const template = Hogan.compile(file);
  const output = template.render({ componentName, reduxConnect });
  fs.ensureDirSync(exportDiretory);
  fs.writeFileSync(path.normalize(`${exportDiretory}/${componentName}.js`), output);
}

export default async function generateTemplates() {
  const exists = fs.pathExistsSync(templateDir);
  if (!exists) {
    console.log(`Generate template files first by executing 'templates' command.`.yellow);
    process.exit(0);
  }
  const askComponentName = {
    type: 'input',
    name: 'componentName',
    message: "What's component name?",
    default: 'MyComponent',
  };
  const askStateType = {
    type: 'list',
    name: 'stateType',
    message: 'Stateless or Statefull?',
    choices: [
      { value: STATE_TYPE.STATE_LESS, name: 'Stateless' },
      { value: STATE_TYPE.STATE_FULL, name: 'Statefull' },
    ],
  };
  const askReduxConnect = {
    type: 'confirm',
    name: 'reduxConnect',
    message: 'Support redux connect?',
    default: true,
  };
  const askExportToDirectory = {
    type: 'input',
    name: 'exportDiretory',
    message: 'Which diretory do you want to export?',
    default: process.cwd(),
  };
  const askLastConfirm = {
    type: 'confirm',
    name: 'lastConfirm',
    message: 'Are you sure to generate component?',
    default: false,
  };
  const { componentName, stateType, reduxConnect, exportDiretory, lastConfirm } = await prompt([
    askComponentName,
    askStateType,
    askReduxConnect,
    askExportToDirectory,
    askLastConfirm,
  ]);
  if (!lastConfirm) {
    console.log(`canceled`.blue);
    process.exit(0);
  }
  const normalizedDirectory = path.normalize(exportDiretory);
  await generate({ componentName, stateType, reduxConnect, exportDiretory: normalizedDirectory });
  console.log(path.normalize(`${normalizedDirectory}/${componentName}.js`) + ' created.'.green);
}
