/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
"use strict";

import path from "node:path";
import fs from "node:fs";
import { pathToFileURL } from "node:url";

import colours from "./colours.js";

const configfile: string = path.resolve(process.argv[2]);
if (!fs.existsSync(configfile)) {
    console.log(`${colours.redText}Could not find config file ${path.basename(configfile)}!${colours.resetColor}`);
    process.exit(1);
} else if (fs.lstatSync(configfile).isDirectory()) {
    console.log(`${colours.redText}${path.basename(configfile)} is a directory!${colours.resetColor}`);
    console.log(fs.readdirSync(configfile))
    process.exit(1);
} else if(!fs.lstatSync(configfile).isFile()) {
    console.log(`${colours.redText}${path.basename(configfile)} is not a file!${colours.resetColor}`);
    process.exit(1);
}

const main = async() => {
    const config = (await import(pathToFileURL(configfile).toString()))["default"];

    config.paths.forEach((p: string) => {
        if (!fs.existsSync(path.resolve(p))){
            console.log(`${colours.redText}Couln't resolve path ${p}${colours.resetColor}`);
        }
    });
}

main();