class MockPostsUser {
  id;
  name;
  username;
  password;

  constructor(id, name, username, password) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.password = password;
  }
}

module.exports = MockPostsUser;
