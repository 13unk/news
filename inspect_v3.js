const XLSX = require('xlsx');
const workbook = XLSX.readFile('./BBDD NEWS.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet);

if (data.length > 0) {
    console.log('Available columns:', Object.keys(data[0]));
    data.slice(0, 5).forEach((row) => {
        console.log(`Row ${row.id}: photo="${row.photo || row.PHOTO || 'N/A'}"`);
    });
}
