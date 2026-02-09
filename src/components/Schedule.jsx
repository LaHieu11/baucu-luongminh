import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Phone } from 'lucide-react';
import './Schedule.css';

const votingLocations = [
    { id: 1, name: 'Thôn Đồng Cầu', address: 'Nhà văn hóa thôn Đồng Cầu' },
    { id: 2, name: 'Thôn Đồng Giảng A', address: 'Nhà văn hóa thôn Đồng Giảng A' },
    { id: 3, name: 'Thôn Đồng Giảng B', address: 'Nhà văn hóa thôn Đồng Giảng B' },
    { id: 4, name: 'Thôn Xóm Mới', address: 'Nhà văn hóa thôn Xóm Mới' },
    { id: 5, name: 'Thôn Khe Giấy', address: 'Nhà văn hóa thôn Khe Giấy' },
    { id: 6, name: 'Thôn Đồng Quánh', address: 'Nhà văn hóa thôn Đồng Quánh' },
    { id: 7, name: 'Thôn Đồng Tán', address: 'Nhà văn hóa thôn Đồng Tán' },
    { id: 8, name: 'Thôn Khe Áng', address: 'Nhà văn hóa thôn Khe Áng' },
    { id: 9, name: 'Thôn Đồng Doong', address: 'Nhà văn hóa thôn Đồng Doong' },
    { id: 10, name: 'Thôn Khe Nà', address: 'Nhà văn hóa thôn Khe Nà' },
    { id: 11, name: 'Thôn Bãi Liêu', address: 'Nhà văn hóa thôn Bãi Liêu' },
    { id: 12, name: 'Thôn Tân Ốc 1', address: 'Nhà văn hóa thôn Tân Ốc 1' },
    { id: 13, name: 'Thôn Tân Ốc 2', address: 'Nhà văn hóa thôn Tân Ốc 2' },
    { id: 14, name: 'Thôn Phủ Liễn', address: 'Nhà văn hóa thôn Phủ Liễn' },
    { id: 15, name: 'Thôn Khe Càn', address: 'Nhà văn hóa thôn Khe Càn' },
];

function Schedule() {
    return (
        <section id="schedule" className="schedule section">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2>Thời gian & Địa điểm</h2>
                    <p>
                        Thông tin về ngày bầu cử và các khu vực bỏ phiếu tại xã Lương Minh
                    </p>
                </motion.div>

                <div className="schedule__content">
                    {/* Election Date Card */}
                    <motion.div
                        className="schedule__date-card"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="schedule__date-header">
                            <Calendar size={32} />
                            <h3>Ngày Bầu cử</h3>
                        </div>

                        <div className="schedule__date-main">
                            <span className="schedule__date-day">15</span>
                            <div className="schedule__date-info">
                                <span className="schedule__date-month">Tháng 03</span>
                                <span className="schedule__date-year">2026</span>
                            </div>
                        </div>

                        <div className="schedule__date-time">
                            <div className="schedule__time-item">
                                <Clock size={20} />
                                <div>
                                    <span className="schedule__time-label">Bắt đầu</span>
                                    <span className="schedule__time-value">07:00</span>
                                </div>
                            </div>
                            <div className="schedule__time-divider"></div>
                            <div className="schedule__time-item">
                                <Clock size={20} />
                                <div>
                                    <span className="schedule__time-label">Kết thúc</span>
                                    <span className="schedule__time-value">19:00</span>
                                </div>
                            </div>
                        </div>

                        <div className="schedule__hotline">
                            <Phone size={18} />
                            <span>Hotline: <strong>0376345379</strong></span>
                        </div>
                    </motion.div>

                    {/* Voting Locations */}
                    <motion.div
                        className="schedule__locations"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="schedule__locations-header">
                            <MapPin size={24} />
                            <h3>Các khu vực bỏ phiếu</h3>
                            <span className="schedule__locations-count">{votingLocations.length} khu vực</span>
                        </div>

                        <div className="schedule__locations-grid">
                            {votingLocations.map((location, index) => (
                                <motion.div
                                    key={location.id}
                                    className="schedule__location-item"
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: index * 0.03 }}
                                >
                                    <span className="schedule__location-number">{location.id}</span>
                                    <div className="schedule__location-info">
                                        <strong>{location.name}</strong>
                                        <span>{location.address}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default Schedule;
