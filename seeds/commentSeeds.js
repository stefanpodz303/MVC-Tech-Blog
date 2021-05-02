const { Comment } = require("../models");

const commentData = [
    {
        "comment_text": "Nice Job!",
        "user_id": 1,
        "post_id": 1
    },
    {
        "comment_text": "Way to go!",
        "user_id": 2,
        "post_id": 1
    },
    {
        "comment_text": "Best tech quiz I've taken.",
        "user_id": 2,
        "post_id": 2
    },
    {
        "comment_text": "Sweet game.",
        "user_id": 3,
        "post_id": 3
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;