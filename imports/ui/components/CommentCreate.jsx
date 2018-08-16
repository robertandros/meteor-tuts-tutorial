import React from 'react';

import CommentsSchema from '/db/comments/schema';
import { AutoForm, LongTextField } from 'uniforms-unstyled';

export default class Comment extends React.Component {
    submit = comment => {
        this.props.createComment(comment, this.props.post);
    };

    render() {
        return (
            <div className='add-comment'>
                <p> Add a comment: </p>
                <AutoForm onSubmit={this.submit} schema={CommentsSchema}>
                    <LongTextField name="text" />
                    <button type='submit'>Post comment</button>
                </AutoForm>
            </div>
        );
    };
}
