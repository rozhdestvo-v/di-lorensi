import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useScrollPosition,
  useSmoothScroll,
  useMediaQuery,
} from "../hooks/useScroll";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { id: "home", label: "Главная" },
  { id: "services", label: "Услуги" },
  { id: "gallery", label: "Галерея" },
  { id: "team", label: "Команда" },
  { id: "reviews", label: "Отзывы" },
  { id: "contacts", label: "Контакты" },
];

function Header({ onBookClick }) {
  const scrollPosition = useScrollPosition();
  const scrollToSection = useSmoothScroll();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const isScrolled = scrollPosition > 50;

  // Определение активной секции
  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map((link) => document.getElementById(link.id));
      const scrollPos = window.scrollY + 100;

      sections.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          if (
            scrollPos >= sectionTop &&
            scrollPos < sectionTop + sectionHeight
          ) {
            setActiveSection(navLinks[index].id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  const headerVariants = {
    hidden: { y: -100 },
    visible: {
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <motion.header
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "glass shadow-lg py-3" : "bg-transparent py-5"
        }`}
        role="banner"
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between">
            {/* Логотип */}
            <motion.a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("home");
              }}
              className="text-2xl md:text-3xl font-display font-semibold gradient-text"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Di Lorensi — главная страница"
            >
              Di Lorensi
            </motion.a>

            {/* Навигация для десктопа */}
            {!isMobile && (
              <nav
                className="hidden md:flex items-center gap-8"
                role="navigation"
                aria-label="Основная навигация"
              >
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`text-sm font-medium transition-colors duration-200 relative ${
                      activeSection === link.id
                        ? "text-text-dark"
                        : "text-text-gray hover:text-text-dark"
                    }`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -2 }}
                    aria-current={
                      activeSection === link.id ? "page" : undefined
                    }
                  >
                    {link.label}
                    {activeSection === link.id && (
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-pastel-gradient rounded-full"
                        layoutId="activeNav"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </motion.button>
                ))}
              </nav>
            )}

            {/* Кнопка записи и телефон для десктопа */}
            {!isMobile && (
              <div className="flex items-center gap-4">
                <a
                  href="tel:+79668288878"
                  className="flex items-center gap-2 text-text-gray hover:text-text-dark transition-colors"
                  aria-label="Позвонить нам"
                >
                  <Phone className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    +7 (966) 828-88-78
                  </span>
                </a>
                <motion.button
                  onClick={onBookClick}
                  className="btn-primary text-sm"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 40px -10px rgba(233, 213, 255, 0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Записаться онлайн"
                >
                  Записаться
                </motion.button>
              </div>
            )}

            {/* Бургер-меню для мобильных */}
            {isMobile && (
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-text-dark"
                whileTap={{ scale: 0.9 }}
                aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </motion.button>
            )}
          </div>
        </div>
      </motion.header>

      {/* Мобильное меню */}
      <AnimatePresence>
        {isMenuOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 top-0 z-40 bg-bgLight md:hidden"
          >
            <div className="flex flex-col h-full pt-20 px-6">
              <nav
                className="flex flex-col gap-4"
                role="navigation"
                aria-label="Мобильное меню"
              >
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`text-left text-xl font-medium py-3 border-b border-lavender/30 ${
                      activeSection === link.id
                        ? "text-text-dark"
                        : "text-text-gray"
                    }`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </nav>

              <div className="mt-auto mb-8 space-y-4">
                <a
                  href="tel:+7966828878"
                  className="flex items-center gap-3 text-text-gray py-3"
                  aria-label="Позвонить нам"
                >
                  <Phone className="w-5 h-5" />
                  <span className="text-lg">+7 (966) 828-88-78</span>
                </a>
                <motion.button
                  onClick={() => {
                    onBookClick();
                    setIsMenuOpen(false);
                  }}
                  className="btn-primary w-full text-center"
                  whileTap={{ scale: 0.98 }}
                >
                  Записаться онлайн
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
