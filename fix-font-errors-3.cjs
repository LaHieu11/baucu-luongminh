// Script sửa lỗi bổ sung lần 3
const fs = require('fs');

let content = fs.readFileSync('./src/utils/systemPrompt.js', 'utf8');

console.log('Sửa các lỗi bổ sung...');

// Sửa lỗi còn sót
content = content.replace(/Căn cứ Tháng\s*\n\s*bảo/g, 'Căn cứ Thông báo');
content = content.replace(/giaữa/g, 'giữa');
content = content.replace(/Giaữa/g, 'Giữa');
content = content.replace(/chuyện mn/g, 'chuyên môn');
content = content.replace(/Chuyện mn/g, 'Chuyên môn');
content = content.replace(/đặch/g, 'đích');
content = content.replace(/Đặch/g, 'Đích');
content = content.replace(/uy tỷn/g, 'uy tín');
content = content.replace(/Uy tỷn/g, 'Uy tín');
content = content.replace(/  chỉ,/g, 'ý chí,');
content = content.replace(/ kiến cử tri tai /g, 'ý kiến cử tri tại ');
content = content.replace(/Gp phần/g, 'Góp phần');
content = content.replace(/gp phần/g, 'góp phần');

fs.writeFileSync('./src/utils/systemPrompt.js', content, 'utf8');
console.log('✅ Done');
