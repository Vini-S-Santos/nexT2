const { User } = require('../models');
const bcrypt = require('bcryptjs');

module.exports = {
  register: async (req, res) => {
    const { name, email, cpf, password, role } = req.body;

    try {
      const existingEmail = await User.findOne({ where: { email } });
      if (existingEmail) {
        return res.status(400).json({ message: 'E-mail já cadastrado.' });
      }

      const existingCpf = await User.findOne({ where: { cpf } });
      if (existingCpf) {
        return res.status(400).json({ message: 'CPF já cadastrado.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await User.create({
        name,
        email,
        cpf,
        password: hashedPassword,
        role
      });

      res.status(201).json({ message: 'Usuário registrado com sucesso.' });
    } catch (err) {
      console.error('Erro no registro:', err);
      res.status(500).json({ message: 'Erro interno no servidor.' });
    }
  }
};
