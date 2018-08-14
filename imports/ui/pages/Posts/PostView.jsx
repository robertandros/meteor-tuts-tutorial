import React from 'react';

export default class PostEdit extends React.Component {
    constructor() {
        super();
        post = {};
    }

    handleBackClick(history) {
        history.push('/posts');
    }

    componentDidMount() {
        Meteor.call('post.updateViews', this.props.match.params._id, (err) => {
            if (err) {
                return alert(err.reason);
            }
            alert('Post views updated.');
        });
    }

    render() {
        const { history } = this.props;
        return (
            <div className="post">
                <button onClick={() => history.push('/posts')}>Back to posts</button>
            </div>
        )
    }
}
