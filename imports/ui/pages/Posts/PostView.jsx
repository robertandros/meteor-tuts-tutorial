import React from 'react';

import Post from '../../components/Post';
import CommentsList from '../../components/CommentsList';

export default class PostView extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        const { match } = this.props;
        Meteor.call('post.updateViews', match.params._id, (err) => {
            if (err) {
                return alert(err.reason);
            }
            alert('Post views updated.');
        });

        Meteor.call('post.get', match.params._id, (err, post) => {
            this.setState({
                post
            });
            console.log(this.state.post);
        });
    }

    render() {
        const { post } = this.state;
        const { history } = this.props;

        if (!post) {
            return <div>Loading....</div>
        }

        return (
            <div className="post">
                <Post post={post} history={history} />
                <CommentsList post={post} />
                <button onClick={() => history.push('/posts')}>Back to posts</button>
            </div>
        )
    }
}
