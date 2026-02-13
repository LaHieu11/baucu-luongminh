import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Briefcase, GraduationCap, Award, X, Users, Landmark, MapPin, Calendar, Vote } from 'lucide-react';
import './Candidates.css';

// Danh sách 25 người ứng cử đại biểu HĐND xã Lương Minh
const candidatesData = [
    { id: 1, name: 'Bàn Văn Ba', gender: 'Nam', birthYear: 1979, ethnicity: 'Dao', position: 'Phó chủ tịch HĐND xã', workplace: 'HĐND Xã Lương Minh', education: 'Đại học' },
    { id: 2, name: 'Đặng Thị Chính', gender: 'Nữ', birthYear: 1983, ethnicity: 'Dao', position: 'Phó Ban KT-NS HĐND xã', workplace: 'HĐND Xã Lương Minh', education: 'Đại học' },
    { id: 3, name: 'Hoàng Tiến Đạt', gender: 'Nam', birthYear: 1996, ethnicity: 'Tày', position: 'Hợp đồng VP HĐND&UBND', workplace: 'UBND xã Lương Minh', education: 'Không' },
    { id: 4, name: 'Trần Văn Dũng', gender: 'Nam', birthYear: 1980, ethnicity: 'Sán chỉ', position: 'Phó BT Đảng ủy, CT UBND xã', workplace: 'UBND xã Lương Minh', education: 'Thạc sĩ' },
    { id: 5, name: 'Nông Văn Được', gender: 'Nam', birthYear: 1987, ethnicity: 'Tày', position: 'Bí thư chi bộ - Trưởng thôn', workplace: 'Thôn Xóm Mới', education: 'ĐH Sư phạm' },
    { id: 6, name: 'Bùi Vĩnh Dương', gender: 'Nam', birthYear: 1985, ethnicity: 'Kinh', position: 'Trưởng Ban Xây dựng Đảng', workplace: 'Đảng ủy xã Lương Minh', education: 'Thạc sĩ' },
    { id: 7, name: 'Vi Thị Hà', gender: 'Nữ', birthYear: 1993, ethnicity: 'Tày', position: 'Hợp đồng văn phòng', workplace: 'UBND xã Lương Minh', education: 'CĐ Sư phạm' },
    { id: 8, name: 'Lã Văn Hiếu', gender: 'Nam', birthYear: 2003, ethnicity: 'Tày', position: 'Công chức Phòng VH-XH xã', workplace: 'UBND xã Lương Minh', education: 'ĐH CNTT' },
    { id: 9, name: 'Nịnh Quốc Hoàn', gender: 'Nam', birthYear: 1975, ethnicity: 'Sán chỉ', position: 'Bí thư Đảng ủy, CT HĐND xã', workplace: 'Đảng ủy xã Lương Minh', education: 'Thạc sĩ' },
    { id: 10, name: 'Bàn Ngọc Hương', gender: 'Nam', birthYear: 1965, ethnicity: 'Dao', position: 'Công dân thôn Tân Ốc 1', workplace: 'Thôn Tân Ốc 1', education: 'Thạc sĩ' },
    { id: 11, name: 'Vi Thị Khanh', gender: 'Nữ', birthYear: 1999, ethnicity: 'Tày', position: 'Hợp đồng văn phòng', workplace: 'UBND xã Lương Minh', education: 'Cao đẳng' },
    { id: 12, name: 'Vi Văn Liêm', gender: 'Nam', birthYear: 1983, ethnicity: 'Tày', position: 'Phó Ban VH-XH HĐND xã', workplace: 'HĐND Xã Lương Minh', education: 'Đại học' },
    { id: 13, name: 'Bàn Thị Miên', gender: 'Nữ', birthYear: 1988, ethnicity: 'Dao', position: 'Chủ tịch Hội LHPN xã', workplace: 'Cơ quan UBMTTQ xã', education: 'ĐH Sư phạm' },
    { id: 14, name: 'Đặng Thị Minh', gender: 'Nữ', birthYear: 2000, ethnicity: 'Dao', position: 'Nhân viên hợp đồng 111', workplace: 'VP Đảng ủy xã', education: 'ĐH QTKD' },
    { id: 15, name: 'Hoàng Văn Nhâm', gender: 'Nam', birthYear: 1980, ethnicity: 'Tày', position: 'CV Ban Xây dựng Đảng', workplace: 'Đảng ủy xã Lương Minh', education: 'ĐH Nông nghiệp' },
    { id: 16, name: 'Bùi Thị Thúy Quỳnh', gender: 'Nữ', birthYear: 1982, ethnicity: 'Kinh', position: 'Công chức Kế toán', workplace: 'VP Đảng ủy xã', education: 'Cử nhân Kế toán' },
    { id: 17, name: 'Bàn Trường Sơn', gender: 'Nam', birthYear: 1985, ethnicity: 'Dao', position: 'Bí thư chi bộ - Trưởng thôn', workplace: 'Thôn Phủ Liễn', education: 'Cử nhân Luật' },
    { id: 18, name: 'Triệu Thị Tám', gender: 'Nữ', birthYear: 1992, ethnicity: 'Dao', position: 'Phó bí thư chi bộ thôn', workplace: 'Thôn Khe Càn', education: 'Cao đẳng' },
    { id: 19, name: 'Lưu Minh Thắng', gender: 'Nam', birthYear: 1978, ethnicity: 'Kinh', position: 'Phó BT Thường trực Đảng ủy', workplace: 'Đảng ủy xã Lương Minh', education: 'Thạc sĩ' },
    { id: 20, name: 'Bàn Sinh Thành', gender: 'Nam', birthYear: 1981, ethnicity: 'Dao', position: 'Công chức VP HĐND&UBND', workplace: 'UBND xã Lương Minh', education: 'ĐH Luật' },
    { id: 21, name: 'Trịnh Xuân Tư', gender: 'Nam', birthYear: 1978, ethnicity: 'Kinh', position: 'Chủ nhiệm UBKT Đảng ủy', workplace: 'UBKT Đảng ủy xã', education: 'ĐH SP Toán, ĐH Luật' },
    { id: 22, name: 'Lan Thị Vân', gender: 'Nữ', birthYear: 1978, ethnicity: 'Tày', position: 'Chủ tịch UBMTTQ xã', workplace: 'Cơ quan UBMTTQ xã', education: 'ĐH Luật KT' },
    { id: 23, name: 'Phạm Văn Vinh', gender: 'Nam', birthYear: 1964, ethnicity: 'Tày', position: 'Bí thư chi bộ, trưởng thôn', workplace: 'Thôn Đồng Tán', education: 'Không' },
    { id: 24, name: 'Vi Thị Xứng', gender: 'Nữ', birthYear: 1987, ethnicity: 'Tày', position: 'Chi hội trưởng phụ nữ', workplace: 'Thôn Xóm Mới', education: 'Không' },
    { id: 25, name: 'Hoàng Thị Yến', gender: 'Nữ', birthYear: 1990, ethnicity: 'Dao', position: 'CV Cơ quan UBMTTQ xã', workplace: 'Cơ quan UBMTTQ xã', education: 'ĐH PT Nông thôn' }
];

// Danh sách người ứng cử Đại biểu Quốc hội
const quochoiCandidatesData = [
    {
        id: 1,
        name: 'Đặng Thị Minh',
        gender: 'Nữ',
        birthYear: 2000,
        birthDate: '9/1/2000',
        ethnicity: 'Dao',
        religion: 'Không',
        residence: 'Thôn Khe Càn, xã Lương Minh, tỉnh Quảng Ninh',
        domicile: 'Xã Lương Minh, tỉnh Quảng Ninh',
        education: 'ĐH Quản trị kinh doanh',
        scienceDegree: 'Không',
        politicalTheory: 'Không',
        position: 'Nhân viên hợp đồng 111',
        workplace: 'Văn phòng Đảng ủy xã Lương Minh',
        partyDate: '15/06/2025',
        otherParty: 'Không',
        voterConfidence: '12/12',
        nationality: 'Chỉ có 01 quốc tịch là quốc tịch Việt Nam và không trong thời gian thực hiện thủ tục xin nhập quốc tịch nước ngoài'
    }
];

// Ứng cử viên mẫu hiển thị trên trang chính
const featuredCandidates = candidatesData.slice(0, 6);

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 }
    }
};

function Candidates() {
    const [activeTab, setActiveTab] = useState('hdnd');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [filter, setFilter] = useState('all');

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
        <section id="candidates" className="candidates section">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2>Danh sách Ứng cử viên</h2>
                    <p>
                        Các ứng cử viên Đại biểu Quốc hội & HĐND xã Lương Minh nhiệm kỳ 2026 - 2031
                    </p>
                </motion.div>

                {/* Tab Switcher */}
                <motion.div
                    className="candidates__tabs"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <button
                        className={`candidates__tab ${activeTab === 'hdnd' ? 'active' : ''}`}
                        onClick={() => setActiveTab('hdnd')}
                    >
                        <Users size={18} />
                        <span>Đại biểu HĐND xã</span>
                        <span className="candidates__tab-badge">25</span>
                    </button>
                    <button
                        className={`candidates__tab ${activeTab === 'quochoi' ? 'active' : ''}`}
                        onClick={() => setActiveTab('quochoi')}
                    >
                        <Landmark size={18} />
                        <span>Đại biểu Quốc hội</span>
                        <span className="candidates__tab-badge">1</span>
                    </button>
                </motion.div>

                {/* HĐND Tab Content */}
                {activeTab === 'hdnd' && (
                    <>
                        <motion.div
                            className="candidates__note"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="candidates__note-icon">📋</span>
                            <p>
                                <strong>Thông tin:</strong> Xã Lương Minh có tổng cộng <strong>25 người ứng cử</strong> đại biểu HĐND xã nhiệm kỳ 2026 - 2031
                                . Cử tri sẽ bầu <strong>15 đại biểu</strong>.
                            </p>
                        </motion.div>

                        <motion.div
                            className="candidates__grid"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {featuredCandidates.map((candidate) => (
                                <motion.div
                                    key={candidate.id}
                                    className="candidate-card card"
                                    variants={cardVariants}
                                >
                                    <div className="candidate-card__avatar">
                                        <User size={40} />
                                    </div>

                                    <div className="candidate-card__content">
                                        <h3 className="candidate-card__name">{candidate.name}</h3>
                                        <span className="candidate-card__position">Ứng cử viên HĐND xã</span>

                                        <div className="candidate-card__info">
                                            <div className="candidate-card__info-item">
                                                <Briefcase size={16} />
                                                <span>{candidate.position}</span>
                                            </div>
                                            <div className="candidate-card__info-item">
                                                <GraduationCap size={16} />
                                                <span>{candidate.education}</span>
                                            </div>
                                            <div className="candidate-card__info-item">
                                                <Award size={16} />
                                                <span>{candidate.ethnicity}, {candidate.birthYear}</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div
                            className="candidates__cta"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <button className="btn btn-primary" onClick={openPopup}>
                                <Users size={20} style={{ marginRight: '8px' }} />
                                Xem danh sách đầy đủ (25 người)
                            </button>
                        </motion.div>
                    </>
                )}

                {/* Quốc hội Tab Content */}
                {activeTab === 'quochoi' && (
                    <motion.div
                        className="quochoi-section"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="candidates__note">
                            <span className="candidates__note-icon">🏛️</span>
                            <p>
                                <strong>Thông tin:</strong> Xã Lương Minh có <strong>01 người ứng cử</strong> Đại biểu Quốc hội khóa XVI, nhiệm kỳ 2026 - 2031.
                            </p>
                        </div>

                        {quochoiCandidatesData.map((candidate) => (
                            <motion.div
                                key={candidate.id}
                                className="quochoi-card"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <div className="quochoi-card__header">
                                    <div className="quochoi-card__avatar">
                                        <User size={48} />
                                    </div>
                                    <div className="quochoi-card__title">
                                        <h3>{candidate.name}</h3>
                                        <span className="quochoi-card__badge">
                                            <Landmark size={14} />
                                            Ứng cử viên Đại biểu Quốc hội khóa XVI
                                        </span>
                                    </div>
                                </div>

                                <div className="quochoi-card__body">
                                    <div className="quochoi-card__info-grid">
                                        <div className="quochoi-card__info-item">
                                            <Calendar size={16} />
                                            <div>
                                                <span className="quochoi-card__label">Ngày sinh</span>
                                                <span className="quochoi-card__value">{candidate.birthDate}</span>
                                            </div>
                                        </div>
                                        <div className="quochoi-card__info-item">
                                            <User size={16} />
                                            <div>
                                                <span className="quochoi-card__label">Giới tính</span>
                                                <span className="quochoi-card__value">{candidate.gender}</span>
                                            </div>
                                        </div>
                                        <div className="quochoi-card__info-item">
                                            <Award size={16} />
                                            <div>
                                                <span className="quochoi-card__label">Dân tộc</span>
                                                <span className="quochoi-card__value">{candidate.ethnicity}</span>
                                            </div>
                                        </div>
                                        <div className="quochoi-card__info-item">
                                            <GraduationCap size={16} />
                                            <div>
                                                <span className="quochoi-card__label">Trình độ</span>
                                                <span className="quochoi-card__value">{candidate.education}</span>
                                            </div>
                                        </div>
                                        <div className="quochoi-card__info-item">
                                            <Briefcase size={16} />
                                            <div>
                                                <span className="quochoi-card__label">Chức vụ</span>
                                                <span className="quochoi-card__value">{candidate.position}</span>
                                            </div>
                                        </div>
                                        <div className="quochoi-card__info-item">
                                            <MapPin size={16} />
                                            <div>
                                                <span className="quochoi-card__label">Nơi công tác</span>
                                                <span className="quochoi-card__value">{candidate.workplace}</span>
                                            </div>
                                        </div>
                                        <div className="quochoi-card__info-item">
                                            <MapPin size={16} />
                                            <div>
                                                <span className="quochoi-card__label">Nơi cư trú</span>
                                                <span className="quochoi-card__value">{candidate.residence}</span>
                                            </div>
                                        </div>
                                        <div className="quochoi-card__info-item">
                                            <Vote size={16} />
                                            <div>
                                                <span className="quochoi-card__label">Tín nhiệm cử tri</span>
                                                <span className="quochoi-card__value">{candidate.voterConfidence}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="quochoi-card__extra">
                                        <div className="quochoi-card__extra-row">
                                            <span className="quochoi-card__label">Tôn giáo:</span>
                                            <span className="quochoi-card__value">{candidate.religion}</span>
                                        </div>
                                        <div className="quochoi-card__extra-row">
                                            <span className="quochoi-card__label">Ngày vào Đảng:</span>
                                            <span className="quochoi-card__value">{candidate.partyDate}</span>
                                        </div>
                                        <div className="quochoi-card__extra-row">
                                            <span className="quochoi-card__label">Học vị khoa học:</span>
                                            <span className="quochoi-card__value">{candidate.scienceDegree}</span>
                                        </div>
                                        <div className="quochoi-card__extra-row">
                                            <span className="quochoi-card__label">Lý luận chính trị:</span>
                                            <span className="quochoi-card__value">{candidate.politicalTheory}</span>
                                        </div>
                                        <div className="quochoi-card__extra-row">
                                            <span className="quochoi-card__label">Quốc tịch:</span>
                                            <span className="quochoi-card__value">{candidate.nationality}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>

            {/* Popup Modal */}
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
                                <p>Tổng số: <strong>{filteredCandidates.length} người ứng cử</strong> | Nhiệm kỳ 2026 - 2031 | Bầu 15 đại biểu</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

export default Candidates;
