import { copy, tpl } from './../../../common/helpers';

export function generateKeywords(keywords) {
  return (keywords.indexOf(',') !== -1 ? keywords.split(',') : keywords.split(' '))
    .map(kw => '"' + kw.trim() + '"')
    .join(',');
}

export function generateTplData(props, imports) {
  const { _s, user } = imports;

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

export function cli(tplData, imports) {
  tpl([], [{ from: 'src/cli.js', to: 'src/cli.js' }], tplData, imports);
}

export default function generate(files, props, imports) {
  const { copy: copyList, tpl: tplList } = files;
  const tplData = generateTplData(props, imports);
  const ignores = [];

  if (props.cli) cli(tplData, imports);
  if (!props.travis) ignores.push('travis.yml');

  copy(copyList, imports);
  tpl(ignores, tplList, tplData, imports);

  return Promise.resolve(props);
}
