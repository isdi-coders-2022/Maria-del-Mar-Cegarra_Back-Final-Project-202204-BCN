class MockPost {
  picture;
  user;
  caption;
  date;
  hashtags;

  constructor(picture, user, caption, date, hashtags, pictureBackup) {
    this.picture = picture;
    this.user = user;
    this.caption = caption;
    this.date = date;
    this.hashtags = hashtags;
    this.pictureBackup = pictureBackup;
  }
}

module.exports = MockPost;
