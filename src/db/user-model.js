const mongoose = require('mongoose');
mongoose.Promise = Promise;

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  forename: { type: String, required: true },
  surname: { type: String, required: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('User', UserSchema);
