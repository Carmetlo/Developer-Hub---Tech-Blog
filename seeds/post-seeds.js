const casual = require('casual');

const numberOfPosts = 5;

const postData = [];
for (let i = 0; i < numberOfPosts; i += 1) {
  const post = {
    title: casual.title,
    content: casual.sentences(5),
  };
  postData.push(post);
}

export default postData;