import { motion } from "framer-motion";
import { useInView } from "../hooks/useScroll";
import { Camera, MessageCircle, Award, Heart } from "lucide-react";
import teamImages from "../images/team";

const teamData = [
  {
    id: 1,
    name: "Вероника",
    role: "Топ Бровист/Ламимейкер",
    experience: "Более 3 лет",
    description:
      "Сделаю Ваши брови натуральными, а взгляд открытым. Люблю быстроту и качество",
    image: teamImages.Veronika,
    socials: { instagram: "@anna_nails", vk: "anna_smirnova" },
    stats: { clients: "300+", rating: "5.0" },
  },
  {
    id: 2,
    name: "Алексей",
    role: "Топ Ведущий мастер ногтевого сервиса",
    experience: "Более 5 лет",
    description:
      "Комбинированный, аппаратный маникюр, SMART педикюр. От идеи — к идеальному маникюру",
    image: teamImages.Alexey,
    socials: { instagram: "@elena_pedi", vk: "elena_kozlova" },
    stats: { clients: "180+", rating: "5.0" },
  },
  {
    id: 3,
    name: "Мария К",
    role: "Лучший мастер ногтевого сервиса",
    experience: "4 года",
    description: "Комбинированный, аппаратный маникюр, SMART, KART-педикюр",
    image: teamImages.Maria,
    socials: { instagram: "@maria_brows", vk: "maria_volkova" },
    stats: { clients: "220+", rating: "5.0" },
  },
  {
    id: 4,
    name: "Ольга К",
    role: "PRO Ведущий мастер ногтевого сервиса",
    experience: "Более 5 лет",
    description:
      "Один из самых быстрых мастеров студии. Опыт более 5 лет, скорость 1-1,5 часа. Максимальное число процедур за день - 12. Подберет актуальную и красивую форму ногтей, сделает красивый и качественный маникюр который будет радовать Вас каждый день.",
    image: teamImages.Olga,
    socials: { instagram: "@olga_hair", vk: "olga_petrova" },
    stats: { clients: "400+", rating: "5.0" },
  },
];

function TeamMember({ member, index }) {
  const [ref, isInView] = useInView(0.15);

  const cardVariants = {
    hidden: { y: 60, opacity: 0, rotateX: -10 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.7,
        delay: index * 0.15,
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
      whileHover={{ y: -10, scale: 1.02 }}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
      role="article"
      aria-label={`Мастер: ${member.name}`}
    >
      {/* Изображение */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <motion.img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover"
          loading="lazy"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
        />

        {/* Градиент overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

        {/* Соцсети */}
        <motion.div
          className="absolute top-4 right-4 flex gap-2"
          initial={{ opacity: 0, scale: 0 }}
          whileHover={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <a
            href={`https://instagram.com/${member.socials.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/40 transition-colors"
            aria-label={`Instagram ${member.socials.instagram}`}
          >
            <Camera className="w-5 h-5" />
          </a>
          <a
            href={`https://vk.com/${member.socials.vk}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/40 transition-colors"
            aria-label={`VK ${member.socials.vk}`}
          >
            <MessageCircle className="w-5 h-5" />
          </a>
        </motion.div>

        {/* Статистика */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between text-white">
          <div className="text-center">
            <div className="text-xl font-display font-semibold">
              {member.stats.clients}
            </div>
            <div className="text-xs opacity-80">клиентов</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-display font-semibold flex items-center gap-1">
              <Award className="w-5 h-5" />
              {member.stats.rating}
            </div>
            <div className="text-xs opacity-80">рейтинг</div>
          </div>
        </div>
      </div>

      {/* Информация */}
      <div className="p-6">
        <h3 className="text-xl font-display font-semibold text-text-dark mb-1">
          {member.name}
        </h3>
        <p className="text-lavender-dark font-medium text-sm mb-3">
          {member.role}
        </p>

        <div className="flex items-center gap-2 text-text-light text-sm mb-4">
          <Heart className="w-4 h-4 text-blush-dark" />
          <span>Опыт: {member.experience}</span>
        </div>

        <p className="text-text-gray text-sm leading-relaxed">
          {member.description}
        </p>
      </div>

      {/* Декоративный элемент при наведении */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-pastel-gradient"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

function Team() {
  const [sectionRef, isSectionInView] = useInView(0.1);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <section
      id="team"
      ref={sectionRef}
      className="py-20 md:py-32 bg-bgLight relative overflow-hidden"
      aria-labelledby="team-title"
    >
      {/* Декоративный фон */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-lavender/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-mint/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Заголовок */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isSectionInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-block px-4 py-2 bg-blush/50 rounded-full text-sm font-medium text-text-dark mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isSectionInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Наша команда
          </motion.span>
          <h2 id="team-title" className="section-title">
            Мастера с <span className="gradient-text">душой</span>
          </h2>
          <p className="section-subtitle">
            Профессионалы, которые любят свою работу и заботятся о каждой детали
          </p>
        </motion.div>

        {/* Сетка команды */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isSectionInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {teamData.map((member, index) => (
            <TeamMember key={member.id} member={member} index={index} />
          ))}
        </motion.div>

        {/* Преимущества */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {[
            {
              icon: Award,
              label: "Сертифицированные мастера",
              value: "100%",
            },
            { icon: Heart, label: "Любовь к работе", value: "∞" },
            {
              icon: MessageCircle,
              label: "Индивидуальный подход",
              value: "Каждому",
            },
            {
              icon: Camera,
              label: "Постоянное обучение",
              value: "Ежемесячно",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-white rounded-2xl shadow-md"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <item.icon className="w-8 h-8 mx-auto mb-3 text-lavender-dark" />
              <div className="text-2xl font-display font-semibold gradient-text mb-1">
                {item.value}
              </div>
              <div className="text-sm text-text-gray">{item.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Team;
