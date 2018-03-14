'use strict';

module.exports = class FavoriteRepository {
  constructor() {
    this.data = {
        saa: {
            "id": "saa",
            "username": "john@doe.fr",
            "contentType": "KNOWLEDGE",
            "contentId": "kcc"
        },
        sab: {
            "id": "sab",
            "username": "john@doe.fr",
            "contentType": "CATEGORY",
            "contentId": "aaa"
        }
    };
  }

  getAll() {
    let favorites = [];
    for (const key of Object.keys(this.data)) {
      favorites.push(this.data[key]);
    }
    return favorites;
  }

  getById(id) {
    return this.data[id];
  }

  add(favorite) {
    this.data[favorite.id] = favorite;
  }

  delete(id) {
    delete this.data[id];
  }
}