'use strict';

const allCategories = require('../../responses/library/get-all-categories.json');

module.exports = class LibraryController {
  constructor(app, headerService) {
    this.app = app;
    this.headerService = headerService;
  }

  getAllCategories() {
    this.app.get('/library', (req, res) => {
      if (this.headerService.isUserAuthorized(req.headers)) {
        res.send(allCategories);
      } else {
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }
}