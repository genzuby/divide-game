const mongoose = require('mongoose');
const User = require('../models/User');
const mockInfo = require('./userDummyInfo');

const MONGO_URI =
  'mongodb+srv://dividegame:1q2w3e4r@cluster0.0mioh.mongodb.net/dividegame_dev?retryWrites=true&w=majority';

describe('User model test', () => {
  // connection DB
  beforeAll(async () => {
    mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await User.remove({});
  });

  // Disconnect db
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('Shoud have a module', () => {
    expect(User).toBeDefined();
  });

  describe('Insert user Info', () => {
    it('Should add passed user information', async () => {
      expect.assertions(1);

      // Delete test data before insert
      await User.deleteOne({});

      // Insert dummy info from mockInfo
      const user = new User(mockInfo);
      const userRes = await user.save();
      const expectedInfo = 'genzuby';
      const savedInfo = userRes.userId;
      expect(savedInfo).toEqual(expectedInfo);
    });
  });

  describe('Get User Info', () => {
    it('Should have a item', async () => {
      expect.assertions(1);
      const user = await User.find({ userId: mockInfo.userId });
      expect(user.length).toBe(1);
    });

    it('Should have a userId', async () => {
      expect.assertions(1);
      const user = await User.find();
      expect(user[0].userId).toBeTruthy();
    });
  });
});
