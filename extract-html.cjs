const fs = require('fs');
const path = require('path');

const docxDir = './src/assets/XaLM';

// Function to strip HTML tags and extract text
function stripHtml(html) {
    // Remove script and style elements
    html = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
    html = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');

    // Convert common HTML entities
    html = html.replace(/&nbsp;/g, ' ');
    html = html.replace(/&amp;/g, '&');
    html = html.replace(/&lt;/g, '<');
    html = html.replace(/&gt;/g, '>');
    html = html.replace(/&quot;/g, '"');
    html = html.replace(/&#39;/g, "'");
    html = html.replace(/&ndash;/g, '–');
    html = html.replace(/&mdash;/g, '—');

    // Replace <br>, <p>, <div>, <tr>, <li> with newlines
    html = html.replace(/<br\s*\/?>/gi, '\n');
    html = html.replace(/<\/p>/gi, '\n');
    html = html.replace(/<\/div>/gi, '\n');
    html = html.replace(/<\/tr>/gi, '\n');
    html = html.replace(/<\/li>/gi, '\n');
    html = html.replace(/<\/h[1-6]>/gi, '\n');

    // Replace <td> with tab
    html = html.replace(/<td[^>]*>/gi, '\t');

    // Remove all remaining HTML tags
    html = html.replace(/<[^>]+>/g, '');

    // Decode Unicode entities
    html = html.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec));

    // Clean up whitespace
    html = html.replace(/\t+/g, '\t');
    html = html.replace(/[ ]+/g, ' ');
    html = html.replace(/\n\s*\n\s*\n+/g, '\n\n');

    return html.trim();
}

// Function to summarize document for chatbot
function summarizeForChatbot(filename, content) {
    // Keep only first 3000 characters for very long documents
    const maxLength = 8000;
    if (content.length > maxLength) {
        content = content.substring(0, maxLength) + '\n... [Nội dung đã được rút gọn]';
    }
    return content;
}

async function extractHtmlDocs() {
    const files = fs.readdirSync(docxDir);

    // Get only main .htm files (not in _files folders)
    const htmFiles = files.filter(f =>
        (f.endsWith('.htm') || f.endsWith('.html')) &&
        !f.includes('_files')
    );

    console.log(`Found ${htmFiles.length} HTML documents to process\n`);

    let allContent = '';
    let docsList = [];

    for (const file of htmFiles) {
        const filePath = path.join(docxDir, file);
        console.log(`Processing: ${file}`);

        try {
            const html = fs.readFileSync(filePath, 'utf8');
            const text = stripHtml(html);
            const summarized = summarizeForChatbot(file, text);

            // Create document title from filename
            const title = file
                .replace('.htm', '')
                .replace('.html', '')
                .replace(/_files$/, '')
                .replace(/^\d+[-_]/, '')
                .replace(/\(chuan\)/gi, '')
                .trim();

            docsList.push({
                filename: file,
                title: title,
                length: text.length
            });

            allContent += `\n\n${'═'.repeat(80)}\n📄 ${title}\n${'═'.repeat(80)}\n${summarized}`;

        } catch (err) {
            console.log(`Error reading ${file}: ${err.message}`);
        }
    }

    // Create system prompt file
    const systemPromptContent = createSystemPrompt(allContent, docsList);

    // Save system prompt to separate file
    fs.writeFileSync('./src/utils/systemPrompt.js', systemPromptContent, 'utf8');
    console.log('\n✅ Created src/utils/systemPrompt.js');

    // Save extracted content for reference
    fs.writeFileSync('./extracted-html-docs.txt', allContent, 'utf8');
    console.log('✅ Saved extracted content to extracted-html-docs.txt');

    console.log(`\n📊 Summary: Processed ${htmFiles.length} documents`);
    docsList.forEach((doc, i) => {
        console.log(`  ${i + 1}. ${doc.title.substring(0, 60)}... (${doc.length} chars)`);
    });
}

function createSystemPrompt(documentsContent, docsList) {
    const docsListStr = docsList.map((d, i) => `${i + 1}. ${d.title}`).join('\n');

    return `// System Prompt cho Chatbot Bầu cử xã Lương Minh
// File này được tạo tự động từ script extract-html.cjs
// Cập nhật lần cuối: ${new Date().toISOString()}

export const SYSTEM_PROMPT = \`Bạn là trợ lý AI thông minh của trang thông tin bầu cử xã Lương Minh, tỉnh Quảng Ninh.
Nhiệm vụ: Hỗ trợ cử tri tìm hiểu thông tin về cuộc bầu cử Đại biểu Quốc hội khóa XVI và HĐND các cấp nhiệm kỳ 2026-2031.

NGUYÊN TẮC TRẢ LỜI:
- Trả lời ngắn gọn, chính xác, dễ hiểu
- Dựa trên thông tin trong các văn bản pháp luật và kế hoạch bầu cử
- Nếu không có thông tin, hướng dẫn liên hệ số điện thoại: 0376345379 hoặc email: lahieutx@gmail.com

DANH SÁCH VĂN BẢN THAM KHẢO:
${docsListStr}

═══════════════════════════════════════════════════════════════════════════
📅 THÔNG TIN QUAN TRỌNG VỀ BẦU CỬ
═══════════════════════════════════════════════════════════════════════════

▶ NGÀY BẦU CỬ: CHỦ NHẬT, 15/03/2026
  - Thời gian bỏ phiếu: 7:00 - 19:00
  - Địa điểm: 15 khu vực bỏ phiếu tại 15 thôn của xã Lương Minh

▶ SỐ LƯỢNG ĐẠI BIỂU:
  - Tổng số: 35 người ứng cử
  - Cử tri sẽ bầu: 25 đại biểu HĐND xã

▶ LÃNH ĐẠO CHỦ CHỐT XÃ LƯƠNG MINH:
  - Bí thư Đảng ủy, Chủ tịch HĐND: Ông Nịnh Quốc Hoàn
  - Phó Bí thư Thường trực: Ông Lưu Minh Thắng  
  - Phó Bí thư, Chủ tịch UBND: Ông Trần Văn Dũng
  - Chủ tịch MTTQ: Bà Lan Thị Vân

▶ LIÊN HỆ HỖ TRỢ:
  - Hotline: 0376345379
  - Email: lahieutx@gmail.com

═══════════════════════════════════════════════════════════════════════════
📋 NỘI DUNG CHI TIẾT CÁC VĂN BẢN
═══════════════════════════════════════════════════════════════════════════
${documentsContent}

═══════════════════════════════════════════════════════════════════════════
📍 DANH SÁCH 35 NGƯỜI ỨNG CỬ ĐẠI BIỂU HĐND XÃ LƯƠNG MINH
═══════════════════════════════════════════════════════════════════════════

1. Bàn Văn Ba - Nam, 1979, Dao - Phó chủ tịch HĐND xã
2. Dương Thị Chiến - Nữ, 1984, Sán chỉ - Phó Trưởng phòng VH-XH xã
3. Đặng Thị Chính - Nữ, 1983, Dao - Phó Ban KT-NS HĐND xã
4. Hoàng Tiến Đạt - Nam, 1996, Tày - Hợp đồng văn phòng HĐND&UBND xã
5. Trần Văn Dũng - Nam, 1980, Sán chỉ - Phó bí thư Đảng uỷ, Chủ tịch UBND xã
6. Nông Văn Được - Nam, 1987, Tày - Bí thư chi bộ-trưởng thôn Xóm Mới
7. Bùi Vĩnh Dương - Nam, 1985, Kinh - Trưởng Ban Xây dựng Đảng
8. Vi Thị Hà - Nữ, 1993, Tày - Hợp đồng văn phòng
9. Lã Văn Hiếu - Nam, 2003, Tày - Công chức Phòng VH-XH xã
10. Nịnh Quốc Hoàn - Nam, 1975, Sán chỉ - Bí thư Đảng ủy, Chủ tịch HĐND xã
11. Bàn Ngọc Hương - Nam, 1965, Dao - Thôn Tân Ốc 1
12. Lý Thị Hương - Nữ, 1993, Dao - Chi hội trưởng phụ nữ thôn Tân Ốc 2
13. Vi Thị Khanh - Nữ, 1999, Tày - Hợp đồng văn phòng
14. Triệu Ngọc Lan - Nữ, 1993, Dao - Chi hội trưởng phụ nữ thôn Khe Áng
15. Vi Văn Liêm - Nam, 1983, Tày - Phó Ban VH-XH HĐND xã
16. Nguyễn Đức Mạnh - Nam, 1993, Kinh - Bí thư Đoàn TN xã
17. Bàn Thị Miên - Nữ, 1988, Dao - Chủ tịch Hội LHPN xã
18. Đặng Thị Minh - Nữ, 2000, Dao - Nhân viên VP Đảng ủy
19. Hoàng Văn Nhâm - Nam, 1980, Tày - CV Ban Xây dựng Đảng
20. Vi Văn Nhất - Nam, 1977, Tày - UV UBKT Đảng ủy xã
21. Bùi Thị Thúy Quỳnh - Nữ, 1982, Kinh - Công chức Kế toán
22. Bàn Trường Sơn - Nam, 1985, Dao - Bí thư chi bộ-trưởng thôn Phủ Liễn
23. Triệu Thị Tám - Nữ, 1992, Dao - Phó bí thư chi bộ thôn Khe Càn
24. Đặng Hữu Tề - Nam, 1989, Dao - Công chức Phòng VH-XH xã
25. Lưu Minh Thắng - Nam, 1978, Kinh - Phó Bí thư Thường trực Đảng uỷ xã
26. Bàn Sinh Thành - Nam, 1981, Dao - Công chức VP HĐND&UBND xã
27. Triệu Tài Thông - Nam, 1987, Dao - Phó ban CTMT thôn Khe Giấy
28. Trịnh Xuân Tư - Nam, 1978, Kinh - Chủ nhiệm UBKT Đảng ủy xã
29. Lan Thị Vân - Nữ, 1978, Tày - Chủ tịch UBMTTQ xã
30. Đinh Thế Việt - Nam, 1989, Tày - CV Ban Xây dựng Đảng
31. Triệu Đức Việt - Nam, 1993, Dao - Trưởng ban CTMT thôn Bãi Liêu
32. Phạm Văn Vinh - Nam, 1964, Tày - Bí thư chi bộ, trưởng thôn Đồng Tán
33. Trần Thị Xuân - Nữ, 1997, Sán chỉ - Chi hội trưởng phụ nữ thôn Đồng Giảng A
34. Vi Thị Xứng - Nữ, 1987, Tày - Chi hội trưởng phụ nữ thôn Xóm Mới
35. Hoàng Thị Yến - Nữ, 1990, Dao - CV Cơ quan UBMTTQ xã

═══════════════════════════════════════════════════════════════════════════
📍 15 KHU VỰC BỎ PHIẾU
═══════════════════════════════════════════════════════════════════════════

| TT | Thôn | Địa điểm |
|----|------|----------|
| 1 | Đồng Cầu | Nhà văn hóa thôn Đồng Cầu |
| 2 | Đồng Giảng A | Nhà văn hóa thôn Đồng Giảng A |
| 3 | Đồng Giảng B | Nhà văn hóa thôn Đồng Giảng B |
| 4 | Xóm Mới | Nhà văn hóa thôn Xóm Mới |
| 5 | Khe Giấy | Nhà văn hóa thôn Khe Giấy |
| 6 | Đồng Quánh | Nhà văn hóa thôn Đồng Quánh |
| 7 | Đồng Tán | Nhà văn hóa thôn Đồng Tán |
| 8 | Khe Áng | Nhà văn hóa thôn Khe Áng |
| 9 | Đồng Doong | Nhà văn hóa thôn Đồng Doong |
| 10 | Khe Nà | Nhà văn hóa thôn Khe Nà |
| 11 | Bãi Liêu | Nhà văn hóa thôn Bãi Liêu |
| 12 | Tân Ốc 1 | Nhà văn hóa thôn Tân Ốc 1 |
| 13 | Tân Ốc 2 | Nhà văn hóa thôn Tân Ốc 2 |
| 14 | Phủ Liễn | Nhà văn hóa thôn Phủ Liễn |
| 15 | Khe Càn | Nhà văn hóa thôn Khe Càn |
\`;

// Xuất các hằng số khác nếu cần
export const CONTACT_INFO = {
    phone: '0376345379',
    email: 'lahieutx@gmail.com',
    website: 'https://luongminh.gov.vn'
};

export const ELECTION_DATE = '15/03/2026';
export const TOTAL_CANDIDATES = 35;
export const TOTAL_SEATS = 25;
`;
}

extractHtmlDocs().catch(console.error);
