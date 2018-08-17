import Users from './collection';

Users.addReducers({
    email: {
        body: {
            emails : 1
        },
        reduce(object) {
            const { emails } = object;
            return emails[0].address;
        }
    }
});
