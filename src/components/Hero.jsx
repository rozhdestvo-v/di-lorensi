import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { FiArrowDown } from "react-icons/fi";
import { useSmoothScroll, useMediaQuery } from "../hooks/useScroll";
import heroBackground from "../../public/images/hero_background.jpg";
import titleIcon from "../../public/title_icon.png";

// Placeholder изображения для Hero
const heroImages = [heroBackground];

function Hero({ onBookClick }) {
  const containerRef = useRef(null);
  const scrollToSection = useSmoothScroll();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const { scrollY } = useScroll({ container: containerRef });

  // Parallax эффекты
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  const springY1 = useSpring(y1, { stiffness: 100, damping: 30 });
  const springY2 = useSpring(y2, { stiffness: 100, damping: 30 });

  // Анимации текста
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const handleScrollDown = () => {
    scrollToSection("services");
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Главный экран"
    >
      {/* Parallax фон */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          y: isMobile ? 0 : springY1,
          scale: isMobile ? 1 : scale,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-lavender/30 via-blush/20 to-mint/30" />
        <img
          src={heroImages[0]}
          alt="Нежный маникюр в пастельных тонах"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-bgLight/40" />
      </motion.div>

      {/* Декоративные плавающие элементы */}
      {!isMobile && (
        <>
          <motion.div
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-lavender/30 rounded-full blur-2xl"
            style={{ y: springY2 }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              scale: { duration: 4, repeat: Infinity },
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-blush/30 rounded-full blur-2xl"
            style={{ y: springY1 }}
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              scale: { duration: 5, repeat: Infinity },
              rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            }}
          />
        </>
      )}

      {/* Контент */}
      <motion.div
        className="relative z-10 container mx-auto px-4 md:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Иконка */}
        <motion.div
          variants={itemVariants}
          className="mb-6 inline-flex items-center justify-center"
        >
          <motion.div
            className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/60 backdrop-blur-sm flex items-center justify-center shadow-lg"
            whileHover={{ rotate: 15, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src={titleIcon}
              alt="Di Lorensi"
              className="w-8 h-8 md:w-10 md:h-10 text-lavender-dark"
            />
          </motion.div>
        </motion.div>

        {/* Заголовок */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-6xl lg:text-7xl font-display font-semibold text-text-dark mb-4 md:mb-6"
        >
          <span className="block">Di Lorensi</span>
          <motion.span
            className="block gradient-text mt-2 pb-2"
            initial={{ backgroundPosition: "0% 50%" }}
            animate={{ backgroundPosition: "100% 50%" }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{ backgroundSize: "200% 200%" }}
          >
            нежный уход
          </motion.span>
        </motion.h1>

        {/* Подзаголовок */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl lg:text-2xl text-text-gray mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Маникюр, педикюр, брови и ресницы в центре СПБ
        </motion.p>

        {/* Описание */}
        <motion.p
          variants={itemVariants}
          className="text-base md:text-lg text-text-light mb-4 md:mb-6 max-w-xl mx-auto"
        >
          Студия красоты, где каждая деталь создана для вашего комфорта и
          красоты
        </motion.p>

        {/* Скидка */}
        <motion.p
          variants={itemVariants}
          className="text-sm md:text-base text-text-gray mb-8 md:mb-10"
        >
          <span className="gradient-text font-medium">Скидка 15%</span> на
          первый визит и <span className="font-medium text-text-dark">10%</span>{" "}
          на второй визит в студию
        </motion.p>

        {/* CTA кнопки */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            onClick={onBookClick}
            className="btn-primary text-base md:text-lg px-10 py-4"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 60px -15px rgba(233, 213, 255, 0.6)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Записаться онлайн
          </motion.button>
        </motion.div>

        {/* Дополнительные преимущества */}
        <motion.div
          variants={itemVariants}
          className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-3xl mx-auto"
        >
          {[
            { number: "7+", label: "лет опыта" },
            { number: "5000+", label: "довольных клиентов" },
            { number: "100%", label: "стерильность" },
            { number: "24/7", label: "онлайн-запись" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-2xl md:text-3xl font-display font-semibold gradient-text">
                {stat.number}
              </div>
              <div className="text-sm text-text-light mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Индикатор прокрутки */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.button
          onClick={handleScrollDown}
          className="flex flex-col items-center gap-2 text-text-gray hover:text-text-dark transition-colors"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          aria-label="Прокрутить вниз"
        >
          <span className="text-xs uppercase tracking-widest">
            Листайте вниз
          </span>
          <FiArrowDown className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </section>
  );
}

export default Hero;
