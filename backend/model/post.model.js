const { mongoose, Schema } = require('mongoose');

const postSchema = new Schema({
    brand: { type: String, require: true },
    condition: { type: String, require: true },
    title: { type: String, require: true },
    description: { type: String, require: true },
    image: { type: String, require: true },
    location: { type: String, require: true },
    price: { type: String, require: true },
    name: { type: String, require },
    phoneNumber: { type: String, require },
    user: { type: String, require },
    createdOn: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;