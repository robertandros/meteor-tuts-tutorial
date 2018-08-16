import React from 'react';
import { Meteor } from 'meteor/meteor';
import Comment from './Comment';
import CommentCreate from './CommentCreate';

export default class CommentsList extends React.Component {
    constructor() {
        super();
        this.state = {};
    };

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
    };

    createComment = comment => {
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

    removeComment = (({ _id, postId }) => {
        Meteor.call('comment.remove', _id, postId, (err, comments) => {
            if (err) throw err;
            this.setState({
                comments
            });
        });
    });

    displayComments = (comments, isOwner) => {
        if (comments) {
            return comments.map(comment => (
                <Comment key={comment._id} comment={comment} isOwner={isOwner} removeComment={this.removeComment} />
            ));
        };
    };

    render() {
        var { comments, isOwner } = this.state;
        var { post } = this.props;

        return (
            <div className='comments-list'>
                <CommentCreate createComment={this.createComment} post={post} />
                <p> Comments </p>
                {this.displayComments(comments, isOwner)}
            </div>
        );
    };
};
