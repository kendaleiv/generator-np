export function copy(copyList, imports) {
  const { fs, templatePath, destinationPath } = imports;

  copyList.map(item => fs.copy(templatePath('../../../templates/' + item.from), destinationPath(item.to)));
}

export function tpl(ignores, tplList, tplData, imports) {
  const { fs, templatePath, destinationPath } = imports;

  tplList
    .filter(item => ignores.indexOf(item.from) === -1)
    .map(item => fs.copyTpl(templatePath('../../../templates/' + item.from), destinationPath(item.to), tplData));
}
