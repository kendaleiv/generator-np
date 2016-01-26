import yeoman from 'yeoman-generator';

import { copy } from './../../common/helpers';
// import message from './helpers/message';

const fileConfig = [
  { from: 'eslintrc', to: '.eslintrc' }
];

module.exports = yeoman.Base.extend({
  init() {
    const templatePath = this.templatePath.bind(this);
    const destinationPath = this.destinationPath.bind(this);
    const fs = this.fs;

    copy(fileConfig, { templatePath, destinationPath, fs });
  },

  install() {
    if (this.options.skipInstall) return;
  },

  end() {
    if (!this.props) return;

    // message(this.log.bind(this));
  }
});
