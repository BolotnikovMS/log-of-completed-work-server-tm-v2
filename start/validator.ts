import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
  // Applicable for all fields
  'required': 'Поле является обязательным.',
  'minLength': 'Минимальная длина {{ min }} символа.',
  'maxLength': 'Максимальная длина {{ max }} символов.',
  'string': 'Поле {{ field }} должно быть строкой.',
  'ipAddress': 'Введенный ip адрес должен быть в формате xxx.xxx.xxx.xxx.',
  'date': 'Дата и время должны иметь формат: dd.mm.yyyy.',
  'unique': 'Поле {{ field }} должно быть уникальным.',
  'password.confirmed': 'Поле: "пароля" и "подтверждение пароля" должны совпадать!',
  'number': 'В поле {{ field }} должно быть введено число.',
  'withoutDecimals': 'В поле {{ field }} должно быть введено целое число.',
  'positive': 'В поле {{ field }} должно быть введено положительное число.',
  'database.exists': 'Выбранный {{ field }} является недопустимым.',
  'file.extname': 'Недопустимые расширения файлов. Разрешен только формат {{ extnames }}.',
  'min': 'Значение поля {{ field }} должно быть не меньше {{ min }}.',
  'max': 'Значение поля {{ field }} не должно превышать {{ max }}.',
  'enum': 'Допустимые значения {{ field }}: {{ choices }}.',

  // Error message for the username field
  'username.required': 'Please choose a username for your account',
})
