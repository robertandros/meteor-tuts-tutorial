import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { AutoForm, AutoField, LongTextField, SelectField } from 'uniforms-unstyled';
import PostSchema from '/db/posts/schema';
import { PostTypesLabels } from '../../utils/constants';

export default class PostCreate extends React.Component {
    constructor() {
        super();
    }

    redirectToPostPage = () => {
        const { history } = this.props;
        history.push('/posts');
    }

    submit = (post) => {
        Meteor.call('post.create', post, (err) => {
            if (err) {
                return alert(err.reason);
            }
            alert('Post added!');
            this.redirectToPostPage();
        });
    };

    render() {
        return (
            <div className="post">
                <AutoForm onSubmit={this.submit} schema={PostSchema}>
                    <AutoField name="title" />
                    <LongTextField name="description" />
                    <SelectField name="type" options={PostTypesLabels} />
                    <button type='submit'>Add post</button>
                    <button onClick={this.redirectToPostPage}>Back to posts</button>
                </AutoForm>
            </div>
        )
    }
}

PostCreate.propTypes = {
    history: PropTypes.object
};
