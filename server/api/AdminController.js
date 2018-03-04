'use strict';

const allAuthorizations = require('../../responses/admin/get-groups.json');
const allUsers = require('../../responses/admin/get-users.json');

const AdminManager = require('../domain/user/AdminManager');

module.exports = class AdminController {
  constructor(app, headerService) {
    this.app = app;
    this.headerService = headerService;
    this.adminManager = new AdminManager();
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
      if (this.headerService.isUserAuthorized(req.headers)) {
        res.send(allAuthorizations);
      } else {
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }

  createAuthorization() {
    this.app.post('/admin/roles/groups', (req, res) => {
      if (this.headerService.isUserAuthorized(req.headers) && this.adminManager.validateGroup(req.body)) {
        res.send(200);
      } else {
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }

  deleteAuthorization() {
    this.app.delete('/admin/roles/groups', (req, res) => {
      if (this.headerService.isUserAuthorized(req.headers) && this.adminManager.validateGroup(req.body)) {
        res.send(200);
      } else {
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
        res.send(200);
      } else {
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }

  updateUser() {
    this.app.put('/admin/users', (req, res) => {
      if (this.headerService.isUserAuthorized(req.headers) && this.adminManager.validateUser(req.bdoy)) {
        res.send(200);
      } else {
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }

  createUser() {
    this.app.post('/admin/users', (req, res) => {
      if (this.headerService.isUserAuthorized(req.headers) && this.adminManager.validateUser(req.bdoy)) {
        res.send(200);
      } else {
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }

  addGroupToUser() {
    this.app.post('/admin/users/groups', (req, res) => {
      if (this.headerService.isUserAuthorized(req.headers) && this.adminManager.validateAddedGroup(req.bdoy)) {
        res.send(200);
      } else {
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }

  deleteGroupFromUser() {
    this.app.delete('/admin/users/groups', (req, res) => {
      if (this.headerService.isUserAuthorized(req.headers) && this.adminManager.validateAddedGroup(req.bdoy)) {
        res.send(200);
      } else {
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }
}