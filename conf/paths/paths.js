const path = require('path');
const utils = require('./utils');

module.exports = {
  root: path.resolve(utils.getSrcPath(), '..'),
  src: utils.getSrcPath(),
  js: {
    app: path.join(utils.getSrcPath(), 'js', 'app.js')
  },
  css: {
    styles: path.join(utils.getSrcPath(), 'css', 'styles.css')
  },
  templates: {
    main: path.join(utils.getTemplatesPath(), 'main.html'),
    alternative: path.join(utils.getTemplatesPath(), 'alternative.html'),
    preview: path.join(utils.getTemplatesPath(), 'preview.ejs')
  }
};
