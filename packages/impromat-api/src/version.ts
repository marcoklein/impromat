import * as fs from 'fs';
import * as path from 'path';

export function getPackageJsonVersion() {
  const version = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../package.json')).toString(),
  ).version;
  return version;
}
