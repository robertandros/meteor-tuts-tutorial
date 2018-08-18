import { Comments } from '/db';
import { Meteor } from "meteor/meteor";

Meteor.publish('comments', function () {
    return Comments.find();
});

Meteor.publish('exposure_comments', function() {
    return Comments.find();
});
