#!/usr/bin/env node
import colors from 'colors';
import yargonaut from 'yargonaut';
import yargs from 'yargs';
import packageInfo from '../package.json';
import generateComponens from './generateComponents';
import generateTemplates from './generateTemplates';

yargonaut.style('blue');

// Setup CLI
yargs
  .usage(`${`arisa-templates\n\n`.blue.bold}Simple templates generator for the react component.`)
  .command(
    'templates',
    'Generate template files',
    {
      destination: {
        alias: 'd',
        default: `${process.cwd()}/templates`,
        demandOption: true,
        describe: 'Where generate template files',
      },
    },
    async ({ destination }) => {
      console.log(`Copy templates to ${destination}`.green);
      await generateTemplates(destination);
      console.log(`Generated templates files...`.green);
    }
  )
  .command(
    '$0',
    false,
    () => {},
    async () => {
      await generateComponens();
    }
  )
  .version(packageInfo.version)
  .help()
  .alias('h', 'help')
  .parse();
