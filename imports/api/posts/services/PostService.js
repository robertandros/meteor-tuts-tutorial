import { Posts } from '/db';
import CommentService from '../../comments/services/CommentService';

export default class PostService {
    static createPost(post) {
        const userId = Meteor.userId();
        if (userId) {
            const _post = {
                ...post,
                userId: Meteor.userId()
            };
            Posts.insert(_post);
        }
    };

    static getPostsList() {
        const query = Posts.createQuery({
            userId: 1,
            title: 1,
            description: 1,
            type: 1,
            views: 1,
            comments: 1
        });

        return query.fetch();
    };

    static editPost(_id, post) {
        Posts.update(_id, {
            $set: {
                title: post.title,
                description: post.description,
                type: post.type
            }
        });
    };

    static updateViews(_id) {
        Posts.update(_id, {
            $inc: {
                views: 1
            }
        });
    };

    static removePost(_id) {
        CommentService.removeCommentsForPost(_id);
        Posts.remove(_id);
    };

    static getPost(_id) {
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
    };

    static checkIfOwner(postId, userId) {
        const query = Posts.createQuery({
            $filters: {
                _id: postId,
                userId
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
    };

    static updateCommentsCounter(_id, value) {
        Posts.update({
            _id
        }, {
            $inc: {
                comments: value
            }
        });
    }
};