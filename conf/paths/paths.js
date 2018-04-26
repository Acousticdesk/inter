const path = require('path');
const utils = require('./utils');

module.exports = {
  js: {
    app: path.join(utils.getSrc(), 'js', 'app.js')
  },
  css: {
    styles: path.join(utils.getSrc(), 'css', 'styles.css')
  },
  templates: {
    main: path.join(utils.getTemplates(), 'main.ejs'),
    alternative: path.join(utils.getTemplates(), 'alternative.ejs')
  }
};
