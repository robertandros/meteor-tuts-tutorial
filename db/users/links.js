import Users from './collection';
import Posts from '../posts/collection';
import Comments from '../comments/collection';

Users.addLinks({
    'posts': {
        collection: Posts,
        inversedBy: 'author'
    },
    'commentsArr': {
        collection: Comments,
        inversedBy: 'author'
    }
})