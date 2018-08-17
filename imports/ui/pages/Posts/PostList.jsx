import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import Post from '../../components/Post';
import { Posts } from '/db';
import { withTracker } from 'meteor/react-meteor-data';

class PostList extends React.Component {

    redirectToCreatePostPage = () => {
        const { history } = this.props;
        history.push('/posts/create');
    }

    render() {
        const { posts, history } = this.props;

        if (!posts) {
            return <div>Loading....</div>
        }

        return (
            <div className="post">
                {
                    posts.map((post) => {
                        return (
                            <div key={post._id}>
                                <Post post={post} history={history} />
                            </div>
                        )
                    })}
                <button onClick={this.redirectToCreatePostPage}>Create a new post</button>
            </div>
        )
    }
}

const PostListContainer = withTracker(({ history }) => {
    Meteor.subscribe('posts');

    let posts = Posts.find().fetch();

    return {
        posts,
        history
    };
})(PostList);

export default PostListContainer;

PostList.propTypes = {
    posts: PropTypes.array,
    history: PropTypes.object
};