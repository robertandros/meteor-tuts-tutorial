import Posts from './collection';
import Users from '../users/collection';
import Comments from '../comments/collection';

Posts.addLinks({
    'author': {
        type: 'one',
        collection: Users,
        field: 'userId',
    },
    'commentsArr': {
        collection: Comments,
        inversedBy: 'post'
    }
});