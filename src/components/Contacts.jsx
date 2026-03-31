import { motion } from "framer-motion";
import { useInView } from "../hooks/useScroll";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Camera,
  MessageCircle,
  Send,
} from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    label: "Адрес",
    value: "Санкт-Петербург, Кирочная ул., 52",
    href: "https://yandex.ru/maps/-/CDu~KJWL",
    linkText: "Показать на карте",
  },
  {
    icon: Phone,
    label: "Телефон",
    value: "+7 (966) 828-88-78",
    href: "tel:+79668288878",
    linkText: "Позвонить",
  },
  {
    icon: Mail,
    label: "Email",
    value: "di.lorensi@mail.ru",
    href: "mailto:di.lorensi@mail.ru",
    linkText: "Написать",
  },
  {
    icon: Clock,
    label: "Режим работы",
    value: "Ежедневно с 10:00 до 22:00",
    href: null,
    linkText: null,
  },
];

const socialLinks = [
  {
    icon: Camera,
    label: "Instagram",
    href: "https://instagram.com/di_lorensi",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: MessageCircle,
    label: "Telegram",
    href: "https://t.me/di_lorensi",
    color: "from-blue-400 to-blue-600",
  },
  {
    icon: Send,
    label: "WhatsApp",
    href: "https://wa.me/79668288878",
    color: "from-green-400 to-green-600",
  },
];

function ContactItem({ item, index }) {
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ x: -30, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="flex items-start gap-4"
    >
      <motion.div
        className="w-12 h-12 rounded-2xl bg-pastel-gradient flex items-center justify-center flex-shrink-0"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Icon className="w-6 h-6 text-white" />
      </motion.div>
      <div>
        <h4 className="text-sm font-medium text-text-light mb-1">
          {item.label}
        </h4>
        {item.href ? (
          <a
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={
              item.href.startsWith("http") ? "noopener noreferrer" : undefined
            }
            className="text-lg font-medium text-text-dark hover:gradient-text transition-colors"
          >
            {item.value}
          </a>
        ) : (
          <p className="text-lg font-medium text-text-dark">{item.value}</p>
        )}
        {item.linkText && (
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-lavender-dark hover:underline inline-flex items-center gap-1 mt-1"
          >
            <Send className="w-3 h-3" />
            {item.linkText}
          </a>
        )}
      </div>
    </motion.div>
  );
}

function SocialLink({ social, index }) {
  const Icon = social.icon;

  return (
    <motion.a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      whileHover={{ y: -5, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="group relative overflow-hidden w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white shadow-lg flex items-center justify-center"
      aria-label={social.label}
    >
      {/* Градиент фон при наведении */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />

      {/* Иконка */}
      <Icon className="w-7 h-7 md:w-8 md:h-8 text-text-gray group-hover:text-white transition-colors duration-300 relative z-10" />

      {/* Подпись */}
      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-medium text-text-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        {social.label}
      </span>
    </motion.a>
  );
}

function Contacts({ onBookClick }) {
  const [sectionRef, isSectionInView] = useInView(0.1);

  return (
    <section
      id="contacts"
      ref={sectionRef}
      className="py-20 md:py-32 bg-bgLight relative overflow-hidden"
      aria-labelledby="contacts-title"
    >
      {/* Декоративный фон */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-lavender/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-mint/30 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Заголовок */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isSectionInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-block px-4 py-2 bg-mint/50 rounded-full text-sm font-medium text-text-dark mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isSectionInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Контакты
          </motion.span>
          <h2 id="contacts-title" className="section-title">
            Ждём вас в <span className="gradient-text">гости</span>
          </h2>
          <p className="section-subtitle">
            Свяжитесь с нами любым удобным способом или записывайтесь онлайн
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Контактная информация */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={isSectionInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Карточки контактов */}
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <ContactItem key={index} item={item} index={index} />
              ))}
            </div>

            {/* Соцсети */}
            <div>
              <h4 className="text-lg font-medium text-text-dark mb-4">
                Мы в социальных сетях
              </h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <SocialLink key={index} social={social} index={index + 4} />
                ))}
              </div>
            </div>

            {/* CTA кнопка */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={isSectionInView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="pt-6"
            >
              <motion.button
                onClick={onBookClick}
                className="btn-primary w-full md:w-auto text-lg px-12 py-4"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 20px 60px -15px rgba(233, 213, 255, 0.6)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                Записаться онлайн
              </motion.button>
              <p className="text-sm text-text-light mt-4">
                Или позвоните нам: +7 (966) 828-88-78
              </p>
            </motion.div>
          </motion.div>

          {/* Карта */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={isSectionInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* iframe Яндекс.Карт */}
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=30.369090%2C59.934289&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1NzQ0MTIwNBJO0KDQvtGB0YHQuNGPLCDQodCw0L3QutGCLdCf0LXRgtC10YDQsdGD0YDQsywg0JrRgNC10LzQuNC90LPRgNCw0YHQutCw0Y8g0JrQvtC90L7QtNC90LAsIDUyIgoNekJWQhXnH1VC&z=16.57"
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen={true}
              title="Карта — Di Lorensi на Кирочной 52"
              loading="lazy"
              className="absolute inset-0 w-full h-full"
            />

            {/* Overlay с адресом */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={isSectionInView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 1, duration: 0.6 }}
              className="absolute bottom-4 left-4 right-4 md:left-6 md:right-6 md:bottom-6"
            >
              <div className="glass rounded-2xl p-4 md:p-5 shadow-lg">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-lavender-dark flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-text-dark">
                      Санкт-Петербург, Кирочная ул., 52
                    </p>
                    <p className="text-sm text-text-light mt-1">
                      Метро «Чернышевская» — 5 минут пешком
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Дополнительная информация */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.5 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              title: "Бесплатная парковка",
              description:
                "Для наших клиентов есть парковочные места рядом с салоном",
              icon: "🚗",
            },
            {
              title: "Wi-Fi и напитки",
              description: "Бесплатный Wi-Fi, кофе и чай во время процедуры",
              icon: "☕",
            },
            {
              title: "Подарочные сертификаты",
              description:
                "Идеальный подарок для близких — сертификат на любую сумму",
              icon: "🎁",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="card text-center p-6"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h4 className="font-display font-semibold text-text-dark mb-2">
                {item.title}
              </h4>
              <p className="text-sm text-text-gray">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Contacts;
