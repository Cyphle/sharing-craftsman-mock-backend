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
    this.getKnowledgeById();
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
      console.log(`${new Date()} -- [LibraryController] Get all categories - Headers: ${JSON.stringify(req.headers)}`);
      if (this.headerService.isUserAuthorized(req.headers)) {
        console.log(`${new Date()} -- [UserController] All categories: ${JSON.stringify(this.libraryManager.getAllCategories())}`);
        res.send(this.libraryManager.getAllCategories());
      } else {
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }

  getCategoryById() {
    this.app.get('/library/:id', (req, res) => {
      console.log(`${new Date()} -- [LibraryController] Get category by id - Headers: ${JSON.stringify(req.headers)}`);
      if (this.headerService.isUserAuthorized(req.headers)) {
        console.log(`${new Date()} -- [LibraryController] Category: ${JSON.stringify(this.libraryManager.getCategoryById(req.params.id))}`);
        res.send(this.libraryManager.getCategoryById(req.params.id));
      } else {
        console.log(`${new Date()} -- [LibraryController] Error while getting category by id`);
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }

  getKnowledgeById() {
    this.app.get('/library/knowledges/:id', (req, res) => {
      console.log(`${new Date()} -- [LibraryController] Get knowledge by id - Headers: ${JSON.stringify(req.headers)}`);
      if (this.headerService.isUserAuthorized(req.headers)) {
        console.log(`${new Date()} -- [LibraryController] Knowledge: ${JSON.stringify(this.libraryManager.getKnowledgeById(req.params.id))}`);
        res.send(this.libraryManager.getKnowledgeById(req.params.id));
      } else {
        console.log(`${new Date()} -- [LibraryController] Error while getting knowledge by id`);
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }

  searchCategories() {
    this.app.post('/library/search', (req, res) => {
      console.log(`${new Date()} -- [LibraryController] Search categories - Headers: ${JSON.stringify(req.headers)} -- Body: ${JSON.stringify(req.body)}`);
      if (this.headerService.isUserAuthorized(req.headers)) {
        console.log(`${new Date()} -- [LibraryController] Found categories: ${JSON.stringify(this.libraryManager.searchCategories(req.body))}`);
        res.send(this.libraryManager.searchCategories(req.body));
      } else {
        console.log(`${new Date()} -- [LibraryController] Error search categories`);
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }

  createCategory() {
    this.app.post('/library/categories', (req, res) => {
      console.log(`${new Date()} -- [LibraryController] Create new category - Headers: ${JSON.stringify(req.headers)} -- Body: ${JSON.stringify(req.body)}`);
      if (this.headerService.isUserAuthorized(req.headers)) {
        this.libraryManager.createCategory(req.body);
        console.log(`${new Date()} -- [LibraryController] Category created`);
        res.status(200);
        res.send();
      } else {
        console.log(`${new Date()} -- [LibraryController] Error while creating category`);
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }

  createKnowledge() {
    this.app.post('/library/knowledges', (req, res) => {
      console.log(`${new Date()} -- [LibraryController] Create knowledge - Headers: ${JSON.stringify(req.headers)} -- Body: ${JSON.stringify(req.body)}`);
      if (this.headerService.isUserAuthorized(req.headers)) {
        this.libraryManager.createKnowledge(req.body);
        console.log(`${new Date()} -- [LibraryController] Knwoledge created`);
        res.status(200);
        res.send();
      } else {
        console.log(`${new Date()} -- [LibraryController] Error while creating knowledge`);
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }

  updateCategory() {
    this.app.put('/library/categories', (req, res) => {
      console.log(`${new Date()} -- [LibraryController] Update category - Headers: ${JSON.stringify(req.headers)} -- Body: ${JSON.stringify(req.body)}`);
      if (this.headerService.isUserAuthorized(req.headers)) {
        this.libraryManager.updateCategory(req.body);
        console.log(`${new Date()} -- [LibraryController] Category updated`);
        res.status(200);
        res.send();
      } else {
        console.log(`${new Date()} -- [LibraryController] Error while updating category`);
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }

  updateKnowledge() {
    this.app.put('/library/knowledges', (req, res) => {
      console.log(`${new Date()} -- [LibraryController] Update knowledge - Headers: ${JSON.stringify(req.headers)} -- Body: ${JSON.stringify(req.body)}`);
      if (this.headerService.isUserAuthorized(req.headers)) {
        this.libraryManager.updateKnowledge(req.body);
        console.log(`${new Date()} -- [LibraryController] Knowledge updated`);
        res.status(200);
        res.send();
      } else {
        console.log(`${new Date()} -- [LibraryController] Error while updating knowledge`);
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }

  deleteCategory() {
    this.app.delete('/library/categories/:categoryId', (req, res) => {
      console.log(`${new Date()} -- [LibraryController] Delete category - Headers: ${JSON.stringify(req.headers)} -- Body: ${JSON.stringify(req.body)}`);
      if (this.headerService.isUserAuthorized(req.headers)) {
        this.libraryManager.deleteCategory(req.params.categoryId);
        console.log(`${new Date()} -- [LibraryController] Category deleted`);
        res.status(200);
        res.send();
      } else {
        console.log(`${new Date()} -- [LibraryController] Error while deleting category`);
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }

  deleteKnowledge() {
    this.app.post('/library/knowledges/delete', (req, res) => {
      console.log(`${new Date()} -- [LibraryController] Delete knowledge - Headers: ${JSON.stringify(req.headers)} -- Body: ${JSON.stringify(req.body)}`);
      if (this.headerService.isUserAuthorized(req.headers)) {
        this.libraryManager.deleteKnowledge(req.body);
        console.log(`${new Date()} -- [LibraryController] Knowledge deleted`);
        res.status(200);
        res.send();
      } else {
        console.log(`${new Date()} -- [LibraryController] Error while deleting knowledge`);
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }
}