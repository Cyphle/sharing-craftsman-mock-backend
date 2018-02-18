'use strict';

module.exports = class HeaderService {
  isUserAuthorized(headers) {
    this.authInfos = {
      client: headers.client,
      clientSecret: headers.secret,
      username: headers.username,
      accessToken: headers['access-token']
    };
    
    return true;
  }
}