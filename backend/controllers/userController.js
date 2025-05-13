const { User } = require("../models");
module.exports = {
  create: async (req, res) => {
    const user = await User.create(req.body);
    res.status(201).json(user);
  },
};
