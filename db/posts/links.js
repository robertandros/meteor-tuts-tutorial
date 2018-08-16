import Posts from './collection';
import Comments from '../comments/collection';

Posts.addLinks({
    'commentsArr': {
        collection: Comments,
        inversedBy: 'post'
    }
});