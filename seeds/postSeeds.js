const { Post } = require('../models');

const postData = [
  {
    "title": "Music Near Me",
    "post_text": "A mobile app that will send you notifications whenever a concert is playing in your area.",
    "user_id": 1
  },
  {
    "title": "The Ultimate Tech Quiz",
    "post_text": "A web app that will give users 10 new technical questions each day and track their progress in things like programming, cybersecurity, database architecture, and more!",
    "user_id": 2  
  },
  {
    "title": "Roll 'Em Up",
    "post_text": "A game for Windows and macOS where players move a ball through a series of increasingly challenging mazes.",
    "user_id": 3
  }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;