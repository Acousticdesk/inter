const path = require('path');

module.exports = {
  getSrcPath: function () {
    return path.resolve(__dirname, '../..', 'src')
  },
  getTemplatesPath: function () {
    return path.join(this.getSrcPath(), 'templates');
  }
};
