const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: false
    },
    postContent: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    postDate: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Post', postSchema);