const ExcelJS = require('exceljs');
const path = require('path');

const EXCEL_PATH = path.join(__dirname, '../BBDD NEWS.xlsx');

async function recoverComments() {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(EXCEL_PATH);

  let commentsSheet = workbook.getWorksheet('COMMENTS');
  if (!commentsSheet) {
    commentsSheet = workbook.addWorksheet('COMMENTS');
    commentsSheet.columns = [
      { header: 'video', key: 'video', width: 10 },
      { header: 'user', key: 'user', width: 25 },
      { header: 'comment', key: 'comment', width: 60 }
    ];
  } else {
    // Clear existing if any (unlikely after restore)
    commentsSheet.spliceRows(2, commentsSheet.rowCount);
  }

  const recoveredData = [
    { video: 1, user: 'figheto', comment: 'Semenamora el alma…' },
    { video: 1, user: 'sraohio', comment: 'Él puede llevar un coágulo de menstruación y así el círculo se cierra' },
    { video: 1, user: 'ladynashyara', comment: 'Cargando a mis hijos por todas partes 😂 que lindo jajajajja' },
    { video: 1, user: 'araceli_munoz_ortega', comment: 'Se puede hacer con 💩? Sería tan bonito ❤️' },
    { video: 1, user: 'el_belloruben', comment: 'De menstruación, que el rojo combina muy bien con todo 😂😂❤️' }
  ];

  recoveredData.forEach(row => {
    commentsSheet.addRow(row);
  });

  await workbook.xlsx.writeFile(EXCEL_PATH);
  console.log('Successfully recovered COMMENTS sheet with News 1 data.');
}

recoverComments().catch(err => {
  console.error('Error during recovery:', err);
  process.exit(1);
});
