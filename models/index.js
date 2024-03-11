import Post from './Post';
import User from './User';
import Comment from './Comment';

Post.belongsTo(User, {
    foreignKey: 'user_id',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
});

export { Post, User, Comment };