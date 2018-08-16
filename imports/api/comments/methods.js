import { Meteor } from 'meteor/meteor'
import { Comments, Posts } from '/db';

getModifiedComments = (postId) => {
    const query = Comments.createQuery({
        $filters: { postId },
        userId: 1,
        text: 1,
        author: {
            email: 1
        }
    });

    return query.fetch();
}

Meteor.methods({
    'comment.create'(comment, postId) {
        const _comment = {
            ...comment,
            postId,
            userId: Meteor.userId()
        };

        Comments.insert(_comment);

        Posts.update({
            _id: postId,
        }, {
                $inc: {
                    comments: 1
                }
            });

        return getModifiedComments(postId);
    },

    'comments.list'(postId) {
        return getModifiedComments(postId);
    },

    'comment.remove'(_id, postId) {
        Comments.remove({
            _id
        });

        Posts.update({
            _id: postId,
        }, {
                $inc: {
                    comments: -1
                }
            });

        return getModifiedComments(postId);
    }
});