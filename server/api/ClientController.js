'use strict';

module.exports = class ClientController {
  constructor(app) {
    this.app = app;
  }

  activateRoutes() {
    this.createClient();
  }

  createClient() {
    this.app.post('/clients/register', (req, res) => {
      res.send(200);
    });
  }
}