import React from 'react';
import PropTypes from 'prop-types';
import CommentsSchema from '/db/comments/schema';
import { AutoForm, LongTextField } from 'uniforms-unstyled';

export default class CommentCreate extends React.Component {
    submit = comment => {
        this.props.createComment(comment, this.props.post);
    }

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
    }
}

CommentCreate.propTypes = {
    post: PropTypes.object,
    createComment: PropTypes.func
};
