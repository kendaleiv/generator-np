'use strict';

exports.__esModule = true;
exports.generateKeywords = generateKeywords;
exports.generateTplData = generateTplData;
exports.cli = cli;
exports['default'] = generate;

var _commonHelpers = require('./../../../common/helpers');

function generateKeywords(keywords) {
  return (keywords.indexOf(',') !== -1 ? keywords.split(',') : keywords.split(' ')).map(function (kw) {
    return '"' + kw.trim() + '"';
  }).join(',');
}

function generateTplData(props, imports) {
  var _s = imports._s;
  var user = imports.user;

  return {
    center: props.center,
    moduleName: props.moduleName,
    moduleDescription: props.moduleDescription,
    moduleKeywords: generateKeywords(props.moduleKeywords),
    camelModuleName: _s.camelize(props.moduleName),
    website: props.website,

    githubUsername: props.githubUsername,
    name: user.git.name(),
    email: user.git.email(),

    travis: props.travis,
    coveralls: props.travis && props.coveralls,
    commitizen: props.commitizen,
    githubRelease: props.githubRelease,

    cli: props.cli
  };
}

function cli(tplData, imports) {
  var fs = imports.fs;
  var templatePath = imports.templatePath;
  var destinationPath = imports.destinationPath;

  fs.copyTpl(templatePath('src/cli.js'), destinationPath('src/cli.js'), tplData);
}

function generate(files, props, imports) {
  var copyList = files.copy;
  var tplList = files.tpl;

  var tplData = generateTplData(props, imports);

  if (props.cli) cli(tplData, imports);

  _commonHelpers.copy(copyList, imports);
  _commonHelpers.tpl(props, tplList, tplData, imports);

  return Promise.resolve(props);
}