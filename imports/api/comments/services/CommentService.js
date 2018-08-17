import { Comments } from '/db';
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
    };

    static createComment(comment, postId) {
        const _comment = {
            ...comment,
            postId,
            userId: Meteor.userId()
        };

        Comments.insert(_comment);
        PostService.updateCommentsCounter(postId, 1);
        return this.getModifiedComments(postId);
    };

    static getCommentsList(postId) {
        return this.getModifiedComments(postId);
    };

    static removeComment(_id, postId) {
        Comments.remove({
            _id
        });
        PostService.updateCommentsCounter(postId, -1);

        return this.getModifiedComments(postId);
    };

    static removeCommentsForPost(_id) {
        Comments.remove({
            postId: _id
        });
    };
}