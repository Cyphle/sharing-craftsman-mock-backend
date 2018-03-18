'use strict';

const loginToken = require('../../responses/authentication/login.json');
const refreshToken = require('../../responses/authentication/refresh-token.json');

const AuthenticationManager = require('../domain/user/AuthenticationManager');

module.exports = class AuthenticationController {
  constructor(app, headerService, userRepository, tokenRepository) {
    this.app = app;
    this.headerService = headerService;
    this.authenticationManager = new AuthenticationManager(userRepository, tokenRepository);
  }

  activateRoutes() {
    this.login();
    this.logout();
    this.verifyToken();
    this.refreshToken();
  }

  login() {
    this.app.post('/tokens/login', (req, res) => {
      console.log(`${new Date()} -- [AuthenticationController] Login user - Headers: ${JSON.stringify(req.headers)} -- Body: ${JSON.stringify(req.body)}`);
      if (this.headerService.isClientAuthorized(req.headers) && this.authenticationManager.login(req.body)) {
        console.log(`${new Date()} -- [AuthenticationController] Login successful`);
        this.authenticationManager.saveToken(loginToken);
        res.send(loginToken);
      } else {
        console.log(`${new Date()} -- [UserController] Register user forbidden - Client authorization: ${this.headerService.isClientAuthorized(req.headers)}, Login validity: ${this.authenticationManager.login(req.body)}`);
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
      console.log(`${new Date()} -- [AuthenticationController] Verify token - Headers: ${JSON.stringify(req.headers)}`);
      if (this.headerService.isClientAuthorized(req.headers) && this.authenticationManager.verifyToken(req.headers)) {
        console.log(`${new Date()} -- [AuthenticationController] Valid token`);
        res.status(200);
        res.send();
      } else {
        console.log(`${new Date()} -- [AuthenticationController] Invalid token`);
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }

  refreshToken() {
    this.app.get('/tokens/refresh-token', (req, res) => {
      console.log(`${new Date()} -- [AuthenticationController] Refresh token - Headers: ${JSON.stringify(req.headers)}`);
      if (this.headerService.isClientAuthorized(req.headers) && this.authenticationManager.verifyToken(req.headers)) {
        res.send(refreshToken);
      } else {
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }
}