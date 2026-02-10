import { useState, useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import './Header.css';
import logoDoan from '../assets/logo-doanthanhnien.jpg';

const navItems = [
  { id: 'home', label: 'Trang chủ' },
  { id: 'introduction', label: 'Giới thiệu' },
  { id: 'candidates', label: 'Ứng cử viên' },
  { id: 'process', label: 'Quy trình' },
  { id: 'schedule', label: 'Lịch bầu cử' },
  { id: 'contact', label: 'Liên hệ' },
];

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section, index) => {
        if (section) {
          const offsetTop = section.offsetTop;
          const offsetHeight = section.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(navItems[index].id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="container">
        <div className="header__inner">
          {/* Logo */}
          <motion.div
            className="header__logo"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => scrollToSection('home')}
          >
            <div className="header__logo-icon">
              <img src={logoDoan} alt="Logo Đoàn" />
            </div>
            <div className="header__logo-text">
              <span className="header__logo-title">Hỗ trợ bầu cử ĐBQH và HĐND các cấp</span>
              <span className="header__logo-subtitle">Đoàn TNCS Hồ Chí Minh xã Lương Minh</span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="header__nav">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                className={`header__nav-item ${activeSection === item.id ? 'header__nav-item--active' : ''}`}
                onClick={() => scrollToSection(item.id)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                {item.label}
              </motion.button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="header__mobile-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="header__mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="header__mobile-nav">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  className={`header__mobile-nav-item ${activeSection === item.id ? 'header__mobile-nav-item--active' : ''}`}
                  onClick={() => scrollToSection(item.id)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
