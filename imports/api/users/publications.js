import { Users } from '/db';
import { Meteor } from 'meteor/meteor';

Meteor.publish('users', function () {
    return Users.find();
});
