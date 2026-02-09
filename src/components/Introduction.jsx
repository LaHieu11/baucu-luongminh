import { motion } from 'framer-motion';
import { CheckCircle, Users, Target, Shield } from 'lucide-react';
import './Introduction.css';

const features = [
    {
        icon: Users,
        title: 'Dân chủ',
        description: 'Mỗi công dân đều có quyền bầu cử bình đẳng'
    },
    {
        icon: Shield,
        title: 'Minh bạch',
        description: 'Quy trình bầu cử công khai, minh bạch'
    },
    {
        icon: Target,
        title: 'Trách nhiệm',
        description: 'Lựa chọn đại biểu xứng đáng đại diện nhân dân'
    },
    {
        icon: CheckCircle,
        title: 'Hợp pháp',
        description: 'Tuân thủ đúng quy định pháp luật'
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

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 }
    }
};

function Introduction() {
    return (
        <section id="introduction" className="introduction section">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2>Giới thiệu về Bầu cử</h2>
                    <p style={{maxWidth: '620px'}}>
                        Cuộc bầu cử Đại biểu Quốc hội khóa XVI và Hội đồng nhân dân các cấp
                        nhiệm kỳ 2026 - 2031 là sự kiện chính trị quan trọng của đất nước.
                    </p>
                </motion.div>

                <div className="introduction__content">
                    {/* Main Content */}
                    <motion.div
                        className="introduction__main"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="introduction__text">
                            <h3>Ý nghĩa của cuộc Bầu cử</h3>
                            <p>
                                Bầu cử Đại biểu Quốc hội và Hội đồng nhân dân các cấp là quyền và nghĩa vụ
                                thiêng liêng của mỗi công dân Việt Nam. Đây là dịp để cử tri thể hiện ý chí,
                                nguyện vọng của mình trong việc lựa chọn những người đại diện xứng đáng
                                tham gia vào cơ quan quyền lực nhà nước.
                            </p>
                            <p>
                                Tại xã Lương Minh, tỉnh Quảng Ninh, cuộc bầu cử được tổ chức
                                với sự tham gia của toàn thể cử tri trong xã, đảm bảo thực hiện đúng các
                                quy định của pháp luật về bầu cử.
                            </p>

                            <div className="introduction__highlights">
                                <div className="introduction__highlight">
                                    <CheckCircle className="introduction__highlight-icon" />
                                    <span>Bầu cử Đại biểu Quốc hội khóa XVI</span>
                                </div>
                                <div className="introduction__highlight">
                                    <CheckCircle className="introduction__highlight-icon" />
                                    <span>Bầu cử Đại biểu HĐND tỉnh Quảng Ninh</span>
                                </div>
                                <div className="introduction__highlight">
                                    <CheckCircle className="introduction__highlight-icon" />
                                    <span>Bầu cử Đại biểu HĐND xã Lương Minh</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Features Grid */}
                    <motion.div
                        className="introduction__features"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="introduction__feature card"
                                variants={itemVariants}
                            >
                                <div className="introduction__feature-icon">
                                    <feature.icon size={28} />
                                </div>
                                <h4>{feature.title}</h4>
                                <p>{feature.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default Introduction;
