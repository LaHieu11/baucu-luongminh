import { GoogleGenerativeAI } from '@google/generative-ai';
import { SYSTEM_PROMPT, CONTACT_INFO } from './systemPrompt.js';

// Initialize Gemini
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

console.log('Gemini API Key:', API_KEY ? `Found (${API_KEY.length} chars)` : 'NOT FOUND');

let genAI = null;
let model = null;
let chatSession = null;
let isInitialized = false;

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
                maxOutputTokens: 2000,
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
        return `Xin chào! 👋 Tôi là trợ lý AI bầu cử xã Lương Minh.\n\nTôi có thể giúp bạn tìm hiểu về:\n• 📅 Lịch trình bầu cử\n• 📍 15 địa điểm bỏ phiếu\n• 📊 Danh sách 25 ứng cử viên\n• 📋 Hồ sơ và thủ tục\n\nBạn muốn hỏi vấn đề gì?`;
    }

    if ((q.includes('ngày') && q.includes('bầu')) || q.includes('khi nào')) {
        return '📅 **Ngày bầu cử: Chủ nhật, 15/03/2026**\n\n⏰ Thời gian: 7:00 - 19:00\n📍 Địa điểm: 15 nhà văn hóa thôn\n\nHãy mang theo Thẻ cử tri và CCCD/CMND!';
    }

    if (q.includes('hiệp thương')) {
        return '📋 **Lịch trình Hiệp thương:**\n\n• **Lần 1:** 05/12/2025 - Thỏa thuận cơ cấu, số lượng\n• **Lần 2:** 02/02/2026 - Lập danh sách sơ bộ\n• **Lần 3:** 12/02/2026 - Lập danh sách chính thức\n\nGiữa lần 2 và 3 sẽ tổ chức lấy ý kiến cử tri nơi cư trú (04-08/02/2026).';
    }

    if (q.includes('ứng cử viên') || q.includes('danh sách') || (q.includes('số lượng') && q.includes('ứng cử'))) {
        return '📊 **Danh sách ứng cử viên HĐND xã:**\n\nTổng: **25 người ứng cử** (để bầu 15 đại biểu)\n\n• Nữ: 10 người (40%)\n• Nam: 15 người (60%)\n\nNhấn "Xem danh sách đầy đủ" để xem chi tiết!';
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
        return '🗳️ **Cử tri sẽ bầu 4 cấp:**\n\n1. 🏛️ Đại biểu Quốc hội khóa XVI\n2. 🏢 HĐND tỉnh Quảng Ninh\n3. 🏠 HĐND xã Lương Minh (15 đại biểu)\n\nNhiệm kỳ: 2026-2031';
    }

    if (q.includes('lãnh đạo') || q.includes('bí thư') || q.includes('chủ tịch')) {
        return '🏛️ **Lãnh đạo xã Lương Minh:**\n\n• Bí thư Đảng ủy, Chủ tịch HĐND: Ông Nịnh Quốc Hoàn\n• Phó Bí thư Thường trực: Ông Lưu Minh Thắng\n• Phó Bí thư, Chủ tịch UBND: Ông Trần Văn Dũng\n• Phó Chủ tịch HĐND: Ông Bàn Văn Ba\n• Chủ tịch MTTQ: Bà Lan Thị Vân';
    }

    if (q.includes('liên hệ') || q.includes('hỏi ai') || q.includes('thông tin') || q.includes('hotline')) {
        return `📞 **Liên hệ:**\n\n🏛️ UBND xã Lương Minh, tỉnh Quảng Ninh\n📱 Hotline: ${CONTACT_INFO.phone}\n📧 Email: ${CONTACT_INFO.email}\n👤 Chủ tịch MTTQ: Bà Lan Thị Vân\n\nĐến UBND xã để được hỗ trợ chi tiết!`;
    }

    return `Cảm ơn câu hỏi! 🙏\n\nTôi hỗ trợ về:\n• Lịch bầu cử, hiệp thương\n• 15 địa điểm bỏ phiếu\n• 25 ứng cử viên HĐND xã\n• Điều kiện và thủ tục\n\nVui lòng đặt câu hỏi cụ thể hoặc liên hệ:\n📱 Hotline: ${CONTACT_INFO.phone}`;
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
