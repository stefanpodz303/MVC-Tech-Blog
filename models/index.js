const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment')

// // User to Post relationship
// User.hasMany(Post, {
//   foreignKey: 'user_id',
// });
// Post to User relationship
Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'cascade',
});

// Comment to User relationship
Comment.belongsTo(User, {
  foreignKey:'user_id',
  onDelete: 'cascade',
  hooks:true
});

// Comment to Post relationship
// Comment.belongsTo(Post, {
//     foreignKey: 'post_id',
//     onDelete: 'cascade',
//     hooks: true
// });

// User to Comment relationsihp
// User.hasMany(Comment, {
//     foreignKey: 'user_id',
//     onDelete: 'cascade',
//     hooks:true
// });

// Post to Comment relationship
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'cascade',
    hooks:true
})

module.exports = { User, Post, Comment };
