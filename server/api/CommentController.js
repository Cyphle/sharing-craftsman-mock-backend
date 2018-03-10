'use strict';

const commentsByContentId = require('../../responses/comments/get-comments-by-content-id.json');
const commentById = require('../../responses/comments/get-comments-by-id.json');

const CommentManager = require('../domain/library/CommentManager');

module.exports = class CommentController {
  constructor(app, headerService, commentRepository) {
    this.app = app;
    this.headerService = headerService;
    this.commentManager = new CommentManager(commentRepository);
  }

  activateRoutes() {
    this.getCommentsByContentId();
    this.getCommentById();
    this.createNewComment();
    this.updateComment();
    this.deleteComment();
  }

  getCommentsByContentId() {
    this.app.get('/comments/contentId/:id', (req, res) => {
      console.log(`${new Date()} -- [CommentController] Get comments by content id - Headers: ${JSON.stringify(req.headers)} -- Body: ${JSON.stringify(req.body)}`);
      if (this.headerService.isUserAuthorized(req.headers)) {
        res.send(this.commentManager.getComments(req.params.id));
      } else {
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }

  getCommentById() {
    this.app.get('/comments/:id', (req, res) => {
      if (this.headerService.isUserAuthorized(req.headers)) {
        if (req.params.id === 'caa') {
          res.send(commentById);
        }
        res.send({});
      } else {
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }

  createNewComment() {
    this.app.post('/comments', (req, res) => {
      console.log(`${new Date()} -- [CommentController] Create new comment - Headers: ${JSON.stringify(req.headers)} -- Body: ${JSON.stringify(req.body)}`);
      if (this.headerService.isUserAuthorized(req.headers)) {
        this.commentManager.addComment(req.body);
        console.log(`${new Date()} -- [CommentController] Comment created`);
        res.status(200);
        res.send();
      } else {
        console.log(`${new Date()} -- [CommentController] Error while creating comment`);
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }

  updateComment() {
    this.app.put('/comments', (req, res) => {
      if (this.headerService.isUserAuthorized(req.headers)) {
        this.commentManager.updateComment(req.body);
        res.send(200);
      } else {
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }

  deleteComment() {
    this.app.post('/comments/delete', (req, res) => {
      if (this.headerService.isUserAuthorized(req.headers)) {
        this.commentManager.deleteComment(req.body);
        res.send(200);
      } else {
        res.status(403);
        res.send('Unauthorized');
      }
    });
  }
}