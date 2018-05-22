export default {
  DOMCollectionApply (domCollection, cb) {
    [...domCollection].forEach(cb);
  },
  getNWords (text, n) {
    const textArr = text.split(' ');
    const str = textArr.slice(0, n || 15).join(' ');
    return textArr.length > n ? `${str}...` : str;
  }
};
