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
      },
      caa: {
        id: 'caa',
        commenter: 'John Doe',
        contentType: 'KNOWLEDGE',
        contentId: 'kaa',
        content: 'This is a very good architecture'
      },
      cbb: {
        id: 'cbb',
        commenter: 'Foo Bar',
        contentType: 'KNOWLEDGE',
        contentId: 'kaa',
        content: 'Advanced technique'
      },
      ccc: {
        id: 'ccc',
        commenter: 'Mr Smith',
        contentType: 'KNOWLEDGE',
        contentId: 'kaa',
        content: 'I have it'
      },
      cab: {
        id: 'cab',
        commenter: 'John Doe',
        contentType: 'KNOWLEDGE',
        contentId: 'kcc',
        content: 'Often poorly understood'
      },
      cac: {
        id: 'cac',
        commenter: 'John Doe',
        contentType: 'KNOWLEDGE',
        contentId: 'kcd',
        content: 'Often poorly understood'
      },
      cad: {
        id: 'cad',
        commenter: 'Foo Bar',
        contentType: 'KNOWLEDGE',
        contentId: 'kcd',
        content: 'Very hard to understand'
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