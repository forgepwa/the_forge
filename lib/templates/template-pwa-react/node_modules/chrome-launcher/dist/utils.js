/**
 * @license Copyright 2017 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const child_process_1 = require("child_process");
const mkdirp = require("mkdirp");
const isWsl = require('is-wsl');
function defaults(val, def) {
    return typeof val === 'undefined' ? def : val;
}
exports.defaults = defaults;
function delay(time) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => setTimeout(resolve, time));
    });
}
exports.delay = delay;
function getPlatform() {
    return isWsl ? 'wsl' : process.platform;
}
exports.getPlatform = getPlatform;
function makeTmpDir() {
    switch (getPlatform()) {
        case 'darwin':
        case 'linux':
            return makeUnixTmpDir();
        case 'wsl':
            // We populate the user's Windows temp dir so the folder is correctly created later
            process.env.TEMP = getLocalAppDataPath(process.env.PATH);
        case 'win32':
            return makeWin32TmpDir();
        default:
            throw new Error(`Platform ${getPlatform()} is not supported`);
    }
}
exports.makeTmpDir = makeTmpDir;
function toWinDirFormat(dir = '') {
    const results = /\/mnt\/([a-z])\//.exec(dir);
    if (!results) {
        return dir;
    }
    const driveLetter = results[1];
    return dir.replace(`/mnt/${driveLetter}/`, `${driveLetter.toUpperCase()}:\\`)
        .replace(/\//g, '\\');
}
exports.toWinDirFormat = toWinDirFormat;
function getLocalAppDataPath(path) {
    const userRegExp = /\/mnt\/([a-z])\/Users\/([^\/:]+)\/AppData\//;
    const results = userRegExp.exec(path) || [];
    return `/mnt/${results[1]}/Users/${results[2]}/AppData/Local`;
}
exports.getLocalAppDataPath = getLocalAppDataPath;
function makeUnixTmpDir() {
    return child_process_1.execSync('mktemp -d -t lighthouse.XXXXXXX').toString().trim();
}
function makeWin32TmpDir() {
    const winTmpPath = process.env.TEMP || process.env.TMP ||
        (process.env.SystemRoot || process.env.windir) + '\\temp';
    const randomNumber = Math.floor(Math.random() * 9e7 + 1e7);
    const tmpdir = path_1.join(winTmpPath, 'lighthouse.' + randomNumber);
    mkdirp.sync(tmpdir);
    return tmpdir;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUNILFlBQVksQ0FBQzs7Ozs7Ozs7OztBQUViLCtCQUEwQjtBQUMxQixpREFBdUM7QUFDdkMsaUNBQWlDO0FBQ2pDLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUVoQyxrQkFBNEIsR0FBa0IsRUFBRSxHQUFNO0lBQ3BELE1BQU0sQ0FBQyxPQUFPLEdBQUcsS0FBSyxXQUFXLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUNoRCxDQUFDO0FBRkQsNEJBRUM7QUFFRCxlQUE0QixJQUFZOztRQUN0QyxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsT0FBTyxJQUFJLFVBQVUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMzRCxDQUFDO0NBQUE7QUFGRCxzQkFFQztBQUVEO0lBQ0UsTUFBTSxDQUFDLEtBQUssR0FBRyxLQUFLLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztBQUMxQyxDQUFDO0FBRkQsa0NBRUM7QUFFRDtJQUNFLE1BQU0sQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN0QixLQUFLLFFBQVEsQ0FBQztRQUNkLEtBQUssT0FBTztZQUNWLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUMxQixLQUFLLEtBQUs7WUFDUixtRkFBbUY7WUFDbkYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsbUJBQW1CLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzRCxLQUFLLE9BQU87WUFDVixNQUFNLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDM0I7WUFDRSxNQUFNLElBQUksS0FBSyxDQUFDLFlBQVksV0FBVyxFQUFFLG1CQUFtQixDQUFDLENBQUM7SUFDbEUsQ0FBQztBQUNILENBQUM7QUFiRCxnQ0FhQztBQUVELHdCQUErQixNQUFjLEVBQUU7SUFDN0MsTUFBTSxPQUFPLEdBQUcsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNiLE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDYixDQUFDO0lBRUQsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9CLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsV0FBVyxHQUFHLEVBQUUsR0FBRyxXQUFXLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQztTQUN4RSxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzVCLENBQUM7QUFURCx3Q0FTQztBQUVELDZCQUFvQyxJQUFZO0lBQzlDLE1BQU0sVUFBVSxHQUFHLDZDQUE2QyxDQUFDO0lBQ2pFLE1BQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBRTVDLE1BQU0sQ0FBQyxRQUFRLE9BQU8sQ0FBQyxDQUFDLENBQUMsVUFBVSxPQUFPLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDO0FBQ2hFLENBQUM7QUFMRCxrREFLQztBQUVEO0lBQ0UsTUFBTSxDQUFDLHdCQUFRLENBQUMsaUNBQWlDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUN2RSxDQUFDO0FBRUQ7SUFDRSxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUc7UUFDbEQsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQztJQUM5RCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDM0QsTUFBTSxNQUFNLEdBQUcsV0FBSSxDQUFDLFVBQVUsRUFBRSxhQUFhLEdBQUcsWUFBWSxDQUFDLENBQUM7SUFFOUQsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwQixNQUFNLENBQUMsTUFBTSxDQUFDO0FBQ2hCLENBQUMifQ==