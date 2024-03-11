const casual = require('casual');

const numberOfUsers = 10;

const userData = [];
for (let i = 0; i < numberOfUsers; i += 1) {
  const user = {
    name: casual.name,
    email: casual.email,
    password: casual.password,
  };
  userData.push(user);
}

export default userData;