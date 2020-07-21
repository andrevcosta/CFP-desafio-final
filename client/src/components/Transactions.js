import React, { useState } from 'react';
import Transaction from './Transaction';
import Values from './Values';
import Filter from './Filter';

export default function Transactions(props) {
  const { transactions, onInsert, onUpdate, onDelete } = props;
  const [filteredTransactions, setFilteredTransactions] = useState('');

  const selectedTransactions = transactions.filter((transaction) => {
    if (filteredTransactions === '') {
      return transaction;
    } else {
      return transaction.description
        .toLowerCase()
        .includes(filteredTransactions.toLowerCase());
    }
  });

  const handleChangeFilter = (newText) => {
    setFilteredTransactions(newText);
  };

  const handleInsertClick = () => {
    onInsert();
  };

  const handleUpdateClick = (id) => {
    const transactionToUpdate = transactions.find(
      (transaction) => transaction._id === id
    );
    onUpdate(transactionToUpdate);
  };

  const handleDeleteClick = (id) => {
    onDelete(id);
  };

  return (
    <div>
      <div style={styles.flexRow}>
        <button
          className="waves-effect waves-light btn"
          onClick={handleInsertClick}
        >
          + NOVO LANÇAMENTO
        </button>

        <Filter
          filter={filteredTransactions}
          onChangeFilter={handleChangeFilter}
        />
      </div>

      <Values selectedTransactions={selectedTransactions} />
      <Transaction
        selectedTransactions={selectedTransactions}
        onUpdateClick={handleUpdateClick}
        onDeleteClick={handleDeleteClick}
      />
    </div>
  );
}

const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '10px',
  },
};
