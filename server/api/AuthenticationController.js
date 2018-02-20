'use strict';

const loginToken = require('../../responses/authentication/login.json');
const refreshToken = require('../../responses/authentication/refresh-token.json');

const AuthenticationManager = require('../domain/user/AuthenticationManager');

module.exports = class AuthenticationController {
  constructor(app, headerService) {
    this.app = app;
    this.headerService = headerService;
    this.authenticationManager = new AuthenticationManager();
  }

  activateRoutes() {
    this.login();
    this.logout();
    this.verifyToken();
    this.refreshToken();
  }

  login() {
    this.app.post('/tokens/login', (req, res) => {
      if (this.headerService.isClientAuthorized(req.headers)) {
        if (this.authenticationManager.login(req.body)) {
          res.send(loginToken);
        }
        res.send({});
      } else {
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }

  logout() {
    this.app.get('/tokens/logout', (req, res) => {
      res.send(200);
    });
  }

  verifyToken() {
    this.app.get('/tokens/verify', (req, res) => {
      if (this.headerService.isClientAuthorized(req.headers) && this.authenticationManager.verifyToken(req.headers)) {
        res.send(200);
      } else {
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }

  refreshToken() {
    this.app.get('/tokens/refresh-token', (req, res) => {
      if (this.headerService.isClientAuthorized(req.headers) && this.authenticationManager.verifyToken(req.headers)) {
        res.send(refreshToken);
      } else {
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }
}