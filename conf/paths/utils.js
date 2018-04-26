const path = require('path');

module.exports = {
  getSrc: function () {
    return path.resolve(__dirname, '../..', 'src')
  },
  getTemplates: function () {
    return path.join(this.getSrc(), 'templates');
  }
};
