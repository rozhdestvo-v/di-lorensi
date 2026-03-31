import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  X,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Check,
  AlertCircle,
} from "lucide-react";
import {
  bookingSchema,
  servicesList,
  timeSlots,
  formatPhone,
} from "../utils/formConfig";

function BookingModal({ isOpen, onClose, preselectedService }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedService, setSelectedService] = useState(
    preselectedService?.id || "",
  );
  const [formattedPhone, setFormattedPhone] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(bookingSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      service: preselectedService?.id || "",
      date: "",
      time: "",
      comment: "",
    },
  });

  const watchDate = watch("date");

  // Минимальная дата - завтра
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  // Максимальная дата - 3 месяца вперёд
  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    return maxDate.toISOString().split("T")[0];
  };

  useEffect(() => {
    if (preselectedService) {
      setSelectedService(preselectedService.id);
      setValue("service", preselectedService.id);
    }
  }, [preselectedService, setValue]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      if (!isSuccess) {
        reset();
        setFormattedPhone("");
      }
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, isSuccess, reset]);

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value);
    setFormattedPhone(formatted);
    setValue("phone", formatted);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    // Имитация отправки формы
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Здесь должна быть реальная отправка на сервер
    // Для демонстрации просто показываем успех
    console.log("Форма отправлена:", {
      ...data,
      service: servicesList.find((s) => s.id === data.service),
    });

    // Отправка на email (в реальности нужен backend)
    // Можно использовать emailjs или другой сервис
    setIsSubmitting(false);
    setIsSuccess(true);

    // Закрыть модальное окно через 3 секунды
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 3000);
  };

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: { opacity: 0 },
  };

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

  const inputBase = `w-full px-4 py-3 rounded-xl border bg-white/80 backdrop-blur-sm
    focus:outline-none focus:ring-2 focus:ring-lavender focus:border-transparent
    transition-all duration-200 placeholder:text-text-light`;

  const inputError = "border-rose-300 focus:ring-rose-300";
  const inputValid = "border-mint-dark focus:ring-mint-dark";

  if (isSuccess) {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                className="w-20 h-20 mx-auto mb-6 bg-mint rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                <Check className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className="text-2xl font-display font-semibold text-text-dark mb-2">
                Заявка отправлена!
              </h3>
              <p className="text-text-gray mb-4">
                Мы свяжемся с вами в ближайшее время для подтверждения записи
              </p>
              <p className="text-sm text-text-light">
                Письмо с подтверждением отправлено на вашу почту
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

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
            className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Заголовок */}
            <div className="flex items-center justify-between p-6 border-b border-lavender/30">
              <div>
                <h2
                  id="modal-title"
                  className="text-2xl font-display font-semibold text-text-dark"
                >
                  Онлайн-запись
                </h2>
                <p className="text-text-gray text-sm mt-1">
                  Заполните форму и мы свяжемся с вами
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

            {/* Форма */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
              {/* Имя */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-text-dark mb-2"
                >
                  Ваше имя *
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-light" />
                  <input
                    id="name"
                    type="text"
                    {...register("name")}
                    className={`${inputBase} pl-12 ${errors.name ? inputError : inputValid}`}
                    placeholder="Иван Иванов"
                    autoComplete="name"
                  />
                </div>
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-rose-500 text-sm mt-1 flex items-center gap-1"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {errors.name.message}
                  </motion.p>
                )}
              </div>

              {/* Телефон и Email в одну строку на больших экранах */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Телефон */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-text-dark mb-2"
                  >
                    Телефон *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-light" />
                    <input
                      id="phone"
                      type="tel"
                      {...register("phone")}
                      value={formattedPhone}
                      onChange={handlePhoneChange}
                      className={`${inputBase} pl-12 ${errors.phone ? inputError : inputValid}`}
                      placeholder="+7 (___) ___-__-__"
                      autoComplete="tel"
                    />
                  </div>
                  {errors.phone && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-rose-500 text-sm mt-1 flex items-center gap-1"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.phone.message}
                    </motion.p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-text-dark mb-2"
                  >
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-light" />
                    <input
                      id="email"
                      type="email"
                      {...register("email")}
                      className={`${inputBase} pl-12 ${errors.email ? inputError : inputValid}`}
                      placeholder="example@mail.ru"
                      autoComplete="email"
                    />
                  </div>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-rose-500 text-sm mt-1 flex items-center gap-1"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.email.message}
                    </motion.p>
                  )}
                </div>
              </div>

              {/* Услуга */}
              <div>
                <label
                  htmlFor="service"
                  className="block text-sm font-medium text-text-dark mb-2"
                >
                  Услуга *
                </label>
                <div className="relative">
                  <select
                    id="service"
                    {...register("service")}
                    value={selectedService}
                    onChange={(e) => {
                      setSelectedService(e.target.value);
                      setValue("service", e.target.value);
                    }}
                    className={`${inputBase} appearance-none cursor-pointer ${
                      errors.service ? inputError : inputValid
                    }`}
                  >
                    <option value="">Выберите услугу</option>
                    {servicesList.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name} — {service.price}₽ ({service.duration})
                      </option>
                    ))}
                  </select>
                  <Check className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-light pointer-events-none" />
                </div>
                {errors.service && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-rose-500 text-sm mt-1 flex items-center gap-1"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {errors.service.message}
                  </motion.p>
                )}
              </div>

              {/* Дата и Время */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Дата */}
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-text-dark mb-2"
                  >
                    Дата *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-light" />
                    <input
                      id="date"
                      type="date"
                      {...register("date")}
                      min={getMinDate()}
                      max={getMaxDate()}
                      className={`${inputBase} pl-12 ${errors.date ? inputError : inputValid}`}
                    />
                  </div>
                  {errors.date && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-rose-500 text-sm mt-1 flex items-center gap-1"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.date.message}
                    </motion.p>
                  )}
                </div>

                {/* Время */}
                <div>
                  <label
                    htmlFor="time"
                    className="block text-sm font-medium text-text-dark mb-2"
                  >
                    Время *
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-light" />
                    <select
                      id="time"
                      {...register("time")}
                      disabled={!watchDate}
                      className={`${inputBase} pl-12 ${
                        errors.time ? inputError : inputValid
                      } ${!watchDate ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <option value="">
                        {watchDate ? "Выберите время" : "Сначала выберите дату"}
                      </option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.time && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-rose-500 text-sm mt-1 flex items-center gap-1"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.time.message}
                    </motion.p>
                  )}
                </div>
              </div>

              {/* Комментарий */}
              <div>
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium text-text-dark mb-2"
                >
                  Комментарий (необязательно)
                </label>
                <textarea
                  id="comment"
                  {...register("comment")}
                  rows={3}
                  className={`${inputBase} resize-none ${
                    errors.comment ? inputError : inputValid
                  }`}
                  placeholder="Пожелания или особые требования..."
                />
                {errors.comment && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-rose-500 text-sm mt-1 flex items-center gap-1"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {errors.comment.message}
                  </motion.p>
                )}
              </div>

              {/* Кнопка отправки */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    Отправка...
                  </span>
                ) : (
                  "Записаться"
                )}
              </motion.button>

              {/* Информация */}
              <p className="text-xs text-text-light text-center">
                Нажимая кнопку, вы соглашаетесь с{" "}
                <a href="#" className="underline hover:text-lavender-dark">
                  политикой конфиденциальности
                </a>
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default BookingModal;
