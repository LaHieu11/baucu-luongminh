const xlsx = require('xlsx');
const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');

const docxDir = './src/assets/XaLM';

async function extractAllDocs() {
    const files = fs.readdirSync(docxDir);

    console.log(`Found ${files.length} files\n`);

    let allContent = '';

    // Extract from DOCX/DOC files
    const docFiles = files.filter(f => f.endsWith('.docx') || f.endsWith('.doc'));
    for (const file of docFiles) {
        const filePath = path.join(docxDir, file);
        console.log(`Processing: ${file}`);

        try {
            const result = await mammoth.extractRawText({ path: filePath });
            const text = result.value.trim();
            allContent += `\n\n${'='.repeat(80)}\n${file}\n${'='.repeat(80)}\n${text}`;
        } catch (err) {
            console.log(`Error reading ${file}: ${err.message}`);
        }
    }

    // Extract from XLSX files
    const xlsxFiles = files.filter(f => f.endsWith('.xlsx') || f.endsWith('.xls'));
    for (const file of xlsxFiles) {
        const filePath = path.join(docxDir, file);
        console.log(`Processing Excel: ${file}`);

        try {
            const workbook = xlsx.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            // Convert to JSON for easier reading
            const jsonData = xlsx.utils.sheet_to_json(sheet, { header: 1 });

            allContent += `\n\n${'='.repeat(80)}\n${file}\n${'='.repeat(80)}\n`;
            allContent += `DANH SÁCH 35 NGƯỜI ỨNG CỬ ĐẠI BIỂU HĐND XÃ LƯƠNG MINH NHIỆM KỲ 2026-2031\n\n`;

            // Format as readable table
            if (jsonData.length > 0) {
                const headers = jsonData[0];
                allContent += `Cột dữ liệu: ${headers.join(' | ')}\n\n`;

                for (let i = 1; i < jsonData.length; i++) {
                    const row = jsonData[i];
                    if (row && row.length > 0) {
                        allContent += `${i}. `;
                        for (let j = 0; j < row.length && j < headers.length; j++) {
                            if (row[j] !== undefined && row[j] !== '') {
                                allContent += `${headers[j]}: ${row[j]}; `;
                            }
                        }
                        allContent += '\n';
                    }
                }
            }

            // Also create a separate JSON file for the candidates list
            const candidatesJson = [];
            if (jsonData.length > 1) {
                const headers = jsonData[0];
                for (let i = 1; i < jsonData.length; i++) {
                    const row = jsonData[i];
                    if (row && row.length > 0) {
                        const candidate = {};
                        for (let j = 0; j < row.length && j < headers.length; j++) {
                            if (headers[j] && row[j] !== undefined) {
                                candidate[headers[j]] = row[j];
                            }
                        }
                        candidatesJson.push(candidate);
                    }
                }
            }

            // Save candidates as JSON for use in React
            fs.writeFileSync('./src/data/candidates.json', JSON.stringify(candidatesJson, null, 2), 'utf8');
            console.log(`Saved ${candidatesJson.length} candidates to src/data/candidates.json`);

        } catch (err) {
            console.log(`Error reading ${file}: ${err.message}`);
        }
    }

    // Save to file for reference
    fs.writeFileSync('extracted-docs.txt', allContent, 'utf8');
    console.log('\n\nSaved full content to extracted-docs.txt');
}

// Create data directory if not exists
if (!fs.existsSync('./src/data')) {
    fs.mkdirSync('./src/data', { recursive: true });
}

extractAllDocs().catch(console.error);
