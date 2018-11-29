/** @module src/common/Request */

import fetch from 'react-native-cancelable-fetch';

import authService from '../auth/authService';

/**
 * Wrapper for react-native-cancelable-fetch.
 */
class Request {
  static baseUrl = 'https://labert.asuscomm.com:30080/';
  // static baseUrl = 'https://ff.multimedianordic.no:30080/';

  static stringifyParams(params) {
    try {
      let res = Object
        .keys(params)
        .filter(key => params[key] != null)
        .map(key => `${key}=${params[key]}`)
        .join('&');

      if (res.length > 0) {
        res = `?${res}`;
      }

      return res;
    } catch (e) {
      return '';
    }
  }

  constructor() {
    this.get = this.get.bind(this);
    this.header = this.header.bind(this);
    this.params = this.params.bind(this);
    this.body = this.body.bind(this);
    this.set = this.set.bind(this);
    this.run = this.run.bind(this);
    this.abort = this.abort.bind(this);
  }

  isPending = false;

  url = {
    base: Request.baseUrl,
    path: '',
    params: ''
  };

  config = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: null,
    cache: 'default',
    credentials: 'include'
  };

  header(key, value) {
    this.config.headers[key] = value;

    return this;
  }

  params(params) {
    this.url.params = Request.stringifyParams(params);

    return this;
  }

  body(body) {
    this.config.body = body instanceof FormData ? body : JSON.stringify(body);

    return this;
  }

  set(method, path) {
    const { config, url } = this;

    config.method = method;

    if (authService.isLogged()) {
      config.headers.Authorization = `Bearer ${authService.getToken()}`;
    }

    url.path = path;

    return this;
  }

  get = this.set.bind(this, 'GET');

  post = this.set.bind(this, 'POST');

  put = this.set.bind(this, 'PUT');

  delete = this.set.bind(this, 'DELETE');

  async run() {
    this.abort();
    this.isPending = true;

    const { url } = this;
    let response = null;

    try {
      response = await fetch(`${url.base}${url.path}${url.params}`, this.config, this);
    } catch (e) {
      throw new Error('Nettverksfeil');
    } finally {
      this.isPending = false;
    }

    if (response == null) throw new Error('Serverfeil');

    if (response.ok) {
      try {
        return await response.json();
        
      } catch (e) {
        return '';
      }
    } else {
      throw new Error(await response.text());
    }
  }

  abort() {
    if (this.isPending) return;

    fetch.abort(this);
  }
}

export default Request;
