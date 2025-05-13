const bcrypt = require('bcryptjs');
const { User } = require('../models');

exports.create = async (req, res) => {
  const { name, email, cpf, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      cpf,
      password: hashedPassword,
      role: role || 'user',
    });

    res.status(201).json({ id: user.id, email: user.email, role: user.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao registrar usuário' });
  }
};