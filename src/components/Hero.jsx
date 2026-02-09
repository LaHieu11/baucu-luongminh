import { motion } from 'framer-motion';
import { Calendar, MapPin, ChevronDown, Vote } from 'lucide-react';
import logoDoan from '../assets/logo-doanthanhnien.jpg';
import './Hero.css';

function Hero() {
    const scrollToIntroduction = () => {
        const element = document.getElementById('introduction');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="home" className="hero">
            {/* Background Elements */}
            <div className="hero__bg">
                <div className="hero__bg-pattern"></div>
                <div className="hero__bg-overlay"></div>
            </div>

            {/* Floating Decorations */}
            <div className="hero__decorations">
                <motion.div
                    className="hero__star hero__star--1"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="hero__star hero__star--2"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="hero__star hero__star--3"
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            <div className="container">
                <div className="hero__content">
                    {/* Badge */}
                    <motion.div
                        className="hero__badge"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <span className="hero__badge-icon"><img src={logoDoan} alt="Logo Đoàn TNCS Hồ Chí Minh" /></span>
                        <span>Đoàn TNCS Hồ Chí Minh xã Lương Minh</span>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        className="hero__title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        Bầu cử Đại biểu Quốc hội & Đại biểu HĐND các cấp Nhiệm kỳ 2026 - 2031
                        <span className="hero__title-highlight"> </span>
                        <br />
                        <span className="hero__title-accent"></span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        className="hero__subtitle"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        Xã Lương Minh, tỉnh Quảng Ninh
                    </motion.p>

                    {/* Election Info */}
                    <motion.div
                        className="hero__info"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        <div className="hero__info-item">
                            <Calendar className="hero__info-icon" />
                            <div>
                                <span className="hero__info-label">Ngày bầu cử</span>
                                <span className="hero__info-value">15/03/2026</span>
                            </div>
                        </div>
                        <div className="hero__info-divider"></div>
                        <div className="hero__info-item">
                            <MapPin className="hero__info-icon" />
                            <div>
                                <span className="hero__info-label">Số khu vực bỏ phiếu</span>
                                <span className="hero__info-value">15 khu vực</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        className="hero__actions"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        <button className="btn btn-gold hero__btn-primary">
                            <Vote size={20} />
                            Xem danh sách ứng cử viên
                        </button>
                        <button
                            className="btn btn-secondary hero__btn-secondary"
                            onClick={scrollToIntroduction}
                        >
                            Tìm hiểu thêm
                        </button>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        className="hero__stats"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                    >
                        <div className="hero__stat">
                            <span className="hero__stat-number">15</span>
                            <span className="hero__stat-label">Thôn tham gia</span>
                        </div>
                        <div className="hero__stat">
                            <span className="hero__stat-number">25</span>
                            <span className="hero__stat-label">Đại biểu HĐND</span>
                        </div>
                        <div className="hero__stat">
                            <span className="hero__stat-number">100%</span>
                            <span className="hero__stat-label">Cử tri đủ điều kiện</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="hero__scroll"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                onClick={scrollToIntroduction}
            >
                <span>Cuộn xuống</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <ChevronDown size={20} />
                </motion.div>
            </motion.div>
        </section>
    );
}

export default Hero;
