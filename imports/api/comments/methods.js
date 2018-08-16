import { Meteor } from 'meteor/meteor'
import { Comments, Posts, Users } from '/db';

getModifiedComments = (postId) => {
    let comments = Comments.find({
        postId
    }).fetch();
    comments.forEach((comment) => {
        comment.email = Users.find({
            _id: comment.userId
        }).fetch()[0].emails[0].address;
    });
    return comments;
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