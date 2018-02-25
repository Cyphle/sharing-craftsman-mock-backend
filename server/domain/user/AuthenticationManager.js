'use strict';

module.exports = class AuthenticationManager {
  constructor(userRepository, tokenRepository) {
    this.userRepository = userRepository;
    this.tokenRepository = tokenRepository;
  }

  saveToken(token) {
    this.tokenRepository.add(token);
  }

  login(loginInfo) {
    if (loginInfo.username && loginInfo.password && this.userRepository.findByUsername(loginInfo.username))
      return true;
    return false;
  }

  verifyToken(token) {
    if (token.username && token['access-token'])
      return true;
    return false;
  }
}