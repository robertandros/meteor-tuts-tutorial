import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import Post from '../../components/Post';
import CommentsList from '../../components/CommentsList';

export default class PostView extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    redirectToPostPage = () => {
        const { history } = this.props;
        history.push('/posts');
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
                <Post post={post} history={history} onView={true}/>
                <CommentsList post={post} />
                <button onClick={this.redirectToPostPage}>Back to posts</button>
            </div>
        )
    }
}

PostView.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object
};
