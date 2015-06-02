# base.less

Simple front-end framework for developing responsive, mobile first web pages.

## Install

```bash
bower install git@github.com:loonkwil/base.less.git --save
```

## Usage

```html
<!doctype html>
<html lang=en>
  <meta charset=utf-8>
  <title></title>
  <link rel=stylesheet href=bower_components/normalize-css/normalize.css>
  <link rel=stylesheet href=bower_components/base.less/dist/base.css>

  <h1>Hello</h1>
</html>
```

## Gulp tasks

List all gulp task: `gulp --tasks`

### Test

Run the linting (jshint, jsonlint) tasks: `gulp lint` or `npm test`

### Compile

The `gulp build` (or just `gulp`) task will create a `base.css` and a
`base.min.css` file in the `dist` folder.

### Release

For compiling the source code, bumping the version number and creating a
release commit, use the `gulp release [--version <version>|-r <version>]` task.

Version could be: major (1.0.0), minor (0.1.0), patch (0.0.2) (this one is the
default), or a specific version number like: 1.2.3 or 1.0.0-alpha

More about the Semantic Versioning: [http://semver.org](http://semver.org)
