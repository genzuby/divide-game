const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Get all players list
const getUserList = router.get('/', async (req, res) => {
  try {
    // sort by available and userid
    const userList = await User.find().sort({ isAvailable: -1, userId: 1 });
    res.json(userList);
  } catch (err) {
    res.json({ message: err });
  }
});

// get user Info
const getUserInfo = router.get('/:userId', async (req, res) => {
  try {
    const userInfo = await User.find({
      userId: req.params.userId,
    });

    //if user id not exist
    if (userInfo.length === 0) {
      res.json([{ noId: true }]);
      return;
    }

    //if user is playing
    if (userInfo[0].isAvailable === false) {
      res.json([{ isPlaying: true }]);
      return;
    }

    res.json(userInfo);
  } catch (err) {
    res.json({ message: err });
  }
});

// update user status
const updateUserInfo = router.put('/:userId', async (req, res) => {
  try {
    const stateUpdate = await User.updateOne(
      {
        userId: req.params.userId,
      },
      { $set: { isAvailable: req.body.isAvailable } }
    );
    res.json(stateUpdate);
  } catch (err) {
    res.json({ message: err });
  }
});

// insert new user
const createUser = router.post('/', async (req, res) => {
  const user = new User({
    userId: req.body.userId,
    userKey: req.body.userKey,
    isAvailable: req.body.isAvailable,
  });

  const userInfo = await User.find({
    userId: req.body.userId,
  });

  // if user id exist
  if (userInfo.length > 0) {
    res.json({ isExistId: true });
    return;
  }

  try {
    const userRes = await user.save();
    res.json(userRes);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = {
  userService: User => {
    return {
      getUserList: getUserList(User),
      getUserInfo: getUserInfo(User),
      updateUserInfo: updateUserInfo(User),
      createUser: createUser(User),
    };
  },
};
module.exports = router;
