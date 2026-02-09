// Script sửa lỗi phụ sau khi chạy fix-font-errors.cjs
const fs = require('fs');

let content = fs.readFileSync('./src/utils/systemPrompt.js', 'utf8');

console.log('Sửa các lỗi phụ...');

// Sửa lỗi do pattern 'gi' -> 'gia' gây ra
content = content.replace(/giaới/g, 'giới');
content = content.replace(/Giaới/g, 'Giới');
content = content.replace(/giaan/g, 'gian');
content = content.replace(/Giaan/g, 'Gian');
content = content.replace(/giaa(?!o)/g, 'gia'); // giaa -> gia, trừ trường hợp giaao
content = content.replace(/Giaa(?!o)/g, 'Gia');

// Sửa lỗi khác
content = content.replace(/công tục/g, 'công tác');
content = content.replace(/Công tục/g, 'Công tác');
content = content.replace(/trận địa bản/g, 'địa bàn');
content = content.replace(/Trận địa bản/g, 'Địa bàn');
content = content.replace(/Tháng bảo/g, 'Thông báo');
content = content.replace(/tháng bảo/g, 'thông báo');
content = content.replace(/digiatal/g, 'digital');

fs.writeFileSync('./src/utils/systemPrompt.js', content, 'utf8');
console.log('✅ Done');
