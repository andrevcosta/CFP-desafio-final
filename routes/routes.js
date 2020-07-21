const express = require('express');
const transactionRouter = express.Router();

const service = require('../services/transactionService');

transactionRouter.get('/', service.findTransactions);
transactionRouter.post('/create', service.createTransaction);
transactionRouter.put('/update/:id', service.updateTransaction);
transactionRouter.delete('/delete/:id', service.deleteTransaction);
transactionRouter.get('/all', service.allTransactions);

module.exports = transactionRouter;
