'use strict';

module.exports = class FavoriteRepository {
  constructor() {
    this.data = {};
  }

  add(favorite) {
    this.data[favorite.id] = favorite;
  }

  delete(id) {
    delete this.data[id];
  }
}