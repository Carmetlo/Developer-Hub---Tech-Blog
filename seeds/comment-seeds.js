const casual = require('casual');

const numberOfComments = 7;

const commentData = [];
for (let i = 0; i < numberOfComments; i += 1) {
  const comment = {
    comment_text: casual.sentence,
    userId: casual.integer(1, 10),
    postId: casual.integer(1, 5),
  };
  commentData.push(comment);
}

export default commentData;