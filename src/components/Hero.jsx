import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, ChevronDown, Vote, X, Users } from 'lucide-react';
import logoDoan from '../assets/logo-doanthanhnien.jpg';
import './Hero.css';

// Danh sách 35 người ứng cử đại biểu HĐND xã Lương Minh
const candidatesData = [
    { id: 1, name: 'Bàn Văn Ba', gender: 'Nam', birthYear: 1979, ethnicity: 'Dao', position: 'Phó chủ tịch HĐND xã', workplace: 'HĐND Xã Lương Minh', education: 'Đại học' },
    { id: 2, name: 'Dương Thị Chiến', gender: 'Nữ', birthYear: 1984, ethnicity: 'Sán chỉ', position: 'Phó Trưởng phòng VH-XH xã', workplace: 'UBND xã Lương Minh', education: 'Đại học' },
    { id: 3, name: 'Đặng Thị Chính', gender: 'Nữ', birthYear: 1983, ethnicity: 'Dao', position: 'Phó Ban KT-NS HĐND xã', workplace: 'HĐND Xã Lương Minh', education: 'Đại học' },
    { id: 4, name: 'Hoàng Tiến Đạt', gender: 'Nam', birthYear: 1996, ethnicity: 'Tày', position: 'Hợp đồng VP HĐND&UBND', workplace: 'UBND xã Lương Minh', education: 'Không' },
    { id: 5, name: 'Trần Văn Dũng', gender: 'Nam', birthYear: 1980, ethnicity: 'Sán chỉ', position: 'Phó BT Đảng ủy, CT UBND xã', workplace: 'UBND xã Lương Minh', education: 'Thạc sĩ' },
    { id: 6, name: 'Nông Văn Được', gender: 'Nam', birthYear: 1987, ethnicity: 'Tày', position: 'Bí thư chi bộ - Trưởng thôn', workplace: 'Thôn Xóm Mới', education: 'ĐH Sư phạm' },
    { id: 7, name: 'Bùi Vĩnh Dương', gender: 'Nam', birthYear: 1985, ethnicity: 'Kinh', position: 'Trưởng Ban Xây dựng Đảng', workplace: 'Đảng ủy xã Lương Minh', education: 'Thạc sĩ' },
    { id: 8, name: 'Vi Thị Hà', gender: 'Nữ', birthYear: 1993, ethnicity: 'Tày', position: 'Hợp đồng văn phòng', workplace: 'UBND xã Lương Minh', education: 'CĐ Sư phạm' },
    { id: 9, name: 'Lã Văn Hiếu', gender: 'Nam', birthYear: 2003, ethnicity: 'Tày', position: 'Công chức Phòng VH-XH xã', workplace: 'UBND xã Lương Minh', education: 'ĐH CNTT' },
    { id: 10, name: 'Nịnh Quốc Hoàn', gender: 'Nam', birthYear: 1975, ethnicity: 'Sán chỉ', position: 'Bí thư Đảng ủy, CT HĐND xã', workplace: 'Đảng ủy xã Lương Minh', education: 'Thạc sĩ' },
    { id: 11, name: 'Bàn Ngọc Hương', gender: 'Nam', birthYear: 1965, ethnicity: 'Dao', position: 'Công dân thôn Tân Ốc 1', workplace: 'Thôn Tân Ốc 1', education: 'Thạc sĩ' },
    { id: 12, name: 'Lý Thị Hương', gender: 'Nữ', birthYear: 1993, ethnicity: 'Dao', position: 'Chi hội trưởng phụ nữ', workplace: 'Thôn Tân Ốc 2', education: 'TC Kế toán' },
    { id: 13, name: 'Vi Thị Khanh', gender: 'Nữ', birthYear: 1999, ethnicity: 'Tày', position: 'Hợp đồng văn phòng', workplace: 'UBND xã Lương Minh', education: 'Cao đẳng' },
    { id: 14, name: 'Triệu Ngọc Lan', gender: 'Nữ', birthYear: 1993, ethnicity: 'Dao', position: 'Chi hội trưởng phụ nữ', workplace: 'Thôn Khe Áng', education: 'Không' },
    { id: 15, name: 'Vi Văn Liêm', gender: 'Nam', birthYear: 1983, ethnicity: 'Tày', position: 'Phó Ban VH-XH HĐND xã', workplace: 'HĐND Xã Lương Minh', education: 'Đại học' },
    { id: 16, name: 'Nguyễn Đức Mạnh', gender: 'Nam', birthYear: 1993, ethnicity: 'Kinh', position: 'Bí thư Đoàn TN xã', workplace: 'Cơ quan UBMTTQ xã', education: 'CH Khoa học MT' },
    { id: 17, name: 'Bàn Thị Miên', gender: 'Nữ', birthYear: 1988, ethnicity: 'Dao', position: 'Chủ tịch Hội LHPN xã', workplace: 'Cơ quan UBMTTQ xã', education: 'ĐH Sư phạm' },
    { id: 18, name: 'Đặng Thị Minh', gender: 'Nữ', birthYear: 2000, ethnicity: 'Dao', position: 'Nhân viên hợp đồng 111', workplace: 'VP Đảng ủy xã', education: 'ĐH QTKD' },
    { id: 19, name: 'Hoàng Văn Nhâm', gender: 'Nam', birthYear: 1980, ethnicity: 'Tày', position: 'CV Ban Xây dựng Đảng', workplace: 'Đảng ủy xã Lương Minh', education: 'ĐH Nông nghiệp' },
    { id: 20, name: 'Vi Văn Nhất', gender: 'Nam', birthYear: 1977, ethnicity: 'Tày', position: 'UV UBKT Đảng ủy xã', workplace: 'UBKT Đảng ủy xã', education: 'Đại học' },
    { id: 21, name: 'Bùi Thị Thúy Quỳnh', gender: 'Nữ', birthYear: 1982, ethnicity: 'Kinh', position: 'Công chức Kế toán', workplace: 'VP Đảng ủy xã', education: 'Cử nhân Kế toán' },
    { id: 22, name: 'Bàn Trường Sơn', gender: 'Nam', birthYear: 1985, ethnicity: 'Dao', position: 'Bí thư chi bộ - Trưởng thôn', workplace: 'Thôn Phủ Liễn', education: 'Cử nhân Luật' },
    { id: 23, name: 'Triệu Thị Tám', gender: 'Nữ', birthYear: 1992, ethnicity: 'Dao', position: 'Phó bí thư chi bộ thôn', workplace: 'Thôn Khe Càn', education: 'Cao đẳng' },
    { id: 24, name: 'Đặng Hữu Tề', gender: 'Nam', birthYear: 1989, ethnicity: 'Dao', position: 'Công chức Phòng VH-XH', workplace: 'UBND xã Lương Minh', education: 'Cao đẳng' },
    { id: 25, name: 'Lưu Minh Thắng', gender: 'Nam', birthYear: 1978, ethnicity: 'Kinh', position: 'Phó BT Thường trực Đảng ủy', workplace: 'Đảng ủy xã Lương Minh', education: 'Thạc sĩ' },
    { id: 26, name: 'Bàn Sinh Thành', gender: 'Nam', birthYear: 1981, ethnicity: 'Dao', position: 'Công chức VP HĐND&UBND', workplace: 'UBND xã Lương Minh', education: 'ĐH Luật' },
    { id: 27, name: 'Triệu Tài Thông', gender: 'Nam', birthYear: 1987, ethnicity: 'Dao', position: 'Phó ban CTMT thôn', workplace: 'Thôn Khe Giấy', education: 'ĐH Luật' },
    { id: 28, name: 'Trịnh Xuân Tư', gender: 'Nam', birthYear: 1978, ethnicity: 'Kinh', position: 'Chủ nhiệm UBKT Đảng ủy', workplace: 'UBKT Đảng ủy xã', education: 'ĐH SP Toán, ĐH Luật' },
    { id: 29, name: 'Lan Thị Vân', gender: 'Nữ', birthYear: 1978, ethnicity: 'Tày', position: 'Chủ tịch UBMTTQ xã', workplace: 'Cơ quan UBMTTQ xã', education: 'ĐH Luật KT' },
    { id: 30, name: 'Đinh Thế Việt', gender: 'Nam', birthYear: 1989, ethnicity: 'Tày', position: 'CV Ban Xây dựng Đảng', workplace: 'Đảng ủy xã Lương Minh', education: 'TC Quản lý VH' },
    { id: 31, name: 'Triệu Đức Việt', gender: 'Nam', birthYear: 1993, ethnicity: 'Dao', position: 'Trưởng ban CTMT thôn', workplace: 'Thôn Bãi Liêu', education: 'Không' },
    { id: 32, name: 'Phạm Văn Vinh', gender: 'Nam', birthYear: 1964, ethnicity: 'Tày', position: 'Bí thư chi bộ, trưởng thôn', workplace: 'Thôn Đồng Tán', education: 'Không' },
    { id: 33, name: 'Trần Thị Xuân', gender: 'Nữ', birthYear: 1997, ethnicity: 'Sán chỉ', position: 'Chi hội trưởng phụ nữ', workplace: 'Thôn Đồng Giảng A', education: 'Không' },
    { id: 34, name: 'Vi Thị Xứng', gender: 'Nữ', birthYear: 1987, ethnicity: 'Tày', position: 'Chi hội trưởng phụ nữ', workplace: 'Thôn Xóm Mới', education: 'Không' },
    { id: 35, name: 'Hoàng Thị Yến', gender: 'Nữ', birthYear: 1990, ethnicity: 'Dao', position: 'CV Cơ quan UBMTTQ xã', workplace: 'Cơ quan UBMTTQ xã', education: 'ĐH PT Nông thôn' }
];

function Hero() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [filter, setFilter] = useState('all');

    const scrollToIntroduction = () => {
        const element = document.getElementById('introduction');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const openPopup = () => {
        setIsPopupOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        document.body.style.overflow = 'auto';
    };

    const filteredCandidates = filter === 'all'
        ? candidatesData
        : filter === 'female'
            ? candidatesData.filter(c => c.gender === 'Nữ')
            : candidatesData.filter(c => c.ethnicity === filter);

    const ethnicities = [...new Set(candidatesData.map(c => c.ethnicity))];

    return (
        <>
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
                            <button className="btn btn-gold hero__btn-primary" onClick={openPopup}>
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

            {/* Popup Modal - Candidates List */}
            <AnimatePresence>
                {isPopupOpen && (
                    <motion.div
                        className="candidates-popup"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="candidates-popup__overlay" onClick={closePopup} />

                        <motion.div
                            className="candidates-popup__content"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="candidates-popup__header">
                                <h3>Danh sách 35 người ứng cử HĐND xã Lương Minh</h3>
                                <button
                                    className="candidates-popup__close"
                                    onClick={closePopup}
                                    title="Đóng"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="candidates-popup__filters">
                                <button
                                    className={`candidates-popup__filter ${filter === 'all' ? 'active' : ''}`}
                                    onClick={() => setFilter('all')}
                                >
                                    Tất cả ({candidatesData.length})
                                </button>
                                <button
                                    className={`candidates-popup__filter ${filter === 'female' ? 'active' : ''}`}
                                    onClick={() => setFilter('female')}
                                >
                                    Nữ ({candidatesData.filter(c => c.gender === 'Nữ').length})
                                </button>
                                {ethnicities.map(eth => (
                                    <button
                                        key={eth}
                                        className={`candidates-popup__filter ${filter === eth ? 'active' : ''}`}
                                        onClick={() => setFilter(eth)}
                                    >
                                        {eth} ({candidatesData.filter(c => c.ethnicity === eth).length})
                                    </button>
                                ))}
                            </div>

                            <div className="candidates-popup__body">
                                <table className="candidates-popup__table">
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Họ và tên</th>
                                            <th>Giới tính</th>
                                            <th>Năm sinh</th>
                                            <th>Dân tộc</th>
                                            <th>Chức vụ</th>
                                            <th>Nơi công tác</th>
                                            <th>Trình độ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredCandidates.map((candidate, index) => (
                                            <tr key={candidate.id}>
                                                <td>{index + 1}</td>
                                                <td><strong>{candidate.name}</strong></td>
                                                <td>{candidate.gender}</td>
                                                <td>{candidate.birthYear}</td>
                                                <td>{candidate.ethnicity}</td>
                                                <td>{candidate.position}</td>
                                                <td>{candidate.workplace}</td>
                                                <td>{candidate.education}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="candidates-popup__footer">
                                <p>Tổng số: <strong>{filteredCandidates.length} người ứng cử</strong> | Nhiệm kỳ 2026 - 2031 | Bầu 25 đại biểu</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default Hero;
