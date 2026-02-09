import { motion } from 'framer-motion';
import { Calendar, ArrowRight, FileText, Bell, Users } from 'lucide-react';
import './News.css';

const news = [
    {
        id: 1,
        category: 'Kế hoạch',
        title: 'Kế hoạch thực hiện công tác bầu cử xã Lương Minh',
        excerpt: 'Ban Thường trực Ủy ban MTTQ Việt Nam xã ban hành Kế hoạch số 16/KH-MTTQ-BTT về thực hiện công tác bầu cử Đại biểu Quốc hội khóa XVI và HĐND các cấp nhiệm kỳ 2026-2031.',
        date: '18/11/2025',
        icon: FileText
    },
    {
        id: 2,
        category: 'Kế hoạch',
        title: 'Kế hoạch tổ chức các Hội nghị hiệp thương',
        excerpt: 'Hướng dẫn các thôn giới thiệu người ứng cử đại biểu HĐND xã Lương Minh nhiệm kỳ 2026-2031 với 3 hội nghị hiệp thương theo đúng quy định pháp luật.',
        date: '25/11/2025',
        icon: Users
    },
    {
        id: 3,
        category: 'Quyết định',
        title: 'Ban hành Quy chế làm việc của UBBC xã',
        excerpt: 'Quyết định số 02 ngày 20/11/2025 ban hành Quy chế làm việc của Ủy ban bầu cử xã Lương Minh nhiệm kỳ 2026-2031.',
        date: '20/11/2025',
        icon: Bell
    },
    {
        id: 4,
        category: 'Thông báo',
        title: 'Thành lập 15 Tổ bầu cử tại các thôn',
        excerpt: 'Quyết định thành lập các Tổ bầu cử tại 15 thôn: Đồng Cầu, Đồng Giảng A, Đồng Giảng B, Xóm Mới, Khe Giấy, Đồng Quánh, Đồng Tán, Khe Áng, Đồng Doong, Khe Nà, Bãi Liêu, Tân Ốc 1, Tân Ốc 2, Phủ Liễn, Khe Càn.',
        date: '05/01/2026',
        icon: FileText
    }
];

function News() {
    return (
        <section id="news" className="news section" style={{display: 'none'}}>
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2>Tin tức & Thông báo</h2>
                    <p>
                        Cập nhật các thông tin mới nhất về công tác bầu cử tại xã Lương Minh
                    </p>
                </motion.div>

                <div className="news__grid">
                    {news.map((item, index) => (
                        <motion.article
                            key={item.id}
                            className="news__card card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="news__card-header">
                                <div className="news__card-icon">
                                    <item.icon size={24} />
                                </div>
                                <span className="news__card-category">{item.category}</span>
                            </div>

                            <div className="news__card-body">
                                <h3 className="news__card-title">{item.title}</h3>
                                <p className="news__card-excerpt">{item.excerpt}</p>
                            </div>

                            <div className="news__card-footer">
                                <span className="news__card-date">
                                    <Calendar size={14} />
                                    {item.date}
                                </span>
                                <button className="news__card-link">
                                    Xem chi tiết
                                    <ArrowRight size={16} />
                                </button>
                            </div>
                        </motion.article>
                    ))}
                </div>

                <motion.div
                    className="news__cta"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <button className="btn btn-secondary">
                        Xem tất cả tin tức
                        <ArrowRight size={18} />
                    </button>
                </motion.div>
            </div>
        </section>
    );
}

export default News;
