'use strict';

const allCategories = require('../../responses/library/get-all-categories.json');
module.exports = class LibraryRepository {
  constructor() {
    this.data = {
      aaa: {
        "id": "aaa",
        "name": "Architecture",
        "knowledges": [
          {
            "id": "kaa",
            "creator": "John Doe",
            "title": "Hexagonale",
            "content": "Known as port and adapter"
          },
          {
            "id": "kbb",
            "creator": "John Doe",
            "title": "CQRS",
            "content": "Segregation of command and query"
          }
        ]
      },
      bbb: {
        "id": "bbb",
        "name": "SOLID",
        "knowledges": [
          {
            "id": "kcc",
            "creator": "Foo Bar",
            "title": "Single responsibility principle",
            "content": "A thing must have one reason to change"
          },
          {
            "id": "kcd",
            "creator": "Foo Bar",
            "title": "Open close principle",
            "content": "Open to extension, closed to modification"
          }
        ]
      }
    };
  }

  getById(id) {
    return this.data[id];
  }

  getAll() {
    let categories = [];
    for (const key of Object.keys(this.data)) {
      categories.push(this.data[key]);
    }
    return categories;
  }

  add(category) {
    this.data[category.id] = category;
  }

  delete(id) {
    delete this.data[id];
  }
}