'use strict';

const uuidv1 = require('uuid/v1');

module.exports = class ScoreManager {
  constructor(scoreRepository) {
    this.scoreRepository = scoreRepository;
  }

  createScore(score) {
    this.verifyScore(score);
    score.id = uuidv1();
    this.scoreRepository.add(score);
  }

  updateScore(score) {
    var scoreToUpdate = this.scoreRepository.getById(score.id);
    scoreToUpdate.giver = score.giver;
    scoreToUpdate.contentType = score.contentType;
    scoreToUpdate.contentId = score.contentId;
    scoreToUpdate.mark = score.mark;
    this.scoreRepository.save(scoreToUpdate);
  }

  deleteScore(score) {
    const scoreToDelete = this.scoreRepository.getById(score.id);
    if (scoreToDelete.giver === score.giver)
      this.scoreRepository.delete(score.id);
  }

  verifyScore(score) {
    /*
{
  "id": null,
  "giver": "john@doe.fr",
  "contentType": "KNOWLEDGE",
  "contentId": "aaa",
  "mark": 4
}
    */
  }
}