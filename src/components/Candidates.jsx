import { motion } from 'framer-motion';
import { User, Briefcase, GraduationCap, Award } from 'lucide-react';
import './Candidates.css';

// Placeholder candidates - will be updated with real data from documents
const candidates = [
    {
        id: 1,
        name: 'Nguyễn Văn A',
        position: 'Ứng cử viên HĐND xã',
        occupation: 'Cán bộ xã',
        education: 'Đại học',
        achievements: 'Đảng viên, Bí thư chi bộ',
        image: null
    },
    {
        id: 2,
        name: 'Trần Thị B',
        position: 'Ứng cử viên HĐND xã',
        occupation: 'Giáo viên',
        education: 'Đại học Sư phạm',
        achievements: 'Giáo viên giỏi cấp huyện',
        image: null
    },
    {
        id: 3,
        name: 'Lê Văn C',
        position: 'Ứng cử viên HĐND xã',
        occupation: 'Nông dân',
        education: 'Trung cấp',
        achievements: 'Nông dân sản xuất giỏi',
        image: null
    },
    {
        id: 4,
        name: 'Phạm Thị D',
        position: 'Ứng cử viên HĐND xã',
        occupation: 'Cán bộ Hội phụ nữ',
        education: 'Cao đẳng',
        achievements: 'Chủ tịch Hội LHPN thôn',
        image: null
    },
    {
        id: 5,
        name: 'Hoàng Văn E',
        position: 'Ứng cử viên HĐND xã',
        occupation: 'Bộ đội xuất ngũ',
        education: 'Trung cấp',
        achievements: 'Đảng viên, Cựu chiến binh',
        image: null
    },
    {
        id: 6,
        name: 'Vũ Thị F',
        position: 'Ứng cử viên HĐND xã',
        occupation: 'Nhân viên y tế',
        education: 'Trung cấp Y',
        achievements: 'Cán bộ y tế thôn bản',
        image: null
    }
];

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
                        Các ứng cử viên HĐND xã Lương Minh nhiệm kỳ 2026 - 2031
                    </p>
                </motion.div>

                <motion.div
                    className="candidates__note"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="candidates__note-icon">📋</span>
                    <p>
                        <strong>Lưu ý:</strong> Danh sách ứng cử viên chính thức sẽ được công bố
                        sau khi hoàn thành quy trình hiệp thương. Thông tin dưới đây mang tính chất minh họa.
                    </p>
                </motion.div>

                <motion.div
                    className="candidates__grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {candidates.map((candidate) => (
                        <motion.div
                            key={candidate.id}
                            className="candidate-card card"
                            variants={cardVariants}
                        >
                            <div className="candidate-card__avatar">
                                {candidate.image ? (
                                    <img src={candidate.image} alt={candidate.name} />
                                ) : (
                                    <User size={40} />
                                )}
                            </div>

                            <div className="candidate-card__content">
                                <h3 className="candidate-card__name">{candidate.name}</h3>
                                <span className="candidate-card__position">{candidate.position}</span>

                                <div className="candidate-card__info">
                                    <div className="candidate-card__info-item">
                                        <Briefcase size={16} />
                                        <span>{candidate.occupation}</span>
                                    </div>
                                    <div className="candidate-card__info-item">
                                        <GraduationCap size={16} />
                                        <span>{candidate.education}</span>
                                    </div>
                                    <div className="candidate-card__info-item">
                                        <Award size={16} />
                                        <span>{candidate.achievements}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    className="candidates__cta"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <button className="btn btn-primary">
                        Xem danh sách đầy đủ
                    </button>
                </motion.div>
            </div>
        </section>
    );
}

export default Candidates;
