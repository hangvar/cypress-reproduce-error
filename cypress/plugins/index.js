// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************
const webpack = require('@cypress/webpack-preprocessor');
// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing
// promisified fs module
const fs = require('fs-extra');
const path = require('path');

const webpackOptions = {
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: [/node_modules/],
                use: [
                    {
                        loader: 'ts-loader',
/*                        options: {
                            transpileOnly: true
                        }*/
                    }
                ]
            }
        ]
    }
};

const options = {
    webpackOptions
};

function getConfigurationByFile (file) {
    const pathToConfigFile = path.resolve('./cypress', 'config', `${file}.json`);

    return fs.readJson(pathToConfigFile)
}

module.exports = (on, config) => {
    // `on` is used to hook into various events Cypress emits
    // `config` is the resolved Cypress config
    on('file:preprocessor', webpack(options))

    const cypressEnvironment = process.env.NODE_ENV || 'local';
    return getConfigurationByFile(cypressEnvironment)
};
