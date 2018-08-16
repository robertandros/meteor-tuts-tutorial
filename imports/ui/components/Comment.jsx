import React from 'react';

export default class Comment extends React.Component {
    renderComment = (comment, isOwner, removeComment) => {
        const userId = Meteor.userId();
        return (
            <div style={{ backgroundColor: '#c9c9c9' }}>
                <p>Email: {comment.email}</p>
                <span>Text: {comment.text}</span>
                {
                    userId === comment.userId || isOwner ?
                        <button style={{ marginLeft: '10px' }} onClick={this.props.removeComment.bind(this, comment, removeComment)}>Delete comment</button>
                        :
                        null
                }
            </div>
        )
    };

    render() {
        var { comment, isOwner, removeComment } = this.props;

        return (
            <div className="comment">
                {this.renderComment(comment, isOwner, removeComment)}
            </div>
        );
    };
};