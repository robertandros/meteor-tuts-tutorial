import { Meteor } from 'meteor/meteor'
import { Posts, Comments } from '/db';

Meteor.methods({
    'post.create'(post) {
        const userId = Meteor.userId();
        if (userId) {
            const _post = {
                ...post,
                userId: Meteor.userId()
            };
            Posts.insert(_post);
            return;
        }
    },

    'post.list'() {
        return Posts.find().fetch();
    },

    'post.edit'(_id, post) {
        Posts.update(_id, {
            $set: {
                title: post.title,
                description: post.description,
                type: post.type
            }
        });
    },

    'post.updateViews'(_id) {
        Posts.update(_id, {
            $inc: {
                views: 1
            }
        });
    },

    'post.remove'(_id) {
        Posts.remove(_id);
        Comments.remove({
            postId: _id
        });
    },

    'post.get'(_id) {
        return Posts.findOne({
            _id
        });
    },

    'post.isOwner'(postId, userId) {
        return Posts.find({
            _id: postId,
            userId: userId
        }).fetch().length > 0;
    }
});