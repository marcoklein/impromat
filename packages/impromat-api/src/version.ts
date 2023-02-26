import fs from 'fs';
import path from 'path';

export function getPackageJsonVersion() {
  const version = JSON.parse(
    fs.readFileSync(path.join('package.json')).toString(),
  ).version;
  return version;
}
