const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
module.exports = {
  register: async (req, res) => {
    const { name, email, password, role } = req.body;
    const hashed = await bcrypt.hash(password, 8);
    const user = await User.create({ name, email, password: hashed, role });
    res.status(201).json(user);
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET
    );
    res.json({ token });
  },
};
