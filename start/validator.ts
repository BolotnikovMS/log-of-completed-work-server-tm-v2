import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
  // Applicable for all fields
  'required': 'Поле является обязательным.',
  'minLength': 'Минимальная длина {{ min }} символа.',
  'maxLength': 'Максимальная длина {{ max }} символов.',
  'ipAddress': 'Поле с ip адресом должно быть формата xxx.xxx.xxx.xxx.',
  'date': 'Дата и время должны иметь формат: dd.mm.yyyy.',
  'unique': 'Поле {{ field }} должно быть уникальным.',
  'password.confirmed': 'Поле: "пароля" и "подтверждение пароля" должны совпадать!',

  // Error message for the username field
  'username.required': 'Please choose a username for your account',
})
