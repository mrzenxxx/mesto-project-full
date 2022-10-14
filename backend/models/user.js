const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false, // необходимо добавить поле select
  },
});

UserSchema.path('avatar').validate((link) => {
  return validator.isURL(link);
}, 'Укажите ссылку на аватар');

UserSchema.path('email').validate((email) => {
  return validator.isEmail(email);
}, 'Некорректный email');

module.exports = new mongoose.model('user', UserSchema);
