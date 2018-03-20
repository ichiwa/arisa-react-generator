import fs from 'fs-extra';
import path from 'path';

export default async function generateTemplates(destination) {
  try {
    const source = `${__dirname}./../templates`;
    fs.ensureDirSync(path.normalize(destination));
    fs.copySync(source, path.normalize(destination));
  } catch (err) {
    throw err;
  }
}
