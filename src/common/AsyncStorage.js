/** @module src/common/AsyncStorage */

import { AsyncStorage as RNAsyncStorage } from 'react-native';

/** Wrapper for React Native AsyncStorage */
class AsyncStorage {
  static async setItem(key, value) {
    try {
      await RNAsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      throw e;
    }
  }

  static async getItem(key, error) {
    try {
      const value = JSON.parse(await RNAsyncStorage.getItem(key));

      if (value == null) throw new Error(error);

      return value;
    } catch (e) {
      throw e;
    }
  }

  static async removeItem(key) {
    try {
      await RNAsyncStorage.removeItem(key);
    } catch (e) {
      throw e;
    }
  }
}

export default AsyncStorage;
