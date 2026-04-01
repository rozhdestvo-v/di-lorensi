import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "../hooks/useScroll";
import {
  Hand,
  Footprints,
  Eye,
  Star,
  User,
  Scissors,
  Paintbrush,
  Clock,
  Phone,
  FootprintsIcon,
  ScanFaceIcon,
  EyeIcon,
} from "lucide-react";

const servicesData = [
  {
    id: 1,
    icon: Hand,
    title: "Маникюр гель‑лак",
    price: 1890,
    duration: "1.5ч",
    description:
      "Классический или аппаратный маникюр с покрытием гель‑лак. Включает снятие старого покрытия, обработку кутикулы и придание формы.",
    color: "lavender",
  },
  {
    id: 2,
    icon: Hand,
    title: "Френч",
    price: 650,
    duration: "1.5ч",
    description:
      "Маникюр гель‑лак с оформлением «френч». Включает снятие старого покрытия, обработку кутикулы и нанесение покрытия.",
    color: "lavender",
  },
  {
    id: 3,
    icon: Hand,
    title: "Маникюр без покрытия",
    price: 1400,
    duration: "1ч",
    description:
      "Классический или аппаратный маникюр без покрытия. Включает обработку ногтей, кутикулы и придание формы.",
    color: "lavender",
  },
  {
    id: 4,
    icon: Hand,
    title: "Мужской маникюр",
    price: 1600,
    duration: "1.5ч",
    description:
      "Специальный мужской маникюр с акцентом на гигиеничную обработку и минималистичное оформление.",
    color: "lavender",
  },
  {
    id: 5,
    icon: Footprints,
    title: "Педикюр гель‑лак",
    price: 2990,
    duration: "1.5ч",
    description:
      "Полный педикюр с покрытием гель‑лак. Включает обработку стоп, пальцев, снятие ороговевшей кожи и нанесение стойкого покрытия.",
    color: "peach",
  },
  {
    id: 6,
    icon: Eye,
    title: "Ламинирование ресниц",
    price: 2250,
    duration: "1.5ч",
    description:
      "Ламинирование и окрашивание ресниц с моделированием изгиба. Подходит для первого посещения.",
    color: "mint",
  },
  {
    id: 7,
    icon: Eye,
    title: "Ламинирование ресниц + ботокс",
    price: 2700,
    duration: "1.5ч",
    description:
      "Ламинирование, окрашивание и уход‑ботокс для ресниц. Увеличивает объем и придает дополнительный блеск.",
    color: "mint",
  },
  {
    id: 8,
    icon: EyeIcon,
    title: "Ламинирование + окрашивание бровей",
    price: 2250,
    duration: "1.5ч",
    description:
      "Ламинирование и окрашивание бровей, включая коррекцию формы. Подходит для первого посещения.",
    color: "mint",
  },
  {
    id: 9,
    icon: EyeIcon,
    title: "Коррекция + окрашивание бровей краской",
    price: 1620,
    duration: "1ч",
    description:
      "Коррекция формы бровей и окрашивание краской для придания яркости и выразительности.",
    color: "mint",
  },
  {
    id: 10,
    icon: EyeIcon,
    title: "Ботокс для бровей",
    price: 700,
    duration: "0.5ч",
    description:
      "Процедура ботокса для бровей, направленная на сглаживание и укладку волосков для более аккуратного вида.",
    color: "mint",
  },
  {
    id: 11,
    icon: ScanFaceIcon,
    title: "Депиляция зоны лица (1 зона)",
    price: 500,
    duration: "0.3ч",
    description:
      "Быстрая депиляция одной зоны лица (над губой, подбородок и т.п.).",
    color: "blush",
  },
  {
    id: 12,
    icon: Hand,
    title: "Ремонт ногтя",
    price: 150,
    duration: "0.2ч",
    description:
      "Коррекция одного повреждённого ногтя, укрепление и подравнивание формы.",
    color: "lavender",
  },
  {
    id: 13,
    icon: Hand,
    title: "Донаращивание ногтя",
    price: 300,
    duration: "0.3ч",
    description:
      "Донаращивание одного повреждённого ногтя для восстановления длины и формы.",
    color: "lavender",
  },
  {
    id: 14,
    icon: Footprints,
    title: "PRO Гигиенический педикюр",
    price: 3900,
    duration: "1.5ч",
    description:
      "Глубокий гигиенический педикюр с полной обработкой стоп и пальцев, подходит для чувствительной кожи.",
    color: "peach",
  },
  {
    id: 15,
    icon: Hand,
    title: "PRO Маникюр + гель‑лак",
    price: 3100,
    duration: "1.5ч",
    description:
      "Услуга PRO‑маникюра с покрытием гель‑лак от топ‑мастера, включая детальную обработку и уход.",
    color: "lavender",
  },
  {
    id: 16,
    icon: Hand,
    title: "PRO Маникюр + лечение системой IBX",
    price: 2550,
    duration: "1.5ч",
    description:
      "Маникюр с уходом‑лечением ногтей системой IBX для укрепления и восстановления повреждённых пластин.",
    color: "lavender",
  },
];

const colorClasses = {
  lavender: {
    bg: "bg-lavender/50",
    hover: "hover:bg-lavender",
    text: "text-lavender-dark",
    icon: "bg-lavender",
  },
  blush: {
    bg: "bg-blush/50",
    hover: "hover:bg-blush",
    text: "text-rose-600",
    icon: "bg-blush",
  },
  mint: {
    bg: "bg-mint/50",
    hover: "hover:bg-mint",
    text: "text-emerald-600",
    icon: "bg-mint",
  },
  peach: {
    bg: "bg-peach/50",
    hover: "hover:bg-peach",
    text: "text-amber-600",
    icon: "bg-peach",
  },
  text: {
    bg: "bg-slate-100",
    hover: "hover:bg-slate-200",
    text: "text-slate-600",
    icon: "bg-slate-300",
  },
};

function ServiceCard({ service, index, onBookClick }) {
  const [ref, isInView] = useInView(0.1);
  const Icon = service.icon;
  const colors = colorClasses[service.color] || colorClasses.lavender;

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`card ${colors.bg} ${colors.hover} cursor-pointer group`}
      onClick={onBookClick}
      role="article"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onBookClick()}
      aria-label={`${service.title} — ${service.price}₽`}
    >
      {/* Иконка */}
      <motion.div
        className={`w-14 h-14 ${colors.icon} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
        whileHover={{ rotate: 5 }}
      >
        <Icon className={`w-7 h-7 text-white`} />
      </motion.div>

      {/* Заголовок и цена */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-display font-semibold text-text-dark group-hover:text-text-dark transition-colors">
          {service.title}
        </h3>
        <span
          className={`text-lg font-semibold ${colors.text} whitespace-nowrap ml-2`}
        >
          {service.price}₽
        </span>
      </div>

      {/* Длительность */}
      <div className="flex items-center gap-2 text-text-light text-sm mb-3">
        <Clock className="w-4 h-4" />
        <span>{service.duration}</span>
      </div>

      {/* Описание */}
      <p className="text-text-gray text-sm leading-relaxed">
        {service.description}
      </p>

      {/* Hover индикатор */}
      <motion.div
        className={`mt-4 h-1 ${colors.icon} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

function Services({ onBookClick }) {
  const sectionRef = useRef(null);
  const [titleRef, isTitleInView] = useInView(0.2);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden"
      aria-labelledby="services-title"
    >
      {/* Parallax фон секции */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundPositionY: backgroundY,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-bgLight via-white to-bgLight" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lavender to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-mint to-transparent" />
      </motion.div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Заголовок секции */}
        <motion.div
          ref={titleRef}
          initial={{ y: 50, opacity: 0 }}
          animate={isTitleInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-block px-4 py-2 bg-lavender/30 rounded-full text-sm font-medium text-text-dark mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isTitleInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Наши услуги
          </motion.span>
          <h2 id="services-title" className="section-title">
            Всё для вашей <span className="gradient-text">красоты</span>
          </h2>
          <p className="section-subtitle">
            Полный спектр услуг по уходу за ногтями, бровями и ресницами от
            профессиональных мастеров
          </p>
        </motion.div>

        {/* Сетка услуг */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {servicesData.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              onBookClick={() => onBookClick(service)}
            />
          ))}
        </div>

        {/* CTA внизу */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-text-gray mb-6">
            Не нашли нужную услугу? Свяжитесь с нами, и мы подберём оптимальное
            решение
          </p>
          {/* <motion.a
            href="tel:+79668288878"
            className="inline-flex items-center gap-2 text-lavender-dark font-medium hover:underline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Phone className="w-4 h-4" />
            +7 (966) 828-88-78
          </motion.a> */}
        </motion.div>
      </div>
    </section>
  );
}

export default Services;
