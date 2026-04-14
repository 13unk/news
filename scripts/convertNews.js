const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const EXCEL_PATH = path.join(__dirname, '../BBDD NEWS.xlsx');
const OUTPUT_PATH = path.join(__dirname, '../src/data/news.json');

function excelDateToJSDate(serial) {
    const utc_days  = Math.floor(serial - 25569);
    const utc_value = utc_days * 86400;
    const date_info = new Date(utc_value * 1000);

    const fractional_day = serial - Math.floor(serial) + 0.0000001;

    let total_seconds = Math.floor(86400 * fractional_day);

    const seconds = total_seconds % 60;
    total_seconds -= seconds;

    const hours = Math.floor(total_seconds / (60 * 60));
    const minutes = Math.floor(total_seconds / 60) % 60;

    return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
}

function formatDate(date) {
    const months = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
    const day = String(date.getDate()).padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
}

function slugify(text) {
    if (!text) return "";
    return text
        .toString()
        .toLowerCase()
        .replace(/<b>|<\/b>/g, '') // Remove bold tags
        .normalize('NFD') // Normalize to handle accents
        .replace(/[\u0300-\u036f]/g, '') // Remove accents
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .trim()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/-+/g, '-'); // Remove consecutive -
}

function formatDateForUrl(dateStr) {
    const months = {
        'ENE': '01', 'FEB': '02', 'MAR': '03', 'ABR': '04',
        'MAY': '05', 'JUN': '06', 'JUL': '07', 'AGO': '08',
        'SEP': '09', 'OCT': '10', 'NOV': '11', 'DIC': '12'
    };
    const [day, month, year] = dateStr.split(' ');
    return `${year}-${months[month]}-${day}`;
}

const workbook = XLSX.readFile(EXCEL_PATH);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// We need to iterate over rows manually to get the 'h' (HTML) property for headlines
const range = XLSX.utils.decode_range(worksheet['!ref']);
const news = [];

// Header row is 0. Data starts at 1.
const headers = {};
for (let C = range.s.c; C <= range.e.c; ++C) {
    const cell = worksheet[XLSX.utils.encode_cell({ r: 0, c: C })];
    if (cell && cell.t) headers[C] = cell.v.toLowerCase();
}

for (let R = range.s.r + 1; R <= range.e.r; ++R) {
    const item = {};
    let hasData = false;
    for (let C = range.s.c; C <= range.e.c; ++C) {
        const cell = worksheet[XLSX.utils.encode_cell({ r: R, c: C })];
        const header = headers[C];
        if (!header) continue;

        if (cell) {
            hasData = true;
            if (header === 'id') {
                item.id = cell.v;
            } else if (header === 'orden') {
                item.order = cell.v;
            } else if (header === 'titular') {
                let html = cell.h || cell.v;
                html = html.replace(/<span[^>]*>/g, '').replace(/<\/span>/g, '');
                item.title = html;
            } else if (header === 'categoría') {
                item.category = cell.v.toUpperCase();
            } else if (header === 'fecha') {
                if (typeof cell.v === 'number') {
                    item.date = formatDate(excelDateToJSDate(cell.v));
                } else {
                    item.date = cell.v;
                }
            } else if (header.startsWith('cuerpo')) {
                if (!item.body) item.body = [];
                item.body.push(cell.v);
            } else if (header === 'link') {
                item.link = cell.v;
            } else if (header === 'tags') {
                item.tags = cell.v;
            } else if (header === 'subtítulo') {
                item.subtitle = cell.v;
            } else if (header === 'photo') {
                item.image = cell.v;
            } else if (header === 'views') {
                item.views = cell.v;
            }
        }
    }
    if (hasData && item.id) {
        // Post-processing
        // Ignore Excel slug, always generate from title for total consistency
        item.slug = slugify(item.title);
        item.dateUrl = formatDateForUrl(item.date);
        item.subtitle = item.subtitle || "";
        item.description = ""; 
        if (!item.image) {
            item.image = `https://i.postimg.cc/SKRXS9MK/035.png`; // Default placeholder
        }
        item.readingTime = "3 min";
        news.push(item);
    }
}

// Order by id
news.sort((a, b) => a.id - b.id);

fs.writeFileSync(OUTPUT_PATH, JSON.stringify(news, null, 2));
console.log(`Successfully converted ${news.length} news items to ${OUTPUT_PATH}`);
