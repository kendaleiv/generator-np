export function copy(copyList, imports) {
  const { fs, templatePath, destinationPath } = imports;

  copyList.map(item => fs.copy(templatePath('../../../templates/' + item.from), destinationPath(item.to)));
}

export function tpl(props, tplList, tplData, imports) {
  const { fs, templatePath, destinationPath } = imports;

  tplList
    .filter(item => !(!props.travis && item.from === 'travis.yml'))
    .map(item => fs.copyTpl(templatePath('../../../templates/' + item.from), destinationPath(item.to), tplData));
}
