import { motion } from "framer-motion";
import { useInView } from "../hooks/useScroll";
import { MapPin, Phone, MessageCircle, Send } from "lucide-react";

const salons = [
  {
    id: 1,
    name: "1 Чернышевская",
    address: "Кирочная ул., 52",
    phone: "+7 (966) 828-88-78",
    phoneHref: "tel:+79668288878",
    mapLink: "https://yandex.ru/maps/-/CPbrzZnz",
    writeLink:
      "https://api.whatsapp.com/send/?phone=79668288878&text&type=phone_number&app_absent=0",
    bookLink:
      "https://n649537.yclients.com/company/614104/about?previousStepUrl=%2Fcompany%2F614104%2Fpersonal%2Fmenu%3Fo%3D&o=",
  },
  {
    id: 2,
    name: "2 Сенная",
    address: "Казанская ул., 17-19",
    phone: "+7 (931) 399-80-88",
    phoneHref: "tel:+79313998088",
    mapLink: "https://yandex.ru/maps/-/CPbrvKLb",
    writeLink:
      "https://api.whatsapp.com/send/?phone=79313998088&text&type=phone_number&app_absent=0",
    bookLink:
      "https://n997014.yclients.com/company/925753/about?previousStepUrl=%2Fcompany%2F925753%2Fpersonal%2Fmenu%3Fo%3D&o=",
  },
  {
    id: 3,
    name: "3 Петроградская",
    address: "Большая Пушкарская, 54",
    phone: "+7 (966) 864-08-88",
    phoneHref: "tel:+79668640888",
    mapLink: "https://yandex.ru/maps/-/CPbrvR-O",
    writeLink:
      "https://api.whatsapp.com/send/?phone=79668640888&text&type=phone_number&app_absent=0",
    bookLink:
      "https://n1009071.yclients.com/company/936099/about?previousStepUrl=%2Fcompany%2F936099%2Fpersonal%2Fmenu%3Fo%3D&o=",
  },
  {
    id: 4,
    name: "4 Горьковская",
    address: "Кронверкский пр., 51",
    phone: "+7 (962) 692-08-88",
    phoneHref: "tel:+79626920888",
    mapLink: "https://yandex.ru/maps/-/CPbrrS9O",
    writeLink:
      "https://api.whatsapp.com/send/?phone=79626920888&text&type=phone_number&app_absent=0",
    bookLink:
      "https://n883270.yclients.com/company/823935/about?o=&previousStepUrl=%2Fcompany%2F823935%2Fpersonal%2Fmenu%3Fo%3D",
  },
];

function SalonItem({ salon, index }) {
  return (
    <motion.div
      initial={{ x: -30, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="space-y-3"
    >
      {/* Название */}
      <h3 className="text-lg font-display font-semibold text-text-dark">
        {salon.name}
      </h3>

      {/* Адрес и телефон */}
      <div className="space-y-2 text-sm text-text-gray">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-lavender-dark flex-shrink-0" />
          <a
            href={salon.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-lavender-dark transition-colors"
          >
            {salon.address}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-lavender-dark flex-shrink-0" />
          <a
            href={salon.phoneHref}
            className="hover:text-lavender-dark transition-colors"
          >
            {salon.phone}
          </a>
        </div>
      </div>

      {/* Кнопки */}
      <div className="flex gap-2">
        <motion.a
          href={salon.writeLink}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 border-2 border-lavender rounded-full text-sm font-medium text-text-dark hover:bg-lavender/20 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          Написать
        </motion.a>
        <motion.a
          href={salon.bookLink}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-pastel-gradient rounded-full text-sm font-medium text-text-dark hover:shadow-lg transition-shadow"
        >
          <Send className="w-4 h-4" />
          Online-запись
        </motion.a>
      </div>
    </motion.div>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Контактная информация */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={isSectionInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Карточки салонов */}
            <div className="space-y-8">
              {salons.map((salon, index) => (
                <SalonItem key={salon.id} salon={salon} index={index} />
              ))}
            </div>
          </motion.div>

          {/* Карта */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={isSectionInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative h-[400px] md:h-[700px] rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* iframe Яндекс.Карт */}
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A73c6b4f296517c899a49d85f7d4eb03c53d894ac8752675ec96948ee0ee64de9&amp;source=constructor"
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen={true}
              title="Карта — Di Lorensi"
              loading="lazy"
              className="absolute inset-0 w-full h-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contacts;
