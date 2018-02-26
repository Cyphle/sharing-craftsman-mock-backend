'use strict';

const multer = require('multer');

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
      console.log(`${new Date()} -- [FileController] Get file - Headers: ${JSON.stringify(req.headers)} -- Param: ${req.params.filename}`);
      res.send('https://www.wanimo.com/veterinaire/images/articles/chat/chaton-qui-miaule.jpg');
    });
  }

  updateFile() {
    const storage = multer.diskStorage({
      destination: (req, file, callback) => {
        callback(null, './public');
      },
      filename: (req, file, callback) => {
        callback(null, file.originalname);
      }
    });
    this.upload = multer({ storage : storage }).array('uploads[]', 12);

    this.app.post('/upload', (req, res) => {
      console.log(`${new Date()} -- [FileController] Upload file - Headers: ${JSON.stringify(req.headers)}`);
      this.upload(req, res, (err) => {
        if (err) res.send({ code: 500, response: 'File not accepted' });
        res.send({ code: 200 });
      });
    });
  }
}