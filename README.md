# base.less

[![Build Status](https://travis-ci.org/loonkwil/base.less.png)](https://travis-ci.org/loonkwil/base.less)

Simple front-end framework for developing responsive, mobile first web pages.

Inspired by
[Solved by Flexbox](http://philipwalton.github.io/solved-by-flexbox/demos/grids),
[Bootstrap](http://getbootstrap.com),
[Skeleton](http://getskeleton.com)

## Install

```bash
bower install git@github.com:loonkwil/base.less.git --save
```

## Browser support

 * Chrome last 2 version
 * Firefox last 2 version
 * Opera last 2 version
 * Safari last 2 version
 * IE 10+

## Usage

```html
<!doctype html>
<html lang=en>
  <meta charset=utf-8>
  <title></title>
  <link rel=stylesheet href=bower_components/normalize-css/normalize.css>
  <link rel=stylesheet href=bower_components/base.less/dist/css/base.css>

  <h1>Hello</h1>

  <script src="bower_components/base.less/dist/js/base.min.js" defer></script>
</html>
```

## Gulp tasks

List all gulp task: `gulp --tasks`

### Test

Run the qunit tests: `gulp qunit`  
Run the linting (jshint, jsonlint) scripts: `gulp lint`  
Run all together: `gulp test` or `npm test`

### Compile

The `gulp build` (or just `gulp`).

### Release

For compiling the source code, bumping the version number and creating a
release commit, use the `gulp release [--version <version>|-r <version>]` task.

Version could be: major (1.0.0), minor (0.1.0), patch (0.0.2) (this one is the
default), or a specific version number like: 1.2.3 or 1.0.0-alpha

More about the Semantic Versioning: [http://semver.org](http://semver.org)
