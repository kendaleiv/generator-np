'use strict';

exports.__esModule = true;
exports.generateTplData = generateTplData;
exports.copy = copy;
exports.tpl = tpl;
exports.cli = cli;
exports.tests = tests;
exports['default'] = generate;

function generateTplData(props, imports) {
  var _s = imports._s;
  var user = imports.user;

  return {
    moduleName: props.moduleName,
    moduleDescription: props.moduleDescription,
    camelModuleName: _s.camelize(props.moduleName),
    website: props.website ? props.website : 'https://github.com/' + props.githubUsername,

    githubUsername: props.githubUsername,
    name: user.git.name(),
    email: user.git.email(),

    travis: props.travis,
    coveralls: props.travis && props.coveralls,
    commitizen: props.commitizen,

    cli: props.cli
  };
}

function copy(copyList, imports) {
  var fs = imports.fs;
  var templatePath = imports.templatePath;
  var destinationPath = imports.destinationPath;

  copyList.map(function (item) {
    return fs.copy(templatePath(item.from), destinationPath(item.to));
  });
}

function tpl(props, tplList, tplData, imports) {
  var fs = imports.fs;
  var templatePath = imports.templatePath;
  var destinationPath = imports.destinationPath;

  tplList.filter(function (item) {
    return !(!props.travis && item.from === 'travis.yml');
  }).map(function (item) {
    return fs.copyTpl(templatePath(item.from), destinationPath(item.to), tplData);
  });
}

function cli(tplData, imports) {
  var fs = imports.fs;
  var templatePath = imports.templatePath;
  var destinationPath = imports.destinationPath;

  fs.copyTpl(templatePath('src/cli.js'), destinationPath('src/cli.js'), tplData);
}

function tests(props, tplData, imports) {
  var fs = imports.fs;
  var templatePath = imports.templatePath;
  var destinationPath = imports.destinationPath;

  fs.copyTpl(templatePath('test/index.js'), destinationPath('test/' + props.moduleName + '.test.js'), tplData);
}

function generate(files, props, imports) {
  var copyList = files.copy;
  var tplList = files.tpl;

  var tplData = generateTplData(props, imports);

  if (props.cli) cli(tplData, imports);

  copy(copyList, imports);
  tpl(props, tplList, tplData, imports);
  tests(props, tplData, imports);

  return Promise.resolve(props);
}