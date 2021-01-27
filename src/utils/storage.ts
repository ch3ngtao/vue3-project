const storage = window.localStorage || window.sessionStorage;

/**
 * @description get storage
 * @param {String} key
 */
export const getStorage = (key: string) => {
  const storageFile = storage.getItem(key)
  try {
    if(storageFile) {
      return JSON.parse(storageFile);
    }
  } catch (error) {
    return null;
  }
};

/**
 * @description set storage
 * @param {String} key
 * @param {Any} value
 */
export const setStorage = (key:string, value:string) => {
  try {
    storage.setItem(key, JSON.stringify(value || ""));
  } catch (error) {
    console.log("set storage error", error);
  }
};

/**
 * @description remove storage
 * @param {String} key
 */
export const removeStorage = (key:string) => {
  storage.removeItem(key);
};

export const clear = () => {
  storage.clear();
};
