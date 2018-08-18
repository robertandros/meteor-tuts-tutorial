import { Comments, Users } from '/db';
import { Meteor } from 'meteor/meteor';
import PostService from '../../posts/services/PostService';

export default class CommentService {
    static getModifiedComments(postId) {
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

    static createComment(comment, postId) {
        const userId = Meteor.userId();
        const query = Users.createQuery({
            $filters: { _id: userId },
            email: 1
        });
        const email = query.fetch()[0].email;
        const _comment = {
            ...comment,
            postId,
            userId,
            authorEmail: email
        };

        Comments.insert(_comment);
        PostService.updateCommentsCounter(postId, 1);
        return this.getModifiedComments(postId);
    }

    static getCommentsList(postId) {
        return this.getModifiedComments(postId);
    }

    static removeComment(_id, postId) {
        Comments.remove({
            _id
        });
        PostService.updateCommentsCounter(postId, -1);

        return this.getModifiedComments(postId);
    }

    static removeCommentsForPost(_id) {
        Comments.remove({
            postId: _id
        });
    }
}
