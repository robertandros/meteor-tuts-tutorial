import { Meteor } from 'meteor/meteor'
import { Users } from '/db';

Meteor.methods({
    'user.register'(data) {
        const user = Users.createQuery({
            $filters: {
                'emails.0.address': data.email
            },
            userId: 1,
            text: 1,
            author: {
                email: 1
            }
        }).fetch().length > 0;

        if (user) {
            throw new Meteor.Error(500, 'email_already_taken',
                'Email already taken');
        }

        Accounts.createUser({
            email: data.email,
            password: data.password
        });
    }
});