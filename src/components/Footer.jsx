import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Facebook, HouseHeart } from 'lucide-react';
import './Footer.css';
import logoDoan from '../assets/logo-Doan.png';

const quickLinks = [
    { label: 'Trang chủ', href: '#home' },
    { label: 'Giới thiệu', href: '#introduction' },
    { label: 'Ứng cử viên', href: '#candidates' },
    { label: 'Quy trình', href: '#process' },
    { label: 'Lịch bầu cử', href: '#schedule' },
];

const resources = [
    { label: 'Luật Bầu cử', href: '#' },
    { label: 'Câu hỏi thường gặp', href: '#' },
    { label: 'Hướng dẫn bầu cử', href: '#' },
    { label: 'Biểu mẫu', href: '#' },
];
function Footer() {
    const scrollToSection = (href) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer id="contact" className="footer">
            <div className="footer__top">
                <div className="container">
                    <div className="footer__grid">
                        {/* Brand */}
                        <motion.div
                            className="footer__brand"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="footer__logo">
                                <div className="footer__logo-icon">
                                    <img src={logoDoan} alt="Logo Đoàn" />
                                </div>
                                <div className="footer__logo-text">
                                    <span className="footer__logo-title">Bầu Cử 2026</span>
                                    <span className="footer__logo-subtitle">Xã Lương Minh</span>
                                </div>
                            </div>
                            <p className="footer__description">
                                Trang thông tin bầu cử Đại biểu Quốc hội khóa XVI và Hội đồng nhân dân
                                các cấp nhiệm kỳ 2026 - 2031 tại xã Lương Minh, tỉnh Quảng Ninh.
                            </p>
                            <div className="footer__social">
                                <a target="_blank" href="https://www.facebook.com/thanh.nien.luong.minh" className="footer__social-link" aria-label="Facebook">
                                    <Facebook size={20} />
                                </a>
                                <span>Thanh niên lương minh</span>
                            </div>
                        </motion.div>

                        {/* Quick Links */}
                        <motion.div
                            className="footer__links"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <h4>Liên kết nhanh</h4>
                            <ul>
                                {quickLinks.map((link) => (
                                    <li key={link.label}>
                                        <button onClick={() => scrollToSection(link.href)}>
                                            {link.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Resources */}
                        <motion.div
                            className="footer__links"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <h4>Tài liệu</h4>
                            <ul>
                                {resources.map((link) => (
                                    <li key={link.label}>
                                        <a href={link.href}>{link.label}</a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Contact */}
                        <motion.div
                            className="footer__contact"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <h4>Liên hệ</h4>
                            <ul>
                                <li>
                                    <MapPin size={18} />
                                    <span style={{whiteSpace: 'nowrap'}}>UBND xã Lương Minh, tỉnh Quảng Ninh</span>
                                </li>
                                <li>
                                    <Phone size={18} />
                                    <span>0376345379</span>
                                </li>
                                <li>
                                    <Mail size={18} />
                                    <span>lahieutx@gmail.com</span>
                                </li>
                                <li>
                                    <Clock size={18} />
                                    <span>Thứ 2 - Thứ 6: 7:30 - 17:00</span>
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="footer__bottom">
                <div className="container">
                    <div className="footer__bottom-content">
                        <p>
                            © 2026 <strong>Đoàn TNCS Hồ Chí Minh xã Lương Minh</strong> |
                            Thiết kế và quản lý bởi Đoàn Thanh niên xã
                        </p>
                        <p className="footer__credit">
                            ⭐ Tuổi trẻ Lương Minh - Sáng tạo vì cộng đồng 
                            <span><HouseHeart size={20} /></span>
                        </p>
                        
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
