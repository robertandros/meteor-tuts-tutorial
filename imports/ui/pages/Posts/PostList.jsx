import React from 'react';
import Post from '../../components/Post';
import { Posts } from '/db';
import { withTracker } from 'meteor/react-meteor-data';

class PostList extends React.Component {
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
                                <button onClick={() => {
                                    history.push("/posts/edit/" + post._id)
                                }}> Edit post
                                </button>
                                <button onClick={() => {
                                    history.push("/posts/view/" + post._id)
                                }}> View post
                                </button>
                            </div>
                        )
                    })}
                <button onClick={() => history.push('/posts/create')}>Create a new post</button>
            </div>
        )
    }
}

export default PostListContainer = withTracker(({ history }) => {
    Meteor.subscribe('posts');

    let posts = Posts.find().fetch();

    return {
        posts,
        history
    };
})(PostList);