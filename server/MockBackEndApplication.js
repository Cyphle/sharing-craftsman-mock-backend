'use strict';

const express = require('express');
const HeaderService = require('./services/HeaderService');
const LibraryController = require('./api/LibraryController');

module.exports = class MockBackEndApplication {
  constructor(app) {
    this.app = app;
    this.routers = {};
    this.headerService = new HeaderService();
  }

  bootstrapAPI() {
    this.routers['library'] = new LibraryController(this.app, this.headerService);
    this.routers['library'].getAllCategories();
  }
}