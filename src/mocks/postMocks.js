const MockPost = require("./MockClasses/MockPost");
const MockPostsUser = require("./MockClasses/MockPostsUser");

const mockPost8 = new MockPost(
  "picture8.jpg",
  "629621ccddb32826175e5b9e",
  "Picture 8",
  "2019-04-23T18:25:43.511Z",
  '["painting"]',
  "pictureBackup.firebase.picture8.jpg"
);
mockPost8.id = "629621ccddb32826175e5b9b";

const mockPosts = [
  new MockPost(
    "picture1.jpg",
    "629513c49a68faa58d20c284",
    "Picture 1",
    "2013-04-23T18:25:43.511Z",
    '["painting"]',
    "pictureBackup.firebase.picture1.jpg"
  ),
  new MockPost(
    "picture2.jpg",
    "629621ccddb32826175e5b9e",
    "Picture 2",
    "2013-04-23T18:25:43.511Z",
    '["painting"]',
    "pictureBackup.firebase.picture2.jpg"
  ),
  new MockPost(
    "picture3.jpg",
    "629513c49a68faa58d20c284",
    "Picture 3",
    "2013-04-23T18:25:43.511Z",
    '["painting"]',
    "pictureBackup.firebase.picture3.jpg"
  ),
  new MockPost(
    "picture4.jpg",
    "629621ccddb32826175e5b9e",
    "Picture 4",
    "2013-04-23T18:25:43.511Z",
    '["painting"]',
    "pictureBackup.firebase.picture4.jpg"
  ),
  new MockPost(
    "picture5.jpg",
    "629513c49a68faa58d20c284",
    "Picture 5",
    "2013-04-23T18:25:43.511Z",
    '["painting"]',
    "pictureBackup.firebase.picture5.jpg"
  ),
  new MockPost(
    "picture6.jpg",
    "629621ccddb32826175e5b9e",
    "Picture 6",
    "2013-04-23T18:25:43.511Z",
    '["painting"]',
    "pictureBackup.firebase.picture8.jpg"
  ),
  new MockPost(
    "picture7.jpg",
    "629513c49a68faa58d20c284",
    "Picture 7",
    "2013-04-23T18:25:43.511Z",
    '["painting"]',
    "pictureBackup.firebase.picture7.jpg"
  ),
  mockPost8,
];

const mockPostsUsers = [
  new MockPostsUser(
    "629621ccddb32826175e5b9e",
    "pepa",
    "ieruifgb",
    "$2a$10$he9zzrt.OXRQSLA55x7xaubKoYpHRnFjSqDmT7F24qgMBNTcdth7W"
  ),
  new MockPostsUser(
    "629513c49a68faa58d20c284",
    "pepe",
    "vitus",
    "$2a$10$he9zzrt.OXRQSLA55x7xaubKoYpHRnFjSqDmT7F24qgMBNTcdth7W"
  ),
];
mockPosts[0].gallery = "629513c49a68faa58d20c284";

module.exports = { mockPosts, mockPostsUsers };
