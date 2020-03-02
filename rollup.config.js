'use strict';

import 'rollup';
import typescript from 'rollup-plugin-typescript';
import buble from 'rollup-plugin-buble';
import replace from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import minify from 'rollup-plugin-babel-minify';
import copy from 'rollup-plugin-copy';
import rollupNodeResolve from 'rollup-plugin-node-resolve';
import rollupJson from 'rollup-plugin-json';

/**
 * 
 * @param {string} parameters 
 * @returns {object} paramaters passed from command line are added to the returned object
 */
const paramsToJson = (parameters) => {
    const obj = {}
    if (parameters) {
        parameters.split('+').map((item) => {
            const [k, v] = item.split('=')
            v ? obj[k] = v : null
        })
    }
    return obj
}

let outputPath = './build';
let commandLineParams = {};

/**
 * process the command line parameters and sets the rollup variables 
 */
const processCommandLineParameters = () => {

    try {
        const argsLength = process.argv.length;
        if (argsLength < 3) {
            return;
        }

        const commandIndex = process.argv.indexOf('--config-');
        if (commandIndex == -1) {
            return;
        }

        const command = process.argv[commandIndex + 1].replace('[', '').replace(']', '');
        if (!command) {
            return;
        }

        commandLineParams = paramsToJson(command);

        if (commandLineParams.output) {
            outputPath = commandLineParams.output;
        }

        if (!commandLineParams) {
            commandLineParams = {};
        }
    }
    catch (e) {
        console.log(e);
    }
}

processCommandLineParameters();

const plugins = [
    rollupNodeResolve({ jsnext: true, preferBuiltins: true, browser: true }),
    rollupJson(),
    babel({
        exclude: 'node_modules/**'
    }),
    typescript({
        typescript: require('typescript')
    }),
   
    buble(),
    // replace({
    //     exclude: 'node_modules/**'
    // }),

    commonjs({
        namedExports: {
            'node_modules/lodash/lodash.js': [
                'get',
                'set',
            ]
        }
    }),
    
];

const { _uglify, _minify } = commandLineParams;
if (_uglify) {
    plugins.push(uglify());
}
if (_minify) {
    plugins.push(minify({
        // Options for babel-minify.
    }));
}

plugins.push(copy({
    hook: 'writeBundle',
    copyOnce: false,
    targets: [
        { src: 'dist/spalib.js', dest: outputPath }
    ]
}));

/**
 * Default/development Build
 */
const config = {
    // input: 'src/SpaLib.ts',
    input: 'app/modules/home/HomeModule.ts',
    output: {
        file: './dist/spalib.js',
        format: "iife",
        name: "roll"
    },
    plugins,
}

export default config