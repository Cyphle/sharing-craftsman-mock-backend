'use strict';

const allCategories = require('../../responses/library/get-all-categories.json');
const categoryById = require('../../responses/library/get-category-by-id.json');
const searchedCategories = require('../../responses/library/search-categories.json');

const LibraryManager = require('../domain/library/LibraryManager');

module.exports = class LibraryController {
  constructor(app, headerService, libraryRepository) {
    this.app = app;
    this.headerService = headerService;
    this.libraryManager = new LibraryManager(libraryRepository);
  }

  activateRoutes() {
    this.getAllCategories();
    this.getCategoryById();
    this.searchCategories();
    this.createCategory();
    this.createKnowledge();
    this.updateCategory();
    this.updateKnowledge();
    this.deleteCategory();
    this.deleteKnowledge();
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

  getCategoryById() {
    this.app.get('/library/{id}', (req, res) => {
      if (this.headerService.isUserAuthorized(req.headers)) {
        if (req.params.id === 'bbb')
          res.send(categoryById);
        res.send({})
      } else {
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }

  searchCategories() {
    this.app.post('/library/search', (req, res) => {
      if (this.headerService.isUserAuthorized(req.headers)) {
        if (req.body.searchKeys.KnowledgeTitle === 'know' && req.body.searchKeys.CategoryName === 'Arch')
          res.send(searchedCategories);
        res.send({})
      } else {
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }

  createCategory() {
    this.app.post('/library/categories', (req, res) => {
      if (this.headerService.isUserAuthorized(req.headers)) {
        this.libraryManager.createCategory(req.body);
        res.send(200);
      } else {
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }

  createKnowledge() {
    this.app.post('/library/knowledges', (req, res) => {
      if (this.headerService.isUserAuthorized(req.headers)) {
        this.libraryManager.createKnowledge(req.body);
        res.send(200);
      } else {
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }

  updateCategory() {
    this.app.put('/library/categories', (req, res) => {
      if (this.headerService.isUserAuthorized(req.headers)) {
        this.libraryManager.updateCategory(req.body);
        res.send(200);
      } else {
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }

  updateKnowledge() {
    this.app.put('/library/knowledges', (req, res) => {
      if (this.headerService.isUserAuthorized(req.headers)) {
        this.libraryManager.updateKnowledge(req.body);
        res.send(200);
      } else {
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }

  deleteCategory() {
    this.app.delete('/library/categories/{categoryId}', (req, res) => {
      if (this.headerService.isUserAuthorized(req.headers)) {
        this.libraryManager.deleteCategory(req.params.categoryId);
        res.send(200);
      } else {
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }

  deleteKnowledge() {
    this.app.post('/library/knowledges/delete', (req, res) => {
      if (this.headerService.isUserAuthorized(req.headers)) {
        this.libraryManager.deleteKnowledge(req.body);
        res.send(200);
      } else {
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }
}