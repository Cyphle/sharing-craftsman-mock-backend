'use strict';

module.exports = class AuthenticationManager {
  login(loginInfo) {
    if (loginInfo.username === 'john@doe.fr' && loginInfo.password === 'password')
      return true;
    return false;
  }

  verifyToken(token) {
    if (token.username === 'john@doe.fr' && token['access-token'] === 'aaa')
      return true;
    return false;
  }
}