'use strict';

module.exports = class LibraryRepository {
  constructor() {
    this.data = {};
  }

  getById(id) {
    return this.data[id];
  }

  add(category) {
    this.data[category.id] = category;
  }

  delete(id) {
    delete this.data[id];
  }
}