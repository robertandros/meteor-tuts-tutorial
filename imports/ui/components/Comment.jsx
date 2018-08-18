import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';

export default class Comment extends React.Component {
    removeComment = () => {
        const { _id, postId } = this.props.comment;
        Meteor.call('comment.remove', _id, postId, (err) => {
            if (err) throw err;
        });
    };

    renderComment = (comment, isOwner) => {
        const userId = Meteor.userId();
        return (
            <div style={{ backgroundColor: '#c9c9c9' }}>
                <p>Email: {comment.authorEmail}</p>
                <span>Text: {comment.text}</span>
                {
                    userId === comment.userId || isOwner ?
                        <button style={{ marginLeft: '10px' }} onClick={this.removeComment}>Delete comment</button>
                        :
                        null
                }
            </div>
        )
    };

    render() {
        const { comment, isOwner } = this.props;

        return (
            <div className="comment">
                {this.renderComment(comment, isOwner)}
            </div>
        );
    }
}

Comment.propTypes = {
    post: PropTypes.object,
    comment: PropTypes.object,
    isOwner: PropTypes.bool,
};
