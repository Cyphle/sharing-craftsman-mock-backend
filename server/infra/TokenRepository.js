'use strict';

module.exports = class TokenRepository {
  constructor() {
    this.data = {};
  }

  add(token) {
    return this.data[token.accessToken] = token;
  }
}