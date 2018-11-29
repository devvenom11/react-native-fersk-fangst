/** @module src/common/helpers */

import { Platform, PermissionsAndroid } from 'react-native';

export function calcGrid(scrWidth = 0, itemMinWidth = 0) {
  const cols = Math.floor(scrWidth / itemMinWidth);
  const colWidth = scrWidth / cols;

  return { cols, colWidth };
}

// TODO: Remove on API integration.
let timeoutID = 0;

export function timeout(callback = () => { }, ms = 0) {
  if (timeoutID > 0) clearTimeout(timeoutID);

  timeoutID = setTimeout(callback, ms);
}

export const platform = {
  ios: false,
  android: false
};

Object.keys(platform).forEach((name) => {
  platform[name] = name === Platform.OS;
});

export function getStateParam(navigation, paramName, defaultValue) {
  try {
    const param = navigation.state.params[paramName];

    if (typeof defaultValue !== 'undefined') {
      return typeof param === (typeof defaultValue) ? param : defaultValue;
    }
    if (typeof defaultValue !== 'undefined') {
      return typeof param.userId === (typeof defaultValue) ? param.userId : defaultValue;
    }
    if (typeof defaultValue !== 'undefined') {
      return typeof param.author.userId === (typeof defaultValue) ? param.author.userId : defaultValue;
    }

    return param;
  } catch (e) {
    return defaultValue;
  }
}

export function getCompanionId(navigation, paramName, defaultValue) {
  try {
    const param = navigation.state.params[paramName];

    if (typeof defaultValue !== 'undefined' && typeof param === (typeof defaultValue)) {
      return param;
    }
    if (typeof defaultValue !== 'undefined' && typeof param.userId === (typeof defaultValue)) {
      return  param.userId;
    }
    if (typeof defaultValue !== 'undefined' && typeof param.author.userId === (typeof defaultValue)) {
      return  param.author.userId;
    }

    return defaultValue;
  } catch (e) {
    return defaultValue;
  }
}

export function productUnit(unit) {
  let title = 'Per kilo';

  switch (unit) {
    case 1:
      title = 'Per liter';
      break;
    case 2:
      title = 'Per enhet';
      break;
    case 3:
      title = 'Totalt';
      break;
    default:
      break;
  }

  return title;
}

function getComponentMethodsCache() {
  if (!(Object.prototype.hasOwnProperty(this, 'methodsCache') || this.methodsCache instanceof Map)) {
    this.methodsCache = new Map();
  }

  return this.methodsCache;
}

// Should be called only through Function.prototype.call
export function bindComponentMethod(method, ...args) {
  const key = [method.name, ...args].join('');
  const methodsCache = getComponentMethodsCache.call(this);

  if (!methodsCache.has(key)) {
    methodsCache.set(key, method.bind(this, ...args));
  }

  return methodsCache.get(key);
}

// Should be called only through Function.prototype.call
export function bindComponentRef(refName) {
  if (!(Object.prototype.hasOwnProperty(this, 'refsCache') || this.refsCache instanceof Map)) {
    this.refsCache = new Map();
  }

  const methodsCache = getComponentMethodsCache.call(this);
  const refBinderName = `${refName}RefBinder`;

  if (!methodsCache.has(refBinderName)) {
    methodsCache.set(refBinderName, (ref) => { this.refsCache.set(refName, ref); });
  }

  return methodsCache.get(refBinderName);
}

export function getImageTypeFromURI(uri) {
  return `image/${uri.lastIndexOf('.') > 0 ? uri.slice(uri.lastIndexOf('.') + 1) : 'jpeg'}`;
}

function isType(value, type) {
  try {
    return typeof value === typeof type || typeof value.valueOf() === typeof type;
  } catch (e) {
    return false;
  }
}

export function isString(str, checkIfEmpty) {
  return isType(str, '') && (checkIfEmpty ? str.length > 0 : true);
}

export function isNumber(num) {
  return isType(num, 0);
}

export function forceLayoutUpdate(componentRef = { setNativeProps: () => { } }, initialProps = {}, targetProps = {}) {
  componentRef.setNativeProps(initialProps);

  setTimeout(() => {
    componentRef.setNativeProps(targetProps);
  });
}

export function getIndex(value, arr, prop) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i][prop] === value) {
      return i;
    }
  }
  return 0; //to handle the case where the value doesn't exist
}

export async function requestExternalStorage() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        'title': 'Fersk Fangst',
        'message': 'App needs access to external storage.'
      }
    );
    return granted == PermissionsAndroid.RESULTS.GRANTED;
  } 
  catch (err) {
    return false;
  }
}

export default {
  calcGrid,
  platform,
  timeout,
  getStateParam,
  productUnit,
  bindComponentMethod,
  bindComponentRef,
  getImageTypeFromURI,
  isString,
  isNumber,
  forceLayoutUpdate,
  getIndex,
  requestExternalStorage
};
