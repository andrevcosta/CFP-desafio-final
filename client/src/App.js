import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as api from './api/apiService';
import PRD from './helpers/Periods';
import M from 'materialize-css';
import Select from './components/Select';
import Transactions from './components/Transactions';
import ModalInsert from './components/ModalInsert';
import ModalUpdate from './components/ModalUpdate';

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [currentPeriod, setCurrentPeriod] = useState(PRD.CURRENT_PERIOD);
  const [currentTransaction, setCurrentTransaction] = useState({});
  const [insertModal, setInsertModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  const URL = 'http://localhost:3001/api/transaction';
  const PERIOD_URL = `${URL}?period=${currentPeriod}`;

  useEffect(() => {
    M.AutoInit();
  }, []);

  useEffect(() => {
    const getTransactions = async () => {
      const res = await axios.get(PERIOD_URL);
      setTransactions(res.data.transactions);
    };
    getTransactions();
  }, [transactions]);

  const handleSelectChange = (selectValue) => {
    setCurrentPeriod(selectValue);
  };

  //INSERT (/POST) TRANSACTION
  const handleInsert = () => {
    setInsertModal(true);
  };

  const handleSaveInsert = async (formData) => {
    await api.insertTransaction(formData);

    setInsertModal(false);
  };

  //UPDATE (/PUT) TRANSACTION
  const handleUpdate = (selectedTransaction) => {
    setCurrentTransaction(selectedTransaction);
    setUpdateModal(true);
  };

  const handleSaveUpdate = async (id, formData) => {
    await api.updateTransaction(id, formData);

    setUpdateModal(false);
  };

  //DELETE (/DELETE) TRANSACTION
  const handleDelete = async (id) => {
    await api.deleteTransaction(id);
  };

  //CLOSE MODALS
  const handleClose = () => {
    setInsertModal(false);
    setUpdateModal(false);
  };

  return (
    <div className="container">
      <div className="center">
        <h3 style={{ fontWeight: 'bold' }}>Controle Financeiro Pessoal</h3>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Select
          currentPeriod={currentPeriod}
          onSelectChange={handleSelectChange}
        />
      </div>

      <div>
        <Transactions
          transactions={transactions}
          onInsert={handleInsert}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </div>
      {insertModal && (
        <ModalInsert onSave={handleSaveInsert} onClose={handleClose} />
      )}
      {updateModal && (
        <ModalUpdate
          onSave={handleSaveUpdate}
          onClose={handleClose}
          currentTransaction={currentTransaction}
        />
      )}
    </div>
  );
}
