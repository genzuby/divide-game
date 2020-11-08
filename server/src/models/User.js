const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  userId: String,
  userKey: String,
  isAvailable: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Users', UserSchema);
