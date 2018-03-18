'use strict';

const allAuthorizations = require('../../responses/admin/get-groups.json');
const allUsers = require('../../responses/admin/get-users.json');

const AdminManager = require('../domain/AdminManager');

module.exports = class AdminController {
  constructor(app, headerService, adminRepository) {
    this.app = app;
    this.headerService = headerService;
    this.adminManager = new AdminManager(adminRepository);
  }

  activateRoutes() {
    this.getAllAuthorizations();
    this.createAuthorization();
    this.deleteAuthorization();
    this.getAllUsers();
    this.deleteUser();
    this.updateUser();
    this.createUser();
    this.addGroupToUser();
    this.deleteGroupFromUser();
  }

  getAllAuthorizations() {
    this.app.get('/admin/roles/groups', (req, res) => {
      console.log(`${new Date()} -- [AdminController] Get authorizations - Headers: ${JSON.stringify(req.headers)}`);
      if (this.headerService.isUserAuthorized(req.headers)) {
        console.log(`${new Date()} -- [AdminController] Authorizations: ${JSON.stringify(this.adminManager.getAuthorizations())}`);
        res.send(this.adminManager.getAuthorizations());
      } else {
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }

  createAuthorization() {
    this.app.post('/admin/roles/groups', (req, res) => {
      console.log(`${new Date()} -- [AdminController] Create authorization - Headers: ${JSON.stringify(req.headers)} -- Body: ${JSON.stringify(req.body)}`);
      if (this.headerService.isUserAuthorized(req.headers) && this.adminManager.validateGroup(req.body)) {
        this.adminManager.createAuthorization(req.body);
        console.log(`${new Date()} -- [AdminController] Authorization created`);
        res.status(200);
        res.send();
      } else {
        console.log(`${new Date()} -- [AdminController] Error while creating authorization`);
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }

  deleteAuthorization() {
    this.app.post('/admin/roles/groups/delete', (req, res) => {
      console.log(`${new Date()} -- [AdminController] Delete authorization - Headers: ${JSON.stringify(req.headers)} -- Body: ${JSON.stringify(req.body)}`);
      if (this.headerService.isUserAuthorized(req.headers) && this.adminManager.validateGroup(req.body)) {
        this.adminManager.deleteAuthorization(req.body);
        console.log(`${new Date()} -- [AdminController] Authorization delete`);
        res.status(200);
        res.send();
      } else {
        console.log(`${new Date()} -- [AdminController] Error while deleting authorization`);
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }

  getAllUsers() {
    this.app.get('/admin/users', (req, res) => {
      if (this.headerService.isUserAuthorized(req.headers)) {
        res.send(allUsers);
      } else {
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }

  deleteUser() {
    this.app.delete('/admin/users/:username', (req, res) => {
      if (this.headerService.isUserAuthorized(req.headers) && req.params.username) {
        res.status(200);
        res.send();
      } else {
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }

  updateUser() {
    this.app.put('/admin/users', (req, res) => {
      if (this.headerService.isUserAuthorized(req.headers) && this.adminManager.validateUser(req.bdoy)) {
        res.status(200);
        res.send();
      } else {
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }

  createUser() {
    this.app.post('/admin/users', (req, res) => {
      if (this.headerService.isUserAuthorized(req.headers) && this.adminManager.validateUser(req.bdoy)) {
        res.status(200);
        res.send();
      } else {
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }

  addGroupToUser() {
    this.app.post('/admin/users/groups', (req, res) => {
      if (this.headerService.isUserAuthorized(req.headers) && this.adminManager.validateAddedGroup(req.bdoy)) {
        res.status(200);
        res.send();
      } else {
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }

  deleteGroupFromUser() {
    this.app.post('/admin/users/groups/delete', (req, res) => {
      if (this.headerService.isUserAuthorized(req.headers) && this.adminManager.validateAddedGroup(req.bdoy)) {
        res.status(200);
        res.send();
      } else {
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }
}