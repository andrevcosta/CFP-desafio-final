const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');

const findTransactions = async (req, res) => {
  const period = req.query.period;
  const filter = { yearMonth: period };

  try {
    const transaction = await TransactionModel.find(filter);
    if (!period) {
      res
        .status(400)
        .send(
          `É necessário informar o parâmetro /"period/", cujo valor deve estar no formato yyyy-mm`
        );
    } else {
      res.json({ length: transaction.length, transactions: transaction });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const createTransaction = async (req, res) => {
  try {
    const transaction = new TransactionModel(req.body);
    await transaction.save();

    res.send(transaction);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const updateTransaction = async (req, res) => {
  const id = req.params.id;

  try {
    await TransactionModel.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    res.send({ message: 'Lançamento Atualizado!' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteTransaction = async (req, res) => {
  const id = req.params.id;
  try {
    await TransactionModel.findByIdAndDelete(id);
    res.send({ message: 'Lançamento Deletado!' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const allTransactions = async (_, res) => {
  try {
    const transactions = await TransactionModel.find({});
    res.json(transactions);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  findTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  allTransactions,
};
