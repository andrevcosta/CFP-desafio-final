const CURRENT_YEAR = new Date().getFullYear();
const CURRENT_MONTH = new Date().getMonth() + 1;

const CURRENT_PERIOD = `${CURRENT_YEAR}-${CURRENT_MONTH.toString().padStart(
  2,
  '0'
)}`;

const YEARS = [CURRENT_YEAR - 1, CURRENT_YEAR, CURRENT_YEAR + 1];
const MONTHS = [
  { monthNumber: 1, monthText: 'Janeiro' },
  { monthNumber: 2, monthText: 'Fevereiro' },
  { monthNumber: 3, monthText: 'Março' },
  { monthNumber: 4, monthText: 'Abril' },
  { monthNumber: 5, monthText: 'Maio' },
  { monthNumber: 6, monthText: 'Junho' },
  { monthNumber: 7, monthText: 'Julho' },
  { monthNumber: 8, monthText: 'Agosto' },
  { monthNumber: 9, monthText: 'Setembro' },
  { monthNumber: 10, monthText: 'Outubro' },
  { monthNumber: 11, monthText: 'Novenbro' },
  { monthNumber: 12, monthText: 'Dezembro' },
];

const PERIODS_SELECT = [];

YEARS.forEach((year) => {
  MONTHS.forEach((month) => {
    const monthNumber = `${year}-${month.monthNumber
      .toString()
      .padStart(2, '0')}`;

    const monthText = `${month.monthText}/${year}`;

    PERIODS_SELECT.push({ monthNumber, monthText });
  });
});

export default { CURRENT_PERIOD, PERIODS_SELECT };
