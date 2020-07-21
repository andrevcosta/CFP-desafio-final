import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

async function getAllTransactions() {
  const res = await axios.get(`${API_URL}/all`);

  return res.data;
}

async function insertTransaction(transaction) {
  const res = await axios.post(`${API_URL}/create`, transaction);
  return res.data.id;
}

async function updateTransaction(id, transaction) {
  const res = await axios.put(`${API_URL}/update/${id}`, transaction);
  return res.data;
}

async function deleteTransaction(id) {
  const res = await axios.delete(`${API_URL}/delete/${id}`);
  return res.data;
}

export {
  getAllTransactions,
  insertTransaction,
  updateTransaction,
  deleteTransaction,
};
