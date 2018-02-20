'use strict';

const uuidv1 = require('uuid/v1');

module.exports = class CommentManager {
  constructor(commentRepository) {
    this.commentRepository = commentRepository;
  }

  addComment(comment) {
    this.verifyNewComment(comment);
    comment.id = uuidv1();
    this.commentRepository.addComment(comment);
  }

  updateComment(comment) {
    var commentToUpdate = this.commentRepository.getCommentById(comment.id);
    commentToUpdate.commenter = comment.commenter;
    commentToUpdate.contentType = comment.contentType;
    commentToUpdate.contentId = comment.contentId;
    commentToUpdate.content = comment.content;
    this.commentRepository.save(commentToUpdate);
  }

  deleteComment(comment) {
    const commentToDelete = this.commentRepository.getCommentById(comment.id);
    if (commentToDelete.commenter === comment.commenter)
      this.commentRepository.delete(comment.id);
  }

  verifyNewComment(comment) {
    /*
    {
      "id": null,
      "commenter": "commenter",
      "contentType": "CATEGORY",
      "contentId": "aaa",
      "content": "content"
    }
    */
  }
}