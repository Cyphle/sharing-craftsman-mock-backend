'use strict';

const searchedFavorites = require('../../responses/favorites/search-favorites-by-username.json');
const FavoriteManager = require('../domain/library/FavoriteManager');

module.exports = class FavoriteController {
  constructor(app, headerService, favoriteRepository) {
    this.app = app;
    this.headerService = headerService;
    this.favoriteManager = new FavoriteManager(favoriteRepository);
  }

  activateRoutes() {
    this.searchFavorites();
    this.addToMyFavorites();
    this.deleteFavorite();
  }

  searchFavorites() {
    this.app.post('/favorites/search', (req, res) => {
      console.log(`${new Date()} -- [FavoriteController] Get Favorites - Headers: ${JSON.stringify(req.headers)} -- Body: ${JSON.stringify(req.bodu)}`);
      if (this.headerService.isUserAuthorized(req.headers)) {
        console.log(`${new Date()} -- [FavoriteController] Favorites: ${searchedFavorites}`);
        res.send(searchedFavorites);
      } else {
        console.log(`${new Date()} -- [FavoriteController] Error while getting favorites`);
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }

  addToMyFavorites() {
    this.app.post('/favorites', (req, res) => {
      if (this.headerService.isUserAuthorized(req.headers)) {
        this.favoriteManager.createFavorite(req.body);
        res.send([]);
      } else {
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }

  deleteFavorite() {
    this.app.post('/favorites/delete', (req, res) => {
      if (this.headerService.isUserAuthorized(req.headers)) {
        this.favoriteManager.deleteFavorite(req.body);
        res.send([]);
      } else {
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }
}