'use strict';

module.exports = class ScoreRepository {
  constructor() {
    this.data = {
      scc: {
        id: 'scc',
        giver: 'John Doe',
        contentType: 'CATEGORY',
        contentId: 'aaa',
        mark: 5
      },
      sza: {
        id: 'sza',
        giver: 'John Doe',
        contentType: 'CATEGORY',
        contentId: 'bbb',
        mark: 5
      }
    };
  }

  getById(id) {
    return this.data[id];
  }

  findByContentId(contentId) {
    let scores = [];
    for (const key of Object.keys(this.data)) {
      scores.push(this.data[key]);
    }
    return scores.filter(score => score.contentId === contentId);
  }

  add(score) {
    this.data[score.id] = score;
  }

  delete(id) {
    delete this.data[id];
  }
}