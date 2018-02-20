'use strict';

const authorizations = require('../../responses/authorization/get-user-roles.json');

module.exports = class AuthorizationController {
  constructor(app, headerService) {
    this.app = app;
    this.headerService = headerService;
  }

  activateRoutes() {
    this.getUserAuthorization();
  }

  getUserAuthorization() {
    this.app.post('/roles', (req, res) => {
      if (this.headerService.isClientAuthorized(req.headers)) {
        res.send(authorizations)
      } else {
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }
}