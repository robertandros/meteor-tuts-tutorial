import Comments from './collection';
import Posts from '../posts/collection';

Comments.addLinks({
    'author': {
        type: 'one',
        collection: Meteor.users,
        field: 'userId',
    },
    'post': {
        type: 'one',
        collection: Posts,
        field: 'postId'
    },
});