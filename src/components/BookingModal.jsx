import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Phone, MessageCircle, Send } from "lucide-react";

const salons = [
  {
    id: 1,
    name: "1 Чернышевская",
    address: "Кирочная ул., 52",
    phone: "+7 (966) 828-88-78",
    phoneHref: "tel:+79668288878",
    mapLink: "https://yandex.ru/maps/-/CPbrzZnz",
    writeLink: "https://api.whatsapp.com/send/?phone=79668288878&text&type=phone_number&app_absent=0",
    bookLink: "https://n649537.yclients.com/company/614104/about?previousStepUrl=%2Fcompany%2F614104%2Fpersonal%2Fmenu%3Fo%3D&o=",
  },
  {
    id: 2,
    name: "2 Сенная",
    address: "Казанская ул., 17-19",
    phone: "+7 (931) 399-80-88",
    phoneHref: "tel:+79313998088",
    mapLink: "https://yandex.ru/maps/-/CPbrvKLb",
    writeLink: "https://api.whatsapp.com/send/?phone=79313998088&text&type=phone_number&app_absent=0",
    bookLink: "https://n997014.yclients.com/company/925753/about?previousStepUrl=%2Fcompany%2F925753%2Fpersonal%2Fmenu%3Fo%3D&o=",
  },
  {
    id: 3,
    name: "3 Петроградская",
    address: "Большая Пушкарская, 54",
    phone: "+7 (966) 864-08-88",
    phoneHref: "tel:+79668640888",
    mapLink: "https://yandex.ru/maps/-/CPbrvR-O",
    writeLink: "https://api.whatsapp.com/send/?phone=79668640888&text&type=phone_number&app_absent=0",
    bookLink: "https://n1009071.yclients.com/company/936099/about?previousStepUrl=%2Fcompany%2F936099%2Fpersonal%2Fmenu%3Fo%3D&o=",
  },
  {
    id: 4,
    name: "4 Горьковская",
    address: "Кронверкский пр., 51",
    phone: "+7 (962) 692-08-88",
    phoneHref: "tel:+79626920888",
    mapLink: "https://yandex.ru/maps/-/CPbrrS9O",
    writeLink: "https://api.whatsapp.com/send/?phone=79626920888&text&type=phone_number&app_absent=0",
    bookLink: "https://n883270.yclients.com/company/823935/about?o=&previousStepUrl=%2Fcompany%2F823935%2Fpersonal%2Fmenu%3Fo%3D",
  },
];

function SalonCard({ salon, index }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="space-y-2"
    >
      {/* Название */}
      <h3 className="text-base font-display font-semibold text-text-dark">
        {salon.name}
      </h3>

      {/* Адрес и телефон */}
      <div className="space-y-0.5 text-xs text-text-gray">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-lavender-dark flex-shrink-0" />
          <a
            href={salon.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-lavender-dark transition-colors"
          >
            {salon.address}
          </a>
        </div>
        <div className="flex items-center gap-1.5">
          <Phone className="w-3.5 h-3.5 text-lavender-dark flex-shrink-0" />
          <a
            href={salon.phoneHref}
            className="hover:text-lavender-dark transition-colors"
          >
            {salon.phone}
          </a>
        </div>
      </div>

      {/* Кнопки */}
      <div className="flex gap-1.5 pt-0.5">
        <motion.a
          href={salon.writeLink}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 flex items-center justify-center gap-1 px-2.5 py-2 border-2 border-lavender rounded-full text-xs font-medium text-text-dark hover:bg-lavender/20 transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          Написать
        </motion.a>
        <motion.a
          href={salon.bookLink}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 flex items-center justify-center gap-1 px-2.5 py-2 bg-pastel-gradient rounded-full text-xs font-medium text-text-dark hover:shadow-lg transition-shadow"
        >
          <Send className="w-3.5 h-3.5" />
          Online-запись
        </motion.a>
      </div>
    </motion.div>
  );
}

function BookingModal({ isOpen, onClose }) {
  const contentVariants = {
    hidden: { scale: 0.9, opacity: 0, y: 50 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: { scale: 0.9, opacity: 0, y: 50 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto py-10"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Заголовок */}
            <div className="flex items-center justify-between p-6 border-b border-lavender/30">
              <div>
                <h2
                  id="modal-title"
                  className="text-2xl font-display font-semibold text-text-dark"
                >
                  Наши салоны
                </h2>
                <p className="text-text-gray text-sm mt-1">
                  Выберите удобный салон для записи
                </p>
              </div>
              <motion.button
                onClick={onClose}
                className="p-2 hover:bg-lavender/30 rounded-full transition-colors"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Закрыть"
              >
                <X className="w-6 h-6 text-text-gray" />
              </motion.button>
            </div>

            {/* Салоны */}
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {salons.map((salon, index) => (
                  <SalonCard key={salon.id} salon={salon} index={index} />
                ))}
              </div>

              {/* Карта */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-xl"
              >
                <iframe
                  src="https://yandex.ru/map-widget/v1/?um=constructor%3A73c6b4f296517c899a49d85f7d4eb03c53d894ac8752675ec96948ee0ee64de9&amp;source=constructor"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allowFullScreen={true}
                  title="Карта — Салоны Di Lorensi"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full"
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default BookingModal;
