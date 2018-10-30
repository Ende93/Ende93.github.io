/**
 * simple localStorage cache control
 * from https://github.com/addyosmani/basket.js
 */
const storagePrefix = 'BASKET_';
let defaultExpiration = 24 * 60 * 60 * 1000;

/**
 * concat prefix and the uppercase of the key
 * @param {String} key
 * @returns {String}
 */
function getKey(key) {
  if (typeof key === 'string') {
    key = storagePrefix + key.toUpperCase()
  } else {
    console.warn(new Error('key is not string type'))
    key = ''
  }
  return key
}
const basket = {
  /**
   * remove cache
   * @param {String} key
   */
  remove: function(key) {
    localStorage.removeItem(getKey(key));
    return this;
  },
  /**
   * get cache, if get data(not null) success, return target data
   * else return false
   * @param {String} key
   * @returns {*} target data or false
   */
  get: function(key) {
    try {
      const data = JSON.parse(
        localStorage.getItem(getKey(key)) || 'false'
      );
      return data === false ? data : data.content;
    } catch (e) {
      console.error(e);
      return false;
    }
  },
  /**
   * set cache, will wrap the `storeObj` and save the wrapper
   * @param {String} key
   * @param {*} storeObj
   * @returns {Boolean} true of success, false of failure
   */
  set(key, storeObj) {
    try {
      if (!storeObj) {
        return false;
      }
      localStorage.setItem(
        getKey(key),
        JSON.stringify(wrapStoreData(storeObj))
      );
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  },
  /**
   * clear expired cache or clear all cache
   * @param {Boolean} isClearAll if expired is false, then clear all
   * @returns {void}
   */
  clear: function(isClearAll) {
    const now = +new Date();

    for (let item in localStorage) {
      let key = item.split(storagePrefix)[1];
      if (key && (isClearAll || this.get(key).expire <= now)) {
        this.remove(key);
      }
    }
  }
};
/**
 * wrap the first param
 * @param {*} data
 * @returns {Object}
 */
function wrapStoreData(data) {
  var now = +new Date();
  return {
    content: data,
    stamp: now,
    expire: now + (data.expire || defaultExpiration)
  };
}

// to clear expired cache
basket.clear()
export default basket;
