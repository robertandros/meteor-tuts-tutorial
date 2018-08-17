import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Posts } from '/db';
import { PostTypesLabels } from '../utils/constants';

class Post extends React.Component {

    redirectToPostPage = () => {
        const { history } = this.props;
        history.push('/posts');
    }

    redirectToPostViewPage = () => {
        const { post, history } = this.props;
        history.push(`/posts/view/${post._id}`);
    }

    redirectToPostEditPage = () => {
        const { post, history } = this.props;
        history.push(`/posts/edit/${post._id}`);
    }

    deletePost = () => {
        const { post, history } = this.props;
        Meteor.call('post.remove', post._id, (err) => {
            if (err) {
                return alert(err.reason);
            }
            alert('Post removed.');
            history.push('/posts');
        });
    };

    render() {
        const { post } = this.props;

        if (!post) {
            return <div>Loading...</div>
        }

        return (
            <div className="post-info">
                <p>Post id: {post._id}</p>
                <p>Post title: {post.title}</p>
                <p>Post Description: {post.description}</p>
                <p>Post Type: {PostTypesLabels[post.type]}</p>
                <p>Post Views: {post.views}</p>
                <p>Post Comments: {this.props.post.comments}</p>
                {
                    post.userId === Meteor.userId() ?
                        <button onClick={this.deletePost}>Delete Post</button>
                        :
                        null
                }
                <button onClick={this.redirectToPostEditPage}>Edit post</button>
                <button onClick={this.redirectToPostViewPage}>View post</button>
            </div>
        );
    }
}

const PostContainer = withTracker(({ post, history }) => {
    Meteor.subscribe('posts');

    let dbPost = Posts.find({
        _id: post._id
    }).fetch()[0];

    return {
        post: dbPost,
        history
    };
})(Post);

export default PostContainer;

Post.propTypes = {
    post: PropTypes.object,
    history: PropTypes.object
};
