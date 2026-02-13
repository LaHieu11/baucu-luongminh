import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, ChevronDown, Vote, X, Users } from 'lucide-react';
import logoDoan from '../assets/logo-doanthanhnien.jpg';
import './Hero.css';

// Import ảnh ứng cử viên
import imgBanVanBa from '../assets/anh bau cu/bàn văn ba.jpg';
import imgDangThiChinh from '../assets/anh bau cu/đặng thị chính.jpg';
import imgHoangTienDat from '../assets/anh bau cu/hoàng tiến đạt.jpg';
import imgTranVanDung from '../assets/anh bau cu/trần văn dũng.jpg';
import imgNongVanDuoc from '../assets/anh bau cu/nông văn được.jpg';
import imgBuiVinhDuong from '../assets/anh bau cu/bùi vĩnh dương.jpg';
import imgViThiHa from '../assets/anh bau cu/vi thị hà.jpg';
import imgLaVanHieu from '../assets/anh bau cu/lã văn hiếu.jpg';
import imgNinhQuocHoan from '../assets/anh bau cu/Nịnh Quốc Hoàn.jpg';
import imgBanNgocHuong from '../assets/anh bau cu/bàn ngọc hương.jpg';
import imgViThiKhanh from '../assets/anh bau cu/vi thị khanh.jpg';
import imgViVanLiem from '../assets/anh bau cu/vi văn liêm.jpg';
import imgBanThiMien from '../assets/anh bau cu/bàn thị miên.jpg';
import imgDangThiMinh from '../assets/anh bau cu/đặng thu minh.jpg';
import imgHoangVanNham from '../assets/anh bau cu/hoàng văn nhâm.jpg';
import imgBuiThiThuyQuynh from '../assets/anh bau cu/bùi thị thúy quỳnh.jpg';
import imgBanTruongSon from '../assets/anh bau cu/bàn trường sơn.png';
import imgTrieuThiTam from '../assets/anh bau cu/triệu thị tám.jpg';
import imgLuuMinhThang from '../assets/anh bau cu/Lưu Minh Thắng.jpg';
import imgBanSinhThanh from '../assets/anh bau cu/bàn sinh thành.jpg';
import imgTrinhXuanTu from '../assets/anh bau cu/trình xuân tư.jpg';
import imgLanThiVan from '../assets/anh bau cu/lan thị vân.jpg';
import imgPhamVanVinh from '../assets/anh bau cu/phạm văn vinh.jpg';
import imgViThiXung from '../assets/anh bau cu/vi thị xứng (xóm mới).jpg';
import imgHoangThiYen from '../assets/anh bau cu/hoàng thị yến.jpg';

// Danh sách 25 người ứng cử đại biểu HĐND xã Lương Minh
const candidatesData = [
    { id: 1, name: 'Bàn Văn Ba', gender: 'Nam', birthYear: 1979, ethnicity: 'Dao', position: 'Phó chủ tịch HĐND xã', workplace: 'HĐND Xã Lương Minh', education: 'Đại học', image: imgBanVanBa },
    { id: 2, name: 'Đặng Thị Chính', gender: 'Nữ', birthYear: 1983, ethnicity: 'Dao', position: 'Phó Ban KT-NS HĐND xã', workplace: 'HĐND Xã Lương Minh', education: 'Đại học', image: imgDangThiChinh },
    { id: 3, name: 'Hoàng Tiến Đạt', gender: 'Nam', birthYear: 1996, ethnicity: 'Tày', position: 'Hợp đồng VP HĐND&UBND', workplace: 'UBND xã Lương Minh', education: 'Không', image: imgHoangTienDat },
    { id: 4, name: 'Trần Văn Dũng', gender: 'Nam', birthYear: 1980, ethnicity: 'Sán chỉ', position: 'Phó BT Đảng ủy, CT UBND xã', workplace: 'UBND xã Lương Minh', education: 'Thạc sĩ', image: imgTranVanDung },
    { id: 5, name: 'Nông Văn Được', gender: 'Nam', birthYear: 1987, ethnicity: 'Tày', position: 'Bí thư chi bộ - Trưởng thôn', workplace: 'Thôn Xóm Mới', education: 'ĐH Sư phạm', image: imgNongVanDuoc },
    { id: 6, name: 'Bùi Vĩnh Dương', gender: 'Nam', birthYear: 1985, ethnicity: 'Kinh', position: 'Trưởng Ban Xây dựng Đảng', workplace: 'Đảng ủy xã Lương Minh', education: 'Thạc sĩ', image: imgBuiVinhDuong },
    { id: 7, name: 'Vi Thị Hà', gender: 'Nữ', birthYear: 1993, ethnicity: 'Tày', position: 'Hợp đồng văn phòng', workplace: 'UBND xã Lương Minh', education: 'CĐ Sư phạm', image: imgViThiHa },
    { id: 8, name: 'Lã Văn Hiếu', gender: 'Nam', birthYear: 2003, ethnicity: 'Tày', position: 'Công chức Phòng VH-XH xã', workplace: 'UBND xã Lương Minh', education: 'ĐH CNTT', image: imgLaVanHieu },
    { id: 9, name: 'Nịnh Quốc Hoàn', gender: 'Nam', birthYear: 1975, ethnicity: 'Sán chỉ', position: 'Bí thư Đảng ủy, CT HĐND xã', workplace: 'Đảng ủy xã Lương Minh', education: 'Thạc sĩ', image: imgNinhQuocHoan },
    { id: 10, name: 'Bàn Ngọc Hương', gender: 'Nam', birthYear: 1965, ethnicity: 'Dao', position: 'Công dân thôn Tân Ốc 1', workplace: 'Thôn Tân Ốc 1', education: 'Thạc sĩ', image: imgBanNgocHuong },
    { id: 11, name: 'Vi Thị Khanh', gender: 'Nữ', birthYear: 1999, ethnicity: 'Tày', position: 'Hợp đồng văn phòng', workplace: 'UBND xã Lương Minh', education: 'Cao đẳng', image: imgViThiKhanh },
    { id: 12, name: 'Vi Văn Liêm', gender: 'Nam', birthYear: 1983, ethnicity: 'Tày', position: 'Phó Ban VH-XH HĐND xã', workplace: 'HĐND Xã Lương Minh', education: 'Đại học', image: imgViVanLiem },
    { id: 13, name: 'Bàn Thị Miên', gender: 'Nữ', birthYear: 1988, ethnicity: 'Dao', position: 'Chủ tịch Hội LHPN xã', workplace: 'Cơ quan UBMTTQ xã', education: 'ĐH Sư phạm', image: imgBanThiMien },
    { id: 14, name: 'Đặng Thị Minh', gender: 'Nữ', birthYear: 2000, ethnicity: 'Dao', position: 'Nhân viên hợp đồng 111', workplace: 'VP Đảng ủy xã', education: 'ĐH QTKD', image: imgDangThiMinh },
    { id: 15, name: 'Hoàng Văn Nhâm', gender: 'Nam', birthYear: 1980, ethnicity: 'Tày', position: 'CV Ban Xây dựng Đảng', workplace: 'Đảng ủy xã Lương Minh', education: 'ĐH Nông nghiệp', image: imgHoangVanNham },
    { id: 16, name: 'Bùi Thị Thúy Quỳnh', gender: 'Nữ', birthYear: 1982, ethnicity: 'Kinh', position: 'Công chức Kế toán', workplace: 'VP Đảng ủy xã', education: 'Cử nhân Kế toán', image: imgBuiThiThuyQuynh },
    { id: 17, name: 'Bàn Trường Sơn', gender: 'Nam', birthYear: 1985, ethnicity: 'Dao', position: 'Bí thư chi bộ - Trưởng thôn', workplace: 'Thôn Phủ Liễn', education: 'Cử nhân Luật', image: imgBanTruongSon },
    { id: 18, name: 'Triệu Thị Tám', gender: 'Nữ', birthYear: 1992, ethnicity: 'Dao', position: 'Phó bí thư chi bộ thôn', workplace: 'Thôn Khe Càn', education: 'Cao đẳng', image: imgTrieuThiTam },
    { id: 19, name: 'Lưu Minh Thắng', gender: 'Nam', birthYear: 1978, ethnicity: 'Kinh', position: 'Phó BT Thường trực Đảng ủy', workplace: 'Đảng ủy xã Lương Minh', education: 'Thạc sĩ', image: imgLuuMinhThang },
    { id: 20, name: 'Bàn Sinh Thành', gender: 'Nam', birthYear: 1981, ethnicity: 'Dao', position: 'Công chức VP HĐND&UBND', workplace: 'UBND xã Lương Minh', education: 'ĐH Luật', image: imgBanSinhThanh },
    { id: 21, name: 'Trịnh Xuân Tư', gender: 'Nam', birthYear: 1978, ethnicity: 'Kinh', position: 'Chủ nhiệm UBKT Đảng ủy', workplace: 'UBKT Đảng ủy xã', education: 'ĐH SP Toán, ĐH Luật', image: imgTrinhXuanTu },
    { id: 22, name: 'Lan Thị Vân', gender: 'Nữ', birthYear: 1978, ethnicity: 'Tày', position: 'Chủ tịch UBMTTQ xã', workplace: 'Cơ quan UBMTTQ xã', education: 'ĐH Luật KT', image: imgLanThiVan },
    { id: 23, name: 'Phạm Văn Vinh', gender: 'Nam', birthYear: 1964, ethnicity: 'Tày', position: 'Bí thư chi bộ, trưởng thôn', workplace: 'Thôn Đồng Tán', education: 'Không', image: imgPhamVanVinh },
    { id: 24, name: 'Vi Thị Xứng', gender: 'Nữ', birthYear: 1987, ethnicity: 'Tày', position: 'Chi hội trưởng phụ nữ', workplace: 'Thôn Xóm Mới', education: 'Không', image: imgViThiXung },
    { id: 25, name: 'Hoàng Thị Yến', gender: 'Nữ', birthYear: 1990, ethnicity: 'Dao', position: 'CV Cơ quan UBMTTQ xã', workplace: 'Cơ quan UBMTTQ xã', education: 'ĐH PT Nông thôn', image: imgHoangThiYen }
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
                        {/* <motion.div
                            className="hero__badge"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <span className="hero__badge-icon"><img src={logoDoan} alt="Logo Đoàn TNCS Hồ Chí Minh" /></span>
                            <span>Đoàn TNCS Hồ Chí Minh xã Lương Minh</span>
                        </motion.div> */}

                        {/* Title */}
                        <motion.h1
                            className="hero__title"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            Cổng thông tin hỗ trợ bầu cử Đại biểu Quốc hội & Đại biểu HĐND các cấp nhiệm kỳ 2026 - 2031
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
                                <span className="hero__stat-number">1</span>
                                <span className="hero__stat-label">Đại biểu Quốc hội</span>
                            </div>
                            <div className="hero__stat">
                                <span className="hero__stat-number">15</span>
                                <span className="hero__stat-label">Đại biểu HĐND xã</span>
                            </div>
                            <div className="hero__stat">
                                <span className="hero__stat-number">3708</span>
                                <span className="hero__stat-label">Cử tri đủ điều kiện</span>
                            </div>
                            <div className="hero__stat">
                                <span className="hero__stat-number">15</span>
                                <span className="hero__stat-label">Tổ bầu cử</span>
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
                                <h3>Danh sách 25 người ứng cử HĐND xã Lương Minh, nhiệm kỳ 2026 - 2031</h3>
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
                                            <th>Ảnh</th>
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
                                                <td>
                                                    {candidate.image && (
                                                        <img src={candidate.image} alt={candidate.name} className="candidates-popup__avatar" />
                                                    )}
                                                </td>
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
                                <p>Tổng số: <strong>{filteredCandidates.length} người ứng cử</strong> | Nhiệm kỳ 2026 - 2031 | Bầu 15 đại biểu</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default Hero;
