import { Meteor } from 'meteor/meteor';
import CommentService from './services/CommentService';

Meteor.methods({
    'comment.create'(comment, postId) {
        return CommentService.createComment(comment, postId);
    },

    'comments.list'(postId) {
        return CommentService.getCommentsList(postId);
    },

    'comment.remove'(_id, postId) {
        return CommentService.removeComment(_id, postId);
    }
});