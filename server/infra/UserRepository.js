'use strict';

module.exports = class UserRepository {
  constructor() {
    this.data = {};
  }

  add(user) {
    this.data[user.username] = user;
  }

  findByUsername(username) {
    return this.data[username];
  }
}