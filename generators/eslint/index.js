'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _yeomanGenerator = require('yeoman-generator');

var _yeomanGenerator2 = _interopRequireDefault(_yeomanGenerator);

var _commonHelpers = require('./../../common/helpers');

// import message from './helpers/message';

var fileConfig = [{ from: 'eslintrc', to: '.eslintrc' }];

module.exports = _yeomanGenerator2['default'].Base.extend({
  init: function init() {
    var templatePath = this.templatePath.bind(this);
    var destinationPath = this.destinationPath.bind(this);
    var fs = this.fs;

    _commonHelpers.copy(fileConfig, { templatePath: templatePath, destinationPath: destinationPath, fs: fs });
  },

  install: function install() {
    if (this.options.skipInstall) return;
  },

  end: function end() {
    if (!this.props) return;

    // message(this.log.bind(this));
  }
});