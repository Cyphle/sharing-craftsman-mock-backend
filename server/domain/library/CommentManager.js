'use strict';

const uuidv1 = require('uuid/v1');

module.exports = class CommentManager {
  constructor(commentRepository) {
    this.commentRepository = commentRepository;
  }

  getComments(contentId) {
    return this.commentRepository.findByContentId(contentId);
  }

  addComment(comment) {
    this.verifyNewComment(comment);
    comment.id = uuidv1();
    if (comment.commenter.length === 0)
      comment.commenter = 'john@doe.fr';
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