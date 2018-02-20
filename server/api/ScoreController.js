'use strict';

const scoresByContentId = require('../../responses/scores/get-scores-by-content-id.json');
const scoresByMark = require('../../responses/scores/get-scores-by_mark.json');

const ScoreManager = require('../domain/library/ScoreManager');

module.exports = class ScoreController {
  constructor(app, headerService, scoreRepository) {
    this.app = app;
    this.headerService = headerService;
    this.scoreManager = new ScoreManager(scoreRepository);
  }

  activateRoutes() {
    this.getScoresByContentId();
    this.getScoresByMark();
    this.createScore();
    this.updateScore();
    this.deleteScore();
  }

  getScoresByContentId() {
    this.app.get('/score/contentId/{id}', (req, res) => {
      if (this.headerService.isUserAuthorized(req.headers)) {
        if (req.params.id === 'aaa')
          res.send(scoresByContentId);
        res.send();
      } else {
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }

  getScoresByMark() {
    this.app.get('/scores/mar/{mark}', (req, res) => {
      if (this.headerService.isUserAuthorized(req.headers)) {
        if (req.params.mark === '4')
          res.send(scoresByMark);
        res.send();
      } else {
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }

  createScore() {
    this.app.post('/scores', (req, res) => {
      if (this.headerService.isUserAuthorized(req.headers)) {
        this.scoreManager.createScore(req.body);
        res.send();
      } else {
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }

  updateScore() {
    this.app.put('/scores', (req, res) => {
      if (this.headerService.isUserAuthorized(req.headers)) {
        this.scoreManager.updateScore(req.body);
        res.send();
      } else {
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }

  deleteScore() {
    this.app.delete('/scores', (req, res) => {
      if (this.headerService.isUserAuthorized(req.headers)) {
        this.scoreManager.deleteScore(req.body);
        res.send();
      } else {
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }
}