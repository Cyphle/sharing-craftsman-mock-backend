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
      },
      saa: {
        id: 'saa',
        giver: 'John Doe',
        contentType: 'KNOWLEDGE',
        contentId: 'kaa',
        mark: 5
      },
      sbb: {
        id: 'sbb',
        giver: 'John Doe',
        contentType: 'KNOWLEDGE',
        contentId: 'kbb',
        mark: 5
      },
      sab: {
        id: 'sab',
        giver: 'John Doe',
        contentType: 'KNOWLEDGE',
        contentId: 'kcc',
        mark: 5
      },
      sac: {
        id: 'sac',
        giver: 'Foo Bar',
        contentType: 'KNOWLEDGE',
        contentId: 'kcc',
        mark: 3
      },
      sbd: {
        id: 'sbd',
        giver: 'John Doe',
        contentType: 'KNOWLEDGE',
        contentId: 'kcd',
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