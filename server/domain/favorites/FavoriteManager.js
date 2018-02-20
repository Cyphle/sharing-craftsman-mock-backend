'use strict';

const uuidv1 = require('uuid/v1');

module.exports = class FavoriteManager {
  constructor(favoriteRepository) {
    this.favoriteRepository = favoriteRepository;
  }

  createFavorite(favorite) {
    this.verifyFavorite(favorite);
    favorite.id = uuidv1();
    this.favoriteRepository.add(favorite);
  }

  deleteFavorite(favorite) {
    const favoriteToDelete = this.favoriteRepository.getById(favorite.id);
    if (favorite.username === favoriteToDelete.username)
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