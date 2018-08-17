import Comments from './collection';
import Posts from '../posts/collection';
import Users from '../users/collection';

Comments.addLinks({
    'author': {
        type: 'one',
        collection: Users,
        field: 'userId',
    },
    'post': {
        type: 'one',
        collection: Posts,
        field: 'postId'
    },
});