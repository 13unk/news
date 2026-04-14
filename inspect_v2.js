const XLSX = require('xlsx');
const workbook = XLSX.readFile('./BBDD NEWS.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet);

// Look for rich text in cells if any
const firstRow = data[0];
console.log('First Row Data:', firstRow);

// Check if there are any specific markers or if it's just plain text
data.slice(0, 10).forEach((row, i) => {
    console.log(`Row ${i} Titular:`, row.titular);
});
