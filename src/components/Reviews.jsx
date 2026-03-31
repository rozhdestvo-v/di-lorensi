import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "../hooks/useScroll";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const reviewsData = [
  {
    id: 1,
    name: "Екатерина М.",
    rating: 5,
    text: "Профессиональные мастера, уютная атмосфера! Делала маникюр и педикюр — всё на высшем уровне. Обязательно вернусь снова!",
    service: "Маникюр + Педикюр",
    date: "Март 2025",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
  },
  {
    id: 2,
    name: "Анна С.",
    rating: 5,
    text: "Лучшая студия в Питере! Хожу сюда уже больше года, мастера знают все мои предпочтения. Ламинирование бровей — просто волшебство!",
    service: "Ламинирование бровей",
    date: "Февраль 2025",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
  },
  {
    id: 3,
    name: "Мария К.",
    rating: 5,
    text: "Очень довольна обслуживанием! Стерильные инструменты, вежливые администраторы, вкусный кофе. Маникюр держится больше 3 недель без сколов.",
    service: "Маникюр гель-лак",
    date: "Январь 2025",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80",
  },
  {
    id: 4,
    name: "Ольга В.",
    rating: 5,
    text: "Делала ламинирование ресниц у Марии — результат превзошёл все ожидания! Выглядит очень естественно и красиво. Спасибо!",
    service: "Ламинирование ресниц",
    date: "Декабрь 2024",
    avatar:
      "https://images.unsplash.com/photo-1554151228-14d9def656ec?w=100&q=80",
  },
  {
    id: 5,
    name: "Дмитрий П.",
    rating: 5,
    text: "Мужской маникюр сделал у Анны — очень аккуратно и быстро. Наконец-то нашёл место, куда буду ходить постоянно.",
    service: "Мужской маникюр",
    date: "Ноябрь 2024",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
  },
  {
    id: 6,
    name: "Виктория Л.",
    rating: 5,
    text: "Стрижка и укладка у Ольги — это любовь с первого раза! Волосы лежат идеально, получаю комплименты каждый день.",
    service: "Стрижка + Укладка",
    date: "Октябрь 2024",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
  },
];

function StarRating({ rating }) {
  return (
    <div
      className="flex gap-1"
      role="img"
      aria-label={`Рейтинг: ${rating} из 5`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? "text-peach-dark fill-peach-dark" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review, isActive, direction }) {
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 400 : -400,
      opacity: 0,
      scale: 0.9,
      rotateY: direction > 0 ? -15 : 15,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      zIndex: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 400 : -400,
      opacity: 0,
      scale: 0.9,
      rotateY: direction < 0 ? -15 : 15,
    }),
  };

  return (
    <motion.div
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      }}
      className={`absolute inset-0 ${isActive ? "" : "pointer-events-none"}`}
      style={{ perspective: 1000 }}
    >
      <div className="card max-w-2xl mx-auto h-full flex flex-col">
        {/* Кавычки */}
        <Quote className="w-12 h-12 text-lavender/50 mb-4" />

        {/* Текст отзыва с typewriter эффектом */}
        <motion.p
          className="text-lg md:text-xl text-text-gray leading-relaxed mb-6 flex-grow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {review.text}
        </motion.p>

        {/* Информация об авторе */}
        <div className="flex items-center gap-4 pt-6 border-t border-lavender/30">
          <img
            src={review.avatar}
            alt={review.name}
            className="w-14 h-14 rounded-full object-cover ring-2 ring-lavender"
            loading="lazy"
          />
          <div className="flex-grow">
            <div className="flex items-center gap-3 mb-1">
              <h4 className="font-display font-semibold text-text-dark">
                {review.name}
              </h4>
              <StarRating rating={review.rating} />
            </div>
            <div className="flex items-center gap-3 text-sm text-text-light">
              <span>{review.service}</span>
              <span>•</span>
              <span>{review.date}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Reviews() {
  const [sectionRef, isSectionInView] = useInView(0.1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const autoplayRef = useRef(null);

  const startAutoplay = useCallback(() => {
    autoplayRef.current = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % reviewsData.length);
    }, 6000);
  }, []);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
  }, []);

  useEffect(() => {
    if (isSectionInView) {
      startAutoplay();
    }
    return () => stopAutoplay();
  }, [isSectionInView, startAutoplay, stopAutoplay]);

  useEffect(() => {
    setIsTyping(true);
    const timer = setTimeout(() => setIsTyping(false), 500);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const goToReview = useCallback(
    (index) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
      stopAutoplay();
      startAutoplay();
    },
    [currentIndex, stopAutoplay, startAutoplay],
  );

  const prevReview = useCallback(() => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + reviewsData.length) % reviewsData.length,
    );
    stopAutoplay();
    startAutoplay();
  }, [stopAutoplay, startAutoplay]);

  const nextReview = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % reviewsData.length);
    stopAutoplay();
    startAutoplay();
  }, [stopAutoplay, startAutoplay]);

  // Обработка клавиатуры
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") prevReview();
      if (e.key === "ArrowRight") nextReview();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [prevReview, nextReview]);

  const averageRating = (
    reviewsData.reduce((acc, r) => acc + r.rating, 0) / reviewsData.length
  ).toFixed(1);

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className="py-20 md:py-32 bg-white relative overflow-hidden"
      aria-labelledby="reviews-title"
    >
      {/* Декоративный фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-peach/20 via-transparent to-lavender/20" />

      {/* Плавающие элементы */}
      <motion.div
        className="absolute top-20 left-10 text-lavender/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <Star className="w-16 h-16" />
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-10 text-blush/30"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <Star className="w-12 h-12" />
      </motion.div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Заголовок */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isSectionInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.span
            className="inline-block px-4 py-2 bg-peach/50 rounded-full text-sm font-medium text-text-dark mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isSectionInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Отзывы клиентов
          </motion.span>
          <h2 id="reviews-title" className="section-title">
            Нас <span className="gradient-text">рекомендуют</span>
          </h2>
          <p className="section-subtitle">
            Более 5000 довольных клиентов доверяют нам свою красоту
          </p>

          {/* Общий рейтинг */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isSectionInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <div className="text-5xl font-display font-bold gradient-text">
              {averageRating}
            </div>
            <div>
              <StarRating rating={5} />
              <div className="text-text-light text-sm mt-1">
                на основе {reviewsData.length}+ отзывов
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Слайдер отзывов */}
        <div
          className="relative h-[400px] md:h-[350px] max-w-3xl mx-auto"
          onMouseEnter={stopAutoplay}
          onMouseLeave={startAutoplay}
          role="region"
          aria-label="Слайдер отзывов"
          aria-live="polite"
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <ReviewCard
              key={currentIndex}
              review={reviewsData[currentIndex]}
              isActive={true}
              direction={direction}
            />
          </AnimatePresence>
        </div>

        {/* Навигация */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <motion.button
            onClick={prevReview}
            className="p-3 bg-bgLight rounded-full hover:bg-lavender/30 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Предыдущий отзыв"
          >
            <ChevronLeft className="w-6 h-6 text-text-dark" />
          </motion.button>

          {/* Индикаторы */}
          <div
            className="flex gap-2"
            role="tablist"
            aria-label="Индикаторы отзывов"
          >
            {reviewsData.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToReview(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-pastel-gradient"
                    : "bg-lavender/50 hover:bg-lavender"
                }`}
                whileHover={{ scale: 1.2 }}
                role="tab"
                aria-selected={index === currentIndex}
                aria-label={`Перейти к отзыву ${index + 1}`}
              />
            ))}
          </div>

          <motion.button
            onClick={nextReview}
            className="p-3 bg-bgLight rounded-full hover:bg-lavender/30 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Следующий отзыв"
          >
            <ChevronRight className="w-6 h-6 text-text-dark" />
          </motion.button>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-text-gray mb-2">
            Оставьте свой отзыв после посещения
          </p>
          <div className="flex items-center justify-center gap-2 text-lavender-dark">
            <Star className="w-5 h-5 fill-lavender-dark" />
            <span className="font-medium">Мы ценим каждое мнение!</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Reviews;
