const userService = require("../services/userService");

class UserController {
  async createUser(req, res) {
    try {
      const { name, email, phone } = req.body;
      const saveUser = await userService.createUser(name, email, phone);
      res.json(saveUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllUser(req, res) {
    try {
      const users = await userService.getAllUser();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUserById(req, res) {
    try {
      const users = await userService.getUserById(req.params.id);
      if (!users) {
        return res.status(404).json({ error: "User not found..." });
      }
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateUser(req, res) {
    try {
      const updatedUser = await userService.updateUser(req.params.id, req.body);
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found..." });
      }
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const users = await userService.deleteUser(req.params.id);
      if (!users) {
        return res.status(404).json({ error: "User not found..." });
      }
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new UserController();
