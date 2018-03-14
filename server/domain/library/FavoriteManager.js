'use strict';

const uuidv1 = require('uuid/v1');

module.exports = class FavoriteManager {
  constructor(favoriteRepository) {
    this.favoriteRepository = favoriteRepository;
  }

  getFavorites() {
    return this.favoriteRepository.getAll();
  }

  createFavorite(favorite) {
    this.verifyFavorite(favorite);
    favorite.id = uuidv1();
    this.favoriteRepository.add(favorite);
  }

  deleteFavorite(favorite) {
    this.favoriteRepository.delete(favorite.id);
  }

  verifyFavorite(favorite) {
    /*
    {
  "id": null,
  "username": "john@doe.fr",
  "contentType": "KNOWLEDGE",
  "contentId": "aaa"
}
    */
  }
}