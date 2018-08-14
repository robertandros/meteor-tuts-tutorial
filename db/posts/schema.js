import SimplSchema from 'simpl-schema';

export default new SimplSchema({
    title: String,
    description: String,
    userId: {
        type: String,
        optional: true
    },
    type: String,
    views: {
        type: Number,
        optional: true
    },
    createdAt: {
        type: Date,
        optional: true
    }
});