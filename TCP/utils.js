module.exports = {
  log() {
    const arr = [].slice.apply(arguments);
    console.log.apply(this, ['[Log]: '].concat(arr));
  }
};