/*jshint node: true */
'use strict';

var config = require('./gulpconfig.js');
var gulp = require('gulp');
var nopt = require('nopt'); // handle CLI arguments
var fs = require('fs');
var semver = require('semver');
var del = require('del');

// Temporary solution until gulp 4
// https://github.com/gulpjs/gulp/issues/355
var runSequence = require('run-sequence');

var plugins = require('gulp-load-plugins')();

// helpers
/**
 * Get the version number
 * @param {Array.<string>} packageFiles
 * @throws {Error}
 * @return {string}
 */
var getVersionNumberFromFile = function(packageFiles) {
    if (packageFiles.length === 0) {
        throw new Error(
            'Where are your package files (package.json, bower.json)?'
        );
    }

    var packageFile = packageFiles[0];
    var fileContent = fs.readFileSync(
        __dirname + '/' + packageFile, { encoding: 'utf-8' }
    );

    var pkg = JSON.parse(fileContent);
    if (!pkg.hasOwnProperty('version')) {
        throw new Error(
            'Your package file (' + packageFile +
                ') does not contain any version number!'
        );
    }

    return pkg.version;
};

// parse CLI arguments with nopt
nopt.invalidHandler = function(key) {
    var msg = 'Invalid "' + key + '" parameter!';
    throw new Error(msg);
};

nopt.typeDefs.version = {
    type: 'version',
    validate: function(data, key, val) {
        val = (val + '').toLowerCase();

        // major: 1.0.0
        // minor: 0.1.0
        // patch: 0.0.2
        var shortHands = [ 'major', 'minor', 'patch' ];
        if (shortHands.indexOf(val) === -1 && !semver.valid(val)) {
            return false;
        }
        data[key] = val;
    }
};

var argv = nopt({ version: 'version' }, { v: '--version' }, process.argv, 1);

// set the default values
argv.version = argv.version || 'patch';

// Task for bumping the version number
// Usage: `gulp bump [--version <version>]`
gulp.task('bump', function(cb) {
    runSequence('bump-version-number', 'bump-commit-and-tag', cb);
});

gulp.task('bump-version-number', function() {
    var options = {};

    var key = ([ 'major', 'minor', 'patch' ].indexOf(argv.version) !== -1) ?
        'type' : 'version';
    options[key] = argv.version;

    var packageFiles = config.plugins.bump.packageFiles;
    return gulp.src(packageFiles).
        pipe(plugins.bump(options)).
        pipe(gulp.dest('./'));
});

gulp.task('bump-commit-and-tag', function(cb) {
    return runSequence('bump-commit', 'bump-tag', cb);
});

gulp.task('bump-commit', function() {
    var packageFiles = config.plugins.bump.packageFiles;

    var version = 'v' + getVersionNumberFromFile(packageFiles);
    var message = 'Release ' + version;

    var filesToCommit = [].concat(packageFiles, config.path.dist + '/**/*');
    return gulp.src(filesToCommit).pipe(plugins.git.commit(message));
});

gulp.task('bump-tag', function(cb) {
    var packageFiles = config.plugins.bump.packageFiles;

    var version = 'v' + getVersionNumberFromFile(packageFiles);
    var message = 'Release ' + version;

    plugins.git.tag(version, message, cb);
});


// Task for testing and linting
// Usage: `gulp test` or if you want to run the testing and the linting tasks
// separately use: `gulp qunit` and `gulp lint`
gulp.task('test', [ 'qunit', 'lint' ]);

gulp.task('qunit', function() {
    return gulp.src(config.path.test + '/index.html').pipe(plugins.qunit());
});

gulp.task('lint', [ 'jscs', 'jshint', 'jsonlint' ]);

gulp.task('jscs', function() {
    return gulp.src(config.filesForAnalyze.js).pipe(plugins.jscs());
});

gulp.task('jshint', function() {
    return gulp.src(config.filesForAnalyze.js).
        pipe(plugins.jshint()).
        pipe(plugins.jshint.reporter());
});

gulp.task('jsonlint', function() {
    return gulp.src(config.filesForAnalyze.json).
        pipe(plugins.jsonlint()).
        pipe(plugins.jsonlint.reporter());
});


// Task for distributing
// Usage: `gulp`, `gulp dist` or `gulp build`
gulp.task('default', [ 'dist' ]);
gulp.task('build', [ 'dist' ]);

gulp.task('dist', function(cb) {
    return runSequence(
        'cleanup',
        [ 'compile-css', 'compile-js' ],
        [ 'minify-css', 'minify-js' ],
        cb
    );
});

gulp.task('cleanup', function(cb) {
    return del(config.path.dist, cb);
});

gulp.task('compile-css', function() {
    return gulp.src(config.path.src + '/less/base.less').
        pipe(plugins.less()).
        pipe(plugins.autoprefixer({
            browsers: config.plugins.supportedBrowsers
        })).
        pipe(gulp.dest(config.path.dist + '/css'));
});

gulp.task('compile-js', function() {
    return gulp.src(config.path.src + '/js/*.js').
        pipe(gulp.dest(config.path.dist + '/js'));
});

gulp.task('minify-css', function() {
    return gulp.src(config.path.dist + '/css/base.css').
        pipe(plugins.concat('base.min.css')).
        pipe(plugins.minifyCss()).
        pipe(gulp.dest(config.path.dist + '/css'));
});

gulp.task('minify-js', function() {
    return gulp.src(config.path.dist + '/js/*.js').
        pipe(plugins.concat('base.min.js')).
        pipe(plugins.uglify()).
        pipe(gulp.dest(config.path.dist + '/js'));
});


// Task for releasing
// Usage: `gulp release [--version <version>|-r <version>]`
gulp.task('release', function(cb) {
    return runSequence('dist', 'bump', cb);
});
