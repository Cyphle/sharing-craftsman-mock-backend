'use strict';

const express = require('express');
const HeaderService = require('./services/HeaderService');

const CommentRepository = require('./infra/CommentRepository');
const FavoriteRepository = require('./infra/FavoriteRepository');
const LibraryRepository = require('./infra/LibraryRepository');
const ScoreRepository = require('./infra/ScoreRepository');
const UserRepository = require('./infra/UserRepository');
const TokenRepository = require('./infra/TokenRepository');

const CommentController = require('./api/CommentController');
const FavoriteController = require('./api/FavoriteController');
const LibraryController = require('./api/LibraryController');
const ScoreController = require('./api/ScoreController');
const AuthenticationController = require('./api/AuthenticationController');
const AuthorizationController = require('./api/AuthorizationController');
const ClientController = require('./api/ClientController');
const FileController = require('./api/FileController');
const UserController = require('./api/UserController');
const AdminController = require('./api/AdminController');

module.exports = class MockBackEndApplication {
  constructor(app) {
    this.app = app;
    this.routers = {};
    this.headerService = new HeaderService();
  }

  bootstrapAPI() {
    this.routers['comment'] = new CommentController(this.app, this.headerService, new CommentRepository());
    this.routers['comment'].activateRoutes();
    this.routers['favorite'] = new FavoriteController(this.app, this.headerService, new FavoriteRepository());
    this.routers['favorite'].activateRoutes();
    this.routers['library'] = new LibraryController(this.app, this.headerService, new LibraryRepository());
    this.routers['library'].activateRoutes();
    this.routers['score'] = new ScoreController(this.app, this.headerService, new ScoreRepository());
    this.routers['score'].activateRoutes();

    const userRepository = new UserRepository();
    this.routers['authentication'] = new AuthenticationController(this.app, this.headerService, userRepository, new TokenRepository());
    this.routers['authentication'].activateRoutes();
    this.routers['authorization'] = new AuthorizationController(this.app, this.headerService);
    this.routers['authorization'].activateRoutes();
    this.routers['client'] = new ClientController(this.app);
    this.routers['client'].activateRoutes();
    this.routers['file'] = new FileController(this.app);
    this.routers['file'].activateRoutes();
    this.routers['user'] = new UserController(this.app, this.headerService, userRepository);
    this.routers['user'].activateRoutes();

    this.routers['admin'] = new AdminController(this.app, this.headerService);
    this.routers['admin'].activateRoutes();
  }
}