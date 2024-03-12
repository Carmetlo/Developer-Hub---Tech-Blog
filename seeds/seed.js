
import sequelize from '../config/connection.js';
import Post from '../models/Post.js';
import User from '../models/User.js';
import Comment from '../models/Comment.js';

import userData from './user-seeds.js';
import postData from './post-seeds.js';
import commentData from './comment-seeds.js';


const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    })
    console.log('users', users)

    for (const post of postData) {
        await Post.create({
            ...post,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
        console.log('post', post)
    }
    const posts = await Post.findAll()
    console.log('posts', posts)
    for (const comment of commentData) {
        await Comment.create({
            ...comment,
            user_id: users[Math.floor(Math.random() * users.length)].id,
            post_id: posts[Math.floor(Math.random() * posts.length)].id,
        });
        console.log('comment', comment)
    }
    console.log('seeded');
    console.log('number of users seeded', users.length);
    console.log('number of posts seeded', posts.length);
    console.log('number of comments seeded', commentData.length);
    
 process.exit(0);
};

seedDatabase();
