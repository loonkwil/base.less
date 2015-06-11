/*jshint node: true */
'use strict';

var config = {};

// Configurable paths
// Don't use leading or trailing slashes!
config.path = {
    src: 'src',
    dist: 'dist',
    test: 'test'
};

// Files for linting and stuff like that
config.filesForAnalyze = {
    js: [
        'gulpconfig.js', 'gulpfile.js',
        config.path.test + '/*.js',
        config.path.src + '/js/*.js'
    ],
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
        supportedBrowsers: [ 'last 2 versions', 'IE >= 10' ]
    }
};

module.exports = config;
