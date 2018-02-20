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
      if (this.headerService.isUserAuthorized(req.headers)) {
        if (req.body.username === 'john@doe.fr')
          res.send(searchedFavorites);
        res.send([]);
      } else {
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
    this.app.delete('/favorites', (req, res) => {
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