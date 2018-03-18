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
    this.app.get('/roles', (req, res) => {
      console.log(`${new Date()} -- [AuthorizationController] Get roles - Headers: ${JSON.stringify(req.headers)}`);
      if (this.headerService.isClientAuthorized(req.headers)) {
        console.log(`${new Date()} -- [AuthorizationController] Roles: ${JSON.stringify(authorizations)}`);
        res.send(authorizations)
      } else {
        console.log(`${new Date()} -- [AuthorizationController] Error while getting roles`);
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }
}