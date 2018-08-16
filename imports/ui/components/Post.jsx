import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Posts } from '/db';

class Post extends React.Component {
    deletePost = (post, history) => {
        Meteor.call('post.remove', post._id, (err) => {
            if (err) {
                return alert(err.reason);
            }
            alert('Post removed.');
            history.push('/posts');
        });
    };

    render() {
        const { post, history } = this.props;

        if (!post) {
            return <div>Loading....</div>
        }

        return (
            <div className="post-info">
                <p>Post id: {post._id}</p>
                <p>Post title: {post.title}</p>
                <p>Post Description: {post.description}</p>
                <p>Post Type: {post.type}</p>
                <p>Post Views: {post.views}</p>
                <p>Post Comments: {this.props.post.comments}</p>
                {
                    post.userId === Meteor.userId() ?
                        <button onClick={this.deletePost.bind(this, post, history)}>Delete Post</button>
                        :
                        null
                }
            </div>
        );
    };
}

export default PostContainer = withTracker(({ post, history }) => {
    Meteor.subscribe('posts');

    let dbPost = Posts.find({
        _id: post._id
    }).fetch()[0];

    return {
        post: dbPost,
        history
    };
})(Post);