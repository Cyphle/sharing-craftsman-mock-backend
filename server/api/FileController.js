'use strict';

module.exports = class FileController {
  constructor(app) {
    this.app = app;
  }

  activateRoutes() {
    this.getFile();
    this.updateFile();
  }

  getFile() {
    this.app.get('/files/{filename:.+}', (req, res) => {
      res.send('https://www.wanimo.com/veterinaire/images/articles/chat/chaton-qui-miaule.jpg');
    });
  }

  updateFile() {
    this.app.post('/upload', (req, res) => {
      res.send(200);
    });
  }
}