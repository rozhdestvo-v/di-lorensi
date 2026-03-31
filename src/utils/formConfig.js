import * as yup from 'yup';

export const bookingSchema = yup.object({
  name: yup
    .string()
    .required('Имя обязательно для заполнения')
    .min(2, 'Имя должно содержать не менее 2 символов')
    .max(50, 'Имя не должно превышать 50 символов'),
  phone: yup
    .string()
    .required('Телефон обязателен для заполнения')
    .matches(/^[\d\s\+\-\(\)]{10,}$/, 'Введите корректный номер телефона'),
  email: yup
    .string()
    .email('Введите корректный email')
    .required('Email обязателен для заполнения'),
  service: yup
    .string()
    .required('Выберите услугу'),
  date: yup
    .string()
    .required('Выберите дату')
    .test(
      'is-future-date',
      'Выберите дату не ранее завтрашнего дня',
      (value) => {
        if (!value) return false;
        const selectedDate = new Date(value);
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        return selectedDate >= tomorrow;
      }
    ),
  time: yup
    .string()
    .required('Выберите время'),
  comment: yup
    .string()
    .max(500, 'Комментарий не должен превышать 500 символов'),
}).required();

export const servicesList = [
  { id: 'manicure-gel', name: 'Маникюр гель-лак', price: 1500, duration: '1.5ч' },
  { id: 'manicure-combo', name: 'Комбинированный маникюр', price: 1800, duration: '2ч' },
  { id: 'pedicure', name: 'Педикюр', price: 2000, duration: '2ч' },
  { id: 'pedicure-gel', name: 'Педикюр + гель-лак', price: 2500, duration: '2.5ч' },
  { id: 'brows-lamination', name: 'Ламинирование бровей + окрас', price: 2250, duration: '1.5ч' },
  { id: 'brows-correction', name: 'Коррекция бровей', price: 800, duration: '30мин' },
  { id: 'lashes-lamination', name: 'Ламинирование ресниц', price: 2250, duration: '1.5ч' },
  { id: 'lashes-lamination-color', name: 'Ламинирование ресниц + окрашивание', price: 2750, duration: '2ч' },
  { id: 'nail-design', name: 'Дизайн ногтей', price: 50, duration: 'от 30мин' },
  { id: 'mens-manicure', name: 'Мужской маникюр', price: 1500, duration: '1ч' },
  { id: 'haircut', name: 'Стрижка', price: 1800, duration: '1ч' },
  { id: 'hair-styling', name: 'Укладка', price: 1500, duration: '1ч' },
];

export const timeSlots = [
  '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
  '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'
];

export const formatPhone = (value) => {
  const phoneNumber = value.replace(/\D/g, '');
  if (phoneNumber.startsWith('7') || phoneNumber.startsWith('8')) {
    const cleaned = phoneNumber.slice(1);
    return `+7 ${cleaned.slice(0, 3)} ${cleaned.slice(3, 5)}-${cleaned.slice(5, 7)}-${cleaned.slice(7, 9)}`;
  }
  return value;
};
