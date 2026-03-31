import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  Heart,
  Camera,
  MessageCircle,
  Send,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { Vk_Icon } from "../../public/vk_icon";

const footerLinks = {
  services: [
    { label: "Маникюр", href: "#services" },
    { label: "Педикюр", href: "#services" },
    { label: "Брови", href: "#services" },
    { label: "Ресницы", href: "#services" },
    { label: "Дизайн ногтей", href: "#services" },
    { label: "Парикмахер", href: "#services" },
  ],
  company: [
    { label: "О нас", href: "#home" },
    { label: "Команда", href: "#team" },
    { label: "Галерея", href: "#gallery" },
    { label: "Отзывы", href: "#reviews" },
    { label: "Контакты", href: "#contacts" },
  ],
  legal: [
    { label: "Политика конфиденциальности", href: "#privacy" },
    { label: "Договор оферты", href: "#offer" },
    { label: "Правила салона", href: "#rules" },
  ],
};

const socialLinks = [
  {
    icon: <Vk_Icon />,
    label: "Vk",
    href: "https://vk.com/di.lorensi",
  },
  // { icon: MessageCircle, label: "Telegram", href: "https://t.me/di_lorensi" },
  // { icon: Send, label: "WhatsApp", href: "https://wa.me/79668288878" },
];

function FooterLink({ link, onClick }) {
  return (
    <a
      href={link.href}
      onClick={onClick}
      className="text-text-gray hover:text-text-dark transition-colors duration-200 text-sm"
    >
      {link.label}
    </a>
  );
}

function Footer() {
  const [openSection, setOpenSection] = useState(null);
  const currentYear = new Date().getFullYear();

  const handleMobileLinkClick = (sectionId) => {
    setOpenSection(null);
  };

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const sectionId = href.replace("#", "");
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer
      className="bg-text-dark text-white relative overflow-hidden"
      role="contentinfo"
    >
      {/* Декоративный фон */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-lavender/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blush/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Верхняя часть */}
        <div className="py-12 md:py-16 border-b border-white/10">
          <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-12">
            {/* Логотип и описание */}
            <div className="lg:max-w-sm">
              <a href="#home" className="inline-block mb-4">
                <span className="text-3xl md:text-4xl font-display font-semibold gradient-text">
                  Di Lorensi
                </span>
              </a>
              <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-sm">
                Студия красоты в центре Санкт-Петербурга. Профессиональный уход
                за ногтями, бровями и ресницами.
              </p>
            </div>

            {/* Ссылки на услуги - десктоп */}
            <div className="hidden lg:block flex-shrink-0">
              <h4 className="font-display font-semibold text-lg mb-4">
                Услуги
              </h4>
              <ul className="space-y-2">
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <FooterLink
                      link={link}
                      onClick={(e) => scrollToSection(e, link.href)}
                    />
                  </li>
                ))}
              </ul>
            </div>

            {/* Ссылки на компанию - десктоп */}
            <div className="hidden lg:block flex-shrink-0">
              <h4 className="font-display font-semibold text-lg mb-4">
                Компания
              </h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <FooterLink
                      link={link}
                      onClick={(e) => scrollToSection(e, link.href)}
                    />
                  </li>
                ))}
              </ul>
            </div>

            {/* Соцсети и рассылка */}
            <div className="flex-shrink-0">
              <h4 className="font-display font-semibold text-lg mb-4">
                Мы в соцсетях
              </h4>
              <div className="flex gap-3 mb-6">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-pastel-gradient transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={social.label}
                  >
                    {/* <social.icon className="w-5 h-5 text-white" /> */}
                    {social.icon}
                  </motion.a>
                ))}
              </div>

              {/* Мобильные аккордеоны */}
              <div className="lg:hidden space-y-2">
                {["Услуги", "Компания"].map((section) => (
                  <div key={section} className="border-t border-white/10">
                    <button
                      onClick={() => toggleSection(section)}
                      className="w-full py-3 flex items-center justify-between text-white/80 hover:text-white transition-colors"
                      aria-expanded={openSection === section}
                    >
                      <span className="font-medium">{section}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          openSection === section ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openSection === section && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="space-y-2 pb-3 overflow-hidden"
                      >
                        {footerLinks[section.toLowerCase()].map(
                          (link, index) => (
                            <li key={index}>
                              <a
                                href={link.href}
                                onClick={(e) => {
                                  scrollToSection(e, link.href);
                                  handleMobileLinkClick(link.href);
                                }}
                                className="text-white/60 hover:text-white transition-colors text-sm block py-1"
                              >
                                {link.label}
                              </a>
                            </li>
                          ),
                        )}
                      </motion.ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Нижняя часть */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Копирайт */}
          <p className="text-white/50 text-sm text-center md:text-left">
            © {currentYear} Di Lorensi Beauty Studio. Все права защищены.
          </p>

          {/* Сделано с любовью */}
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <span>Сделано с</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-blush-dark" />
            </motion.span>
            <span>Владиславом Рождественским</span>
          </div>

          {/* Юридические ссылки */}
          {/* <div className="flex flex-wrap justify-center gap-4">
            {footerLinks.legal.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-white/50 hover:text-white/80 transition-colors text-xs"
              >
                {link.label}
              </a>
            ))}
          </div> */}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
