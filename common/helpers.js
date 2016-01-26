'use strict';

exports.__esModule = true;
exports.copy = copy;
exports.tpl = tpl;

function copy(copyList, imports) {
  var fs = imports.fs;
  var templatePath = imports.templatePath;
  var destinationPath = imports.destinationPath;

  copyList.map(function (item) {
    return fs.copy(templatePath('../../../templates/' + item.from), destinationPath(item.to));
  });
}

function tpl(ignores, tplList, tplData, imports) {
  var fs = imports.fs;
  var templatePath = imports.templatePath;
  var destinationPath = imports.destinationPath;

  tplList.filter(function (item) {
    return ignores.indexOf(item.from) === -1;
  }).map(function (item) {
    return fs.copyTpl(templatePath('../../../templates/' + item.from), destinationPath(item.to), tplData);
  });
}