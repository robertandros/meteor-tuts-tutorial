import { Meteor } from 'meteor/meteor'
import PostService from './services/PostService';

Meteor.methods({
    'post.create'(post) {
        PostService.createPost(post);
    },

    'post.list'() {
        return PostService.getPostsList();
    },

    'post.edit'(_id, post) {
        PostService.editPost(_id, post);
    },

    'post.updateViews'(_id) {
        PostService.updateViews(_id);
    },

    'post.remove'(_id) {
        PostService.removePost(_id);
    },

    'post.get'(_id) {
        return PostService.getPost(_id);
    },

    'post.isOwner'(postId, userId) {
        return PostService.checkIfOwner(postId, userId);
    }
});
