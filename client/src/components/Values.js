import React from 'react';
import { formatMoney } from '../helpers/Formatter';

export default function Values({ selectedTransactions }) {
  const incomes = selectedTransactions.filter((transaction) => {
    return transaction.type === '+';
  });

  const expenses = selectedTransactions.filter((transaction) => {
    return transaction.type === '-';
  });

  const incomeValue = incomes.reduce((acc, cur) => {
    return acc + cur.value;
  }, 0);

  const expenseValue = expenses.reduce((acc, cur) => {
    return acc + cur.value;
  }, 0);

  const balance = incomeValue - expenseValue;

  return (
    <div style={styles.valuesStyle}>
      <div>
        Lançamentos:
        <span style={{ fontWeight: 'lighter' }}>
          {` ${selectedTransactions.length}`}
        </span>
      </div>

      <div>
        Receitas:
        <span style={{ color: '#00695c' }}>
          {` ${formatMoney(incomeValue)}`}
        </span>
      </div>

      <div>
        Despesas:
        <span style={{ color: '#c62828' }}>
          {` ${formatMoney(expenseValue)}`}
        </span>
      </div>

      {balance >= 0 && (
        <div>
          Saldo:
          <span style={{ color: '#00695c' }}>{` ${formatMoney(balance)}`}</span>
        </div>
      )}
      {balance < 0 && (
        <div>
          Saldo:
          <span style={{ color: '#c62828' }}>{` ${formatMoney(balance)}`}</span>
        </div>
      )}
    </div>
  );
}

const styles = {
  valuesStyle: {
    border: '1px solid #b2ebf2',
    borderRadius: '5px',
    padding: '10px',
    marginTop: '15px',
    marginBottom: '15px',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    fontWeight: 'bold',
  },
};
