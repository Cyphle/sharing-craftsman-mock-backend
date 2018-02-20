'use strict';

module.exports = class CommentRepository {
  constructor() {
    this.data = {};
  }

  getCommentById(id) {
    return this.data[id];
  }

  addComment(comment) {
    this.data[comment.id] = comment;
  }

  save(comment) {
    this.data[comment.id] = comment;
  }

  delete(id) {
    delete this.data[id];
  }
}