import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
  // Applicable for all fields
  'required': 'Поле является обязательным.',
  'minLength': 'Минимальная длина {{ min }} символа.',
  'maxLength': 'Максимальная длина {{ max }} символов.',
  'ipAddress': 'Введенный ip адрес должен быть в формате xxx.xxx.xxx.xxx.',
  'date': 'Дата и время должны иметь формат: dd.mm.yyyy.',
  'unique': 'Поле {{ field }} должно быть уникальным.',
  'password.confirmed': 'Поле: "пароля" и "подтверждение пароля" должны совпадать!',
  'number': 'В поле {{ field }} должно быть введено число.',
  'withoutDecimals': 'В поле {{ field }} должно быть введено целое число.',
  'positive': 'В поле {{ field }} должно быть введено положительное число.',
  'database.exists': 'Выбранный {{ field }} является недопустимым.',

  // Error message for the username field
  'username.required': 'Please choose a username for your account',
})
