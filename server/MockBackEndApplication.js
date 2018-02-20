'use strict';

const express = require('express');
const HeaderService = require('./services/HeaderService');

const CommentRepository = require('./infra/CommentRepository');
const FavoriteRepository = require('./infra/FavoriteRepository');
const LibraryRepository = require('./infra/LibraryRepository');
const ScoreRepository = require('./infra/ScoreRepository');

const CommentController = require('./api/CommentController');
const FavoriteController = require('./api/FavoriteController');
const LibraryController = require('./api/LibraryController');
const ScoreController = require('./api/ScoreController');

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
  }
}