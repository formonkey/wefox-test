'use strict';

const path = require('path');
const fs = require('fs-extra');
const argv = require('yargs').argv;

exports.config = {
    allScriptsTimeout: 11000,
    disableChecks: true,

    beforeLaunch: () => {
        console.log(`\n==========================================================================`);
        console.log(`\nThe directory './tmp', which holds reports / screenshots is being removed.\n`);
        console.log(`==========================================================================\n`);
        fs.removeSync('./.tmp');
    },

    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    cucumberOpts: {
        compiler: "ts:ts-node/register",
        require: [
            path.resolve(process.cwd(), './e2e-tests/**/after.scenario.ts'),
            path.resolve(process.cwd(), './e2e-tests/**/cucumber.config.ts'),
            path.resolve(process.cwd(), './e2e-tests/**/*.steps.ts')
        ],
        format: 'json:.tmp/results.json',
        tags: argv.tags || ''
    },
    specs: getFeatureFiles(),

    ignoreSynchronization: true,
    ignoreUncaughtExceptions: true,

    plugins: [{
        package: 'protractor-multiple-cucumber-html-reporter-plugin',
        options: {
            automaticallyGenerateReport: true,
            metadataKey: 'deviceProperties',
            removeExistingJsonReportFile: true,
            removeOriginalJsonReportFile: true
        }
    }]
};

function getFeatureFiles() {
    if (argv.feature) {
        return argv.feature.split(',').map(feature => `${process.cwd()}/e2e-tests/**/${feature}.feature`);
    }

    return [`${process.cwd()}/e2e-tests/**/*.feature`];
}
