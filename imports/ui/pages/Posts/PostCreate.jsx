import React from 'react';
import { AutoForm, AutoField, LongTextField, SelectField } from 'uniforms-unstyled';
import PostSchema from '/db/posts/schema';
import { postTypes } from '../../utils/constants';

export default class PostCreate extends React.Component {

    constructor() {
        super();
    }

    submit = (post) => {
        var _post = {
            ...post,
            views: 0,
            createdAt: new Date()
        };
        Meteor.call('post.create', _post, (err) => {
            if (err) {
                return alert(err.reason);
            }
            alert('Post added!')
        });
    };

    render() {
        const {history} = this.props;

        return (
            <div className="post">
                <AutoForm onSubmit={this.submit} schema={PostSchema}>
                    <AutoField name="title"/>
                    <LongTextField name="description"/>
                    <SelectField name="type" allowedValues={postTypes} />
                    <button type='submit'>Add post</button>
                    <button onClick={() => history.push('/posts')}>Back to posts</button>
                </AutoForm>
            </div>
        )
    }
}
