const casual = require('casual');
import { Sequelize } from '../config/connection';
import { Post, User, Comment } from '../models';
import { Post as PostSeed, User as UserSeed, Comment as CommentSeed } from './seed';

const seedDatabase = async () => {
    await Sequelize.sync({ force: true });

    const users = await User.bulkCreate(UserSeed, {
        individualHooks: true,
        returning: true,
    })
    console.log('users', users)

    for (const post of PostSeed) {
        await Post.create({
            ...post,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
        console.log('post', post)
    }
    const posts = await Post.findAll()
    console.log('posts', posts)
    for (const comment of CommentSeed) {
        await Comment.create({
            ...comment,
            user_id: users[Math.floor(Math.random() * users.length)].id,
            post_id: posts[Math.floor(Math.random() * posts.length)].id,
        });
        console.log('comment', comment)
    }
 process.exit(0);
};

