import { motion } from 'framer-motion';
import { FileText, Users, ClipboardCheck, Vote, CheckCircle, Flag } from 'lucide-react';
import './Process.css';

const steps = [
    {
        icon: FileText,
        step: 1,
        title: 'Hiệp thương lần 1',
        date: '05/12/2025',
        description: 'Hiệp thương về cơ cấu, thành phần, số lượng người được giới thiệu ứng cử đại biểu HĐND xã'
    },
    {
        icon: Users,
        step: 2,
        title: 'Hiệp thương lần 2',
        date: '02/02/2026',
        description: 'Lập danh sách sơ bộ những người ứng cử, tổ chức lấy ý kiến cử tri nơi cư trú'
    },
    {
        icon: ClipboardCheck,
        step: 3,
        title: 'Hiệp thương lần 3',
        date: '12/02/2026',
        description: 'Lựa chọn, lập danh sách chính thức những người đủ tiêu chuẩn ứng cử'
    },
    {
        icon: Vote,
        step: 4,
        title: 'Ngày bầu cử',
        date: '15/03/2026',
        description: 'Cử tri đi bỏ phiếu bầu cử tại 15 khu vực bỏ phiếu từ 7:00 - 19:00'
    }
];

function Process() {
    return (
        <section id="process" className="process section">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2>Quy trình Bầu cử</h2>
                    <p>
                        Các bước thực hiện cuộc bầu cử theo quy định của pháp luật
                    </p>
                </motion.div>

                <div className="process__timeline">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.step}
                            className="process__step"
                            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="process__step-connector">
                                <div className="process__step-line"></div>
                                <div className="process__step-dot">
                                    <span>{step.step}</span>
                                </div>
                                <div className="process__step-line"></div>
                            </div>

                            <div className="process__step-card card">
                                <div className="process__step-icon">
                                    <step.icon size={24} />
                                </div>
                                <div className="process__step-content">
                                    <span className="process__step-date">{step.date}</span>
                                    <h3>{step.title}</h3>
                                    <p>{step.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="process__note"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <CheckCircle className="process__note-icon" />
                    <p>
                        Mọi quy trình đều được giám sát chặt chẽ bởi Ủy ban bầu cử xã Lương Minh
                        và Ủy ban MTTQ Việt Nam xã để đảm bảo cuộc bầu cử diễn ra dân chủ, đúng pháp luật.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

export default Process;
