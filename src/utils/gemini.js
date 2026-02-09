import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

console.log('Gemini API Key:', API_KEY ? `Found (${API_KEY.length} chars)` : 'NOT FOUND');

let genAI = null;
let model = null;
let chatSession = null;
let isInitialized = false;

// Comprehensive system prompt with all election information from DOCX files
const SYSTEM_PROMPT = `Bạn là trợ lý AI thông minh của trang thông tin bầu cử xã Lương Minh, tỉnh Quảng Ninh.
Nhiệm vụ: Hỗ trợ cử tri tìm hiểu thông tin về cuộc bầu cử Đại biểu Quốc hội khóa XVI và HĐND các cấp nhiệm kỳ 2026-2031.

═══════════════════════════════════════════════════════════════════════════
📅 LỊCH TRÌNH BẦU CỬ CHI TIẾT
═══════════════════════════════════════════════════════════════════════════

▶ BƯỚC 1: HIỆP THƯƠNG LẦN 1 - 05/12/2025
  - Nội dung: Hiệp thương về cơ cấu, thành phần, số lượng người ứng cử
  - Thời hạn: 95 ngày trước bầu cử

▶ BƯỚC 2: GIỚI THIỆU NGƯỜI ỨNG CỬ - 17/12/2025 đến 25/01/2026
  - Các cơ quan, thôn tổ chức hội nghị giới thiệu người ứng cử
  - Nộp biên bản hội nghị trước 17:00 ngày 25/01/2026
  - Nộp hồ sơ ứng cử trước 17:00 ngày 01/02/2026

▶ BƯỚC 3: HIỆP THƯƠNG LẦN 2 - 02/02/2026
  - Nội dung: Lập danh sách sơ bộ những người ứng cử
  - Thời hạn: 40 ngày trước bầu cử

▶ BƯỚC 4: LẤY Ý KIẾN CỬ TRI NƠI CƯ TRÚ - 04/02/2026 đến 08/02/2026
  - Tổ chức hội nghị lấy ý kiến nhận xét và tín nhiệm của cử tri

▶ BƯỚC 5: HIỆP THƯƠNG LẦN 3 - 12/02/2026
  - Nội dung: Lựa chọn, lập danh sách chính thức người đủ tiêu chuẩn
  - Thời hạn: 23 ngày trước bầu cử

▶ BƯỚC 6: NIÊM YẾT DANH SÁCH - Trước 28/04/2026
  - Niêm yết danh sách chính thức người ứng cử tại 15 khu vực bỏ phiếu

▶ NGÀY BẦU CỬ: CHỦ NHẬT, 15/03/2026
  - Thời gian bỏ phiếu: 7:00 - 19:00
  - Địa điểm: 15 khu vực bỏ phiếu tại 15 thôn

═══════════════════════════════════════════════════════════════════════════
📊 PHÂN BỔ SỐ LƯỢNG ỨNG CỬ VIÊN
═══════════════════════════════════════════════════════════════════════════

TỔNG SỐ: 45 người được giới thiệu ứng cử đại biểu HĐND xã

CƠ CẤU:
- Nữ: 16 người (≈36%)
- Tái cử: 14 người
- Ngoài Đảng: 5 người
- Dưới 40 tuổi: 7 người

PHÂN BỔ THEO KHỐI:
| Đơn vị | Số lượng | Nữ | Tái cử |
|--------|----------|-----|--------|
| Khối Đảng ủy | 14 | 5 | 5 |
| Khối Chính quyền | 14 | 5 | 5 |
| Khối MTTQ và đoàn thể | 7 | 4 | 3 |
| 10 Thôn được phân bổ | 10 | 2 | 1 |

10 THÔN ĐƯỢC PHÂN BỔ CHỈ TIÊU (mỗi thôn 1 người):
1. Thôn Xóm Mới
2. Thôn Phủ Liễn
3. Thôn Tân Ốc 1
4. Thôn Đồng Tán
5. Thôn Khe Càn
6. Thôn Khe Áng
7. Thôn Tân Ốc 2
8. Thôn Bãi Liêu
9. Thôn Đồng Giảng A
10. Thôn Khe Giấy

5 THÔN KHÔNG PHÂN BỔ CHỈ TIÊU:
- Đồng Cầu, Đồng Giảng B, Đồng Quánh, Đồng Doong, Khe Nà

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

═══════════════════════════════════════════════════════════════════════════
� HỒ SƠ ỨNG CỬ (Theo Nghị quyết 40/NQ-HĐBCQG)
═══════════════════════════════════════════════════════════════════════════

Người ứng cử phải nộp 02 bộ hồ sơ gồm:
1. Đơn ứng cử
2. Sơ yếu lý lịch
3. Tiểu sử tóm tắt
4. Bản kê khai tài sản, thu nhập
5. 02 ảnh chân dung màu, nền trắng, cỡ 4cm x 6cm

Lưu ý: Không dán ảnh lên Sơ yếu lý lịch và Tiểu sử tóm tắt.

THỜI HẠN NỘP HỒ SƠ:
- Bắt đầu: 15/12/2025
- Kết thúc: 17:00 ngày 01/02/2026
- Địa điểm: Ủy ban bầu cử xã Lương Minh

═══════════════════════════════════════════════════════════════════════════
👤 ĐIỀU KIỆN CỬ TRI
═══════════════════════════════════════════════════════════════════════════

Được quyền bầu cử nếu:
✅ Công dân Việt Nam
✅ Đủ 18 tuổi trở lên tính đến ngày 15/03/2026
✅ Có quyền bầu cử theo pháp luật
✅ Được đăng ký trong danh sách cử tri

Không được quyền bầu cử:
❌ Người đang bị tước quyền bầu cử theo bản án tòa án
❌ Người đang chấp hành hình phạt tù
❌ Người mất năng lực hành vi dân sự

═══════════════════════════════════════════════════════════════════════════
📋 GIẤY TỜ CẦN MANG KHI ĐI BẦU CỬ
═══════════════════════════════════════════════════════════════════════════

Bắt buộc:
✅ Thẻ cử tri (được phát trước ngày bầu cử)
✅ CMND hoặc CCCD (hoặc giấy tờ tùy thân có ảnh)

═══════════════════════════════════════════════════════════════════════════
🗳️ CÁC CẤP BẦU CỬ
═══════════════════════════════════════════════════════════════════════════

Cử tri xã Lương Minh sẽ bầu:
1. Đại biểu Quốc hội khóa XVI
2. Đại biểu HĐND tỉnh Quảng Ninh nhiệm kỳ 2026-2031
3. Đại biểu HĐND xã Lương Minh nhiệm kỳ 2026-2031 (25 đại biểu)

═══════════════════════════════════════════════════════════════════════════
🏛️ TỔ CHỨC PHỤ TRÁCH
═══════════════════════════════════════════════════════════════════════════

ỦY BAN BẦU CỬ XÃ LƯƠNG MINH:
- Chủ tịch: (theo QĐ của UBND xã)
- Nhiệm vụ: Chỉ đạo, tổ chức, giám sát công tác bầu cử

BAN THƯỜNG TRỰC UBMTTQ VIỆT NAM XÃ:
- Chủ tịch: Bà Lan Thị Vân
- Nhiệm vụ: Tổ chức hiệp thương, giám sát bầu cử

QUẢN LÝ TRANG WEB:
- Đoàn TNCS Hồ Chí Minh xã Lương Minh

═══════════════════════════════════════════════════════════════════════════
📜 CƠ SỞ PHÁP LÝ
═══════════════════════════════════════════════════════════════════════════

- Luật Bầu cử đại biểu Quốc hội và HĐND số 85/2015/QH13
- Luật số 83/2025/QH15 (sửa đổi, bổ sung)
- Nghị quyết 101/2025/UBTVQH15 ngày 26/9/2025
- Nghị quyết liên tịch 102/2025/NQLT-UBTVQH15-CP-ĐCTUBTWMTTQVN
- Nghị quyết 40/NQ-HĐBCQG ngày 29/9/2025 (mẫu văn bản, hồ sơ)
- Chỉ thị số 46-CT/TW ngày 16/5/2025 của Bộ Chính trị

═══════════════════════════════════════════════════════════════════════════
📞 LIÊN HỆ
═══════════════════════════════════════════════════════════════════════════

- UBND xã Lương Minh, tỉnh Quảng Ninh
- Email: lahieutx@gmail.com

═══════════════════════════════════════════════════════════════════════════
HƯỚNG DẪN TRẢ LỜI
═══════════════════════════════════════════════════════════════════════════

✓ Trả lời ngắn gọn, dễ hiểu, thân thiện bằng tiếng Việt
✓ Sử dụng emoji phù hợp để tăng tính trực quan
✓ Cung cấp thông tin chính xác từ dữ liệu trên
✓ Nếu không biết, hướng dẫn liên hệ UBND xã hoặc Ban Thường trực MTTQ
✓ Chỉ trả lời câu hỏi liên quan đến bầu cử
✓ Với câu hỏi ngoài lĩnh vực, lịch sự từ chối và gợi ý hỏi về bầu cử`;

const initializeGemini = async () => {
    if (isInitialized) return !!chatSession;
    isInitialized = true;

    if (!API_KEY || API_KEY.length < 30) {
        console.warn('API key not configured');
        return false;
    }

    try {
        console.log('Initializing Gemini with gemini-2.5-flash...');
        genAI = new GoogleGenerativeAI(API_KEY);

        model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash',
            systemInstruction: SYSTEM_PROMPT
        });

        chatSession = model.startChat({
            generationConfig: {
                maxOutputTokens: 1000,
                temperature: 0.7,
            }
        });

        // Quick test
        const test = await chatSession.sendMessage('xin chào');
        await test.response;

        console.log('✅ Gemini initialized successfully!');
        return true;
    } catch (error) {
        console.error('❌ Gemini initialization failed:', error.message);
        return false;
    }
};

// Enhanced fallback responses
const getFallbackResponse = (question) => {
    const q = question.toLowerCase();

    if (q.includes('chào') || q.includes('hello') || q.includes('hi')) {
        return 'Xin chào! 👋 Tôi là trợ lý AI bầu cử xã Lương Minh.\n\nTôi có thể giúp bạn tìm hiểu về:\n• 📅 Lịch trình bầu cử\n• 📍 15 địa điểm bỏ phiếu\n• � Số lượng ứng cử viên\n• � Hồ sơ và thủ tục\n\nBạn muốn hỏi vấn đề gì?';
    }

    if ((q.includes('ngày') && q.includes('bầu')) || q.includes('khi nào')) {
        return '📅 **Ngày bầu cử: Chủ nhật, 15/03/2026**\n\n⏰ Thời gian: 7:00 - 19:00\n📍 Địa điểm: 15 nhà văn hóa thôn\n\nHãy mang theo Thẻ cử tri và CCCD/CMND!';
    }

    if (q.includes('hiệp thương')) {
        return '📋 **Lịch trình Hiệp thương:**\n\n• **Lần 1:** 05/12/2025 - Thỏa thuận cơ cấu, số lượng\n• **Lần 2:** 02/02/2026 - Lập danh sách sơ bộ\n• **Lần 3:** 12/02/2026 - Lập danh sách chính thức\n\nGiữa lần 2 và 3 sẽ tổ chức lấy ý kiến cử tri nơi cư trú (04-08/02/2026).';
    }

    if (q.includes('số lượng') || q.includes('bao nhiêu') && q.includes('ứng cử')) {
        return '📊 **Phân bổ ứng cử viên HĐND xã:**\n\nTổng: **45 người** được giới thiệu\n\n• Khối Đảng ủy: 14\n• Khối Chính quyền: 14\n• Khối MTTQ & đoàn thể: 7\n• 10 Thôn: 10 (mỗi thôn 1 người)\n\nCơ cấu: 36% nữ, 14 tái cử, 7 dưới 40 tuổi.';
    }

    if (q.includes('thôn') || q.includes('địa điểm') || q.includes('bỏ phiếu') || q.includes('khu vực')) {
        return '📍 **15 khu vực bỏ phiếu:**\n\nĐồng Cầu, Đồng Giảng A/B, Xóm Mới, Khe Giấy, Đồng Quánh, Đồng Tán, Khe Áng, Đồng Doong, Khe Nà, Bãi Liêu, Tân Ốc 1/2, Phủ Liễn, Khe Càn\n\n🏛️ Điểm bỏ phiếu: Nhà văn hóa của từng thôn.';
    }

    if (q.includes('hồ sơ') || q.includes('nộp') || q.includes('ứng cử')) {
        return '📋 **Hồ sơ ứng cử (02 bộ):**\n\n1. Đơn ứng cử\n2. Sơ yếu lý lịch\n3. Tiểu sử tóm tắt\n4. Bản kê khai tài sản\n5. 02 ảnh 4x6cm (nền trắng)\n\n⏰ Nộp trước 17:00 ngày 01/02/2026\n📍 Tại: UBBC xã Lương Minh';
    }

    if (q.includes('giấy') || q.includes('mang') || q.includes('cần gì') || q.includes('thủ tục')) {
        return '📋 **Giấy tờ cần mang:**\n\n✅ Thẻ cử tri (sẽ được phát trước)\n✅ CMND hoặc CCCD\n\n⚠️ Nhớ mang đầy đủ để bỏ phiếu thuận lợi!';
    }

    if (q.includes('điều kiện') || q.includes('ai được') || q.includes('18 tuổi')) {
        return '👤 **Điều kiện bầu cử:**\n\n✅ Công dân Việt Nam\n✅ Đủ 18 tuổi (đến 15/03/2026)\n✅ Có đăng ký trong danh sách cử tri\n\n❌ Không được bầu nếu bị tước quyền/đang chấp hành án tù.';
    }

    if (q.includes('bầu gì') || q.includes('mấy cấp') || q.includes('đại biểu')) {
        return '🗳️ **Cử tri sẽ bầu 4 cấp:**\n\n1. 🏛️ Đại biểu Quốc hội khóa XVI\n2. 🏢 HĐND tỉnh Quảng Ninh\n3. 🏠 HĐND xã Lương Minh (25 đại biểu)\n\nNhiệm kỳ: 2026-2031';
    }

    if (q.includes('liên hệ') || q.includes('hỏi ai') || q.includes('thông tin')) {
        return '📞 **Liên hệ:**\n\n🏛️ UBND xã Lương Minh, tỉnh Quảng Ninh\n👤 Chủ tịch MTTQ: Bà Lan Thị Vân\n\nĐến UBND xã để được hỗ trợ chi tiết!';
    }

    return 'Cảm ơn câu hỏi! 🙏\n\nTôi hỗ trợ về:\n• Lịch bầu cử, hiệp thương\n• 15 địa điểm bỏ phiếu\n• Điều kiện và thủ tục\n• Hồ sơ ứng cử\n\nVui lòng đặt câu hỏi cụ thể hoặc liên hệ UBND xã Lương Minh!';
};

let initPromise = null;

export const chat = async (message) => {
    if (!initPromise) {
        initPromise = initializeGemini();
    }

    const initialized = await initPromise;

    if (!initialized || !chatSession) {
        return getFallbackResponse(message);
    }

    try {
        const result = await chatSession.sendMessage(message);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Chat error:', error.message);
        if (error.message?.includes('429')) {
            return '⚠️ Hệ thống đang bận. Vui lòng thử lại sau vài giây.';
        }
        return getFallbackResponse(message);
    }
};

export default { chat };
