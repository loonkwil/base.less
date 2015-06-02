'use strict';

var config = {};

// Configurable paths
// Don't use leading or trailing slashes!
config.path = {
    src: 'src',
    dist: 'dist'
};

// Files for linting and stuff like that
config.filesForAnalyze = {
    js: [ 'gulpconfig.js', 'gulpfile.js' ],
    json: [ '*.json', '.*rc' ]
};

// Plugins preferences
config.plugins = {
    // Bumps the version number (and create a git commit and tag)
    bump: {
        packageFiles: [ 'package.json', 'bower.json' ],
    },

    // Add vendor prefixed styles for these browsers
    // Possible values: https://github.com/ai/autoprefixer#browsers
    autoprefixer: {
        supportedBrowsers: [ 'last 3 version' ]
    }
};

module.exports = config;
