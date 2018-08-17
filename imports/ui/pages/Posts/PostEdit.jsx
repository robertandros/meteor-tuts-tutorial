import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { AutoForm, AutoField, LongTextField, SelectField } from 'uniforms-unstyled';
import PostSchema from '/db/posts/schema';
import { PostTypesLabels } from '../../utils/constants';

export default class PostEdit extends React.Component {
    constructor() {
        super();
        this.state = { post: null };
    }

    componentDidMount() {
        Meteor.call('post.get', this.props.match.params._id, (err, post) => {
            this.setState({ post });
        });
    }

    redirectToPostsPage = () => {
        const { history } = this.props;
        history.push('/posts');
    }

    submit = (post) => {
        Meteor.call('post.edit', this.props.match.params._id, post, (err) => {
            if (err) {
                return alert(err.reason);
            }
            alert('Post modified!')
        });
    };

    render() {
        const { post } = this.state;

        if (!post) {
            return <div>Loading....</div>
        }

        return (
            <div className="post">
                <AutoForm onSubmit={this.submit} schema={PostSchema} model={post}>
                    <AutoField name="title" />
                    <LongTextField name="description" />
                    <SelectField name="type" options={PostTypesLabels} />
                    <button type='submit'>Edit post</button>
                    <button onClick={this.redirectToPostsPage}>Back to posts</button>
                </AutoForm>
            </div>
        )
    }
}

PostEdit.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object
};
