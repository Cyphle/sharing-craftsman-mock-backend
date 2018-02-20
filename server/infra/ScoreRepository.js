'use strict';

module.exports = class ScoreRepository {
  constructor() {
    this.data = {};
  }

  getById(id) {
    return this.data[id];
  }

  add(score) {
    this.data[score.id] = score;
  }

  delete(id) {
    delete this.data[id];
  }
}