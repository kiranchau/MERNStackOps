const User = require("../models/user");

class UserService {
  async createUser(name, email, phone) {
    const newUser = new User({ name, email, phone });
    return await newUser.save();
  }

  async getAllUser() {
    return await User.find();
  }

  async getUserById(userId) {
    return await User.findById(userId);
  }

  async updateUser(userId, updateData) {
    return await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
  }

  async deleteUser(userId){
    return await User.findByIdAndDelete(userId);
  }
}

module.exports = new UserService();
