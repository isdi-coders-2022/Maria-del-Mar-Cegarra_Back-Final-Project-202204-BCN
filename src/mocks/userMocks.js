const MockPostsUser = require("./MockClasses/MockPostsUser");

const mockUser = new MockPostsUser("0000", "pepi", "pepi94", "1234");

const mockuser0 = new MockPostsUser("1234", "pepa", "pepa94", "1234");

const mockUsers = [
  new MockPostsUser(
    "1234",
    "pepa",
    "pepa94",
    "$2a$10$he9zzrt.OXRQSLA55x7xaubKoYpHRnFjSqDmT7F24qgMBNTcdth7W"
  ),
  new MockPostsUser(
    "5678",
    "pepe",
    "pepe94",
    "$2a$10$he9zzrt.OXRQSLA55x7xaubKoYpHRnFjSqDmT7F24qgMBNTcdth7W"
  ),
  new MockPostsUser(
    "9012",
    "paco",
    "paco94",
    "$2a$10$he9zzrt.OXRQSLA55x7xaubKoYpHRnFjSqDmT7F24qgMBNTcdth7W"
  ),
  new MockPostsUser(
    "3456",
    "paco",
    "paco94",
    "$2a$10$he9zzrt.OXRQSLA55x7xaubKoYpHRnFjSqDmT7F24qgMBNTcdth7W"
  ),
];

module.exports = { mockUser, mockUsers, mockuser0 };
