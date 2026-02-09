const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');

const docxDir = './src/assets/XaLM';

async function extractAllDocs() {
    const files = fs.readdirSync(docxDir).filter(f => f.endsWith('.docx') || f.endsWith('.doc'));

    console.log(`Found ${files.length} documents\n`);

    let allContent = '';

    for (const file of files) {
        const filePath = path.join(docxDir, file);
        console.log(`\n${'='.repeat(80)}`);
        console.log(`FILE: ${file}`);
        console.log('='.repeat(80));

        try {
            const result = await mammoth.extractRawText({ path: filePath });
            const text = result.value.trim();

            // Only show first 2000 chars per file
            const preview = text.length > 2000 ? text.substring(0, 2000) + '\n... [TRUNCATED]' : text;
            console.log(preview);

            allContent += `\n\n${'='.repeat(80)}\n${file}\n${'='.repeat(80)}\n${text}`;
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    }

    // Save to file for reference
    fs.writeFileSync('extracted-docs.txt', allContent, 'utf8');
    console.log('\n\nSaved full content to extracted-docs.txt');
}

extractAllDocs().catch(console.error);
