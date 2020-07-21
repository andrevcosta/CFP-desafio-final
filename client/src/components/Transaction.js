import React from 'react';
import { formatMoney } from '../helpers/Formatter';

export default function Transaction(props) {
  const { selectedTransactions, onUpdateClick, onDeleteClick } = props;

  const handleButtonClick = (event) => {
    const value = event.currentTarget.value;
    const id = event.currentTarget.id;

    if (value === 'edit') {
      onUpdateClick(id);
    } else if (value === 'delete') {
      onDeleteClick(id);
    }
  };

  return (
    <div className="center" style={{ padding: '10px' }}>
      {selectedTransactions.map((transaction) => {
        const income = 'teal lighten-3';
        const expense = 'red lighten-3';

        const transactionType = transaction.type === '+' ? income : expense;

        return (
          <div
            key={transaction._id}
            className={transactionType}
            style={styles.primaryBox}
          >
            <span
              style={{
                fontWeight: 'bold',
                fontSize: '1.5rem',
                fontFamily: 'Consolas, monospace',
                marginRight: '20px',
                marginLeft: '20px',
              }}
            >
              Dia {transaction.day}
            </span>

            <div style={styles.flexRow}>
              <div style={styles.flexColumn}>
                <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                  {transaction.category}
                </span>
                <span style={{ fontSize: '1.1rem' }}>
                  {transaction.description}
                </span>
              </div>

              <span
                style={{
                  fontSize: '1.8rem',
                  fontFamily: 'Consolas, monospace',
                }}
              >{`${formatMoney(transaction.value)}`}</span>
            </div>

            <div style={styles.buttonsStyle}>
              <button
                className="btn-flat transparent"
                onClick={handleButtonClick}
                value="edit"
                id={transaction._id}
              >
                <i className="material-icons">edit</i>
              </button>

              <button
                className="btn-flat transparent"
                onClick={handleButtonClick}
                value="delete"
                id={transaction._id}
              >
                <i className="material-icons">delete</i>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  primaryBox: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
    border: '1px transparent ',
    borderRadius: '5px',
    padding: '5px',
    margin: '10px',
  },
  flexRow: {
    display: 'flex',
    flex: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  buttonsStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginLeft: '50px',
  },
};
