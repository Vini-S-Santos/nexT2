const { Transaction, User } = require("../models");
const { Op } = require("sequelize");
const xlsx = require("xlsx");
const fs = require("fs");

module.exports = {
  upload: async (req, res) => {
    const workbook = xlsx.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);

    for (let row of data) {
      console.log("Linha:", row);
      const user = await User.findOne({ where: { cpf: row.CPF } });
      if (user) {
        console.log("Usuário encontrado:", user.id);
        await Transaction.create({
          UserId: user.id,
          description: row["Descrição da transação"],
          transactionDate: new Date(row["Data da transação"]),
          points: parseInt(row["Valor em pontos"].replace(/\./g, "").replace(",", "")),
          value: parseFloat(row["Valor"].replace(".", "").replace(",", ".")),
          status: row["Status"],
        });
      } else {
        console.warn("Usuário não encontrado para CPF:", row.CPF);
      }
    }

    fs.unlinkSync(req.file.path);
    res.status(201).json({ message: "Planilha processada com sucesso" });
  },

  userTransactions: async (req, res) => {
    try {
      const { status, from, to } = req.query;
      const where = { UserId: req.userId };

      if (status) where.status = status;
      if (from && to) {
        where.transactionDate = {
          [Op.between]: [
            new Date(`${from}T00:00:00`),
            new Date(`${to}T23:59:59`)
          ],
        };
      }

      const data = await Transaction.findAll({ where });
      res.json(data);
    } catch (err) {
      console.error("Erro ao buscar extrato:", err);
      res.status(500).json({ message: "Erro ao buscar transações" });
    }
  },

  wallet: async (req, res) => {
    try {
      const total = await Transaction.sum("points", {
        where: { UserId: req.userId, status: "Aprovado" },
      });

      res.json({ balance: total || 0 });
    } catch (err) {
      console.error("Erro na carteira:", err);
      res.status(500).json({ message: "Erro ao buscar a carteira" });
    }
  },

  list: async (req, res) => {
    try {
      const { cpf, status, product, from, to, min, max } = req.query;
      const where = {};

      if (status) where.status = status;

      if (from && to) {
        where.transactionDate = {
          [Op.between]: [
            new Date(`${from}T00:00:00`),
            new Date(`${to}T23:59:59`)
          ],
        };
      }

      if (min && max) {
        where.value = {
          [Op.between]: [parseFloat(min), parseFloat(max)],
        };
      }

      if (product) {
        where.description = {
          [Op.like]: `%${product}%`,
        };
      }

      if (cpf) {
        const user = await User.findOne({ where: { cpf } });
        if (user) {
          where.UserId = user.id;
        } else {
          return res.json([]);
        }
      }

      const data = await Transaction.findAll({ where });
      res.json(data);
    } catch (err) {
      console.error("Erro ao buscar relatório:", err);
      res.status(500).json({ message: "Erro ao buscar transações" });
    }
  },
};
