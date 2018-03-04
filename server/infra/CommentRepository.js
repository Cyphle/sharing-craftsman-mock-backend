'use strict';

module.exports = class CommentRepository {
  constructor() {
    this.data = {
      cdd: {
        id: 'cdd',
        commenter: 'Mr Smith',
        contentType: 'CATEGORY',
        contentId: 'aaa',
        content: 'Very important topic'
      },
      cza: {
        id: 'cza',
        commenter: 'Mr Smith',
        contentType: 'CATEGORY',
        contentId: 'bbb',
        content: 'Must known'
      }
    };
  }

  getCommentById(id) {
    return this.data[id];
  }

  findByContentId(contentId) {
    let comments = [];
    for (const key of Object.keys(this.data)) {
      comments.push(this.data[key]);
    }
    return comments.filter(comment => comment.contentId === contentId);
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