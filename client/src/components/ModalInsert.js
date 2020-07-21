import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function ModalInsert(props) {
  const { onSave, onClose } = props;

  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [value, setValue] = useState(0);
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [yearMonth, setYearMonth] = useState('');
  const [yearMonthDay, setYearMonthDay] = useState('');
  const [type, setType] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [errorValue, setErrorValue] = useState('');
  const [errorRadio, setErrorRadio] = useState('');

  useEffect(() => {
    if (description === '' || category === '' || yearMonthDay === '') {
      setErrorMessage('É nescessário preencher todos os campos!');
      return;
    }

    setErrorMessage('');
  }, [description, category, value, yearMonthDay, type]);

  useEffect(() => {
    if (value < 0) {
      setErrorValue('Insira um valor maior que R$ 0,01');
      return;
    }
    setErrorValue('');
  }, [value]);

  useEffect(() => {
    if (type === '') {
      setErrorRadio('Escolha o tipo do lançamento (despesa ou receita)!');
      return;
    }
    setErrorRadio('');
  }, [type]);

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

  const handleTypeChange = (event) => {
    setType(event.target.value);
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

    const dateValue = new Date(event.target.value);
    const year = dateValue.getFullYear();
    const month = dateValue.getMonth() + 1;
    const day = dateValue.getDate() + 1;

    setYearMonth(`${year}-${month.toString().padStart(2, '0')}`);
    setYear(year);
    setMonth(month);
    setDay(day);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const formData = {
      description,
      category,
      value,
      year,
      month,
      day,
      yearMonth,
      yearMonthDay,
      type,
    };

    onSave(formData);
  };

  return (
    <div>
      <Modal isOpen={true} style={modalStyles} contentLabel="Modal Insert">
        <div style={styles.flexRow}>
          <span
            style={{
              fontWeight: 'bold',
              fontSize: '2rem',
              marginRight: '50px',
            }}
          >
            Inclusão de lançamentos
          </span>
          <button
            className=" btn-small red darken-4"
            onClick={handleModalClose}
          >
            <i class="material-icons">close</i>
          </button>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div style={styles.formBox}>
            <div style={styles.radioBox}>
              <p>
                <label
                  htmlFor="expense"
                  style={{ marginRight: '10px', marginLeft: '10px' }}
                >
                  <input
                    className="with-gap"
                    id="expense"
                    name="type"
                    type="radio"
                    value="-"
                    onChange={handleTypeChange}
                  />
                  <span
                    style={{
                      fontWeight: 'bold',
                      fontSize: '1.5rem',
                      color: '#c62828',
                    }}
                  >
                    Despesa
                  </span>
                </label>
              </p>
              <p>
                <label
                  htmlFor="income"
                  style={{ marginRight: '10px', marginLeft: '10px' }}
                >
                  <input
                    className="with-gap"
                    id="income"
                    name="type"
                    type="radio"
                    value="+"
                    onChange={handleTypeChange}
                  />
                  <span
                    style={{
                      fontWeight: 'bold',
                      fontSize: '1.5rem',
                      color: '#00695c',
                    }}
                  >
                    Receita
                  </span>
                </label>
              </p>
            </div>

            <div className="input-field">
              <input
                id="inputDescription"
                type="text"
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
                  onChange={handleValueChange}
                />
                <label className="active" htmlFor="inputValue">
                  Valor:
                </label>
              </div>

              <input
                id="date"
                type="date"
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
              disabled={
                errorMessage.trim() !== '' ||
                errorValue.trim() !== '' ||
                errorRadio.trim() !== ''
              }
              style={{ marginRight: '10px' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={styles.errorMessage}>{errorMessage}</span>
              <span style={styles.errorMessage}>{errorValue}</span>
              <span style={styles.errorMessage}>{errorRadio}</span>
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
  radioBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '50px',
  },
  errorMessage: {
    fontWeight: 'bold',
    color: 'red',
  },
};
