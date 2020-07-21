import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function ModalUpdate(props) {
  const { onSave, onClose, currentTransaction } = props;

  const [description, setDescription] = useState(
    currentTransaction.description
  );
  const [category, setCategory] = useState(currentTransaction.category);
  const [value, setValue] = useState(currentTransaction.value);
  const [year, setYear] = useState(currentTransaction.year);
  const [month, setMonth] = useState(currentTransaction.month);
  const [day, setDay] = useState(currentTransaction.day);
  const [yearMonth, setYearMonth] = useState(currentTransaction.yearMonth);
  const [yearMonthDay, setYearMonthDay] = useState(
    currentTransaction.yearMonthDay
  );

  const [errorMessage, setErrorMessage] = useState('');
  const [errorValue, setErrorValue] = useState('');

  useEffect(() => {
    if (description === '' || category === '' || yearMonthDay === '') {
      setErrorMessage('É nescessário preencher todos os campos!');
      return;
    }

    setErrorMessage('');
  }, [description, category, yearMonthDay]);

  useEffect(() => {
    if (value <= 0) {
      setErrorValue('Insira um valor maior que R$ 0,01');
      return;
    }
    setErrorValue('');
  }, [value]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') onClose(null);
  };

  const handleModalClose = () => {
    onClose(null);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  const handleValueChange = (event) => {
    setValue(+event.target.value);
  };
  const handleDateChange = (event) => {
    setYearMonthDay(event.target.value);
    /*Passando 00:00:00 (hora) junto ao event.target.value para corrigar o erro da timezone GMT
    Como a GMT é 3 horas atrasada o valor do dia era retornado como o dia anterior */
    const dateValue = new Date(`${event.target.value} 00:00:00`);

    const year = dateValue.getFullYear();
    const month = dateValue.getMonth() + 1;
    const day = dateValue.getDate();

    setYearMonth(`${year}-${month.toString().padStart(2, '0')}`);
    setYear(year);
    setMonth(month);
    setDay(day);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const id = currentTransaction._id;

    const formData = {
      description,
      category,
      value,
      year,
      month,
      day,
      yearMonth,
      yearMonthDay,
    };

    onSave(id, formData);
  };

  return (
    <div>
      <Modal isOpen={true} style={modalStyles} contentLabel="Modal Update">
        <div style={styles.flexRow}>
          <span
            style={{
              fontWeight: 'bold',
              fontSize: '2rem',
              marginRight: '50px',
            }}
          >
            Edição de lançamentos
          </span>
          <button
            className=" btn-small red darken-4"
            onClick={handleModalClose}
          >
            <i className="material-icons">close</i>
          </button>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div style={styles.formBox}>
            {currentTransaction.type === '-' && (
              <div
                style={{
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                  color: '#c62828',
                  textAlign: 'center',
                  marginBottom: '50px',
                }}
              >
                <span>Despesa</span>
              </div>
            )}

            {currentTransaction.type === '+' && (
              <div
                style={{
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                  color: '#00695c',
                  textAlign: 'center',
                  marginBottom: '50px',
                }}
              >
                <span>Receita</span>
              </div>
            )}

            <div className="input-field">
              <input
                id="inputDescription"
                type="text"
                defaultValue={currentTransaction.description}
                onChange={handleDescriptionChange}
              />
              <label className="active" htmlFor="inputDescription">
                Descrição:
              </label>
            </div>

            <div className="input-field">
              <input
                id="inputCategory"
                type="text"
                defaultValue={currentTransaction.category}
                onChange={handleCategoryChange}
              />
              <label className="active" htmlFor="inputCategory">
                Categoria:
              </label>
            </div>

            <div style={styles.flexRow}>
              <div className="input-field">
                <input
                  id="inputValue"
                  type="number"
                  min="0.01"
                  step="0.01"
                  defaultValue={currentTransaction.value}
                  onChange={handleValueChange}
                />
                <label className="active" htmlFor="inputValue">
                  Valor:
                </label>
              </div>

              <input
                id="date"
                type="date"
                defaultValue={currentTransaction.yearMonthDay}
                onChange={handleDateChange}
                style={{ marginLeft: '5px', width: '50%' }}
              />
            </div>
          </div>

          <div style={styles.flexRow}>
            <input
              type="submit"
              className="waves-effect waves-ligth btn"
              value="Salvar"
              onSubmit={handleFormSubmit}
              disabled={errorMessage.trim() !== '' || errorValue.trim() !== ''}
              style={{ marginRight: '10px' }}
            />

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={styles.errorMessage}>{errorMessage}</span>
              <span style={styles.errorMessage}>{errorValue}</span>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const styles = {
  flexRow: {
    margin: '5px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  formBox: {
    border: '1px solid #b2ebf2',
    borderRadius: '5px',
    marginTop: '20px',
    marginBottom: '20px',
    padding: '10px',
  },
  errorMessage: {
    fontWeight: 'bold',
    color: 'red',
  },
};
