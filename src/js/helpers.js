export default {
  DOMCollectionApply (domCollection, cb) {
    [...domCollection].forEach(cb);
  },
  getNWords (text, n) {
    const str = text.split(' ').slice(0, n || 20).join(' ');
    return `${str}...`;
  }
};
