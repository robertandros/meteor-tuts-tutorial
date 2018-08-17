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
        const query = Posts.createQuery({
            userId: 1,
            title: 1,
            description: 1,
            type: 1,
            views: 1,
            comments: 1
        });

        return query.fetch();
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
        const query = Posts.createQuery({
            $filters: { _id },
            userId: 1,
            title: 1,
            description: 1,
            type: 1,
            views: 1,
            comments: 1,
            commentsArr: {
                _id: 1,
                text: 1
            }
        });

        return query.fetch()[0];
    },

    'post.isOwner'(postId, userId) {
        const query = Posts.createQuery({
            $filters: {
                _id: postId,
                userId: userId
            },
            userId: 1,
            title: 1,
            description: 1,
            type: 1,
            views: 1,
            comments: 1,
            commentsArr: {
                _id: 1,
                text: 1
            }
        });
        return query.fetch().length > 0;
    }
});