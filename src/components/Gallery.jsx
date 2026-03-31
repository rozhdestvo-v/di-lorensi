import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "../hooks/useScroll";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

// Placeholder изображения для галереи (Unsplash)
const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80",
    alt: "Нежный розовый маникюр",
    category: "manicure",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?w=800&q=80",
    alt: "Французский маникюр",
    category: "manicure",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=800&q=80",
    alt: "Яркий дизайн ногтей",
    category: "manicure",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=800&q=80",
    alt: "Пастельный маникюр",
    category: "manicure",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1600062947296-5a8a91441b01?w=800&q=80",
    alt: "Ламинирование бровей",
    category: "brows",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1587613990444-6886c0f275b7?w=800&q=80",
    alt: "Оформление бровей",
    category: "brows",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1596462502278-27bfdd403348?w=800&q=80",
    alt: "Ламинирование ресниц",
    category: "lashes",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1588531990254-4ea3f8536f7f?w=800&q=80",
    alt: "Педикюр",
    category: "pedicure",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1599693942150-e6d04d5c2e9f?w=800&q=80",
    alt: "Дизайн ногтей со стразами",
    category: "manicure",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&q=80",
    alt: "Вечерний макияж",
    category: "makeup",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800&q=80",
    alt: "Маникюр в нюдовых тонах",
    category: "manicure",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=800&q=80",
    alt: "Укладка волос",
    category: "hair",
  },
];

const categories = [
  { id: "all", label: "Все" },
  { id: "manicure", label: "Маникюр" },
  { id: "pedicure", label: "Педикюр" },
  { id: "brows", label: "Брови" },
  { id: "lashes", label: "Ресницы" },
  { id: "hair", label: "Волосы" },
];

function Lightbox({ images, currentIndex, onClose, onPrev, onNext }) {
  const currentImage = images[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Просмотр изображения"
    >
      {/* Кнопка закрытия */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClose}
        className="absolute top-6 right-6 p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors z-10"
        aria-label="Закрыть"
      >
        <X className="w-6 h-6" />
      </motion.button>

      {/* Кнопка назад */}
      <motion.button
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-6 p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors z-10"
        aria-label="Предыдущее фото"
      >
        <ChevronLeft className="w-6 h-6" />
      </motion.button>

      {/* Кнопка вперёд */}
      <motion.button
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-6 p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors z-10"
        aria-label="Следующее фото"
      >
        <ChevronRight className="w-6 h-6" />
      </motion.button>

      {/* Изображение */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        className="max-w-5xl max-h-[85vh] p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentImage.src.replace("w=800", "w=1600")}
          alt={currentImage.alt}
          className="max-w-full max-h-[85vh] object-contain rounded-lg"
          loading="eager"
        />
        <p className="text-white/80 text-center mt-4 text-sm">
          {currentImage.alt}
        </p>
      </motion.div>

      {/* Индикатор прогресса */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </motion.div>
  );
}

function GalleryImage({ image, index, onClick }) {
  const [ref, isInView] = useInView(0.1);
  const [isLoaded, setIsLoaded] = useState(false);

  // Разные размеры для masonry эффекта
  const aspectClasses = [
    "aspect-square",
    "aspect-[3/4]",
    "aspect-[4/3]",
    "aspect-square",
    "aspect-[3/4]",
    "aspect-[4/3]",
  ];
  const aspectClass = aspectClasses[index % aspectClasses.length];

  return (
    <motion.div
      ref={ref}
      initial={{ y: 50, opacity: 0, scale: 0.9 }}
      animate={isInView ? { y: 0, opacity: 1, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`relative group overflow-hidden rounded-2xl cursor-pointer ${aspectClass}`}
      onClick={() => onClick(index)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick(index)}
      aria-label={`Открыть фото: ${image.alt}`}
    >
      {/* Изображение */}
      <img
        src={image.src}
        alt={image.alt}
        className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
      />

      {/* Placeholder пока загружается */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-lavender/30 animate-pulse" />
      )}

      {/* Overlay при наведении */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
      >
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            className="text-white"
          >
            <p className="font-medium text-sm">{image.alt}</p>
            <div className="flex items-center gap-2 mt-2">
              <ZoomIn className="w-4 h-4" />
              <span className="text-xs">Посмотреть</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Gallery() {
  const [sectionRef, isSectionInView] = useInView(0.1);
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredImages =
    activeCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  const openLightbox = useCallback((index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const prevImage = useCallback(() => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + filteredImages.length) % filteredImages.length,
    );
  }, [filteredImages.length]);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
  }, [filteredImages.length]);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="py-20 md:py-32 bg-white relative overflow-hidden"
      aria-labelledby="gallery-title"
    >
      {/* Декоративный фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-lavender/10 via-transparent to-mint/10" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Заголовок */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isSectionInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.span
            className="inline-block px-4 py-2 bg-mint/50 rounded-full text-sm font-medium text-text-dark mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isSectionInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Наши работы
          </motion.span>
          <h2 id="gallery-title" className="section-title">
            Галерея <span className="gradient-text">красоты</span>
          </h2>
          <p className="section-subtitle">
            Вдохновляйтесь нашими работами и выбирайте свой идеальный стиль
          </p>
        </motion.div>

        {/* Фильтры категорий */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isSectionInView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
          role="tablist"
          aria-label="Фильтр галереи"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-pastel-gradient text-text-dark shadow-md"
                  : "bg-bgLight text-text-gray hover:bg-lavender/30"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              role="tab"
              aria-selected={activeCategory === category.id}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Masonry сетка */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <GalleryImage
                key={image.id}
                image={image}
                index={index}
                onClick={() => openLightbox(index)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-text-gray mb-4">
            Хотите такие же красивые ногти? Записывайтесь к нам!
          </p>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            images={filteredImages}
            currentIndex={currentImageIndex}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export default Gallery;
