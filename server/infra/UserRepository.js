'use strict';

module.exports = class UserRepository {
  constructor() {
    this.data = {
      'john@doe.fr': {
        username: 'john@doe.fr',
        lastname: 'Doe',
        firstname: 'John'
      }
    };
  }

  add(user) {
    this.data[user.username] = user;
  }

  findByUsername(username) {
    return this.data[username];
  }
}