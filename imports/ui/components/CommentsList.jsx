import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import Comment from './Comment';
import CommentCreate from './CommentCreate';

export default class CommentsList extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        const { post } = this.props;
        const userId = Meteor.userId();

        Meteor.call('comments.list', post._id, (err, comments) => {
            if (err) throw err;
            this.setState({
                comments
            });
        });

        Meteor.call('post.isOwner', post._id, userId, (err, isOwner) => {
            if (err) throw err;
            this.setState({
                isOwner
            });
        });
    }

    setComments = comments => {
        this.setState({
            comments
        });
    };

    createComment = (comment, post) => {
        Meteor.call('comment.create', comment, post._id, (err, comments) => {
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
                <Comment key={comment._id} post={post} comment={comment} isOwner={isOwner} setComments={ this.setComments }/>
            ));
        }
    };

    render() {
        const { comments, isOwner } = this.state;
        const { post } = this.props;

        return (
            <div className='comments-list'>
                <CommentCreate createComment={this.createComment} post={post} />
                <p> Comments </p>
                {this.displayComments(comments, isOwner, post)}
            </div>
        );
    }
}

CommentsList.propTypes = {
    post: PropTypes.object
};
