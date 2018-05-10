export default {
  DOMCollectionApply (domCollection, cb) {
    [...domCollection].forEach(cb);
  }
};
