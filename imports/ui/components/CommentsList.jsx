import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import Comment from './Comment';
import CommentCreate from './CommentCreate';
import { Comments } from '/db'
import { withQuery } from 'meteor/cultofcoders:grapher-react';

class CommentsList extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    componentDidMount() {
        const { post } = this.props;
        const userId = Meteor.userId();

        Meteor.call('post.isOwner', post._id, userId, (err, isOwner) => {
            if (err) throw err;
            this.setState({
                isOwner
            });
        });
    }

    createComment = (comment, post) => {
        Meteor.call('comment.create', comment, post._id, Meteor.userId(), (err, comments) => {
            if (err) {
                return alert(err.reason);
            }
            this.setState({
                comments
            })
            alert('Comment created.');
        });
    };

    displayComments = (comments, isOwner, post) => {
        if (comments) {
            return comments.map(comment => (
                <Comment key={comment._id} post={post} comment={comment} isOwner={isOwner} />
            ));
        }
    };

    render() {
        const { isOwner } = this.state;
        const { post, data } = this.props;

        return (
            <div className='comments-list'>
                <CommentCreate createComment={this.createComment} post={post} />
                <p> Comments </p>
                {this.displayComments(data, isOwner, post)}
            </div>
        );
    }
}

const CommentsListContainer = withQuery(({ post }) => {
    const query = Comments.createQuery({
        _id: 1,
        text: 1,
        userId: 1,
        authorEmail: 1
    }, { postId: post._id });
    return query;
}, { reactive: true })(CommentsList);

export default CommentsListContainer;

CommentsList.propTypes = {
    post: PropTypes.object,
    data: PropTypes.array
};
